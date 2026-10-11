import * as THREE from "three";
import { createYezi } from "./character";
import { getNotFoundPose, NOT_FOUND_ENTRANCE_SECONDS, type NotFoundPose } from "./not-found";

type PreviewMode =
  "idle" | "walk" | "run" | "jump" | "run-jump" | "wave" | "wind" | "sit" | "hold" | "collapse";

// 跳躍模式沿用小島的物理（world.ts）：起跳速度 6.8、重力 18（世界單位）。落地後停一下再跳，方便反覆看起跳、空中與落地。
const JUMP_SPEED = 6.8;
const JUMP_GRAVITY = 18;
const JUMP_REST_SECONDS = 0.8;
// 預覽畫面只放得下約兩成七的跳躍高度；角色的姿勢仍收到完整的小島數值，只有畫面上的位移縮小。
const PREVIEW_JUMP_LIFT = 0.27;

function isPreviewMode(value: string | undefined): value is PreviewMode {
  return (
    value === "idle" ||
    value === "walk" ||
    value === "run" ||
    value === "jump" ||
    value === "run-jump" ||
    value === "wave" ||
    value === "wind" ||
    value === "sit" ||
    value === "hold" ||
    value === "collapse"
  );
}

/** 建立四個共用控制的角色視角，離開頁面時釋放 WebGL 資源。 */
export function initializeCharacterPreview(): void {
  const host = document.querySelector<HTMLElement>("#views");
  if (!host) {
    return;
  }
  let mode: PreviewMode = "idle";
  let detailView = false;
  const events = new AbortController();
  const cleanups: Array<() => void> = [];
  document.querySelectorAll<HTMLButtonElement>("[data-mode]").forEach((button) =>
    button.addEventListener(
      "click",
      () => {
        const selectedMode = button.dataset.mode;
        if (!isPreviewMode(selectedMode)) {
          return;
        }
        mode = selectedMode;
        document
          .querySelectorAll<HTMLButtonElement>("[data-mode]")
          .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      },
      { signal: events.signal },
    ),
  );
  const detailButton = document.querySelector<HTMLButtonElement>("#detail-view");
  detailButton?.addEventListener(
    "click",
    () => {
      detailView = !detailView;
      detailButton.setAttribute("aria-pressed", String(detailView));
    },
    { signal: events.signal },
  );
  // 每個視角使用自己的相機與畫布，共用上方的動畫模式。
  for (const [name, angle] of [
    ["正面", 0],
    ["側面", Math.PI / 2],
    ["紙角與包包", 0.65],
    ["背面", Math.PI],
  ] as const) {
    const panel = document.createElement("section");
    const heading = document.createElement("h2");
    heading.textContent = name;
    panel.append(heading);
    host.append(panel);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#e5e0da");
    const camera = new THREE.PerspectiveCamera(35, 440 / 600, 0.1, 20);
    camera.position.set(0, 1.6, 3.7);
    camera.lookAt(0, 1.34, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(440, 600, false);
    panel.append(renderer.domElement);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    scene.add(new THREE.HemisphereLight(0xffffff, 0xb5aca3, 1.7));
    // 預覽燈光保留原本的暖色主光與冷色補光。
    const key = new THREE.DirectionalLight(0xfffaf4, 3.1);
    key.position.set(-3, 5, 6);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    Object.assign(key.shadow.camera, {
      left: -1.5,
      right: 1.5,
      top: 2.5,
      bottom: -0.3,
      near: 0.1,
      far: 12,
    });
    key.shadow.normalBias = 0.012;
    key.shadow.bias = -0.00002;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xecf3ff, 1.2);
    fill.position.set(3, 2, -3);
    scene.add(fill);
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.ShadowMaterial({ color: "#665d54", opacity: 0.18 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.487;
    floor.receiveShadow = true;
    scene.add(floor);
    const yezi = createYezi();
    yezi.root.rotation.y = angle;
    scene.add(yezi.root);
    const seatY = floor.position.y + 0.36;
    const seat = new THREE.Group();
    seat.rotation.y = angle;
    scene.add(seat);
    const seatMaterial = new THREE.MeshStandardMaterial({
      color: "#af9170",
      roughness: 0.94,
    });
    const seatTop = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.055, 0.4), seatMaterial);
    seatTop.position.set(0, seatY - 0.0275, -0.11);
    seatTop.castShadow = true;
    seatTop.receiveShadow = true;
    seat.add(seatTop);
    for (const x of [-0.25, 0.25]) {
      for (const z of [-0.255, 0.035]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.305, 0.035), seatMaterial);
        leg.position.set(x, floor.position.y + 0.1525, z);
        leg.castShadow = true;
        seat.add(leg);
      }
    }
    let lastMode = "";
    let lastDetailView: boolean | undefined;
    // 切換到 404 姿勢的時間（秒）；扶頭與低頭坐姿從這裡開始播放，方便檢查過渡。
    let poseStart = 0;
    const notFoundPose: NotFoundPose = { support: 0, seated: 0, sigh: 0 };
    // 與小島相同：坐下比例在外面平滑，再同時用來擺姿勢與內插高度，長椅才會對齊。
    let seatMix = 0;
    let previousTime: number | undefined;
    // 跳躍狀態與小島相同：鞋底離地高度與垂直速度（世界單位），在地上時兩者皆為 0。
    let jumpHeight = 0;
    let jumpVelocity = 0;
    let landedAt = 0;
    // 一般模式持續呼叫 animate()，讓角色自己平滑切換（停步、走跑切換、揮手舉放都看得到過渡）。
    renderer.setAnimationLoop((timestamp) => {
      if (document.hidden) {
        return;
      }
      const time = timestamp / 1000;
      const dt = previousTime === undefined ? 0 : Math.min(Math.max(time - previousTime, 0), 0.05);
      previousTime = time;
      const seatTarget = mode === "sit" ? 1 : 0;
      seatMix = THREE.MathUtils.lerp(seatMix, seatTarget, 1 - Math.exp(-dt * 8));
      if (Math.abs(seatMix - seatTarget) < 0.001) {
        seatMix = seatTarget;
      }
      if (lastDetailView !== detailView) {
        camera.position.set(0, detailView ? 1.04 : 1.6, detailView ? 1.95 : 3.7);
        camera.lookAt(0, detailView ? 0.89 : 1.34, 0);
      }
      if (mode !== lastMode && (mode === "hold" || mode === "collapse")) {
        poseStart = time;
      }
      const jumping = mode === "jump" || mode === "run-jump";
      if (
        jumping &&
        jumpHeight === 0 &&
        jumpVelocity === 0 &&
        time - landedAt > JUMP_REST_SECONDS
      ) {
        jumpVelocity = JUMP_SPEED;
      }
      // 切到其他模式時，跳到一半的這一下仍會落地完成。
      if (jumpVelocity !== 0 || jumpHeight > 0) {
        jumpVelocity -= JUMP_GRAVITY * dt;
        jumpHeight = Math.max(0, jumpHeight + jumpVelocity * dt);
        if (jumpHeight === 0) {
          jumpVelocity = 0;
          landedAt = time;
        }
      }
      yezi.setAirborne(jumpHeight, jumpVelocity);
      if (mode === "hold" || mode === "collapse") {
        const poseTime = time - poseStart;
        if (mode === "hold") {
          // 只檢查扶頭：1.2 秒內把手舉到頭下緣，不坐下。
          yezi.setDisappointedPose(THREE.MathUtils.smootherstep(poseTime, 0, 1.2), 0);
        } else {
          // 與 404 頁相同的完整入場時間軸。
          getNotFoundPose(Math.min(poseTime, NOT_FOUND_ENTRANCE_SECONDS), notFoundPose);
          yezi.setDisappointedPose(notFoundPose.support, notFoundPose.seated, 0, notFoundPose.sigh);
        }
      } else {
        yezi.animate(
          time,
          mode === "walk" || mode === "run" || mode === "run-jump",
          mode === "wave",
          mode === "wind",
          false,
          seatMix,
          mode === "run" || mode === "run-jump",
        );
      }
      const notFound = mode === "hold" || mode === "collapse";
      seat.visible = !notFound && seatMix > 0;
      if (notFound) {
        // 404 姿勢已自行算好貼地高度（相對 y = 0），這裡只加上地板高度。
        yezi.root.position.y += floor.position.y;
      } else {
        const standingY = floor.position.y + jumpHeight * PREVIEW_JUMP_LIFT - yezi.getFootOffset();
        yezi.root.position.y =
          seatMix > 0
            ? THREE.MathUtils.lerp(standingY, seatY - yezi.getSeatOffset(), seatMix)
            : standingY;
      }
      renderer.render(scene, camera);
      lastMode = mode;
      lastDetailView = detailView;
    });
    // 停止繪圖後，再釋放共用材質、貼圖和幾何，避免切頁留下 WebGL 資源。
    cleanups.push(() => {
      renderer.setAnimationLoop(null);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      const textures = new Set<THREE.Texture>();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          geometries.add(o.geometry);
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => materials.add(m));
        }
      });
      materials.forEach((m) => {
        Object.values(m).forEach((value) => {
          if (value instanceof THREE.Texture) {
            textures.add(value);
          }
        });
        m.dispose();
      });
      textures.forEach((t) => t.dispose());
      geometries.forEach((g) => g.dispose());
      renderer.dispose();
    });
  }
  function cleanup() {
    events.abort();
    cleanups.forEach((fn) => fn());
  }
  document.addEventListener("astro:before-swap", cleanup, {
    once: true,
    signal: events.signal,
  });
  window.addEventListener(
    "pagehide",
    (e) => {
      if (!e.persisted) {
        cleanup();
      }
    },
    { signal: events.signal },
  );
}
