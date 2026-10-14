import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { createYezi } from "./character";
import { createPaperKit } from "./papercraft";
import { destinations, type DestinationId, type InteractionId } from "../../data/island";
import { ironman } from "../../data/ironman";
import { friends } from "../../data/friends";
type Point2 = [number, number];
type Point3 = [number, number, number];
type PaperMesh = THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;
interface CameraDrag {
  id: number;
  x: number;
  y: number;
  startX: number;
  startY: number;
}
export interface IslandWorld {
  start(): void;
  travel(id: DestinationId): void;
  jump(): void;
  interact(): void;
  toggleSeat(): boolean;
  joystick(x: number, y: number): void;
  suspend(value: boolean): void;
  wave(): void;
  wind(): void;
  /** 切換白天／夜晚；instant 為 true 時直接跳到結果（初始化或減少動態偏好時）。 */
  setNight(night: boolean, instant?: boolean): void;
  reset(): void;
  dispose(): void;
}
// 世界座標以角色行走尺度設定，場景道具使用三倍比例。
const SPAWN = [0, 12.4];
const GROUND = 1.32;
export function createWorld(
  stage: HTMLElement,
  onAction: (id: InteractionId) => void,
  onReady: () => void,
  onFailure: () => void,
): IslandWorld {
  const events = new AbortController(),
    { signal } = events;
  let disposed = false,
    playing = false,
    suspended = false;
  let time = 0,
    windUntil = 0,
    waveUntil = 0,
    // 按下出發的時間；用來讓鏡頭從開場視角緩動飛到頁仔背後。
    startedAt = -Infinity;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  // 開場鏡頭：距離、仰角與左右擺動中心（弧度）。
  const INTRO = { distance: 17, elevation: 0.46, angle: 0.35, sway: 0.5 };
  const FLY_SECONDS = 1.6;
  // 站著不動超過這個秒數，頁仔會轉頭看鏡頭。
  const IDLE_LOOK_SECONDS = 2.5;
  let idleSince = 0,
    lookSide = 1,
    // 出發揮手後要轉回的方向；從小地圖傳送時改成面向該地標。
    restHeading = Math.PI;
  const cameraLocal = new THREE.Vector3();
  let nearest: DestinationId | null = null;
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.domElement.setAttribute("aria-hidden", "true");
  stage.prepend(renderer.domElement);
  const scene = new THREE.Scene();
  const sky = document.createElement("canvas");
  sky.width = 2;
  sky.height = 256;
  const skyContext = sky.getContext("2d");
  if (!skyContext) throw new Error("無法建立天空背景的 Canvas 2D context。");
  // 白天與夜晚兩組環境色；nightMix 為 0 是白天、1 是夜晚，切換時在兩者之間插值。
  const DAY = {
    skyTop: new THREE.Color("#6fbfd6"),
    skyMiddle: new THREE.Color("#cbe6e6"),
    skyBottom: new THREE.Color("#fcf1d6"),
    fog: new THREE.Color("#e2e9e0"),
    hemisphereSky: new THREE.Color("#fff8ec"),
    hemisphereGround: new THREE.Color("#b8ad90"),
    hemisphereIntensity: 1.55,
    sun: new THREE.Color("#fff0d4"),
    sunIntensity: 3.3,
    exposure: 1.1,
    water: new THREE.Color("#5db4c4"),
  };
  const NIGHT = {
    // 藍調時刻：天色是亮一點的深藍，島上的東西都看得清楚，燈光仍是重點。
    skyTop: new THREE.Color("#1c3260"),
    skyMiddle: new THREE.Color("#3d5b8e"),
    skyBottom: new THREE.Color("#7486ad"),
    fog: new THREE.Color("#3b4f74"),
    hemisphereSky: new THREE.Color("#a9bce6"),
    hemisphereGround: new THREE.Color("#454b62"),
    hemisphereIntensity: 1.15,
    // 月光：偏藍、比陽光弱，保留陰影方向讓紙張仍有立體感。
    sun: new THREE.Color("#b8cbff"),
    sunIntensity: 1.7,
    exposure: 1.05,
    water: new THREE.Color("#2d5a7c"),
  };
  const mixedColor = new THREE.Color();
  const paintSky = (mix: number) => {
    const gradient = skyContext.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(
      0,
      `#${mixedColor.lerpColors(DAY.skyTop, NIGHT.skyTop, mix).getHexString()}`,
    );
    gradient.addColorStop(
      0.62,
      `#${mixedColor.lerpColors(DAY.skyMiddle, NIGHT.skyMiddle, mix).getHexString()}`,
    );
    gradient.addColorStop(
      1,
      `#${mixedColor.lerpColors(DAY.skyBottom, NIGHT.skyBottom, mix).getHexString()}`,
    );
    skyContext.fillStyle = gradient;
    skyContext.fillRect(0, 0, 2, 256);
  };
  paintSky(0);
  const skyTexture = new THREE.CanvasTexture(sky);
  skyTexture.colorSpace = THREE.SRGBColorSpace;
  scene.background = skyTexture;
  scene.fog = new THREE.Fog("#e2e9e0", 55, 150);
  const camera = new THREE.PerspectiveCamera(52, 1, 0.15, 180);
  const hemisphere = new THREE.HemisphereLight(0xfff8ec, 0xb8ad90, 1.55);
  scene.add(hemisphere);
  const sun = new THREE.DirectionalLight(0xfff0d4, 3.3);
  sun.position.set(-16, 32, 16);
  sun.castShadow = true;
  Object.assign(sun.shadow.camera, {
    left: -30,
    right: 30,
    top: 25,
    bottom: -25,
    near: 1,
    far: 80,
  });
  const shadowSize = matchMedia("(max-width: 600px), (pointer: coarse)").matches ? 2048 : 4096;
  sun.shadow.mapSize.set(shadowSize, shadowSize);
  sun.shadow.normalBias = 0.035;
  sun.shadow.bias = -0.00006;
  scene.add(sun);
  function material(color: string) {
    return paper.material(color);
  }
  const palette = {
    teal: "#3a6b62",
    paper: "#fff6e0",
    sage: "#a9bc8a",
    coral: "#d97e57",
    cream: "#f2dfae",
    dark: "#2e4a3c",
    wood: "#c99c61",
  };
  const world = new THREE.Group();
  world.scale.setScalar(3);
  scene.add(world);
  const paper = createPaperKit(world);
  // 島面最上層紙的頂面在 y ≈ 0.43（-0.405 + 13 × 0.059 + 厚度 0.053 + 倒角 0.015）。
  // 0.49 是建築墊高平台的高度；直接放在島面上的道具用 0.425，略微埋入避免看起來浮空。
  const ISLAND_SURFACE = 0.425;
  // 廣場頂面在 0.435（圓盤中心 0.42 + 半厚 0.015），散落的紙張（厚 0.012）中心放在 0.442。
  const SHEET_REST_Y = 0.442;
  // 建築墊高平台頂面在 0.48（中心 0.45 + 半高 0.03），建築底板貼齊平台。
  const BUILDING_BASE = 0.482;
  const walkSurfaces: THREE.Object3D[] = [];
  function addMesh(geometry: THREE.BufferGeometry, color: string, parent: THREE.Object3D = world) {
    const m = new THREE.Mesh(geometry, material(palette[color as keyof typeof palette] || color));
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  }
  function addBox(
    width: number,
    height: number,
    depth: number,
    x: number,
    y: number,
    z: number,
    color: string,
    radius = 0.04,
    parent: THREE.Object3D = world,
  ) {
    const geometry = new RoundedBoxGeometry(
      width,
      height,
      depth,
      1,
      Math.min(radius, 0.012, width / 4, height / 4, depth / 4),
    );
    const box = addMesh(geometry, color, parent);
    box.position.set(x, y, z);
    return box;
  }
  function addSphere(
    radius: number,
    x: number,
    y: number,
    z: number,
    color: string,
    parent: THREE.Object3D = world,
  ) {
    const sphere = addMesh(new THREE.IcosahedronGeometry(radius, 1), color, parent);
    sphere.position.set(x, y, z);
    return sphere;
  }
  function addCylinder(
    topRadius: number,
    bottomRadius: number,
    height: number,
    x: number,
    y: number,
    z: number,
    color: string,
    parent: THREE.Object3D = world,
  ) {
    const cylinder = addMesh(
      new THREE.CylinderGeometry(topRadius, bottomRadius, height, 12),
      color,
      parent,
    );
    cylinder.position.set(x, y, z);
    return cylinder;
  }
  // 夜晚窗戶透出的暖光：貼在玻璃前、窗框後的半透明平面，白天完全透明。
  const windowGlows: Array<{ material: THREE.MeshBasicMaterial; strength: number }> = [];
  function addWindowGlow(
    width: number,
    height: number,
    position: Point3,
    parent: THREE.Object3D,
    strength = 0.9,
  ) {
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: "#ffcf7a",
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(width, height), glowMaterial);
    glow.position.set(...position);
    parent.add(glow);
    windowGlows.push({ material: glowMaterial, strength });
  }
  // 星星與紙月亮只在夜晚出現；不受霧影響，放在鏡頭可見範圍（far 180）以內。
  const starPositions = new Float32Array(420 * 3);
  for (let i = 0; i < 420; i++) {
    const azimuth = Math.random() * Math.PI * 2;
    const elevation = 0.12 + Math.random() * 1.3;
    starPositions.set(
      [
        Math.cos(azimuth) * Math.cos(elevation) * 160,
        Math.sin(elevation) * 160,
        Math.sin(azimuth) * Math.cos(elevation) * 160,
      ],
      i * 3,
    );
  }
  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
  const starMaterial = new THREE.PointsMaterial({
    color: "#fff6dd",
    size: 2,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    fog: false,
  });
  const stars = new THREE.Points(starGeometry, starMaterial);
  stars.visible = false;
  scene.add(stars);
  const moonCanvas = document.createElement("canvas");
  moonCanvas.width = moonCanvas.height = 128;
  const moonContext = moonCanvas.getContext("2d");
  if (!moonContext) throw new Error("無法建立月亮的 Canvas 2D context。");
  // 彎月：先畫滿月，再用偏移的圓挖掉一塊。
  moonContext.fillStyle = "#fff3cf";
  moonContext.beginPath();
  moonContext.arc(64, 64, 46, 0, Math.PI * 2);
  moonContext.fill();
  moonContext.globalCompositeOperation = "destination-out";
  moonContext.beginPath();
  moonContext.arc(86, 50, 40, 0, Math.PI * 2);
  moonContext.fill();
  const moonTexture = new THREE.CanvasTexture(moonCanvas);
  moonTexture.colorSpace = THREE.SRGBColorSpace;
  const moonMaterial = new THREE.SpriteMaterial({
    map: moonTexture,
    transparent: true,
    opacity: 0,
    fog: false,
    depthWrite: false,
  });
  const moon = new THREE.Sprite(moonMaterial);
  // 預設視角往下看約 18°，畫面上緣只到水平線上方約 8°；月亮放在北方略偏左、
  // 仰角約 5° 的位置，平常就看得到，也避開左上角的 Logo 卡片。
  moon.scale.set(18, 18, 1);
  moon.position.set(-24, 20, -135);
  moon.visible = false;
  scene.add(moon);
  // 紙層形成島的地形；鏡頭在地面上行走，四周是海與遠方的紙山。
  const outline: Point2[] = [
    [-8.7, -3.8],
    [-7.4, -5.4],
    [-3.2, -5.8],
    [1.1, -5.5],
    [5.8, -5.9],
    [8.3, -3.9],
    [8.7, 0.5],
    [8, 4.7],
    [4.3, 5.6],
    [-0.5, 5.3],
    [-5.8, 5.6],
    [-8.6, 3.1],
  ];
  for (let layer = 0; layer < 14; layer++) {
    const shape = new THREE.Shape();
    outline.forEach(([x, z], i) => (i ? shape.lineTo(x, -z) : shape.moveTo(x, -z)));
    shape.closePath();
    const ground = addMesh(
      new THREE.ExtrudeGeometry(shape, {
        depth: 0.053,
        bevelEnabled: true,
        bevelSegments: 1,
        steps: 1,
        bevelSize: 0.055,
        bevelThickness: 0.015,
      }),
      layer === 13 ? "#ddd9b2" : layer % 2 ? "#eadfbc" : "#f8eed0",
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.405 + layer * 0.059;
    ground.scale.set(1 + (13 - layer) * 0.004, 1 + (13 - layer) * 0.004, 1);
    if (layer === 13) walkSurfaces.push(ground);
  }
  const water = new THREE.Mesh(
    new THREE.PlaneGeometry(350, 350),
    new THREE.MeshStandardMaterial({
      color: "#5db4c4",
      roughness: 0.5,
      metalness: 0.06,
    }),
  );
  water.rotation.x = -Math.PI / 2;
  water.position.y = -1.1;
  scene.add(water);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2,
      r = 65 + (i % 3) * 11;
    const mountain = new THREE.Mesh(
      new THREE.ConeGeometry(8 + (i % 3) * 3, 11 + (i % 4) * 4, 5),
      material(i % 2 ? "#a7c3be" : "#c4d2bf"),
    );
    mountain.position.set(Math.sin(a) * r, 2, Math.cos(a) * r);
    mountain.rotation.y = i;
    scene.add(mountain);
  }
  // 開闊中央廣場與延伸到三座建築的紙路。
  walkSurfaces.push(addCylinder(1.25, 1.28, 0.03, -0.3, 0.42, 2.2, "#f6e8c4"));
  const paths = [
    [-0.3, 2.2, -4.15, 1.3],
    [-0.3, 2.2, 1.3, -1.6],
    [-0.3, 2.2, 4.9, 2.1],
  ];
  for (const [x1, z1, x2, z2] of paths) {
    const length = Math.hypot(x2 - x1, z2 - z1);
    const road = addBox(0.95, 0.02, length, (x1 + x2) / 2, 0.427, (z1 + z2) / 2, "#f3e4bd", 0.1);
    road.rotation.y = Math.atan2(x2 - x1, z2 - z1);
    walkSurfaces.push(road);
  }
  const clearings = [
    [-4.1, -0.8, 3.3, 2.7],
    [1.3, -2.9, 2.8, 2.5],
    [5, 1.3, 2.4, 2.0],
  ];
  for (const [x, z, w, d] of clearings)
    walkSurfaces.push(addBox(w, 0.06, d, x, 0.45, z, "#e6e0bd", 0.27));
  const stones = [
    [-5.6, 2.5],
    [-4.9, 2.2],
    [-4.1, 1.85],
    [-3.2, 1.75],
    [-2.3, 1.55],
    [-1.4, 1.35],
    [-0.6, 1.05],
    [0.2, 0.55],
    [0.65, -0.1],
    [0.9, -0.8],
    [1.25, -1.45],
    [0.7, 1.15],
    [1.5, 1.45],
    [2.3, 1.7],
    [3.1, 1.95],
    [4, 2.15],
    [0.25, 2],
    [0.45, 2.7],
  ];
  stones.forEach(([x, z], i) => {
    // 踏腳石用暖灰色，在米色紙地面上才分得出路徑。
    const stone = addBox(0.55, 0.035, 0.38, x, 0.44, z, "#c9c2b2", 0.12);
    stone.rotation.y = Math.sin(i * 3) * 0.4;
    walkSurfaces.push(stone);
  });
  const roof = paper.roof,
    windowPane = paper.windowPane;
  // Side Project 工坊：開放的工作檯。
  const workshop = new THREE.Group();
  workshop.position.set(-4.25, BUILDING_BASE, -1.1);
  world.add(workshop);
  paper.wallShell(2.7, 1.65, 1.9, "cream", workshop);
  const workshopPlinth = paper.card(2.78, 1.96, 0.025, 0, 0.018, 0, "wood", workshop);
  workshopPlinth.rotation.x = -Math.PI / 2;
  roof(3.2, 2.4, 0, 1.65, 0, "teal", workshop);
  paper.card(1.1, 1.18, 0.014, 0.4, 0.62, 1, "dark", workshop);
  windowPane(-0.85, 0.9, 1, 0.53, 0.57, workshop);
  addWindowGlow(1.04, 1.12, [0.4, 0.62, 1.009], workshop, 0.75);
  addWindowGlow(0.53, 0.57, [-0.85, 0.9, 1.0155], workshop);
  const tabletop = paper.card(2, 0.65, 0.025, 0, 0.75, 1.45, "wood", workshop);
  tabletop.rotation.x = -Math.PI / 2;
  for (const x of [-0.78, 0.78]) {
    const leg = paper.fold(
      0.14,
      [
        [0.02, 1.75],
        [0.02, 1.64],
        [0.735, 1.57],
        [0.735, 1.27],
        [0.02, 1.18],
      ],
      0.025,
      "teal",
      workshop,
    );
    leg.position.x = x;
  }
  paper.monitor(-0.28, 0.7625, 1.4, workshop);
  let stackTop = 0.7625;
  for (let i = 0; i < 3; i++) {
    const thickness = 0.014 + i * 0.003,
      total = thickness + 0.004;
    const book = paper.notebook(
      0.37 - i * 0.014,
      0.29 - i * 0.01,
      thickness,
      ["paper", "coral", "sage"][i],
      workshop,
    );
    book.rotation.set(-Math.PI / 2, 0, (i - 1) * 0.035);
    book.position.set(0.57 + (i % 2) * 0.012, stackTop + total / 2, 1.45);
    stackTop += total;
  }
  // 薄筆記本分組立放，封面只略高於紙頁，避免像中空收納盒。
  const library = new THREE.Group();
  library.position.set(1.3, BUILDING_BASE, -3.0);
  world.add(library);
  paper.wallShell(2.1, 1.75, 1.45, "paper", library);
  roof(2.6, 1.95, 0, 1.8, 0, "coral", library);
  paper.card(1.65, 1.4, 0.015, 0, 0.78, 0.745, "wood", library);
  for (let r = 0; r < 3; r++) {
    paper.fold(
      1.76,
      [
        [0.29 + r * 0.47, 1.015],
        [0.32 + r * 0.47, 1.015],
        [0.32 + r * 0.47, 0.665],
      ],
      0.014,
      "cream",
      library,
    );
    const colors = ["teal", "sage", "coral", "paper", "wood"];
    const books = Array.from({ length: 22 }, (_, b) => ({
      thickness: 0.027 + ((b * 3 + r) % 5) * 0.005,
      height: 0.29 + ((b + r * 2) % 4) * 0.024,
      depth: 0.2 + ((b + r) % 3) * 0.012,
      gap: b === 6 || b === 14 ? 0.065 : 0.012,
    }));
    let edgeX = -books.reduce((sum, book) => sum + book.thickness + 0.006 + book.gap, 0) / 2;
    for (const [b, { thickness, height, depth, gap }] of books.entries()) {
      const color = colors[(b + r) % 5],
        angle = b === 0 || b === 7 || b === 15 ? -0.035 : 0;
      const width = thickness + 0.006;
      const centerY =
        0.327 + r * 0.47 + (height / 2) * Math.cos(angle) + (width / 2) * Math.abs(Math.sin(angle));
      const book = paper.group(edgeX + width / 2, centerY, 0.865, library);
      book.rotation.z = angle;
      addBox(thickness, height - 0.006, depth - 0.006, 0, 0, 0, "paper", 0.001, book);
      for (const side of [-1, 1]) {
        const cover = paper.card(
          depth,
          height,
          0.003,
          side * (thickness / 2 + 0.0015),
          0,
          0,
          color,
          book,
        );
        cover.rotation.y = Math.PI / 2;
      }
      paper.card(width, height, 0.003, 0, 0, depth / 2, color, book);
      paper.line(
        [
          [-thickness * 0.3, -height / 2 + 0.035, depth / 2 + 0.002],
          [thickness * 0.3, -height / 2 + 0.035, depth / 2 + 0.002],
        ],
        "#e9dfc7",
        book,
      );
      edgeX += width + gap;
    }
  }
  // 關於我的小屋：圓窗、門前植物與小信箱。
  const home = new THREE.Group();
  home.position.set(5, BUILDING_BASE, 0.9);
  home.rotation.y = -0.13;
  world.add(home);
  paper.wallShell(1.65, 1.35, 1.55, "#dedfc4", home);
  roof(2, 1.98, 0, 1.35, 0, "teal", home);
  paper.card(0.5, 0.95, 0.016, 0.22, 0.48, 0.795, "wood", home);
  paper.line(
    [
      [-0.025, 0.035, 0.807],
      [-0.025, 0.925, 0.807],
    ],
    "#8d795b",
    home,
    true,
  );
  const handle = paper.fold(
    0.07,
    [
      [0.48, 0.81],
      [0.49, 0.845],
      [0.55, 0.845],
      [0.56, 0.81],
    ],
    0.01,
    "paper",
    home,
  );
  handle.position.x = 0.35;
  windowPane(-0.48, 0.84, 0.8, 0.38, 0.42, home);
  addWindowGlow(0.38, 0.42, [-0.48, 0.84, 0.8155], home);
  const chimney = paper.group(0.52, 1.6, -0.37, home);
  paper.wallShell(0.26, 0.6, 0.26, "cream", chimney);
  const smoke: THREE.Object3D[] = [];
  for (let i = 0; i < 3; i++) {
    const r = 0.13 + i * 0.055,
      points = Array.from({ length: 40 }, (_, j): Point2 => {
        const a = (j / 40) * Math.PI * 2,
          s = r * (1 + 0.1 * Math.cos(a * 5));
        return [Math.cos(a) * s, Math.sin(a) * s];
      });
    const puff = paper.panel(points, 0.012, "paper");
    puff.position.set(5.55, 3.02 + i * 0.34, 0.52);
    puff.rotation.y = -0.12;
    smoke.push(puff);
  }
  // 摺紙樹、盆栽、花叢：保留寬敞行走空間。
  (
    [
      [-7, -3.4, 1.1],
      [-6.5, -4.1, 0.8],
      [-2.5, -3.75, 0.7],
      [3.25, -4.0, 0.75],
      [6.4, -2.7, 1.15],
      [7.0, -1.5, 0.7],
      // 往西北挪開，讓出頒獎台三角旗柱的位置。
      [-7.6, 2.3, 0.65],
      [6.3, 3.5, 0.65],
    ] satisfies Point3[]
  ).forEach((v) => paper.tree(...v));
  (
    [
      [-2.55, 0.05],
      [3.8, 1.55],
      [6, 1.65],
      [2.6, -2.5],
      [-5.8, -1],
    ] satisfies Point2[]
  ).forEach((p) => paper.pot(...p));
  for (let i = 0; i < 19; i++) {
    const x = -7.15 + ((i * 3.37) % 14.3),
      z = (i % 2 ? 1 : -1) * (3.5 + (i % 3) * 0.35);
    paper.card(0.017, 0.19, 0.009, x, ISLAND_SURFACE + 0.095, z, "sage");
    const flower = paper.panel(
      [
        [-0.065, 0],
        [-0.045, 0.05],
        [0, 0.02],
        [0.045, 0.05],
        [0.065, 0],
        [0, -0.04],
      ],
      0.008,
      i % 3 ? "cream" : "coral",
    );
    flower.position.set(x, ISLAND_SURFACE + 0.215, z);
    flower.rotation.y = i;
  }
  // 長椅直接放在島面上（不在建築平台上），坐下錨點要跟著同樣的高度。
  paper.bench(3.5, ISLAND_SURFACE, 3.9);
  // 可點的紙風車。
  addCylinder(0.032, 0.04, 1.75, -5.7, 1.3, 2.75, "wood");
  const windmill = new THREE.Group();
  windmill.position.set(-5.7, 2.16, 2.79);
  world.add(windmill);
  for (let i = 0; i < 4; i++) {
    const blade = new THREE.Group();
    blade.rotation.z = (i * Math.PI) / 2;
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0.52, 0.12);
    shape.lineTo(0.42, 0.58);
    shape.closePath();
    const m = addMesh(new THREE.ShapeGeometry(shape), i % 2 ? "cream" : "coral", blade);
    m.material = new THREE.MeshStandardMaterial({
      color: i % 2 ? "#f1dda6" : "#d68365",
      side: THREE.DoubleSide,
      roughness: 1,
    });
    windmill.add(blade);
  }
  addSphere(0.065, -5.7, 2.16, 2.85, "teal");
  // 聯絡信箱。
  const mailbox = paper.mailbox(2, ISLAND_SURFACE, 3.05);
  mailbox.scale.setScalar(0.68);
  const sheets: PaperMesh[] = [];
  for (let i = 0; i < 4; i++) {
    const m = addBox(
      0.35,
      0.012,
      0.45,
      -1.3 + i * 0.31,
      SHEET_REST_Y,
      2.75 + Math.sin(i) * 0.25,
      "paper",
      0.02,
    );
    m.rotation.y = i * 0.8;
    sheets.push(m);
  }
  // 把文字畫在 canvas 上當貼圖；紙卡本身沒有文字功能。
  function textMaterial(text: string, color: string, font: string, width = 512, height = 128) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("無法建立文字貼圖的 Canvas 2D context。");
    // 字太長時縮小字級，留左右各 6% 的邊距。
    let size = height * 0.62;
    context.font = `${size}px ${font}`;
    const maxWidth = width * 0.88;
    const measured = context.measureText(text).width;
    if (measured > maxWidth) size *= maxWidth / measured;
    context.font = `${size}px ${font}`;
    context.fillStyle = color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, width / 2, height / 2 + size * 0.04);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return new THREE.MeshStandardMaterial({ map: texture, transparent: true, roughness: 1 });
  }
  function addText(
    text: string,
    width: number,
    height: number,
    position: Point3,
    color: string,
    font: string,
    parent: THREE.Object3D,
  ) {
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      textMaterial(text, color, font, 512, Math.round((512 * height) / width)),
    );
    plane.position.set(...position);
    parent.add(plane);
    return plane;
  }
  // 鐵人賽頒獎台：兩層紙盒，高的一層是最新的一屆，上面放紙獎盃；後方掛三角旗。
  // 放在工坊西側（原本遊戲機的位置）；本地 +Z 是台面正面，轉 90° 讓正面朝東、面向小路。
  const podium = paper.group(-6.4, ISLAND_SURFACE, 0.85);
  podium.rotation.y = Math.PI / 2;
  const tiers = ironman.slice(0, 2).map((series, index) => ({
    year: String(series.year),
    x: index === 0 ? -0.37 : 0.37,
    height: index === 0 ? 0.62 : 0.4,
    color: index === 0 ? "coral" : "cream",
  }));
  for (const tier of tiers) {
    const box = paper.group(tier.x, 0, 0, podium);
    paper.wallShell(0.72, tier.height, 0.6, tier.color, box);
    const top = paper.card(0.75, 0.63, 0.024, 0, tier.height, 0, tier.color, box);
    top.rotation.x = -Math.PI / 2;
    addText(
      tier.year,
      0.5,
      0.17,
      [0, tier.height * 0.55, 0.316],
      tier.color === "coral" ? "#fff5dc" : "#30453c",
      'Georgia, "Times New Roman", serif',
      box,
    );
  }
  const trophy = paper.group(tiers[0]?.x ?? 0, (tiers[0]?.height ?? 0.6) + 0.012, 0, podium);
  const gold = material("#e9b949");
  // [半徑, 高度]：底座、杯腳、杯身，轉一圈成為獎盃。
  const cupProfile = [
    [0, 0],
    [0.12, 0],
    [0.12, 0.035],
    [0.04, 0.06],
    [0.03, 0.17],
    [0.06, 0.19],
    [0.15, 0.28],
    [0.16, 0.4],
    [0.145, 0.4],
    [0, 0.31],
  ].map(([r, y]) => new THREE.Vector2(r, y));
  const cup = new THREE.Mesh(new THREE.LatheGeometry(cupProfile, 10), gold);
  cup.castShadow = true;
  trophy.add(cup);
  for (const sign of [-1, 1]) {
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.014, 5, 10, Math.PI), gold);
    handle.position.set(sign * 0.16, 0.32, 0);
    handle.rotation.z = (sign * -Math.PI) / 2;
    trophy.add(handle);
  }
  // 三角旗串：兩根紙柱之間垂一條弧線，旗子跟著風擺動。
  const buntingPoles = [-0.95, 0.95];
  for (const x of buntingPoles) paper.card(0.05, 1.4, 0.03, x, 0.7, -0.45, "wood", podium);
  const sag = (x: number) => 1.36 - 0.13 * (1 - (x / 0.95) ** 2);
  paper.line(
    Array.from({ length: 13 }, (_, i): Point3 => {
      const x = -0.95 + (i / 12) * 1.9;
      return [x, sag(x), -0.45];
    }),
    "#7b725c",
    podium,
  );
  const pennants: THREE.Object3D[] = [];
  for (let i = 0; i < 7; i++) {
    const x = -0.72 + i * 0.24;
    const pennant = paper.group(x, sag(x), -0.45, podium);
    paper.panel(
      [
        [-0.065, 0],
        [0.065, 0],
        [0, -0.16],
      ],
      0.006,
      ["coral", "cream", "sage", "teal"][i % 4] ?? "coral",
      pennant,
    );
    pennants.push(pennant);
  }
  // 朋友的路標：木柱上疊著指向島外不同方向的箭頭板，每片寫一位朋友。
  const signpost = paper.group(7.3, ISLAND_SURFACE, 1.2);
  const BOARD_BASE = 0.5,
    BOARD_GAP = 0.19;
  // 木柱高度跟著朋友數量伸縮，最上面的箭頭板上方固定留一截柱頭。
  const poleHeight = BOARD_BASE + Math.max(friends.length - 1, 0) * BOARD_GAP + 0.31;
  addBox(0.08, poleHeight, 0.08, 0, poleHeight / 2, 0, "wood", 0.01, signpost);
  const boards: THREE.Object3D[] = [];
  friends.forEach((friend, index) => {
    // 角度以東方（+X）為中心向南北展開；0 弧度指向正東。
    const yawAngle = (index % 2 ? 1 : -1) * (0.25 + Math.floor(index / 2) * 0.32);
    const board = paper.group(0, BOARD_BASE + index * BOARD_GAP, 0, signpost);
    board.rotation.y = yawAngle;
    const length = 0.9,
      half = 0.07;
    paper.panel(
      [
        [0.05, -half],
        [length - 0.11, -half],
        [length, 0],
        [length - 0.11, half],
        [0.05, half],
      ],
      0.022,
      ["cream", "coral", "sage", "paper", "wood"][index % 5] ?? "cream",
      board,
    );
    // 正反兩面都貼名字，從哪一側看都讀得到。
    for (const side of [1, -1]) {
      const label = addText(
        friend.name,
        length - 0.22,
        0.1,
        [0.44, 0, side * 0.013],
        "#30453c",
        '"Noto Sans TC", sans-serif',
        board,
      );
      if (side < 0) label.rotation.y = Math.PI;
    }
    boards.push(board);
  });
  // 道路上的燈柱、紙旗與可以穿過的入口，提供角色尺度感。
  // 燈籠紙用一個只差一點點的專用色，才會拿到獨立材質，夜晚時只讓燈籠發光。
  const LANTERN_PAPER = "#fff3d8";
  const lanternPaper = material(LANTERN_PAPER);
  lanternPaper.emissive.set("#ffb24a");
  lanternPaper.emissiveIntensity = 0;
  const lanternLights: THREE.PointLight[] = [];
  for (const [index, [x, z]] of [
    [-2.3, 1.25],
    [2.6, 0.85],
    [-0.1, -1.2],
    [5.8, 3.3],
    [-4.6, 3.4],
  ].entries()) {
    paper.card(0.065, 1.1, 0.017, x, 0.98, z, "teal");
    const postSide = paper.card(0.06, 1.1, 0.017, x + 0.03, 0.98, z - 0.025, "teal");
    postSide.rotation.y = Math.PI / 2;
    const lantern = paper.group(x, 1.515, z);
    paper.wallShell(0.2, 0.27, 0.2, LANTERN_PAPER, lantern);
    const lid = paper.card(0.3, 0.3, 0.014, 0, 0.282, 0, "teal", lantern);
    lid.rotation.x = -Math.PI / 2;
    // 只有廣場附近三盞放真的光源，其餘靠發光材質，避免手機上光源太多。
    if (index < 3) {
      const glow = new THREE.PointLight("#ffbe6a", 0, 10, 2);
      glow.position.set(0, 0.14, 0);
      lantern.add(glow);
      lanternLights.push(glow);
    }
  }
  const yezi = createYezi();
  scene.add(yezi.root);
  yezi.root.scale.setScalar(1.16);
  yezi.root.position.set(SPAWN[0], GROUND, SPAWN[1]);
  yezi.root.rotation.y = Math.PI;
  // 原本 2.52 是對應長椅在 0.48；長椅降到島面後一起降 0.165（本地 0.055 × 3）。
  const seatAnchor = new THREE.Vector3(10.5, 2.355, 12.02),
    seatOrigin = new THREE.Vector3();
  let sitting = false,
    seatMix = 0,
    seatHeading = 0;
  const blockers = [
    { x: -12.75, z: -3.3, w: 4.8, d: 3.8 },
    { x: 3.9, z: -9, w: 3.65, d: 2.9 },
    { x: 15, z: 2.7, w: 3, d: 2.75 },
    { x: 10.5, z: 11.7, w: 1.92, d: 0.83 },
    // 頒獎台（含三角旗柱）與路標木柱；w、d 是世界座標的半寬與半深。
    { x: -19.2, z: 2.55, w: 1.1, d: 2.9 },
    { x: 21.9, z: 3.6, w: 0.45, d: 0.45 },
  ];
  const cameraObstacles = [workshop, library, home];
  // 只對地面、紙路與平台取樣高度，避免把道具當成可站立的地面。
  world.updateMatrixWorld(true);
  const floorRay = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 8);
  const floorHits: THREE.Intersection[] = [];
  let lastFloorX = NaN,
    lastFloorZ = NaN,
    floorHeight = GROUND;
  function groundAt(x: number, z: number) {
    if (x === lastFloorX && z === lastFloorZ) return floorHeight;
    floorRay.ray.origin.set(x, 6, z);
    floorHits.length = 0;
    floorRay.intersectObjects(walkSurfaces, false, floorHits);
    floorHeight = floorHits[0]?.point.y ?? 1.29;
    lastFloorX = x;
    lastFloorZ = z;
    return floorHeight;
  }
  function alignCharacterWithGround() {
    const p = yezi.root.position;
    const standingY = groundAt(p.x, p.z) + jumpHeight - yezi.getFootOffset();
    p.y =
      seatMix > 0
        ? THREE.MathUtils.lerp(standingY, seatAnchor.y - yezi.getSeatOffset(), seatMix)
        : standingY;
  }
  // 輸入狀態與鏡頭狀態獨立保存；開啟面板或離開分頁時清空輸入。
  const keys = new Set<string>(),
    stick = new THREE.Vector2();
  let jumpHeight = 0,
    jumpVelocity = 0,
    yaw = 0,
    pitch = 0.32,
    zoom = 12.5,
    raf = 0,
    last = 0,
    dirty = true;
  const target = new THREE.Vector3(),
    desired = new THREE.Vector3(),
    forward = new THREE.Vector3(),
    right = new THREE.Vector3();
  const cameraRay = new THREE.Raycaster(),
    cameraDirection = new THREE.Vector3();
  const labels = [...stage.querySelectorAll<HTMLElement>("[data-place]")],
    projected = new THREE.Vector3();
  function getRequiredElement(id: string): HTMLElement {
    const element = document.getElementById(id);
    if (!element) throw new Error(`小島操作介面缺少必要元素：${id}`);
    return element;
  }
  const prompt = getRequiredElement("interact");
  const promptLabel = getRequiredElement("interact-label");
  const mapPlayer = getRequiredElement("map-player");
  const location = getRequiredElement("current-location");
  let drag: CameraDrag | null = null;
  let dragged = false;
  const characterRay = new THREE.Raycaster(),
    pointer = new THREE.Vector2();
  function resize() {
    const w = stage.clientWidth,
      h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w < 600 ? 64 : 52;
    camera.updateProjectionMatrix();
    dirty = true;
    // setSize 會清空畫布；背景分頁不會跑 frame，所以這裡立即重畫一次。
    renderer.render(scene, camera);
  }
  const observer = new ResizeObserver(resize);
  observer.observe(stage);
  resize();
  function isInsideIsland(x: number, z: number) {
    let inside = false;
    for (let i = 0, j = outline.length - 1; i < outline.length; j = i++) {
      const [ax, az] = outline[i],
        [bx, bz] = outline[j];
      if (az > z / 3 !== bz > z / 3 && x / 3 < ((bx - ax) * (z / 3 - az)) / (bz - az) + ax)
        inside = !inside;
    }
    return inside;
  }
  function canWalkTo(x: number, z: number) {
    return (
      x > -22.5 &&
      x < 22.5 &&
      z > -14.5 &&
      z < 14.5 &&
      [
        [0.4, 0],
        [-0.4, 0],
        [0, 0.4],
        [0, -0.4],
      ].every(([dx, dz]) => isInsideIsland(x + dx, z + dz)) &&
      !blockers.some((b) => Math.abs(x - b.x) < b.w && Math.abs(z - b.z) < b.d)
    );
  }
  function focus() {
    stage.focus({ preventScroll: true });
  }
  function reset() {
    sitting = false;
    seatMix = 0;
    keys.clear();
    stick.set(0, 0);
    yezi.root.position.set(SPAWN[0], GROUND, SPAWN[1]);
    yezi.root.rotation.y = Math.PI;
    restHeading = Math.PI;
    jumpHeight = jumpVelocity = 0;
    yaw = 0;
    pitch = 0.32;
    zoom = 12.5;
    yezi.animate(time, false, false, false, false, 0);
    alignCharacterWithGround();
    updateCamera(1, true);
    dirty = true;
  }
  function start() {
    playing = true;
    startedAt = time;
    // 出發時先揮手打招呼，鏡頭飛到背後的同時頁仔再轉身。
    waveUntil = time + 1.4;
    focus();
    dirty = true;
  }
  /** 開場鏡頭的水平角度：出發前緩慢左右擺動，減少動態偏好時固定。 */
  function introAngle() {
    return INTRO.angle + (reducedMotion.matches ? 0 : Math.sin(time * 0.15) * INTRO.sway);
  }
  /** 0＝開場視角、1＝遊玩視角；中間用 easeInOutCubic 讓飛行有加減速。 */
  function flyProgress() {
    if (!playing) return 0;
    if (reducedMotion.matches) return 1;
    const t = THREE.MathUtils.clamp((time - startedAt) / FLY_SECONDS, 0, 1);
    return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
  }
  function stand() {
    sitting = false;
    seatOrigin.set(destinations.bench.point[0], 0, destinations.bench.point[1]);
    seatHeading = 0;
    dirty = true;
  }
  function toggleSeat() {
    if (sitting) {
      stand();
      return false;
    }
    if (nearest !== "bench" || jumpHeight > 0.001 || suspended) return false;
    seatOrigin.copy(yezi.root.position);
    seatHeading = Math.atan2(Math.sin(yezi.root.rotation.y), Math.cos(yezi.root.rotation.y));
    sitting = true;
    jumpHeight = jumpVelocity = 0;
    keys.clear();
    stick.set(0, 0);
    dirty = true;
    focus();
    return true;
  }
  function jump() {
    if (!playing || suspended || jumpHeight > 0.001) return;
    if (sitting) {
      stand();
      return;
    }
    if (seatMix > 0) return;
    jumpVelocity = 6.8;
    dirty = true;
  }
  function interact() {
    if (nearest && playing && !suspended) onAction(nearest);
  }
  function travel(id: DestinationId) {
    const dest = destinations[id];
    if (!dest) return;
    sitting = false;
    seatMix = 0;
    keys.clear();
    stick.set(0, 0);
    yezi.root.position.set(dest.point[0], GROUND, dest.point[1]);
    // 頁仔面向地標，鏡頭放在正後方（鏡頭角度 = 朝向 + π）。
    const heading = "facing" in dest ? dest.facing : Math.PI;
    yezi.root.rotation.y = heading;
    restHeading = heading;
    // 傳送是瞬間抵達：不打招呼（免得轉身背對地標），也跳過開場的鏡頭飛行。
    waveUntil = time;
    startedAt = -Infinity;
    jumpHeight = jumpVelocity = 0;
    yaw = heading + Math.PI;
    yezi.animate(time, false, false, false, false, 0);
    alignCharacterWithGround();
    updateCamera(1, true);
    updateProximity();
    dirty = true;
    focus();
  }
  const accepted = [
    "w",
    "a",
    "s",
    "d",
    "arrowup",
    "arrowdown",
    "arrowleft",
    "arrowright",
    " ",
    "e",
    "shift",
  ];
  function keydown(e: KeyboardEvent) {
    if (
      !playing ||
      suspended ||
      (e.target instanceof Element && e.target.closest("dialog,input,textarea,select,button,a")) ||
      !accepted.includes(e.key.toLowerCase())
    )
      return;
    e.preventDefault();
    const k = e.key.toLowerCase();
    if (k === " ") {
      if (!e.repeat) jump();
    } else if (k === "e") {
      if (!e.repeat) interact();
    } else keys.add(k);
    dirty = true;
  }
  function clear() {
    keys.clear();
    stick.set(0, 0);
    drag = null;
  }
  window.addEventListener("keydown", keydown, { signal });
  window.addEventListener("keyup", (e) => keys.delete(e.key.toLowerCase()), {
    signal,
  });
  window.addEventListener("blur", clear, { signal });
  document.addEventListener(
    "visibilitychange",
    () => {
      clear();
      last = 0;
      dirty = true;
    },
    { signal },
  );
  stage.addEventListener(
    "pointerdown",
    (e) => {
      if (e.target !== renderer.domElement) return;
      drag = {
        id: e.pointerId,
        x: e.clientX,
        y: e.clientY,
        startX: e.clientX,
        startY: e.clientY,
      };
      dragged = false;
      stage.setPointerCapture(e.pointerId);
      if (playing) focus();
    },
    { signal },
  );
  stage.addEventListener(
    "pointermove",
    (e) => {
      if (!drag || drag.id !== e.pointerId || suspended) return;
      const dx = e.clientX - drag.x,
        dy = e.clientY - drag.y;
      dragged ||= Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) > 4;
      yaw -= dx * 0.005;
      pitch = THREE.MathUtils.clamp(pitch + dy * 0.003, 0.13, 0.88);
      drag.x = e.clientX;
      drag.y = e.clientY;
      dirty = true;
    },
    { signal },
  );
  stage.addEventListener(
    "pointerup",
    (e) => {
      if (drag?.id === e.pointerId) {
        if (!dragged && playing && !suspended) {
          const rect = renderer.domElement.getBoundingClientRect();
          pointer.set(
            ((e.clientX - rect.left) / rect.width) * 2 - 1,
            (-(e.clientY - rect.top) / rect.height) * 2 + 1,
          );
          characterRay.setFromCamera(pointer, camera);
          if (characterRay.intersectObject(yezi.root, true).length) onAction("yezi");
          else if (nearest) interact();
        }
        drag = null;
      }
    },
    { signal },
  );
  stage.addEventListener(
    "pointercancel",
    () => {
      drag = null;
    },
    { signal },
  );
  stage.addEventListener(
    "wheel",
    (e) => {
      if (suspended) return;
      e.preventDefault();
      zoom = THREE.MathUtils.clamp(zoom + e.deltaY * 0.013, 6, 18);
      dirty = true;
    },
    { passive: false, signal },
  );
  // 先決定角色前方視線目標，再用射線防止鏡頭穿進建築。
  function updateCamera(dt: number, instant = false) {
    const p = yezi.root.position;
    target.set(p.x, GROUND + 1.9, p.z);
    // 視線前方目標與鏡頭都要留在牆外，避免射線從屋內出發而突然縮放。
    cameraDirection.set(-Math.sin(yaw), 0, -Math.cos(yaw));
    cameraRay.set(target, cameraDirection);
    cameraRay.far = 1.3;
    const lookAheadHit = cameraRay
      .intersectObjects(cameraObstacles, true)
      .find((hit) => hit.object instanceof THREE.Mesh);
    target.addScaledVector(
      cameraDirection,
      lookAheadHit ? Math.max(0, lookAheadHit.distance - 0.3) : 1.3,
    );
    const fly = flyProgress();
    const fromAngle = introAngle();
    // 角度取最短方向插值，避免飛行時多繞一圈。
    const angleDelta = Math.atan2(Math.sin(yaw - fromAngle), Math.cos(yaw - fromAngle));
    const distance = THREE.MathUtils.lerp(INTRO.distance, zoom, fly);
    const angle = fromAngle + angleDelta * fly;
    const elevation = THREE.MathUtils.lerp(INTRO.elevation, pitch, fly);
    desired
      .set(
        Math.sin(angle) * Math.cos(elevation) * distance,
        Math.sin(elevation) * distance,
        Math.cos(angle) * Math.cos(elevation) * distance,
      )
      .add(target);
    cameraDirection.subVectors(desired, target);
    const length = cameraDirection.length();
    cameraDirection.normalize();
    cameraRay.set(target, cameraDirection);
    cameraRay.far = length;
    const hit = cameraRay
      .intersectObjects(cameraObstacles, true)
      .find((hit) => hit.object instanceof THREE.Mesh);
    if (hit && hit.distance < length)
      desired.copy(target).addScaledVector(cameraDirection, Math.max(2.2, hit.distance - 0.45));
    // 飛行期間直接跟著緩動曲線走，其餘時間用阻尼平滑跟隨。
    const flying = playing && fly < 1;
    camera.position.lerp(desired, instant || flying ? 1 : 1 - Math.exp(-dt * 8));
    camera.lookAt(target);
  }
  // 同一份距離判定同步更新互動提示、位置文字與小地圖。
  function updateProximity() {
    const p = yezi.root.position;
    let closest: DestinationId | null = null;
    let best = 3.1;
    for (const id of Object.keys(destinations) as DestinationId[]) {
      const d = destinations[id];
      const dist = Math.hypot(p.x - d.point[0], p.z - d.point[1]);
      if (dist < best) {
        best = dist;
        closest = id;
      }
    }
    nearest = sitting || seatMix > 0 ? "bench" : closest;
    prompt.hidden = !playing || suspended || !nearest;
    if (nearest) {
      promptLabel.textContent = sitting ? "站起來，繼續散步" : destinations[nearest].action;
      location.textContent = destinations[nearest].name;
    } else
      location.textContent =
        p.z > 8
          ? "起點廣場"
          : p.x < -7
            ? "工坊小徑"
            : p.z < -2
              ? "筆記林間"
              : p.x > 9
                ? "生活角落"
                : "小島散步中";
    mapPlayer.setAttribute(
      "transform",
      `translate(${90 + p.x * 2.85} ${62 + p.z * 2.6}) rotate(${((yezi.root.rotation.y - Math.PI) * 180) / Math.PI})`,
    );
    const description = `${location.textContent}，${sitting ? "坐在長椅上" : jumpHeight > 0.1 ? "跳躍中" : "地面上"}`;
    if (stage.getAttribute("aria-description") !== description)
      stage.setAttribute("aria-description", description);
  }
  function placeLabels() {
    for (const el of labels) {
      const id = el.dataset.place;
      if (!id || !Object.hasOwn(destinations, id)) continue;
      const d = destinations[id as DestinationId];
      if (!("label" in d)) continue;
      projected.set(...d.label);
      const dist = projected.distanceTo(camera.position);
      projected.project(camera);
      const visible =
        projected.z > 0 &&
        projected.z < 1 &&
        Math.abs(projected.x) < (stage.clientWidth < 600 ? 0.7 : 0.92) &&
        Math.abs(projected.y) < 0.85 &&
        dist < 42;
      el.hidden = !visible;
      if (!visible) continue;
      el.style.transform = `translate(${(projected.x * 0.5 + 0.5) * stage.clientWidth}px,${(-projected.y * 0.5 + 0.5) * stage.clientHeight}px) translate(-50%,-100%)`;
      el.style.opacity = String(Math.max(0.35, 1 - (dist - 17) / 45));
    }
  }
  renderer.domElement.addEventListener(
    "webglcontextlost",
    (e) => {
      e.preventDefault();
      suspended = true;
      onFailure();
    },
    { signal },
  );
  let nightMix = 0,
    nightTarget = 0;
  const fog = scene.fog;
  const waterMaterial = water.material;
  /** 依 nightMix 更新天空、霧、燈光、海面與夜晚才出現的燈光、星星和月亮。 */
  function applyTimeOfDay(mix: number) {
    paintSky(mix);
    skyTexture.needsUpdate = true;
    if (fog) fog.color.lerpColors(DAY.fog, NIGHT.fog, mix);
    hemisphere.color.lerpColors(DAY.hemisphereSky, NIGHT.hemisphereSky, mix);
    hemisphere.groundColor.lerpColors(DAY.hemisphereGround, NIGHT.hemisphereGround, mix);
    hemisphere.intensity = THREE.MathUtils.lerp(
      DAY.hemisphereIntensity,
      NIGHT.hemisphereIntensity,
      mix,
    );
    sun.color.lerpColors(DAY.sun, NIGHT.sun, mix);
    sun.intensity = THREE.MathUtils.lerp(DAY.sunIntensity, NIGHT.sunIntensity, mix);
    renderer.toneMappingExposure = THREE.MathUtils.lerp(DAY.exposure, NIGHT.exposure, mix);
    waterMaterial.color.lerpColors(DAY.water, NIGHT.water, mix);
    // 燈光比天色晚一點亮起（後半段才明顯），像天黑才點燈。
    const lamps = THREE.MathUtils.smoothstep(mix, 0.35, 1);
    lanternPaper.emissiveIntensity = lamps * 1.4;
    lanternLights.forEach((light) => (light.intensity = lamps * 9));
    windowGlows.forEach(({ material: glow, strength }) => (glow.opacity = lamps * strength));
    starMaterial.opacity = THREE.MathUtils.smoothstep(mix, 0.5, 1);
    moonMaterial.opacity = THREE.MathUtils.smoothstep(mix, 0.3, 1);
    stars.visible = moon.visible = mix > 0.001;
  }
  function setNight(night: boolean, instant = false) {
    nightTarget = night ? 1 : 0;
    if (instant || reducedMotion.matches) {
      nightMix = nightTarget;
      applyTimeOfDay(nightMix);
    }
    dirty = true;
  }
  // 每幀依序更新移動、坐姿與跳躍，再讓鞋底貼地，最後繪製場景。
  function frame(now: number) {
    if (disposed) return;
    raf = requestAnimationFrame(frame);
    if (document.hidden) return;
    const dt = Math.min((now - last) / 1000 || 0.016, 0.04);
    last = now;
    if (suspended && !dirty) return;
    const horizontal =
      (keys.has("d") || keys.has("arrowright") ? 1 : 0) -
      (keys.has("a") || keys.has("arrowleft") ? 1 : 0) +
      stick.x;
    const vertical =
      (keys.has("s") || keys.has("arrowdown") ? 1 : 0) -
      (keys.has("w") || keys.has("arrowup") ? 1 : 0) +
      stick.y;
    const moving = Math.hypot(horizontal, vertical) > 0.01;
    const seatTransition = Math.abs(seatMix - (sitting ? 1 : 0)) > 0.001;
    time += dt;
    // 日夜切換約 1.5 秒完成；接近目標時直接對齊，避免一直重畫天空。
    if (nightMix !== nightTarget) {
      nightMix = THREE.MathUtils.lerp(nightMix, nightTarget, 1 - Math.exp(-dt * 3));
      if (Math.abs(nightMix - nightTarget) < 0.002) nightMix = nightTarget;
      applyTimeOfDay(nightMix);
    }
    if (playing && !suspended) {
      if (sitting && moving) stand();
      const seatTarget = sitting ? 1 : 0;
      seatMix = THREE.MathUtils.lerp(seatMix, seatTarget, 1 - Math.exp(-dt * 12));
      if (Math.abs(seatMix - seatTarget) < 0.001) seatMix = seatTarget;
      const h = horizontal,
        v = vertical;
      forward.set(Math.sin(yaw), 0, Math.cos(yaw));
      right.set(Math.cos(yaw), 0, -Math.sin(yaw));
      const dx = right.x * h + forward.x * v,
        dz = right.z * h + forward.z * v,
        len = Math.hypot(dx, dz),
        p = yezi.root.position;
      if (seatMix > 0 || seatTransition) {
        p.x = THREE.MathUtils.lerp(seatOrigin.x, seatAnchor.x, seatMix);
        p.z = THREE.MathUtils.lerp(seatOrigin.z, seatAnchor.z, seatMix);
        yezi.root.rotation.y = seatHeading * (1 - seatMix);
      } else if (len > 0.01) {
        const speed = ((keys.has("shift") ? 7.5 : 4.7) * dt) / Math.max(1, len);
        if (canWalkTo(p.x + dx * speed, p.z)) p.x += dx * speed;
        if (canWalkTo(p.x, p.z + dz * speed)) p.z += dz * speed;
        const direction = Math.atan2(dx, dz),
          delta = Math.atan2(
            Math.sin(direction - yezi.root.rotation.y),
            Math.cos(direction - yezi.root.rotation.y),
          );
        yezi.root.rotation.y += delta * Math.min(1, dt * 15);
      }
      // 出發後若沒有操作：揮手時仍面向鏡頭，揮完再轉身面向小島（朝 -Z）。
      if (!moving && seatMix === 0 && time - startedAt < FLY_SECONDS + 1) {
        const facing = time < waveUntil ? introAngle() : restHeading;
        const turn = Math.atan2(
          Math.sin(facing - yezi.root.rotation.y),
          Math.cos(facing - yezi.root.rotation.y),
        );
        yezi.root.rotation.y += turn * Math.min(1, dt * 6);
      }
      if (jumpVelocity !== 0 || jumpHeight > 0) {
        jumpVelocity -= 18 * dt;
        jumpHeight = Math.max(0, jumpHeight + jumpVelocity * dt);
        if (jumpHeight === 0) jumpVelocity = 0;
      }
    }
    // 站著不動一陣子就轉頭看鏡頭；移動、跳躍、坐下或開場時回正。
    const busy = moving || jumpHeight > 0.001 || seatMix > 0 || !playing;
    if (busy) idleSince = time;
    let headYaw = 0;
    if (time - idleSince > IDLE_LOOK_SECONDS) {
      cameraLocal.copy(camera.position);
      yezi.root.worldToLocal(cameraLocal);
      const angle = Math.atan2(cameraLocal.x, cameraLocal.z);
      // 鏡頭在正後方時 atan2 會在 ±π 之間跳動；記住上次轉向的那一側，避免頭左右甩。
      if (Math.abs(angle) < 2.8) lookSide = Math.sign(angle) || lookSide;
      headYaw = Math.abs(angle) < 2.8 ? angle : lookSide * Math.PI;
    }
    yezi.setHeadTurn(headYaw);
    // 跳躍高度與垂直速度交給角色，用來做起跳伸展、空中姿勢與落地壓扁。
    yezi.setAirborne(jumpHeight, jumpVelocity);
    if (!playing && !suspended) {
      // 開場時頁仔面向鏡頭，每隔幾秒揮一次手。
      const turn = Math.atan2(
        Math.sin(introAngle() - yezi.root.rotation.y),
        Math.cos(introAngle() - yezi.root.rotation.y),
      );
      yezi.root.rotation.y += turn * Math.min(1, dt * 4);
      if (!reducedMotion.matches && time % 7 > 4.5) waveUntil = Math.max(waveUntil, time + 0.1);
    }
    yezi.animate(
      time,
      moving && playing && seatMix === 0,
      waveUntil > time,
      windUntil > time,
      false,
      seatMix,
      keys.has("shift"),
    );
    alignCharacterWithGround();
    if (!suspended) {
      windmill.rotation.z -= dt * (windUntil > time ? 13 : 0.45);
      sheets.forEach((s, i) => {
        s.position.y =
          SHEET_REST_Y + (windUntil > time ? Math.max(0, Math.sin(time * 7 + i)) * 0.2 : 0);
        s.rotation.z = windUntil > time ? Math.sin(time * 6 + i) * 0.18 : 0;
      });
      smoke.forEach((s, i) => {
        s.position.y = 3.02 + i * 0.34 + Math.sin(time * 1.2 + i) * 0.08;
      });
      // 三角旗與路標平常輕輕晃，起風時擺得比較大。
      const gust = windUntil > time ? 1 : 0.25;
      pennants.forEach((p, i) => {
        p.rotation.x = Math.sin(time * 3 + i * 0.7) * 0.35 * gust;
      });
      boards.forEach((b, i) => {
        b.rotation.z = Math.sin(time * 2.2 + i) * 0.03 * gust;
      });
    }
    updateCamera(dt);
    updateProximity();
    placeLabels();
    renderer.render(scene, camera);
    dirty = false;
  }
  scene.updateMatrixWorld(true);
  yezi.root.rotation.y = INTRO.angle;
  yezi.animate(0, false, false, false, false);
  alignCharacterWithGround();
  updateCamera(1, true);
  renderer.render(scene, camera);
  onReady();
  placeLabels();
  raf = requestAnimationFrame(frame);
  return {
    start,
    travel,
    jump,
    interact,
    toggleSeat,
    joystick(x: number, y: number) {
      stick.set(x, y);
      dirty = true;
    },
    suspend(value: boolean) {
      suspended = value;
      clear();
      dirty = true;
    },
    wave() {
      waveUntil = time + 2.5;
      dirty = true;
    },
    wind() {
      windUntil = time + 5;
      dirty = true;
    },
    setNight,
    reset,
    // 離開首頁時釋放事件、GPU 資源與動畫，避免再次進入後重複執行。
    dispose() {
      disposed = true;
      events.abort();
      cancelAnimationFrame(raf);
      observer.disconnect();
      const geometries = new Set<THREE.BufferGeometry>(),
        materials = new Set<THREE.Material>(),
        textures = new Set<THREE.Texture>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
          geometries.add(object.geometry);
          const objectMaterials: THREE.Material | THREE.Material[] = object.material;
          const materialList = Array.isArray(objectMaterials) ? objectMaterials : [objectMaterials];
          materialList.forEach((material) => materials.add(material));
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => {
        const properties: unknown[] = Object.values(material);
        properties.forEach((value) => {
          if (value instanceof THREE.Texture) textures.add(value);
        });
        material.dispose();
      });
      textures.forEach((texture) => texture.dispose());
      skyTexture.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      moonTexture.dispose();
      moonMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
