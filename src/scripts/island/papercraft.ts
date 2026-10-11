import * as THREE from "three";

type Point2 = readonly [number, number];
type Point3 = readonly [number, number, number];
type PaperMesh = THREE.Mesh<THREE.ExtrudeGeometry, THREE.MeshStandardMaterial[]>;
type PaperLine = THREE.Line<
  THREE.BufferGeometry,
  THREE.LineBasicMaterial | THREE.LineDashedMaterial
>;

// 紙模型由薄卡紙拼成；切邊保留紙色，摺線與黏貼片用來表現摺紙結構。
// 所有尺寸使用場景的局部座標，父群組可以再統一縮放。
export function createPaperKit(parent: THREE.Object3D) {
  const grainCanvas = document.createElement("canvas");
  grainCanvas.width = grainCanvas.height = 256;
  const context = grainCanvas.getContext("2d");
  if (!context) throw new Error("無法建立紙張紋理的 2D 畫布。");
  const pixels = context.createImageData(256, 256);
  let seed = 1749;
  for (let i = 0; i < pixels.data.length; i += 4) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const brightness = 218 + (seed >>> 27);
    pixels.data.set([brightness, brightness, brightness, 255], i);
  }
  context.putImageData(pixels, 0, 0);
  const grain = new THREE.CanvasTexture(grainCanvas);
  grain.wrapS = grain.wrapT = THREE.RepeatWrapping;
  const colors: Readonly<Record<string, string>> = {
    teal: "#3a6b62",
    paper: "#fbf3e1",
    sage: "#a9bc8a",
    coral: "#d97e57",
    cream: "#f2dfae",
    dark: "#2e4a3c",
    wood: "#c99c61",
  };
  // 共用同色材質與紙紋貼圖，避免每張卡紙都重新配置資源。
  const materials = new Map<string, THREE.MeshStandardMaterial>();

  function material(color: string): THREE.MeshStandardMaterial {
    const resolvedColor = colors[color] || color;
    const cached = materials.get(resolvedColor);
    if (cached) return cached;
    const paperMaterial = new THREE.MeshStandardMaterial({
      color: resolvedColor,
      roughness: 1,
      bumpMap: grain,
      bumpScale: 0.006,
    });
    materials.set(resolvedColor, paperMaterial);
    return paperMaterial;
  }
  const edge = material("#e8dcc0");

  function group(x = 0, y = 0, z = 0, into: THREE.Object3D = parent): THREE.Group {
    const container = new THREE.Group();
    container.position.set(x, y, z);
    into.add(container);
    return container;
  }

  // 輪廓位於 XY 平面，厚度沿 Z 軸向兩側平均延伸。
  function panel(
    points: readonly Point2[],
    depth: number,
    color: string,
    into: THREE.Object3D = parent,
  ): PaperMesh {
    const shape = new THREE.Shape();
    points.forEach(([x, y], i) => (i ? shape.lineTo(x, y) : shape.moveTo(x, y)));
    shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: false,
      steps: 1,
    });
    geometry.translate(0, 0, -depth / 2);
    const paperPanel = new THREE.Mesh(geometry, [material(color), edge]);
    paperPanel.castShadow = paperPanel.receiveShadow = true;
    into.add(paperPanel);
    return paperPanel;
  }

  function card(
    width: number,
    height: number,
    depth: number,
    x: number,
    y: number,
    z: number,
    color: string,
    into: THREE.Object3D = parent,
  ): PaperMesh {
    const rectangle = panel(
      [
        [-width / 2, -height / 2],
        [width / 2, -height / 2],
        [width / 2, height / 2],
        [-width / 2, height / 2],
      ],
      depth,
      color,
      into,
    );
    rectangle.position.set(x, y, z);
    return rectangle;
  }

  function line(
    points: readonly Point3[],
    color: THREE.ColorRepresentation,
    into: THREE.Object3D = parent,
    dashed = false,
  ): PaperLine {
    const geometry = new THREE.BufferGeometry().setFromPoints(
      points.map((point) => new THREE.Vector3(...point)),
    );
    const crease = new THREE.Line(
      geometry,
      dashed
        ? new THREE.LineDashedMaterial({
            color,
            dashSize: 0.045,
            gapSize: 0.028,
            transparent: true,
            opacity: 0.5,
          })
        : new THREE.LineBasicMaterial({
            color,
            transparent: true,
            opacity: 0.65,
          }),
    );
    if (dashed) crease.computeLineDistances();
    into.add(crease);
    return crease;
  }

  // profile 的每一組數字是 [高度 Y, 深度 Z]；相鄰兩點形成一片摺面。
  function fold(
    width: number,
    profile: readonly Point2[],
    thickness: number,
    color: string,
    into: THREE.Object3D = parent,
  ): THREE.Group {
    const foldedCard = group(0, 0, 0, into);
    for (let i = 0; i < profile.length - 1; i++) {
      const start = profile[i];
      const end = profile[i + 1];
      if (!start || !end) continue;
      const [startY, startZ] = start,
        [endY, endZ] = end;
      const heightDifference = endY - startY,
        depthDifference = endZ - startZ;
      const segment = card(
        width,
        Math.hypot(heightDifference, depthDifference),
        thickness,
        0,
        (startY + endY) / 2,
        (startZ + endZ) / 2,
        color,
        foldedCard,
      );
      segment.rotation.x = Math.atan2(depthDifference, heightDifference);
    }
    return foldedCard;
  }

  function wallShell(
    width: number,
    height: number,
    depth: number,
    color: string,
    into: THREE.Object3D,
  ): void {
    card(width, height, 0.027, 0, height / 2, depth / 2, color, into);
    card(width, height, 0.027, 0, height / 2, -depth / 2, color, into);
    for (const sign of [-1, 1]) {
      const side = card(depth, height, 0.027, (sign * width) / 2, height / 2, 0, color, into);
      side.rotation.y = Math.PI / 2;
      // 黏貼回折片比牆面窄，避免接縫看起來像厚柱。
      card(
        0.075,
        height - 0.05,
        0.012,
        sign * (width / 2 - 0.048),
        height / 2,
        depth / 2 + 0.021,
        "paper",
        into,
      );
      line(
        [
          [sign * (width / 2 - 0.085), 0.04, depth / 2 + 0.028],
          [sign * (width / 2 - 0.085), height - 0.04, depth / 2 + 0.028],
        ],
        "#b0a489",
        into,
        true,
      );
    }
    const base = card(width + 0.1, depth + 0.1, 0.024, 0, 0.01, 0, "cream", into);
    base.rotation.x = -Math.PI / 2;
  }

  function roof(
    width: number,
    depth: number,
    x: number,
    y: number,
    z: number,
    color: string,
    into: THREE.Object3D = parent,
  ): THREE.Group {
    const roofGroup = group(x, y, z, into),
      rise = 0.83;
    for (const sign of [-1, 1]) {
      const length = Math.hypot(width / 2, rise);
      const slope = card(depth, length, 0.028, (sign * width) / 4, rise / 2, 0, color, roofGroup);
      // 局部 X 軸沿屋脊，局部 Y 軸由屋簷指向屋脊。
      slope.quaternion.setFromRotationMatrix(
        new THREE.Matrix4().makeBasis(
          new THREE.Vector3(0, 0, 1),
          new THREE.Vector3((-sign * width) / 2 / length, rise / length, 0),
          new THREE.Vector3(-rise / length, (-sign * width) / 2 / length, 0),
        ),
      );
      line(
        [
          [(sign * width) / 2, 0, -depth / 2],
          [(sign * width) / 2, 0, depth / 2],
        ],
        "#eee1c5",
        roofGroup,
      );
    }
    // 窄摺片蓋住屋脊，兩端山牆則各用一張獨立卡紙。
    const cap = fold(
      depth,
      [
        [0.785, -0.06],
        [0.839, 0],
        [0.785, 0.06],
      ],
      0.012,
      "paper",
      roofGroup,
    );
    cap.rotation.y = Math.PI / 2;
    for (const sign of [-1, 1]) {
      const gable = panel(
        [
          [-width / 2 + 0.07, 0.012],
          [0, rise - 0.042],
          [width / 2 - 0.07, 0.012],
        ],
        0.018,
        color,
        roofGroup,
      );
      gable.position.z = sign * (depth / 2 - 0.07);
      line(
        [
          [-width / 2 + 0.11, 0.04, sign * (depth / 2 - 0.08)],
          [0, rise - 0.075, sign * (depth / 2 - 0.08)],
          [width / 2 - 0.11, 0.04, sign * (depth / 2 - 0.08)],
        ],
        "#d7c9a8",
        roofGroup,
        true,
      );
    }
    return roofGroup;
  }

  function windowPane(
    x: number,
    y: number,
    z: number,
    width: number,
    height: number,
    into: THREE.Object3D,
  ): void {
    card(width + 0.09, height + 0.09, 0.012, x, y, z, "paper", into);
    card(width, height, 0.006, x, y, z + 0.011, "#749584", into);
    card(0.024, height, 0.009, x, y, z + 0.018, "paper", into);
    card(width, 0.024, 0.009, x, y, z + 0.019, "paper", into);
    const sill = card(
      width + 0.12,
      0.12,
      0.012,
      x,
      y - height / 2 - 0.044,
      z + 0.04,
      "cream",
      into,
    );
    sill.rotation.x = -Math.PI / 2;
  }

  function notebook(
    width: number,
    height: number,
    thickness: number,
    color: string,
    into: THREE.Object3D = parent,
  ): THREE.Group {
    const book = group(0, 0, 0, into);
    card(width - 0.006, height - 0.006, thickness, 0, 0, 0, "paper", book);
    for (const side of [-1, 1])
      card(width, height, 0.002, 0, 0, side * (thickness / 2 + 0.001), color, book);
    const spine = card(thickness + 0.004, height, 0.002, -width / 2, 0, 0, color, book);
    spine.rotation.y = Math.PI / 2;
    for (const side of [-1, 1])
      line(
        [
          [width / 2 - 0.002, -height / 2 + 0.005, side * thickness * 0.2],
          [width / 2 - 0.002, height / 2 - 0.005, side * thickness * 0.2],
        ],
        "#c4bba5",
        book,
      );
    return book;
  }

  function monitor(
    x: number,
    tableY: number,
    z: number,
    into: THREE.Object3D = parent,
  ): THREE.Group {
    const screen = group(x, tableY, z, into);
    card(0.68, 0.44, 0.012, 0, 0.28, 0, "teal", screen);
    card(0.616, 0.366, 0.003, 0, 0.289, 0.008, "#bdcbb0", screen);
    // 螢幕後方以一張摺成支架的卡紙和水平底腳支撐。
    fold(
      0.095,
      [
        [0.004, 0.065],
        [0.004, -0.12],
        [0.15, -0.045],
        [0.18, -0.008],
      ],
      0.009,
      "teal",
      screen,
    );
    // 紙面印刷的細線，讓近看時仍能辨識這是螢幕。
    card(0.022, 0.25, 0.001, -0.257, 0.3, 0.01, "#869e86", screen);
    for (let i = 0; i < 4; i++)
      card(
        0.12 + (i % 3) * 0.035,
        0.007,
        0.001,
        -0.13 + (i % 2) * 0.027,
        0.36 - i * 0.038,
        0.01,
        "#7f9880",
        screen,
      );
    card(0.13, 0.16, 0.001, 0.185, 0.302, 0.01, "#a2b895", screen);
    return screen;
  }

  function bench(x: number, y: number, z: number): THREE.Group {
    const seat = group(x, y, z);
    fold(
      1.18,
      [
        [0.33, 0.25],
        [0.36, 0.21],
        [0.36, -0.19],
        [0.64, -0.26],
        [0.69, -0.24],
      ],
      0.018,
      "wood",
      seat,
    );
    // 左右各一片鋸齒狀摺紙支架，底腳回折貼地。
    for (const sign of [-1, 1]) {
      const support = fold(
        0.12,
        [
          [0.015, 0.24],
          [0.015, 0.17],
          [0.34, 0.12],
          [0.34, -0.12],
          [0.015, -0.17],
          [0.015, -0.24],
        ],
        0.023,
        "teal",
        seat,
      );
      support.position.x = sign * 0.43;
    }
    for (const seamZ of [-0.16, -0.02, 0.13])
      line(
        [
          [-0.56, 0.371, seamZ],
          [0.56, 0.371, seamZ],
        ],
        "#8a785d",
        seat,
        true,
      );
    line(
      [
        [-0.56, 0.4, -0.205],
        [0.56, 0.4, -0.205],
      ],
      "#7b725c",
      seat,
    );
    return seat;
  }

  function mailbox(x: number, y: number, z: number): THREE.Group {
    const mailboxGroup = group(x, y, z);
    const post = group(0, 0, 0, mailboxGroup);
    card(0.09, 0.64, 0.018, -0.026, 0.32, 0, "wood", post);
    const returnSide = card(0.07, 0.64, 0.018, 0.026, 0.32, -0.035, "wood", post);
    returnSide.rotation.y = Math.PI / 2;
    const box = group(0, 0.64, 0, mailboxGroup);
    wallShell(0.57, 0.43, 0.21, "teal", box);
    const front = panel(
      [
        [-0.3, 0.01],
        [0.3, 0.01],
        [0.3, 0.38],
        [0.25, 0.44],
        [-0.25, 0.44],
        [-0.3, 0.38],
      ],
      0.016,
      "teal",
      box,
    );
    front.position.z = 0.128;
    // 信封摺片保留淺色切邊，讓薄紙層次清楚可見。
    const flap = panel(
      [
        [-0.285, 0.414],
        [0.285, 0.414],
        [0, 0.225],
      ],
      0.012,
      "sage",
      box,
    );
    flap.position.z = 0.151;
    line(
      [
        [-0.28, 0.026, 0.143],
        [0, 0.205, 0.143],
        [0.28, 0.026, 0.143],
      ],
      "#bdc6a7",
      box,
    );
    const letter = card(0.24, 0.18, 0.006, 0.035, 0.48, 0.01, "paper", box);
    letter.rotation.z = -0.12;
    line(
      [
        [-0.055, 0.5, 0.017],
        [0.035, 0.445, 0.017],
        [0.125, 0.5, 0.017],
      ],
      "#b4a58b",
      box,
    );
    const flag = card(0.11, 0.15, 0.012, 0.34, 0.41, 0, "coral", box);
    flag.rotation.z = -0.06;
    const base = card(0.25, 0.22, 0.012, 0, 0.008, 0, "cream", mailboxGroup);
    base.rotation.x = -Math.PI / 2;
    return mailboxGroup;
  }

  function leaf(width: number, height: number, color: string, into: THREE.Object3D): THREE.Group {
    const foldedLeaf = group(0, 0, 0, into);
    for (const sign of [-1, 1]) {
      const blade = panel(
        [
          [0, 0],
          [sign * width * 0.5, height * 0.48],
          [0, height],
        ],
        0.009,
        color,
        foldedLeaf,
      );
      blade.rotation.y = sign * 0.34;
    }
    return foldedLeaf;
  }

  function tree(x: number, z: number, scale = 1): THREE.Group {
    // 島面頂端約 0.43，樹幹底部略微埋入，避免浮空。
    const treeGroup = group(x, 0.425, z);
    treeGroup.scale.setScalar(scale);
    const trunk = card(0.09, 0.8, 0.018, 0, 0.4, 0, "wood", treeGroup);
    const crossedTrunk = trunk.clone();
    crossedTrunk.rotation.y = Math.PI / 2;
    treeGroup.add(crossedTrunk);
    for (let i = 0; i < 4; i++) {
      const branch = panel(
        [
          [0, 0.5],
          [0.5, 0.5],
          [0.3, 0.91],
          [0.41, 0.91],
          [0.22, 1.23],
          [0.28, 1.23],
          [0, 1.79],
        ],
        0.012,
        i % 2 ? "sage" : "#8ca673",
        treeGroup,
      );
      branch.rotation.y = (i * Math.PI) / 2 + 0.35;
    }
    return treeGroup;
  }

  function pot(x: number, z: number): THREE.Group {
    const flowerPot = group(x, 0.445, z),
      radius = 0.15,
      depth = 0.22;
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3,
        wall = panel(
          [
            [-0.066, 0],
            [0.066, 0],
            [0.087, depth],
            [-0.087, depth],
          ],
          0.009,
          "coral",
          flowerPot,
        );
      wall.position.set(Math.sin(angle) * radius * 0.83, 0, Math.cos(angle) * radius * 0.83);
      wall.rotation.y = angle;
    }
    for (let i = 0; i < 5; i++) {
      const plantLeaf = leaf(0.16, 0.37, i % 2 ? "sage" : "#7d9573", flowerPot);
      plantLeaf.position.y = 0.17;
      plantLeaf.rotation.set(i % 2 ? 0.65 : 0.4, i * 2.4, (i - 2) * 0.16);
    }
    return flowerPot;
  }
  return {
    material,
    card,
    panel,
    group,
    line,
    fold,
    wallShell,
    roof,
    windowPane,
    notebook,
    monitor,
    bench,
    mailbox,
    tree,
    pot,
  };
}

export type PaperKit = ReturnType<typeof createPaperKit>;
