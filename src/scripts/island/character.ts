import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

type CharacterMaterial = THREE.Material | THREE.Material[];
type Point3 = readonly [number, number, number];
type BagMount = { x: number; z: number };
/**
 * 包包相對靜止位置的偏移。角度以背帶接點為軸（像吊著晃），位移單位是 body 座標。
 * pitch 正值＝包底往身體方向擺；roll 正值＝包底往 +x 外側擺（包包掛在 +x 那側，等於遠離肚子）；
 * lift 是上下彈跳；push 是往前（遠離身體）推開的距離。
 */
type BagPose = { pitch: number; roll: number; lift: number; push: number };

/** 小島和模型預覽共用的角色介面。所有高度都已計入當下縮放與姿勢。 */
export interface YeziCharacter {
  root: THREE.Group;
  /**
   * 404 的扶頭與坐下過渡，support、seated 皆為 0～1；不改動肢體尺寸。
   * 這是定格姿勢：呼叫端負責時間軸與緩動，這裡只把比例換成關節角度。
   * sway 是整個上半身以髖部為軸的左右搖晃（弧度，正值往角色右側 -x 倒）；
   * sigh 是嘆氣幅度約 -1～1（正值吸氣：肩膀上抬、胸口微微後仰；負值吐氣：再垮一點）。
   * 兩者都選填，預設 0；它們不影響貼地高度，所以搖晃時腳和屁股不會上下跳。
   */
  setDisappointedPose(support: number, seated: number, sway?: number, sigh?: number): void;
  /**
   * timeSeconds 為累積秒數；seated 接受坐下過渡比例 0～1，也接受布林值。
   * 內部會記住上一幀的時間，自行計算 dt 並平滑切換走路、跑步、揮手、風吹與坐下，
   * 所以請每幀用同一個時間來源呼叫；時間倒退或跳超過 1 秒時會直接套用目標姿勢。
   * 傳入數字的 seated 會直接採用（呼叫端已平滑過）；傳入布林值時由角色自己緩動。
   */
  animate(
    timeSeconds: number,
    moving: boolean,
    wave: boolean,
    wind: boolean,
    reducedMotion: boolean,
    seated?: boolean | number,
    running?: boolean,
  ): void;
  /** 最低鞋底相對 root.position.y 的高度，供地面接觸定位使用。 */
  getFootOffset(): number;
  /** 臀部接觸點相對 root.position.y 的高度，供長椅定位使用。 */
  getSeatOffset(): number;
  /**
   * 設定頭部想轉向的角度（弧度，相對身體正前方 +z）。
   * 正值＝往角色自己的左手邊轉（模型 +x 方向，俯視為逆時針，與 rotation.y 同號）。
   * 例：要看向鏡頭時，可把鏡頭位置轉到 root 的區域座標 local，傳入 Math.atan2(local.x, local.z)。
   * 角色會限制在約 ±0.9 弧度內並平滑跟隨；走路時減為六成、跑步時完全淡出，減少動態時不轉頭。
   * 坐在長椅上仍可轉頭；404 定格姿勢不使用這個值。
   * 選用功能，不呼叫就維持 0；請在 animate() 之前呼叫，下一次 animate() 才會套用。
   */
  setHeadTurn(yawRadians: number): void;
  /** 跳躍狀態：height 為鞋底離地高度（世界單位，未乘角色縮放），verticalVelocity 為垂直速度（世界單位/秒，向上為正）。地面上兩者皆為 0。 */
  setAirborne(height: number, verticalVelocity: number): void;
}

/** 臨界阻尼彈簧狀態：value 是目前值，velocity 是每秒變化量。 */
type Spring = { value: number; velocity: number };

/**
 * 臨界阻尼彈簧（與 Unity SmoothDamp 相同的近似解）。
 * 起步與停下都有緩衝、不會過衝，dt 很大時也穩定；smoothTime 約等於到達目標所需秒數的一半。
 */
function springTo(spring: Spring, target: number, smoothTime: number, dt: number): number {
  const omega = 2 / smoothTime;
  const x = omega * dt;
  const decay = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const change = spring.value - target;
  const temp = (spring.velocity + omega * change) * dt;
  spring.velocity = (spring.velocity - omega * temp) * decay;
  spring.value = target + (change + temp) * decay;
  return spring.value;
}

function snapSpring(spring: Spring, value: number): void {
  spring.value = value;
  spring.velocity = 0;
}

/**
 * 欠阻尼彈簧：會過衝、來回晃幾下再停，用在紙角與包包的餘晃（follow-through）。
 * 直接代入阻尼振盪的解析解推進，所以 30 fps 和 120 fps 走出同一條曲線；每一步假設 target 在 dt 內不變。
 * angularFrequency 是自然角頻率（弧度/秒，÷2π 約等於每秒晃幾下）；dampingRatio 須介於 0～1，越小晃越多下。
 */
function wobbleTo(
  spring: Spring,
  target: number,
  angularFrequency: number,
  dampingRatio: number,
  dt: number,
): number {
  if (dt <= 0) {
    return spring.value;
  }
  const offset = spring.value - target;
  const decayRate = dampingRatio * angularFrequency;
  const dampedFrequency = angularFrequency * Math.sqrt(1 - dampingRatio * dampingRatio);
  const decay = Math.exp(-decayRate * dt);
  const cos = Math.cos(dampedFrequency * dt);
  const sin = Math.sin(dampedFrequency * dt);
  // x(t) = e^(-ζωt)(offset·cos ωd t + b·sin ωd t)，b 由目前速度決定，速度因此連續、不會突然轉向。
  const b = (spring.velocity + decayRate * offset) / dampedFrequency;
  spring.value = target + decay * (offset * cos + b * sin);
  spring.velocity =
    decay *
    ((b * dampedFrequency - decayRate * offset) * cos -
      (offset * dampedFrequency + decayRate * b) * sin);
  return spring.value;
}

/** 平滑的上限：小值幾乎不變，越接近 limit 越被壓住，永遠不會超過，也沒有硬切的折角。 */
function softLimit(value: number, limit: number): number {
  return limit * Math.tanh(value / limit);
}

/**
 * 平滑版的 max(0, value)：0 時剛好是 0，正值約等於 value − softness/2，負值趨近 −softness/2。
 * 落地蹲下這類「只往一邊作用」的量用它，越過 0 時速度連續，關節不會突然煞住。
 */
function smoothPositive(value: number, softness: number): number {
  return (value + Math.sqrt(value * value + softness * softness) - softness) / 2;
}

// 頁仔由幾何零件組成；臉上的腮紅畫在紙張貼圖內，不建立突出的零件。
export function createYezi(): YeziCharacter {
  const root = new THREE.Group();
  function createPaperTexture(size: number, face = false): THREE.DataTexture {
    const pixels = new Uint8Array(size * size * 4);
    let seed = 90210;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        const grain = seed / 4294967296 - 0.5;
        const i = (y * size + x) * 4;
        if (face) {
          const px = (x / (size - 1) - 0.5) * 1.12;
          const py = y / (size - 1) - 0.5;
          const blush =
            Math.min(
              1,
              [-0.32, 0.32].reduce(
                (sum, cx) =>
                  sum + Math.exp(-(((px - cx) / 0.105) ** 2) - ((py + 0.19) / 0.076) ** 2),
                0,
              ),
            ) * 0.48;
          for (let c = 0; c < 3; c++) {
            pixels[i + c] =
              [250, 242, 229][c] * (1 - blush) + [239, 142, 112][c] * blush + grain * 2;
          }
        } else {
          const fibre = Math.sin(x * 0.63 + Math.sin(y * 0.18) * 2) * Math.sin(y * 0.31 + x * 0.09);
          pixels[i] = pixels[i + 1] = pixels[i + 2] = 128 + grain * 45 + fibre * 25;
        }
        pixels[i + 3] = 255;
      }
    }
    const texture = new THREE.DataTexture(pixels, size, size, THREE.RGBAFormat);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.needsUpdate = true;
    if (face) {
      texture.colorSpace = THREE.SRGBColorSpace;
    } else {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    }
    return texture;
  }
  // 紙張貼圖與材質：配色、粗糙度及細微纖維集中在這裡調整。
  const grain = createPaperTexture(128);
  const faceTexture = createPaperTexture(512, true);
  const cream = new THREE.MeshStandardMaterial({
    color: "#fff5e5",
    roughness: 0.93,
    bumpMap: grain,
    bumpScale: 0.0012,
  });
  const teal = new THREE.MeshStandardMaterial({
    color: "#38766d",
    roughness: 0.84,
    side: THREE.DoubleSide,
  });
  const trim = new THREE.MeshStandardMaterial({
    color: "#32685f",
    roughness: 0.9,
  });
  const collarMaterial = new THREE.MeshStandardMaterial({
    color: "#4b8377",
    roughness: 0.86,
  });
  const coral = new THREE.MeshStandardMaterial({
    color: "#e88359",
    roughness: 0.78,
  });
  const brown = new THREE.MeshStandardMaterial({
    color: "#806345",
    roughness: 0.9,
  });
  const ink = new THREE.MeshStandardMaterial({
    color: "#302c25",
    roughness: 0.53,
  });
  const sole = new THREE.MeshStandardMaterial({
    color: "#485d53",
    roughness: 1,
  });
  const metal = new THREE.MeshStandardMaterial({
    color: "#bbb7a4",
    metalness: 0.72,
    roughness: 0.36,
  });
  function addMesh<Geometry extends THREE.BufferGeometry>(
    geometry: Geometry,
    material: CharacterMaterial,
    parent: THREE.Object3D = root,
  ): THREE.Mesh<Geometry, CharacterMaterial> {
    const object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
    parent.add(object);
    return object;
  }
  function addRoundedBox(
    width: number,
    height: number,
    depth: number,
    cornerRadius: number,
    material: CharacterMaterial,
    x: number,
    y: number,
    z: number,
    parent: THREE.Object3D = root,
  ) {
    const object = addMesh(
      new RoundedBoxGeometry(width, height, depth, 5, cornerRadius),
      material,
      parent,
    );
    object.position.set(x, y, z);
    return object;
  }
  function addEllipsoid(
    x: number,
    y: number,
    z: number,
    scaleX: number,
    scaleY: number,
    scaleZ: number,
    material: CharacterMaterial,
    parent: THREE.Object3D = root,
  ) {
    const object = addMesh(new THREE.SphereGeometry(1, 32, 24), material, parent);
    object.position.set(x, y, z);
    object.scale.set(scaleX, scaleY, scaleZ);
    return object;
  }
  function addCurve(
    points: readonly Point3[],
    radius: number,
    material: CharacterMaterial,
    parent: THREE.Object3D = root,
  ) {
    return addMesh(
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(p[0], p[1], p[2]))),
        40,
        radius,
        6,
        false,
      ),
      material,
      parent,
    );
  }
  function createRoundedOutline(width: number, height: number, cornerRadius: number): THREE.Shape {
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const outline = new THREE.Shape();
    outline.moveTo(-halfWidth + cornerRadius, -halfHeight);
    outline.lineTo(halfWidth - cornerRadius, -halfHeight);
    outline.absarc(
      halfWidth - cornerRadius,
      -halfHeight + cornerRadius,
      cornerRadius,
      -Math.PI / 2,
      0,
    );
    outline.lineTo(halfWidth, halfHeight - cornerRadius);
    outline.absarc(
      halfWidth - cornerRadius,
      halfHeight - cornerRadius,
      cornerRadius,
      0,
      Math.PI / 2,
    );
    outline.lineTo(-halfWidth + cornerRadius, halfHeight);
    outline.absarc(
      -halfWidth + cornerRadius,
      halfHeight - cornerRadius,
      cornerRadius,
      Math.PI / 2,
      Math.PI,
    );
    outline.lineTo(-halfWidth, -halfHeight + cornerRadius);
    outline.absarc(
      -halfWidth + cornerRadius,
      -halfHeight + cornerRadius,
      cornerRadius,
      Math.PI,
      Math.PI * 1.5,
    );
    return outline;
  }
  function addExtrudedShape(
    shape: THREE.Shape,
    depth: number,
    material: CharacterMaterial,
    parent: THREE.Object3D = root,
  ) {
    return addMesh(
      new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: true,
        bevelSize: 0.002,
        bevelThickness: 0.002,
        bevelSegments: 2,
        curveSegments: 16,
        steps: 1,
      }),
      material,
      parent,
    );
  }
  // 身體與外套：奶油色腹部在內，外套曲面包覆上半身。
  const belly = addEllipsoid(0, 0.57, 0, 0.31, 0.3, 0.235, cream);
  belly.name = "yezi-belly";
  addEllipsoid(0, 0.835, 0, 0.245, 0.18, 0.19, cream);
  const neck = addEllipsoid(0, 0.976, 0, 0.125, 0.08, 0.115, cream);
  function getJacketPoint(u: number, v: number): THREE.Vector3 {
    const opening = 0.19 + (1 - v) * 0.035;
    const theta = opening + u * (Math.PI * 2 - opening * 2);
    const hem = 0.59 + 0.023 * Math.max(0, Math.cos(theta)) ** 4;
    const top = 0.978;
    const rx = 0.353 - 0.18 * v * v + 0.012 * Math.sin(v * Math.PI);
    const rz = 0.262 - 0.105 * v * v + 0.012 * Math.sin(v * Math.PI);
    return new THREE.Vector3(
      Math.sin(theta) * rx,
      THREE.MathUtils.lerp(hem, top, v),
      Math.cos(theta) * rz,
    );
  }
  const clothPositions: number[] = [];
  const clothUvs: number[] = [];
  const clothIndices: number[] = [];
  const jacketColumns = 72;
  const jacketRows = 18;
  for (let j = 0; j <= jacketRows; j++) {
    for (let i = 0; i <= jacketColumns; i++) {
      const p = getJacketPoint(i / jacketColumns, j / jacketRows);
      clothPositions.push(...p);
      clothUvs.push(i / jacketColumns, j / jacketRows);
    }
  }
  for (let j = 0; j < jacketRows; j++) {
    for (let i = 0; i < jacketColumns; i++) {
      const a = j * (jacketColumns + 1) + i;
      const b = a + 1;
      const c = a + jacketColumns + 1;
      const d = c + 1;
      clothIndices.push(a, b, c, b, d, c);
    }
  }
  const jacketGeometry = new THREE.BufferGeometry();
  jacketGeometry.setAttribute("position", new THREE.Float32BufferAttribute(clothPositions, 3));
  jacketGeometry.setAttribute("uv", new THREE.Float32BufferAttribute(clothUvs, 2));
  jacketGeometry.setIndex(clothIndices);
  jacketGeometry.computeVertexNormals();
  addMesh(jacketGeometry, teal);
  const hem: Point3[] = [];
  for (let i = 0; i <= 72; i++) {
    hem.push(getJacketPoint(i / 72, 0).toArray());
  }
  addCurve(hem, 0.004, trim);
  for (const u of [0, 1]) {
    const edge: Point3[] = [];
    for (let j = 0; j <= 20; j++) {
      edge.push(getJacketPoint(u, j / 20).toArray());
    }
    addCurve(edge, 0.003, trim);
  }
  // 袖子頂端與外套重疊，手臂擺動時仍能遮住肩部接縫。
  const neckband: Point3[] = [];
  for (let i = 0; i <= 40; i++) {
    const a = 0.7 + (i / 40) * (Math.PI * 2 - 1.4);
    neckband.push([Math.sin(a) * 0.14, 0.967 - Math.abs(Math.sin(a)) * 0.008, Math.cos(a) * 0.145]);
  }
  addCurve(neckband, 0.024, teal);
  // 領片頂點沿胸口曲面貼合，避免領片浮在衣服上方。
  for (const side of [-1, 1]) {
    const collar = new THREE.Shape();
    collar.moveTo(side * 0.032, 0.961);
    collar.quadraticCurveTo(side * 0.105, 0.972, side * 0.159, 0.95);
    collar.quadraticCurveTo(side * 0.185, 0.932, side * 0.19, 0.912);
    collar.lineTo(side * 0.103, 0.857);
    collar.quadraticCurveTo(side * 0.07, 0.89, side * 0.032, 0.961);
    const m = addExtrudedShape(collar, 0.005, collarMaterial);
    const p = m.geometry.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const y = p.getY(i);
      const v = THREE.MathUtils.clamp((y - 0.61) / (0.978 - 0.61), 0, 1);
      const rx = 0.353 - 0.18 * v * v + 0.012 * Math.sin(v * Math.PI);
      const rz = 0.262 - 0.105 * v * v + 0.012 * Math.sin(v * Math.PI);
      p.setZ(i, p.getZ(i) + rz * Math.sqrt(Math.max(0.05, 1 - (p.getX(i) / rx) ** 2)) + 0.012);
    }
    m.geometry.computeVertexNormals();
  }
  const leftArm = new THREE.Group();
  const rightArm = new THREE.Group();
  leftArm.position.set(-0.285, 0.855, 0);
  rightArm.position.set(0.285, 0.855, 0);
  leftArm.name = "yezi-left-arm";
  rightArm.name = "yezi-right-arm";
  root.add(leftArm, rightArm);
  const wrists: THREE.Group[] = [];
  for (const [arm, sign] of [
    [leftArm, -1],
    [rightArm, 1],
  ] as const) {
    const sleeve = new THREE.Group();
    sleeve.rotation.z = sign * 0.24;
    arm.add(sleeve);
    const profile = [
      [0.085, -0.2],
      [0.099, -0.194],
      [0.113, -0.14],
      [0.124, -0.065],
      [0.117, 0.017],
      [0.082, 0.071],
      [0, 0.093],
    ].map((p) => new THREE.Vector2(p[0], p[1]));
    const sleeveCurve = new THREE.CatmullRomCurve3(
      profile.map((p) => new THREE.Vector3(p.x, p.y, 0)),
    );
    addMesh(
      new THREE.LatheGeometry(
        sleeveCurve.getPoints(32).map((p) => new THREE.Vector2(Math.max(0, p.x), p.y)),
        40,
      ),
      teal,
      sleeve,
    );
    const cuff = addMesh(new THREE.TorusGeometry(0.089, 0.004, 8, 32), trim, sleeve);
    cuff.rotation.x = Math.PI / 2;
    cuff.position.y = -0.197;
    // 手腕位在原本袖口，不增加手臂長度。
    const wrist = new THREE.Group();
    wrist.name = sign < 0 ? "yezi-left-wrist" : "yezi-right-wrist";
    wrist.position.y = -0.197;
    sleeve.add(wrist);
    wrists.push(wrist);
    // 固定的扁掌與拇指輪廓；總長維持原本短手比例，動作只轉關節。
    let handOutline = new THREE.Shape();
    handOutline.moveTo(-0.046, 0.012);
    handOutline.quadraticCurveTo(-0.06, 0.012, -0.059, -0.014);
    handOutline.lineTo(-0.056, -0.027);
    handOutline.quadraticCurveTo(-0.091, -0.02, -0.096, -0.045);
    handOutline.quadraticCurveTo(-0.105, -0.072, -0.078, -0.08);
    handOutline.lineTo(-0.057, -0.065);
    handOutline.lineTo(-0.057, -0.104);
    handOutline.quadraticCurveTo(-0.057, -0.126, -0.03, -0.126);
    handOutline.lineTo(0.03, -0.126);
    handOutline.quadraticCurveTo(0.057, -0.126, 0.057, -0.103);
    handOutline.lineTo(0.057, -0.01);
    handOutline.quadraticCurveTo(0.058, 0.012, 0.043, 0.012);
    handOutline.closePath();
    // 左右拇指朝內；在建立幾何前鏡射輪廓，避免動畫使用負縮放。
    if (sign < 0) {
      handOutline = new THREE.Shape(
        handOutline
          .getPoints(12)
          .map((point) => new THREE.Vector2(-point.x, point.y))
          .reverse(),
      );
    }
    const handGeometry = new THREE.ExtrudeGeometry(handOutline, {
      depth: 0.052,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.009,
      bevelThickness: 0.009,
      curveSegments: 12,
    });
    const palm = addMesh(handGeometry, cream, wrist);
    palm.name = sign < 0 ? "yezi-left-palm" : "yezi-right-palm";
    palm.position.z = -0.01;
  }
  // 腿與靴子：靴底、鞋面和鞋口使用同一圈圈輪廓，避免各零件接縫突出。
  const legs: THREE.Group[] = [];
  const boots: THREE.Mesh<THREE.BufferGeometry, CharacterMaterial>[] = [];
  for (const x of [-0.165, 0.165]) {
    const leg = new THREE.Group();
    leg.position.set(x, 0.36, 0);
    root.add(leg);
    legs.push(leg);
    addEllipsoid(0, -0.035, 0, 0.086, 0.13, 0.087, cream, leg);
    // 下列輪廓由鞋底一路延伸至鞋口內側；每圈共用頂點順序形成封閉鞋型。
    const rings: [radiusX: number, height: number, radiusZ: number, forwardOffset: number][] = [
      // 左右半徑、高度、前後半徑、往前偏移量。
      [0.112, -0.298, 0.154, 0.032],
      [0.122, -0.29, 0.163, 0.033],
      [0.124, -0.272, 0.164, 0.033],
      [0.126, -0.253, 0.164, 0.033],
      [0.126, -0.229, 0.158, 0.03],
      [0.122, -0.204, 0.145, 0.024],
      [0.116, -0.18, 0.128, 0.014],
      [0.109, -0.153, 0.112, 0.004],
      [0.107, -0.126, 0.108, 0],
      [0.108, -0.103, 0.108, 0],
      [0.111, -0.089, 0.111, 0],
      [0.108, -0.08, 0.108, 0],
      [0.098, -0.08, 0.098, 0],
      [0.094, -0.091, 0.094, 0],
      [0.094, -0.137, 0.094, 0],
    ];
    const vertices: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    const sides = 48;
    for (let j = 0; j < rings.length; j++) {
      for (let i = 0; i <= sides; i++) {
        const [rx, y, rz, cz] = rings[j];
        const a = (i / sides) * Math.PI * 2;
        vertices.push(Math.sin(a) * rx, y, Math.cos(a) * rz + cz);
        uvs.push(i / sides, j / (rings.length - 1));
      }
    }
    const bootGeometry = new THREE.BufferGeometry();
    for (let j = 0; j < rings.length - 1; j++) {
      const start = indices.length;
      for (let i = 0; i < sides; i++) {
        const a = j * (sides + 1) + i;
        const b = a + 1;
        const c = a + sides + 1;
        const d = c + 1;
        indices.push(a, b, c, b, d, c);
      }
      bootGeometry.addGroup(start, indices.length - start, j < 2 ? 1 : j >= 10 ? 2 : 0);
    }
    const cap = vertices.length / 3;
    vertices.push(0, rings[0][1], rings[0][3]);
    uvs.push(0.5, 0.5);
    const start = indices.length;
    for (let i = 0; i < sides; i++) {
      indices.push(cap, i + 1, i);
    }
    bootGeometry.addGroup(start, indices.length - start, 1);
    bootGeometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    bootGeometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    bootGeometry.setIndex(indices);
    bootGeometry.computeVertexNormals();
    const boot = addMesh(bootGeometry, [teal, sole, trim], leg);
    boot.name = "yezi-boot";
    boots.push(boot);
  }
  const tieShape = new THREE.Shape();
  tieShape.moveTo(-0.044, 0.958);
  tieShape.lineTo(0.042, 0.958);
  tieShape.lineTo(0.056, 0.728);
  tieShape.lineTo(0.007, 0.754);
  tieShape.lineTo(-0.041, 0.718);
  tieShape.closePath();
  const tie = addExtrudedShape(tieShape, 0.009, coral);
  const tiePositions = tie.geometry.attributes.position;
  for (let i = 0; i < tiePositions.count; i++) {
    tiePositions.setZ(i, tiePositions.getZ(i) + 0.209 + (0.958 - tiePositions.getY(i)) * 0.3);
  }
  tie.geometry.computeVertexNormals();
  // 腰前包包：位置已與參考圖確認，改位置時背帶接點也會跟著重新計算。
  // 翻蓋使用細分雙層曲面，不能只彎曲外框，否則大片三角形會穿進包身。
  const satchel = new THREE.Group();
  satchel.position.set(0.235, 0.605, 0.31);
  satchel.rotation.z = -0.06;
  satchel.rotation.y = -0.1;
  satchel.scale.setScalar(0.85);
  root.add(satchel);
  const bagBody = addRoundedBox(0.245, 0.29, 0.16, 0.048, teal, 0, 0, 0, satchel);
  bagBody.name = "yezi-satchel-body";
  const bagPosition = bagBody.geometry.attributes.position;
  for (let i = 0; i < bagPosition.count; i++) {
    const x = bagPosition.getX(i);
    const y = bagPosition.getY(i);
    const z = bagPosition.getZ(i);
    // 包身正背面微微鼓起，下緣保留圓角，避免看起來像硬盒子。
    const puff = 0.007 * Math.max(0, 1 - (x / 0.123) ** 2) * Math.max(0, 1 - (y / 0.145) ** 2);
    bagPosition.setZ(i, z + Math.sign(z) * puff);
  }
  bagBody.geometry.computeVertexNormals();
  // 米白側片縮在綠色包邊內，頂端低於包口。
  addRoundedBox(0.014, 0.174, 0.086, 0.007, cream, -0.119, -0.017, -0.003, satchel);
  const flapProfile = new THREE.CatmullRomCurve3(
    [
      [0, -0.029, 0.089],
      [0, 0.04, 0.097],
      [0, 0.101, 0.093],
      [0, 0.137, 0.068],
      [0, 0.15, 0.007],
      [0, 0.137, -0.057],
      [0, 0.105, -0.078],
    ].map((p) => new THREE.Vector3(p[0], p[1], p[2])),
    false,
    "centripetal",
  );
  // 翻蓋前後兩層都要有內部細分，彎曲時才能真正沿著包身表面。
  const flapVertices: number[] = [];
  const flapUvs: number[] = [];
  const flapIndices: number[] = [];
  const flapRows = 64;
  const flapCols = 20;
  const flapLayer = (flapRows + 1) * (flapCols + 1);
  for (let layer = 0; layer < 2; layer++) {
    for (let j = 0; j <= flapRows; j++) {
      const u = j / flapRows;
      const p = flapProfile.getPointAt(u);
      const t = flapProfile.getTangentAt(u);
      const edgeDistance = Math.min(u, 1 - u) * 0.29;
      const halfWidth =
        edgeDistance < 0.032 ? 0.084 + Math.sqrt(0.032 ** 2 - (0.032 - edgeDistance) ** 2) : 0.116;
      const thickness = layer === 0 ? 0.008 : 0;
      for (let i = 0; i <= flapCols; i++) {
        const across = (i / flapCols) * 2 - 1;
        const x = across * halfWidth;
        const edgeDrape = 0.012 * Math.abs(across) ** 3;
        // 翻蓋中央較高、兩側下垂，貼合鼓起的包身。
        flapVertices.push(
          x,
          p.y - t.z * (thickness - edgeDrape),
          p.z + t.y * (thickness - edgeDrape),
        );
        flapUvs.push(i / flapCols, u);
      }
    }
  }
  for (let layer = 0; layer < 2; layer++) {
    for (let j = 0; j < flapRows; j++) {
      for (let i = 0; i < flapCols; i++) {
        const a = layer * flapLayer + j * (flapCols + 1) + i;
        const b = a + 1;
        const c = a + flapCols + 1;
        const d = c + 1;
        flapIndices.push(...(layer === 0 ? [a, b, c, b, d, c] : [a, c, b, b, c, d]));
      }
    }
  }
  const flapBorder: number[] = [];
  for (let i = 0; i <= flapCols; i++) {
    flapBorder.push(i);
  }
  for (let j = 1; j <= flapRows; j++) {
    flapBorder.push(j * (flapCols + 1) + flapCols);
  }
  for (let i = flapCols - 1; i >= 0; i--) {
    flapBorder.push(flapRows * (flapCols + 1) + i);
  }
  for (let j = flapRows - 1; j > 0; j--) {
    flapBorder.push(j * (flapCols + 1));
  }
  for (let i = 0; i < flapBorder.length; i++) {
    const a = flapBorder[i];
    const b = flapBorder[(i + 1) % flapBorder.length];
    flapIndices.push(a, a + flapLayer, b, b, a + flapLayer, b + flapLayer);
  }
  const flapGeometry = new THREE.BufferGeometry();
  flapGeometry.setAttribute("position", new THREE.Float32BufferAttribute(flapVertices, 3));
  flapGeometry.setAttribute("uv", new THREE.Float32BufferAttribute(flapUvs, 2));
  flapGeometry.setIndex(flapIndices);
  flapGeometry.computeVertexNormals();
  const flap = addMesh(flapGeometry, teal, satchel);
  flap.name = "yezi-satchel-flap";
  addRoundedBox(0.027, 0.056, 0.018, 0.006, coral, 0.121, 0.065, 0.068, satchel);
  // 背帶前後兩端各自接到包包一側的金屬環。
  const mounts: BagMount[] = [
    { x: -0.128, z: 0.014 },
    { x: 0.128, z: -0.043 },
  ];
  for (const { x, z } of mounts) {
    const ring = addMesh(new THREE.TorusGeometry(0.019, 0.004, 10, 32), metal, satchel);
    ring.position.set(x, 0.099, z);
    addRoundedBox(0.019, 0.041, 0.017, 0.007, trim, x, 0.074, z, satchel);
  }
  addCurve(
    [
      [0.05, 0.027, 0.087],
      [0.05, -0.066, 0.087],
      [0.062, -0.082, 0.087],
      [0.078, -0.079, 0.087],
      [0.084, -0.064, 0.087],
      [0.084, 0.031, 0.087],
      [0.073, 0.043, 0.087],
      [0.059, 0.038, 0.087],
      [0.057, 0.02, 0.087],
      [0.057, -0.046, 0.087],
      [0.067, -0.055, 0.087],
      [0.072, -0.044, 0.087],
      [0.072, 0.011, 0.087],
    ].map(([x, y, z]): Point3 => [x, y, z + 0.02 * THREE.MathUtils.smoothstep(y, -0.048, -0.01)]),
    0.0038,
    metal,
    satchel,
  );
  // 由包包的轉換矩陣計算接點；改位置、角度或尺寸時，背帶仍接得上。
  satchel.updateMatrix();
  const attachment = (mount: BagMount, z: number): THREE.Vector3 =>
    new THREE.Vector3(mount.x, 0.15, mount.z + z).applyMatrix4(satchel.matrix);
  // 皮帶小環從金屬環上緣下方穿過，再往上折回固定。
  for (const mount of mounts) {
    const loopProfile = new THREE.CatmullRomCurve3(
      [
        [0.15, 0.011],
        [0.127, 0.011],
        [0.115, 0.009],
        [0.111, 0],
        [0.115, -0.009],
        [0.127, -0.011],
        [0.15, -0.011],
      ].map(([y, z]) => new THREE.Vector3(mount.x, y, mount.z + z)),
      false,
      "centripetal",
    );
    const loopVertices: number[] = [];
    const loopIndices: number[] = [];
    const loopSteps = 32;
    for (let i = 0; i <= loopSteps; i++) {
      const p = loopProfile.getPointAt(i / loopSteps);
      const t = loopProfile.getTangentAt(i / loopSteps);
      for (const [side, depth] of [
        [-1, 1],
        [1, 1],
        [1, -1],
        [-1, -1],
      ]) {
        loopVertices.push(p.x + side * 0.014, p.y - t.z * depth * 0.002, p.z + t.y * depth * 0.002);
      }
      if (i < loopSteps) {
        for (let j = 0; j < 4; j++) {
          const a = i * 4 + j;
          const b = i * 4 + ((j + 1) % 4);
          loopIndices.push(a, b, a + 4, b, b + 4, a + 4);
        }
      }
    }
    const loopGeometry = new THREE.BufferGeometry();
    loopGeometry.setAttribute("position", new THREE.Float32BufferAttribute(loopVertices, 3));
    loopGeometry.setIndex(loopIndices);
    loopGeometry.computeVertexNormals();
    addMesh(loopGeometry, brown, satchel).name = "yezi-strap-loop";
    // 折回的皮帶尾端貼在主背帶上。
    addRoundedBox(0.028, 0.044, 0.004, 0.002, brown, mount.x, 0.151, mount.z - 0.011, satchel);
  }
  const strapPath = new THREE.CatmullRomCurve3(
    [
      attachment(mounts[0], 0.011),
      new THREE.Vector3(0.075, 0.793, 0.283),
      new THREE.Vector3(-0.075, 0.85, 0.245),
      new THREE.Vector3(-0.185, 0.91, 0.185),
      new THREE.Vector3(-0.22, 0.97, 0.025),
      new THREE.Vector3(-0.218, 0.953, -0.102),
      new THREE.Vector3(-0.145, 0.898, -0.19),
      new THREE.Vector3(0, 0.84, -0.249),
      new THREE.Vector3(0.12, 0.78, -0.257),
      new THREE.Vector3(0.27, 0.713, -0.195),
      new THREE.Vector3(0.35, 0.677, -0.155),
      new THREE.Vector3(0.382, 0.652, -0.025),
      new THREE.Vector3(0.382, 0.671, 0.142),
      attachment(mounts[1], -0.011),
    ],
    false,
    "centripetal",
  );
  const strapVertices: number[] = [];
  const strapIndices: number[] = [];
  const segments = 96;
  for (let i = 0; i <= segments; i++) {
    const p = strapPath.getPointAt(i / segments);
    const tangent = strapPath.getTangentAt(i / segments);
    const outward = new THREE.Vector3(p.x * 0.4, 0, p.z).normalize();
    const across = new THREE.Vector3().crossVectors(tangent, outward).normalize();
    const endBlend = 1 - THREE.MathUtils.smoothstep(Math.min(i, segments - i), 0, 5);
    const ringAcross = new THREE.Vector3(1, 0, 0).transformDirection(satchel.matrix);
    // 背帶末端方向對齊小皮環，避免接合處扭轉。
    if (across.dot(ringAcross) < 0) {
      ringAcross.negate();
    }
    across.lerp(ringAcross, endBlend).normalize();
    const width = THREE.MathUtils.lerp(0.014 * 0.85, 0.02, 1 - endBlend);
    const normal = new THREE.Vector3().crossVectors(across, tangent).normalize();
    for (const [side, depth] of [
      [-1, 1],
      [1, 1],
      [1, -1],
      [-1, -1],
    ]) {
      const v = p
        .clone()
        .addScaledVector(across, side * width)
        .addScaledVector(normal, depth * 0.0025);
      strapVertices.push(...v);
    }
    if (i < segments) {
      for (let j = 0; j < 4; j++) {
        const a = i * 4 + j;
        const b = i * 4 + ((j + 1) % 4);
        const c = a + 4;
        const d = b + 4;
        strapIndices.push(a, b, c, b, d, c);
      }
    }
  }
  const strapGeometry = new THREE.BufferGeometry();
  strapGeometry.setAttribute("position", new THREE.Float32BufferAttribute(strapVertices, 3));
  strapGeometry.setIndex(strapIndices);
  strapGeometry.computeVertexNormals();
  addMesh(strapGeometry, brown).name = "yezi-shoulder-strap";
  // 保存背帶靜止頂點。包包晃動時，兩端完全跟隨包包，中間肩部保持固定。
  const strapRest = strapGeometry.attributes.position.array.slice();
  const strapWeights = new Float32Array(strapGeometry.attributes.position.count);
  for (let i = 0; i < strapWeights.length; i++) {
    const u = Math.floor(i / 4) / segments;
    strapWeights[i] = Math.max(
      1 - THREE.MathUtils.smoothstep(u, 0, 0.22),
      THREE.MathUtils.smoothstep(u, 0.7, 1),
    );
  }
  const bagRestPosition = satchel.position.clone();
  const bagRestRotation = satchel.rotation.clone();
  const bagRestInverse = satchel.matrix.clone().invert();
  const bagDelta = new THREE.Matrix4();
  const strapRestPoint = new THREE.Vector3();
  const strapMovedPoint = new THREE.Vector3();
  // 擺動支點：兩個皮帶小環的高度（包包座標 y = 0.15）。包包像吊在背帶上，上緣幾乎不動、包底甩得最多，
  // 包包上緣離外套很近，支點放在這裡也能避免擺動時上緣陷進衣服。
  const bagPivot = new THREE.Vector3(0, 0.15, 0);
  const bagPivotRest = bagPivot.clone().applyMatrix4(satchel.matrix);
  const bagPivotMoved = new THREE.Vector3();
  const bagLastPose: BagPose = { pitch: 0, roll: 0, lift: 0, push: 0 };
  /**
   * 把 animate() 算好的包包姿勢套到包包與背帶；這裡不含任何時間或彈簧狀態。
   * 姿勢和上一幀相同就直接跳過，減少動態或靜止時不必每幀重算背帶。
   */
  function animateBag(pose: BagPose): void {
    if (
      pose.pitch === bagLastPose.pitch &&
      pose.roll === bagLastPose.roll &&
      pose.lift === bagLastPose.lift &&
      pose.push === bagLastPose.push
    ) {
      return;
    }
    Object.assign(bagLastPose, pose);
    satchel.rotation.set(
      bagRestRotation.x + pose.pitch,
      bagRestRotation.y + pose.roll * 0.25,
      bagRestRotation.z + pose.roll,
    );
    if (pose.pitch === 0 && pose.roll === 0) {
      satchel.position.copy(bagRestPosition);
    } else {
      // 先在原點旋轉，再把位置推回去，讓支點停在原處。
      satchel.position.set(0, 0, 0);
      satchel.updateMatrix();
      bagPivotMoved.copy(bagPivot).applyMatrix4(satchel.matrix);
      satchel.position.copy(bagPivotRest).sub(bagPivotMoved);
    }
    satchel.position.y += pose.lift;
    satchel.position.z += pose.push;
    satchel.updateMatrix();
    bagDelta.multiplyMatrices(satchel.matrix, bagRestInverse);
    const position = strapGeometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
      strapRestPoint.fromArray(strapRest, i * 3);
      strapMovedPoint.copy(strapRestPoint).applyMatrix4(bagDelta);
      strapRestPoint.lerp(strapMovedPoint, strapWeights[i]);
      position.setXYZ(i, strapRestPoint.x, strapRestPoint.y, strapRestPoint.z);
    }
    position.needsUpdate = true;
    strapGeometry.computeVertexNormals();
    strapGeometry.computeBoundingSphere();
  }

  // 身體整體比例與紙張頭部。包包、衣服、手腳都跟著 body 一起擺動。
  const body = new THREE.Group();
  for (const child of [...root.children]) {
    body.add(child);
  }
  body.name = "yezi-body";
  body.scale.set(0.94, 0.86, 0.94);
  body.position.y = 0.00868;
  root.add(body);
  const head = new THREE.Group();
  head.name = "yezi-head";
  head.position.set(0, 1.355, 0.018);
  root.add(head);
  const halfWidth = 0.56;
  const halfHeight = 0.5;
  const radius = 0.205;
  const outline = createRoundedOutline(halfWidth * 2, halfHeight * 2, radius);
  const paperMaterials = ["#e9dfcf", "#f7edde", "#eee3d3"].map(
    (color) =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: 1,
        bumpMap: grain,
        bumpScale: 0.0012,
      }),
  );
  const sheetGeometry = new THREE.ExtrudeGeometry(outline, {
    depth: 0.019,
    bevelEnabled: true,
    bevelSize: 0.004,
    bevelThickness: 0.003,
    bevelSegments: 3,
    curveSegments: 24,
    steps: 1,
  });
  // 各張紙加上輕微弧度，側邊保留自然的紙層起伏。
  const sheetPositions = sheetGeometry.attributes.position;
  for (let i = 0; i < sheetPositions.count; i++) {
    const x = sheetPositions.getX(i);
    const y = sheetPositions.getY(i);
    sheetPositions.setZ(i, sheetPositions.getZ(i) + 0.011 * Math.cos(x * 4) * Math.cos(y * 3));
  }
  sheetGeometry.computeVertexNormals();
  for (let i = 0; i < 9; i++) {
    const sheet = addMesh(sheetGeometry, paperMaterials[i % 3], head);
    sheet.position.set(Math.sin(i * 1.4) * 0.001, Math.cos(i * 1.1) * 0.001, -0.125 + i * 0.027);
  }
  const faceSegments = 80;
  const faceRestPositions: number[] = [];
  const uvs: number[] = [];
  const faceIndices: number[] = [];
  for (let j = 0; j <= faceSegments; j++) {
    const y = -halfHeight + (2 * halfHeight * j) / faceSegments;
    const ay = Math.abs(y);
    const half =
      ay > halfHeight - radius
        ? halfWidth -
          radius +
          Math.sqrt(Math.max(0, radius * radius - (ay - halfHeight + radius) ** 2))
        : halfWidth;
    for (let i = 0; i <= faceSegments; i++) {
      const x = -half + (2 * half * i) / faceSegments;
      faceRestPositions.push(x, y, 0);
      uvs.push(x / (halfWidth * 2) + 0.5, y / (halfHeight * 2) + 0.5);
    }
  }
  for (let j = 0; j < faceSegments; j++) {
    for (let i = 0; i < faceSegments; i++) {
      const a = j * (faceSegments + 1) + i;
      const b = a + 1;
      const c = a + faceSegments + 1;
      const d = c + 1;
      faceIndices.push(a, b, d, a, d, c);
    }
  }
  const faceGeometry = new THREE.BufferGeometry();
  faceGeometry.setAttribute("position", new THREE.Float32BufferAttribute(faceRestPositions, 3));
  faceGeometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  faceGeometry.setIndex(faceIndices);
  const faceMaterial = new THREE.MeshStandardMaterial({
    map: faceTexture,
    roughness: 0.98,
    bumpMap: grain,
    bumpScale: 0.0016,
    side: THREE.DoubleSide,
  });
  const face = addMesh(faceGeometry, faceMaterial, head);
  face.position.z = 0.126;
  const perimeter: number[] = [];
  for (let i = 0; i <= faceSegments; i++) {
    perimeter.push(i);
  }
  for (let j = 1; j <= faceSegments; j++) {
    perimeter.push(j * (faceSegments + 1) + faceSegments);
  }
  for (let i = faceSegments - 1; i >= 0; i--) {
    perimeter.push(faceSegments * (faceSegments + 1) + i);
  }
  for (let j = faceSegments - 1; j > 0; j--) {
    perimeter.push(j * (faceSegments + 1));
  }
  const paperEdgeGeometry = new THREE.BufferGeometry();
  const edgeIndices: number[] = [];
  paperEdgeGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(new Float32Array((perimeter.length + 1) * 6), 3),
  );
  for (let i = 0; i < perimeter.length; i++) {
    const a = i * 2;
    edgeIndices.push(a, a + 1, a + 3, a, a + 3, a + 2);
  }
  paperEdgeGeometry.setIndex(edgeIndices);
  const edge = addMesh(paperEdgeGeometry, paperMaterials[1], head);
  edge.position.z = face.position.z;
  const eyes: THREE.Group[] = [];
  for (const x of [-0.214, 0.214]) {
    const eyeGroup = new THREE.Group();
    eyeGroup.position.set(x, -0.09, 0.135);
    head.add(eyeGroup);
    eyes.push(eyeGroup);
    addEllipsoid(0, 0, 0, 0.071, 0.105, 0.013, ink, eyeGroup);
    // 眼睛使用小面積反光，保留深色眼睛的比例。
    addEllipsoid(-0.016, 0.034, 0.012, 0.01, 0.014, 0.002, cream, eyeGroup);
  }
  const smilePoints: Point3[] = [
    [-0.067, -0.228, 0.138],
    [-0.036, -0.253, 0.14],
    [0, -0.26, 0.14],
    [0.036, -0.253, 0.14],
    [0.067, -0.228, 0.138],
  ];
  const mouth = addCurve(smilePoints, 0.009, ink, head);
  // 404 的嘴角下垂用 morph target 漸變：以 y = -0.245 為鏡射線把笑臉翻成垮臉。
  // 兩條管線段數相同、頂點一一對應，過渡中間是一條保有厚度的平線，不會瞬間翻面。
  const frownGeometry = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(smilePoints.map((p) => new THREE.Vector3(p[0], -0.49 - p[1], p[2]))),
    40,
    0.009,
    6,
    false,
  );
  mouth.geometry.morphAttributes.position = [frownGeometry.getAttribute("position")];
  mouth.geometry.morphAttributes.normal = [frownGeometry.getAttribute("normal")];
  mouth.updateMorphTargets();
  function setFrown(amount: number): void {
    if (mouth.morphTargetInfluences) {
      mouth.morphTargetInfluences[0] = amount;
    }
  }
  addCurve(
    [
      [-0.289, 0.115, 0.137],
      [-0.266, 0.132, 0.139],
      [-0.238, 0.134, 0.14],
      [-0.218, 0.122, 0.139],
    ],
    0.009,
    ink,
    head,
  );
  addCurve(
    [
      [0.186, 0.128, 0.139],
      [0.21, 0.142, 0.14],
      [0.246, 0.159, 0.14],
    ],
    0.009,
    ink,
    head,
  );
  // 捲角半徑依圓角紙張的實際邊界計算，避免用方形外框算出不完整的折角。
  const curlDirectionScale = 1 / Math.sqrt(2);
  const curlCrease = 0.6;
  const curlDistanceMax =
    (halfWidth + halfHeight - radius * (2 - Math.SQRT2) - curlCrease) * curlDirectionScale;
  // angle 是紙角從折線到尖端的總彎曲角（弧度）：越大捲得越緊、越貼近臉，越小越攤開、翹離臉面。
  // 靜止 2.8 是往前捲成小筒；走跑時被風吹開（數值變小），停下回彈時會短暫捲得比靜止更緊。
  const CURL_REST = 2.8;
  // 低於約 1.1 紙角會直直朝前像一面旗；高於約 3.4 尖端開始往臉面捲回。兩端都只是保險，正常動畫碰不到。
  const CURL_MIN = 1.15;
  const CURL_MAX = 3.35;
  const PAPER_THICKNESS = 0.005; // 紙邊厚度：沿紙張背面法線往後長出的距離
  let lastCurlAngle: number | undefined;
  function updatePaperCurl(angle: number): void {
    angle = THREE.MathUtils.clamp(angle, CURL_MIN, CURL_MAX);
    if (lastCurlAngle !== undefined && Math.abs(lastCurlAngle - angle) < 0.00001) {
      return;
    }
    lastCurlAngle = angle;
    // 捲曲部分視為半徑 r 的圓筒；弧長固定，所以紙張不會被拉長或撕開，只是彎得鬆或緊。
    const r = curlDistanceMax / angle;
    const pos = faceGeometry.attributes.position;
    for (let i = 0; i < faceRestPositions.length / 3; i++) {
      const x = faceRestPositions[i * 3];
      const y = faceRestPositions[i * 3 + 1];
      const s = (x + y - curlCrease) * curlDirectionScale;
      if (s <= 0) {
        pos.setXYZ(i, x, y, 0);
        continue;
      }
      const theta = s / r;
      const delta = r * Math.sin(theta) - s;
      pos.setXYZ(
        i,
        x + curlDirectionScale * delta,
        y + curlDirectionScale * delta,
        r * (1 - Math.cos(theta)),
      );
    }
    // 紙邊厚度沿「彎曲後」的背面法線長出：平面處就是 -z，捲起處跟著轉。
    // 若一律往 -z，紙角攤開到接近垂直時紙邊會變成貼著紙面的一條線，看起來像紙忽然變薄。
    const e = paperEdgeGeometry.attributes.position;
    for (let i = 0; i <= perimeter.length; i++) {
      const v = perimeter[i % perimeter.length];
      const x = pos.getX(v);
      const y = pos.getY(v);
      const z = pos.getZ(v);
      const s =
        (faceRestPositions[v * 3] + faceRestPositions[v * 3 + 1] - curlCrease) * curlDirectionScale;
      const theta = s > 0 ? s / r : 0;
      const backDiagonal = Math.sin(theta) * PAPER_THICKNESS * curlDirectionScale;
      e.setXYZ(i * 2, x, y, z);
      e.setXYZ(
        i * 2 + 1,
        x + backDiagonal,
        y + backDiagonal,
        z - Math.cos(theta) * PAPER_THICKNESS,
      );
    }
    e.needsUpdate = true;
    paperEdgeGeometry.computeVertexNormals();
    pos.needsUpdate = true;
    faceGeometry.computeVertexNormals();
  }
  updatePaperCurl(CURL_REST);
  root.scale.setScalar(0.86);

  // 轉軸位在鞋口內的腿部，兩側都有厚度包住接點，彎腿時才不會露出斷縫。
  const knees = legs.map((leg, index) => {
    leg.name = index === 0 ? "yezi-left-leg" : "yezi-right-leg";
    const knee = new THREE.Group();
    knee.name = index === 0 ? "yezi-left-knee" : "yezi-right-knee";
    knee.position.y = -0.115;
    leg.add(knee);
    knee.add(boots[index]);
    boots[index].position.y = -knee.position.y;
    return knee;
  });
  // 髖部轉軸放在腿上方、腹部裡；原本腿的 group 原點只是建模位置。
  // 保留靜止位置，彎腿時上端留在腹部內，鞋口則跟著腿移到身體前方。
  const hip = new THREE.Vector3(0, 0.31828, 0.094);
  const torso = new THREE.Group();
  const pelvis = new THREE.Group();
  torso.name = "yezi-torso";
  torso.position.copy(hip);
  pelvis.position.copy(body.position);
  pelvis.scale.copy(body.scale);
  legs.forEach((leg) => pelvis.add(leg));
  const hipSockets = legs.map((leg, index) => {
    const socket = new THREE.Group();
    socket.name = index === 0 ? "yezi-left-hip" : "yezi-right-hip";
    socket.position.copy(leg.position);
    socket.position.y = 0.495;
    socket.position.z = 0.04;
    pelvis.add(socket);
    socket.add(leg);
    leg.position.sub(socket.position);
    return socket;
  });
  torso.add(body, head);
  body.position.sub(hip);
  head.position.sub(hip);
  root.add(torso, pelvis);
  // 骨盆靜止位置；落地蹲時骨盆和軀幹一起往後挪，抵銷大腿前擺帶走的鞋子，腳才會釘在原地。
  const pelvisRest = pelvis.position.clone();
  const neckPivot = new THREE.Group();
  neckPivot.position.y = 0.896;
  body.add(neckPivot);
  neckPivot.add(neck);
  neck.position.y -= 0.896;
  const chin = new THREE.Vector3(0, 0.855, 0.145).sub(hip);
  const headOffset = head.position.clone().sub(chin);
  // 頭部靜止位置（torso 座標）。旋轉順序 YXZ：先側傾、再點頭，最後才以身體的垂直軸轉頭，
  // 這樣轉頭時點頭軸會跟著臉一起轉。
  const headRest = head.position.clone();
  head.rotation.order = "YXZ";
  const nodAxis = new THREE.Vector3(1, 0, 0);
  const lowerLegRotation = new THREE.Quaternion();
  const groundPoint = new THREE.Vector3();
  const footRotation = new THREE.Euler();

  // ===== 動畫狀態 =====
  // animate() 不再每幀直接用 sin(時間) 算姿勢；所有切換都記在下面的彈簧與累積相位裡，
  // 依實際經過的時間平滑前進，停下、起步、走跑切換、揮手和坐下都不會瞬間跳動。
  const MAX_STEP = 1 / 20; // 單幀最多推進 0.05 秒；卡頓後慢慢追上，不會一次跳很遠
  const WALK_FREQUENCY = 9; // 走路步伐角頻率（弧度/秒）；一個循環 2π 含左右各一步
  const RUN_FREQUENCY = 13; // 跑步步伐角頻率（弧度/秒）
  // 小島跑速 7.5 ÷ 走速 4.7（world.ts）。把 move、run 兩個權重換算成「相對走路的速度」，
  // 包包才知道現在加速或減速有多猛；改了小島速度時這裡跟著調。
  const RUN_SPEED_RATIO = 7.5 / 4.7;
  // 紙角被前進的風吹開的幅度（從 CURL_REST 往下減的弧度）。
  const CURL_WALK_OPEN = 0.6;
  const CURL_RUN_OPEN = 1.1;
  // 包包往身體方向（pitch 正值）最多擺 0.07 弧度：包包貼在肚子前，再多包底就會陷進衣服；
  // 往前甩離身體比較安全，上限放寬到 0.32 弧度。
  const BAG_PITCH_BACK = 0.07;
  const BAG_PITCH_FORWARD = 0.32;
  const BAG_PUSH = 0.3; // 包包每往下 1 單位，就往前離開身體幾單位
  // 小島跳躍（world.ts）：起跳速度 6.8、重力 18（世界單位）→ 約 0.38 秒到頂、頂點離地約 1.28、滯空約 0.76 秒。
  // 垂直速度除以起跳速度得到 -1～1 的「上升/下降」比例，所以這裡只需要起跳速度一個數字。
  const JUMP_TAKEOFF_SPEED = 6.8;
  const AIRBORNE_HEIGHT = 0.001; // 鞋底離地超過這個高度（世界單位）才算在空中
  // 落地衝擊：把「落地蹲」彈簧往下踢的速度。15 rad/s、阻尼 0.42 時，正常落地約 0.08 秒蹲到最低（≈ 1），
  // 約 0.3 秒反彈成微微拉長（≈ -0.23），半秒多收住。
  const LAND_KICK = 25;
  // 包包上下（body 座標）：起跳時落後往下、空中失重往上浮、落地時重重一沉再彈回。
  const BAG_FLOAT = 0.035; // 空中失重時包包浮起的高度
  const BAG_TAKEOFF_KICK = 1.1; // 起跳瞬間包包相對身體往下的速度（每秒）
  const BAG_LAND_KICK = 1.5; // 落地瞬間包包往下沉的速度（每秒）
  const BAG_DROP_LIMIT = 0.09; // 往下沉的柔性上限：再低包底會碰到大腿
  const BAG_RISE_LIMIT = 0.05; // 往上浮的柔性上限：再高背帶小環會擠到胸口
  let lastTime: number | undefined;
  const moveBlend: Spring = { value: 0, velocity: 0 }; // 0 靜止～1 移動
  const runBlend: Spring = { value: 0, velocity: 0 }; // 0 走路～1 跑步
  const waveBlend: Spring = { value: 0, velocity: 0 }; // 0 手放下～1 舉手揮動
  const windBlend: Spring = { value: 0, velocity: 0 }; // 0 無風～1 紙角被風吹
  const seatBlend: Spring = { value: 0, velocity: 0 }; // 0 站～1 坐（布林值輸入時才會緩動）
  const headYaw: Spring = { value: 0, velocity: 0 }; // 目前頭部偏航角（弧度）
  const curlOpen: Spring = { value: 0, velocity: 0 }; // 紙角被風吹開多少（弧度），欠阻尼：停下會回彈
  const bagPitch: Spring = { value: 0, velocity: 0 }; // 包包前後擺（弧度），欠阻尼：起步落後、停下前甩
  const airBlend: Spring = { value: 0, velocity: 0 }; // 0 地面～1 空中姿勢
  const landSquash: Spring = { value: 0, velocity: 0 }; // 落地蹲：正值壓扁＋彎膝，負值是反彈時微微拉長
  const bagBounce: Spring = { value: 0, velocity: 0 }; // 跳躍時包包上下（body 座標），欠阻尼
  let headYawTarget = 0;
  // setAirborne() 的最新輸入（世界單位）；從未呼叫就維持 0，也就是一直站在地上。
  let airHeight = 0;
  let airVelocity = 0;
  let wasAirborne = false;
  let lastAirVelocity = 0; // 上一幀還在空中時的垂直速度，用來估落地衝擊（落地那幀小島已把速度歸零）
  // 最後一次在空中的垂直比例（+1 剛起跳、0 頂點、-1 快落地）。落地後保留，空中姿勢從「準備著地」淡出。
  let airVertical = 0;
  // 累積相位（弧度）。頻率改變時只改變前進速度，相位本身連續，所以姿勢不會跳。
  let gaitPhase = 0;
  let wavePhase = 0;
  let curlPhase = 0;
  let breathPhase = 0;

  /** 更新一個 0～1 的權重；snap 時直接套用目標（第一幀、時間跳躍或減少動態）。 */
  function follow(spring: Spring, target: number, smoothTime: number, snap: boolean, dt: number) {
    if (snap) {
      snapSpring(spring, target);
    } else {
      springTo(spring, target, smoothTime, dt);
    }
  }

  /** 所有關節回到建模時的中立姿勢；不碰 animate() 的平滑狀態。 */
  function resetJoints(): void {
    torso.position.copy(hip);
    torso.rotation.set(0, 0, 0);
    torso.scale.set(1, 1, 1);
    body.rotation.set(0, 0, 0);
    pelvis.position.copy(pelvisRest);
    pelvis.rotation.set(0, 0, 0);
    hipSockets.forEach((socket) => socket.rotation.set(0, 0, 0));
    legs.forEach((leg) => leg.rotation.set(0, 0, 0));
    knees.forEach((knee) => knee.rotation.set(0, 0, 0));
    leftArm.rotation.set(0, 0, 0);
    rightArm.rotation.set(0, 0, 0);
    wrists.forEach((wrist) => wrist.rotation.set(0, 0, 0));
    neckPivot.rotation.set(0, 0, 0);
    head.position.copy(headRest);
    head.rotation.set(0, 0, 0);
    head.scale.set(1, 1, 1);
    setFrown(0);
  }

  function setHeadTurn(yawRadians: number): void {
    // 約 ±0.9 弧度（±52°）是脖子自然可轉的範圍，再大會像貓頭鷹。
    headYawTarget = Number.isFinite(yawRadians) ? THREE.MathUtils.clamp(yawRadians, -0.9, 0.9) : 0;
  }

  function setAirborne(height: number, verticalVelocity: number): void {
    // 非有限值一律當成站在地上，避免 NaN 傳進彈簧後整個角色消失。
    airHeight = Number.isFinite(height) ? Math.max(0, height) : 0;
    airVelocity = Number.isFinite(verticalVelocity) ? verticalVelocity : 0;
  }

  // 統一動畫入口：維持舊呼叫方式，新功能使用最後兩個選用參數。
  function animate(
    timeSeconds: number,
    moving: boolean,
    wave: boolean,
    wind: boolean,
    reducedMotion: boolean,
    seated: boolean | number = false,
    running = false,
  ): void {
    const { clamp, lerp, smoothstep } = THREE.MathUtils;
    const elapsed = lastTime === undefined ? Number.NaN : timeSeconds - lastTime;
    lastTime = timeSeconds;
    // 第一次呼叫、時間倒退、或中斷超過 1 秒（傳送、切回分頁）時直接套用目標，不補播過渡。
    const snap = reducedMotion || !(elapsed >= 0 && elapsed <= 1);
    const dt = snap ? 0 : Math.min(elapsed, MAX_STEP);
    // 減少動態時只保留靜態姿勢：所有週期性擺動都乘上 0。
    const motion = reducedMotion ? 0 : 1;

    // ---- 1. 平滑權重 ----
    // 起步比停下快一點：起步要跟得上按鍵，停下時讓手腳在約 0.4 秒內收回。
    follow(moveBlend, moving ? 1 : 0, moving ? 0.14 : 0.2, snap, dt);
    follow(runBlend, running ? 1 : 0, 0.3, snap, dt);
    // 舉手快、放下慢：舉起時接近 ease-out，放下時從靜止慢慢起步（ease-in）。
    follow(waveBlend, wave ? 1 : 0, wave ? 0.13 : 0.26, snap, dt);
    follow(windBlend, wind ? 1 : 0, 0.4, snap, dt);
    const seatTarget = typeof seated === "number" ? clamp(seated, 0, 1) : seated ? 1 : 0;
    if (typeof seated === "number") {
      // 小島傳入的是已平滑的比例，必須同步採用，長椅定位才會對齊。
      snapSpring(seatBlend, seatTarget);
    } else {
      follow(seatBlend, seatTarget, 0.3, snap, dt);
    }
    const move = clamp(moveBlend.value, 0, 1);
    const run = clamp(runBlend.value, 0, 1);
    const waveUp = clamp(waveBlend.value, 0, 1);
    const wind01 = clamp(windBlend.value, 0, 1);
    // 坐下比例再套一次 smoothstep：起身與坐定的瞬間速度為 0，不會有硬起步。
    const seat = smoothstep(seatBlend.value, 0, 1);

    // ---- 1b. 跳躍：由 setAirborne() 的高度與速度判斷起跳、空中與落地 ----
    // 減少動態時完全不做跳躍的附帶動作（小島仍會照常移動 root 高度）。
    const airborne = motion > 0 && (airHeight > AIRBORNE_HEIGHT || airVelocity > 0);
    if (airborne) {
      airVertical = clamp(airVelocity / JUMP_TAKEOFF_SPEED, -1, 1);
    }
    // takeoff、impact 是這一幀的瞬間力道（約 0～1，正常跳躍 ≈ 1）；只在狀態切換的那一幀非 0。
    // 第一幀或時間跳躍（snap）不補做衝擊，直接接到目標姿勢。
    let takeoff = 0;
    let impact = 0;
    if (!snap && airborne && !wasAirborne) {
      takeoff = clamp(airVelocity / JUMP_TAKEOFF_SPEED, 0, 1.2);
    }
    if (!snap && !airborne && wasAirborne) {
      // 落地那幀小島已把速度歸零，所以用上一幀的下降速度；就算這幀 dt 很大也只觸發一次。
      impact = clamp(-Math.min(airVelocity, lastAirVelocity) / JUMP_TAKEOFF_SPEED, 0, 1.3);
    }
    wasAirborne = airborne;
    lastAirVelocity = airborne ? airVelocity : 0;
    // 起跳很快切進空中姿勢；落地稍慢一點淡出，交給落地蹲接手。
    follow(airBlend, airborne ? 1 : 0, airborne ? 0.04 : 0.05, snap, dt);
    const air = clamp(airBlend.value, 0, 1) * (1 - seat);
    // 把垂直比例拆成三段權重：rising 起跳後最大、peak 在頂點最大、falling 快落地時最大。
    const rising = Math.max(0, airVertical);
    const falling = Math.max(0, -airVertical);
    const peak = 1 - airVertical * airVertical;
    if (snap) {
      snapSpring(landSquash, 0);
    } else {
      landSquash.velocity += LAND_KICK * impact;
      wobbleTo(landSquash, 0, 15, 0.42, dt);
    }
    const landing = landSquash.value * motion * (1 - seat);
    // 蹲下只取正的那一邊（反彈時腿不往後折）；0.34 弧度約是大腿前擺 20°。
    const crouch = 0.34 * smoothPositive(landing, 0.1);
    // 大腿前擺會把鞋子往前帶（腿長 0.115 × 骨盆前後比例 0.94），身體反向往後挪同樣距離，腳就不會在地上滑。
    const crouchShift = 0.115 * 0.94 * Math.sin(crouch);
    // 收腿：頂點縮最多；剛起跳腿還在蹬直、快落地時腿往下伸準備著地。
    const tuck = air * (0.1 * rising + 0.85 * peak + 0.25 * falling);
    // 沿速度方向拉長：起跳最明顯，下墜時少一點；落地蹲把身體壓扁，xz 反向補一點維持體積感。
    const stretch = air * (rising * rising + 0.35 * falling * falling);
    const squashY = 1 + 0.07 * stretch - 0.1 * landing;
    const squashXZ = 1 - 0.035 * stretch + 0.05 * landing;

    // 步伐擺動權重：移動中、沒坐著、沒有減少動態時才擺；騰空時腳沒踩地，步伐淡出改用空中姿勢。
    const gait = move * (1 - seat) * motion * (1 - air);

    // ---- 2. 累積相位 ----
    const frequency = lerp(WALK_FREQUENCY, RUN_FREQUENCY, run);
    if (moving || move > 0.002) {
      gaitPhase += dt * frequency;
    } else {
      // 完全停下後歸零，下次起步從雙腳併攏（sin 0）開始，不會半空中跳進步伐。
      gaitPhase = 0;
    }
    breathPhase += dt * 1.75; // 約 3.6 秒一次呼吸
    const breath = Math.sin(breathPhase) * motion * (1 - 0.7 * move);

    // ---- 3. 腿 ----
    const sinGait = Math.sin(gaitPhase);
    const cosGait = Math.cos(gaitPhase);
    const legSwing = lerp(0.42, 0.56, run) * gait;
    const stride = sinGait * legSwing;
    // 空中收腿左右不對稱（左腳縮多一點），比兩腳同步更像真的跳起來；落地蹲則兩腳一致。
    // 大腿前擺（負值）與膝蓋後彎（正值）相等時鞋底保持水平；空中膝蓋彎多一點，腳尖自然朝下。
    legs[0].rotation.set(lerp(stride - 0.62 * tuck - crouch, -1.12, seat), 0, seat * 0.045);
    legs[1].rotation.set(lerp(-stride - 0.42 * tuck - crouch, -1.12, seat), 0, -seat * 0.045);
    hipSockets.forEach((socket) => socket.rotation.set(0, 0, 0));
    // 往前送的那隻腳彎膝抬起，支撐腳伸直；平方讓彎曲起訖的速度連續、沒有尖角。
    // 左腳（index 0）在 cos < 0 時往前送，右腳相反。
    const kneeBend = lerp(0.3, 0.6, run) * gait;
    knees[0].rotation.set(kneeBend * Math.max(0, -cosGait) ** 2 + 0.95 * tuck + crouch, 0, 0);
    knees[1].rotation.set(kneeBend * Math.max(0, cosGait) ** 2 + 0.75 * tuck + crouch, 0, 0);

    // ---- 4. 軀幹：上下起伏、前傾、左右重心、上身反向扭轉 ----
    // 走路在雙腳交會時最高（每循環兩次）；跑步反過來，著地時壓低、騰空時最高。
    const bob =
      lerp(0.011 * Math.cos(2 * gaitPhase), -0.018 * Math.cos(2 * gaitPhase - 0.4), run) * gait;
    const lean = move * (1 - seat) * lerp(0.045, 0.13, run);
    // 重心落在支撐腳那側（正值往 -x 倒），比步伐稍晚一點。
    const roll = Math.cos(gaitPhase - 0.35) * lerp(0.032, 0.024, run) * gait;
    // 肩膀與同側腳反向轉動；骨盆朝另一邊轉，形成自然的扭腰。
    const twist = Math.sin(gaitPhase - 0.15) * lerp(0.05, 0.085, run) * gait;
    // 跳躍前後傾：剛起跳挺胸（往後），下墜時微微前傾，落地蹲時再往前壓保持平衡。
    const jumpLean = air * (-0.05 * rising + 0.04 * falling) + 0.12 * landing;
    torso.position.set(
      hip.x,
      hip.y + bob + breath * 0.004 * (1 - seat) - 0.012 * landing,
      hip.z - crouchShift,
    );
    torso.rotation.set(lean - breath * 0.008 + jumpLean, twist, roll + 0.02 * waveUp);
    // 軀幹以髖部為中心伸縮（torso 原點就在髖部），腿在 pelvis 裡不受影響，所以鞋底貼地高度不會被縮放帶走。
    torso.scale.set(squashXZ, squashY, squashXZ);
    body.rotation.set(0.035 * seat, 0, 0);
    pelvis.position.set(pelvisRest.x, pelvisRest.y, pelvisRest.z - crouchShift);
    pelvis.rotation.set(0.035 * seat, -twist * 0.7, roll * 0.35);

    // ---- 5. 手臂：與同側腳反向擺動，相位比腿慢一點；手腕再慢半拍形成甩動 ----
    const armPhase = gaitPhase - 0.35;
    const armSwing = lerp(0.34, 0.52, run) * gait;
    const runCarry = 0.28 * run * gait; // 跑步時手臂略往前收
    const armOut = 0.07 * run * gait; // 跑步時手臂略往外張
    const breathOpen = breath * 0.018; // 吸氣時肩膀微微打開
    const leftSwing = -Math.sin(armPhase) * armSwing;
    const leftSwingLate = -Math.sin(armPhase - 0.7) * armSwing;
    // 空中平衡：起跳時手往前上方帶，頂點到下墜時改成往兩側張開；落地蹲那一下手再往外甩一點穩住身體。
    // 張開量只往外加（smoothPositive），反彈時手臂不會往內收進外套。
    const jumpArmLift = air * (0.5 * rising + 0.3 * peak + 0.1 * falling) + 0.12 * landing;
    const jumpArmSpread =
      air * (0.3 * rising + 0.65 * peak + 0.85 * falling) + 0.3 * smoothPositive(landing, 0.1);
    const rightX = lerp(-leftSwing - runCarry - jumpArmLift, -0.32, seat);
    const rightZ = armOut + breathOpen + jumpArmSpread;
    leftArm.rotation.set(
      lerp(leftSwing - runCarry - jumpArmLift, -0.32, seat),
      0,
      -armOut - breathOpen - jumpArmSpread,
    );
    wrists[0].rotation.set((leftSwingLate - leftSwing) * 0.55, 0, 0);
    // 揮手：手臂先舉到側上方，舉穩後（waveUp² 才放大擺幅）再左右揮，手腕晚半拍跟著甩。
    if (waveUp > 0.001) {
      wavePhase += dt * 9;
    } else {
      wavePhase = 0;
    }
    const waveEnvelope = waveUp * waveUp * motion;
    const waveSwing = Math.sin(wavePhase) * waveEnvelope;
    rightArm.rotation.set(
      lerp(rightX, -0.3, waveUp),
      0,
      lerp(rightZ, 1.25 + 0.13 * waveSwing, waveUp),
    );
    wrists[1].rotation.set(
      lerp((leftSwing - leftSwingLate) * 0.55, 0, waveUp),
      0,
      0.3 * Math.sin(wavePhase - 0.6) * waveEnvelope,
    );

    // ---- 6. 頭：比身體晚半拍的點頭與側傾、待機輕晃、轉頭 ----
    // 走得越快越不轉頭：走路保留 60%，跑步完全淡出。減少動態時固定看正前方。
    const fast = move * lerp(0.4, 1, run);
    follow(headYaw, reducedMotion ? 0 : headYawTarget * (1 - fast), 0.3, snap, dt);
    const headPitch =
      0.035 * seat +
      Math.cos(2 * gaitPhase - 1.1) * lerp(0.022, 0.035, run) * gait -
      Math.sin(breathPhase - 0.6) * 0.01 * motion * (1 - 0.7 * move) +
      // 頭比身體重、晚半拍：往上衝時下巴微低，落地時順勢點一下頭。
      0.04 * air * rising +
      0.06 * landing;
    const idleTilt = Math.sin(breathPhase * 0.47 + 1.3) * 0.012 * motion * (1 - move);
    // 頭部反向抵銷約六成軀幹側傾，且比軀幹晚 0.5 弧度，看起來像頭有重量。
    const headRoll =
      -Math.cos(gaitPhase - 0.85) * lerp(0.032, 0.024, run) * gait * 0.6 +
      idleTilt -
      0.045 * waveUp;
    head.position.copy(headRest);
    head.rotation.set(headPitch, headYaw.value - twist * 0.6, headRoll);
    // 紙張頭是硬的一疊紙：抵銷軀幹伸縮，頭只跟著往下沉或往上提，不會被壓扁拉長。
    head.scale.set(1 / squashXZ, 1 / squashY, 1 / squashXZ);
    neckPivot.rotation.set(0, headYaw.value * 0.4, 0);
    setFrown(0);

    // ---- 7. 眨眼、包包、紙角 ----
    const blinkPhase = timeSeconds % 4.6;
    const blink = reducedMotion ? 1 : 1 - 0.93 * Math.exp(-(((blinkPhase - 4.25) / 0.075) ** 2));
    eyes.forEach((eye) => (eye.scale.y = blink));
    // 包包：慣性前後擺（彈簧）＋每步彈跳與左右晃（跟步伐相位）。背帶兩端在 animateBag() 跟著包包轉換。
    // 相對速度的變化率：直接用兩個平滑權重的彈簧速度求導，不必拿前後幀相減，所以不會有雜訊。
    const speedScale = lerp(1, RUN_SPEED_RATIO, run);
    const acceleration =
      (moveBlend.velocity * speedScale + move * (RUN_SPEED_RATIO - 1) * runBlend.velocity) *
      (1 - seat) *
      motion;
    // 加速時包包落後（包底往身體擺），減速時往前甩；身體前傾時包包仍想垂直，所以反向抵銷一半前傾。
    // 空中失重：包包不再被重量拉著貼肚子，包底微微往外飄（負值）；頂點和下墜時最明顯。
    const pitchTarget = 0.05 * acceleration - 0.5 * lean * motion - 0.07 * air * (peak + falling);
    if (snap) {
      snapSpring(bagPitch, pitchTarget);
    } else {
      // 起跳與落地都把包底往外踢一下；落地之後彈回來往身體擺時，由下面的 BAG_PITCH_BACK 柔性上限擋住。
      bagPitch.velocity -= 0.9 * takeoff + 1.3 * impact;
      wobbleTo(bagPitch, pitchTarget, 10, 0.3, dt); // 約 1.6 次/秒，晃兩三下停
    }
    // 包包上下：彈簧的目標在空中是浮起 BAG_FLOAT（失重），起跳時往下踢（慣性落後）、落地時再往下踢（重重一沉）。
    const bounceTarget = BAG_FLOAT * air;
    if (snap) {
      snapSpring(bagBounce, bounceTarget);
    } else {
      bagBounce.velocity -= BAG_TAKEOFF_KICK * takeoff + BAG_LAND_KICK * impact;
      wobbleTo(bagBounce, bounceTarget, 13, 0.32, dt); // 約 2 次/秒，彈一下就收
    }
    const bounce =
      bagBounce.value > 0
        ? softLimit(bagBounce.value, BAG_RISE_LIMIT)
        : softLimit(bagBounce.value, BAG_DROP_LIMIT);
    // 每次腳著地包底輕輕往前一踢（每循環兩次），比彈跳晚一點。
    const stepKick = Math.cos(2 * gaitPhase - 1.6) * lerp(0.028, 0.05, run) * gait;
    const pitchRaw = bagPitch.value + stepKick;
    // 上下彈跳：每循環兩次，跟身體起伏同向但晚 0.7 弧度，看起來像包包被甩起再落下。
    // 走路的身體在雙腳交會時最高；跑步反過來（著地壓低），所以兩種波形分開寫再內插。
    const liftRange = lerp(0.015, 0.03, run) * gait;
    const lift =
      lerp(0.015 * Math.cos(2 * gaitPhase - 0.7), -0.03 * Math.cos(2 * gaitPhase - 1.1), run) *
      gait;
    const bagPose: BagPose = {
      pitch:
        pitchRaw > 0 ? softLimit(pitchRaw, BAG_PITCH_BACK) : softLimit(pitchRaw, BAG_PITCH_FORWARD),
      // 左右晃：與軀幹側傾反向（包包想保持垂直），晚 0.7 弧度跟上；跑步時髖部晃得多，包包也晃得多。
      roll: -Math.cos(gaitPhase - 1.05) * lerp(0.03, 0.08, run) * gait,
      lift: lift + bounce,
      // 外套越往下擺越寬：包包落到低點時順勢往前離開一點，彈跳時背面才不會擦進衣服。
      // 用 (liftRange - lift) 而不是 max(0, -lift)，推開量從 0 平滑變化、沒有折角。
      // 跳躍的上下另外算：只有往下沉才推開，浮起時外套變窄，不需要往前。
      push: BAG_PUSH * (liftRange - lift) + BAG_PUSH * smoothPositive(-bounce, 0.02),
    };
    animateBag(bagPose);
    // 紙角：靜止微動、風吹翻動，加上走跑時被風吹開（彈簧）與跟著步伐拍動。
    // 目標直接看 moving（不是已平滑的 move），彈簧自己做出起步掀起、停下回彈的過程。
    const airTarget =
      (moving ? 1 : 0) * (1 - seat) * motion * lerp(CURL_WALK_OPEN, CURL_RUN_OPEN, run);
    // 跳躍：頂點附近與下墜時，下方湧上來的空氣把紙角掀開（正值）；跑步時紙角本來就被吹開，只再多加四成。
    const jumpOpen = air * (0.35 * peak + 0.7 * falling) * (1 - 0.6 * move);
    if (snap) {
      snapSpring(curlOpen, airTarget + jumpOpen);
    } else {
      // 起跳：往上衝的氣流把紙角壓回臉上（往捲緊方向踢）；落地：紙角繼續往下甩，同樣往捲緊方向踢，之後回彈晃幾下。
      curlOpen.velocity -= 3.2 * takeoff + 4 * impact;
      wobbleTo(curlOpen, airTarget + jumpOpen, 15, 0.38, dt); // 約 2.4 次/秒，停下後約半秒內收住
    }
    // 拍動跟著步伐相位：走路每步拍一下；跑步再疊一個非整數倍頻率，拍起來不規則但連續、不抖。
    const flutterWalk = 0.12 * Math.sin(2 * gaitPhase - 0.6);
    const flutterRun =
      0.14 * Math.sin(2 * gaitPhase - 0.6) + 0.08 * Math.sin(2.7 * gaitPhase + 1.9);
    const flutter = lerp(flutterWalk, flutterRun, run) * gait;
    // 靜止與風吹時的微動仍用自己的相位；移動時淡出，交給上面的步伐拍動。
    const curlFrequency = lerp(2, 8, wind01);
    curlPhase += dt * curlFrequency;
    const ambient = lerp(0.025, 0.32, wind01) * (1 - move) * Math.sin(curlPhase) * motion;
    updatePaperCurl(CURL_REST - curlOpen.value + flutter + ambient);
    // root 高度只是預設值；小島與預覽會再依鞋底或座位重新貼齊。
    root.position.y = 0.44;
  }
  const footPoint = new THREE.Vector3();
  function getFootOffset(): number {
    let minimum = Infinity;
    // 只掃描兩隻靴子的頂點，重用向量以免每幀產生大量物件。
    // 直接量鞋底，不用旋轉後變大的包圍盒，避免走路時看起來浮空。
    for (const boot of boots) {
      boot.updateWorldMatrix(true, false);
      const position = boot.geometry.attributes.position;
      const matrix = boot.matrixWorld;
      for (let i = 0; i < position.count; i++) {
        footPoint.fromBufferAttribute(position, i).applyMatrix4(matrix);
        if (footPoint.y < minimum) {
          minimum = footPoint.y;
        }
      }
    }
    return minimum - root.position.y;
  }
  const seatPoint = new THREE.Vector3();
  function getSeatOffset(): number {
    body.updateWorldMatrix(true, false);
    // 臀部下緣的接觸點固定在 body 座標；伸腿時不會跟著鞋子移動。
    // 轉成世界座標後扣掉 root 高度，保留縮放和姿勢造成的偏移。
    seatPoint.set(0, 0.275, -0.035).applyMatrix4(body.matrixWorld);
    return seatPoint.y - root.position.y;
  }

  /**
   * 404 定格姿勢；只轉動固定尺寸的關節，不在動畫中拉伸或修改幾何。
   * 不會改動 animate() 的平滑狀態，之後切回一般動畫時仍從原本的權重接續。
   */
  function setDisappointedPose(support: number, seated: number, sway = 0, sigh = 0): void {
    const { clamp, smoothstep } = THREE.MathUtils;
    support = clamp(support, 0, 1);
    seated = clamp(seated, 0, 1);
    resetJoints();
    animateBag({ pitch: 0, roll: 0, lift: 0, push: 0 });
    updatePaperCurl(CURL_REST);
    eyes.forEach((eye) => (eye.scale.y = 1));
    torso.rotation.x = -0.08 * seated;
    const nod = 0.6 * seated;
    neckPivot.rotation.x = nod * 0.5;
    head.rotation.set(nod, 0, 0);
    head.position.copy(headOffset).applyAxisAngle(nodAxis, nod).add(chin);
    // 扶頭軌跡（以左手為準，右手 y、z 取相反號）。各軸用不同節奏，避免直線內插讓手掌穿過肚子：
    // x 前舉照比例走；z 外展在前段就張開，中段再額外外張 0.5 弧度繞過肚子；
    // y 內旋與手腕上翻放在後段，最後才把掌心收到頭下緣。曲線在 support = 1 時斜率為 0，靠上頭時不會撞停。
    const raise = support;
    const turn = support * support;
    const spread = 1 - (1 - support) ** 3;
    const flare = 0.5 * Math.sin(Math.PI * (1 - (1 - support) ** 1.5));
    leftArm.rotation.set(-1.3511 * raise, 0.4724 * turn, -(0.3218 * spread + flare));
    rightArm.rotation.set(-1.3511 * raise, -0.4724 * turn, 0.3218 * spread + flare);
    // 低頭時手腕小幅跟隨下緣，讓掌緣持續扶住頭，而不穿進紙面。
    const wristFlex = (-1.2482 + 0.048 * seated + 0.018 * seated * seated) * support ** 3;
    wrists[0].rotation.set(wristFlex, 0, 0);
    wrists[1].rotation.set(wristFlex, 0, 0);
    for (let index = 0; index < 2; index++) {
      const side = index === 0 ? -1 : 1;
      legs[index].rotation.set(0, 0, 0);
      hipSockets[index].rotation.set(-1.525 * seated, 0, side * 0.3 * seated);
      lowerLegRotation.setFromEuler(footRotation.set(0, side * 0.15 * seated, 0));
      knees[index].quaternion
        .copy(hipSockets[index].quaternion)
        .invert()
        .multiply(lowerLegRotation);
    }
    // 嘴角跟著抬手漸漸垮下，不再在動作開始時瞬間翻面。
    setFrown(smoothstep(support, 0.1, 0.65));
    root.position.y = 0;
    belly.updateWorldMatrix(true, false);
    const bellyPositions = belly.geometry.getAttribute("position");
    let bellyBottom = Infinity;
    for (let i = 0; i < bellyPositions.count; i++) {
      groundPoint.fromBufferAttribute(bellyPositions, i).applyMatrix4(belly.matrixWorld);
      bellyBottom = Math.min(bellyBottom, groundPoint.y);
    }
    root.position.y = -Math.min(getFootOffset(), bellyBottom);
    // 搖晃與嘆氣在貼地之後才加上：以髖部為軸轉動整個上半身（手和頭一起動，掌心不會離開頭），
    // 也不會因為肚子下緣微動而讓整個角色上下跳。
    torso.rotation.z = sway;
    torso.rotation.x += -0.05 * sigh;
    torso.position.y += 0.012 * sigh;
  }
  return {
    root,
    animate,
    setDisappointedPose,
    getFootOffset,
    getSeatOffset,
    setHeadTurn,
    setAirborne,
  };
}
