import * as THREE from "three";
import { createYezi } from "./character";

/** 404 姿勢比例：support 扶頭、seated 坐下低頭（皆 0～1），sigh 嘆氣（正吸氣、負吐氣）。 */
export interface NotFoundPose {
  support: number;
  seated: number;
  sigh: number;
}

/** 入場動畫總長（秒）；之後定格，只偶爾播放嘆氣。 */
export const NOT_FOUND_ENTRANCE_SECONDS = 4.4;
/** 定格後每次嘆氣與輕晃的長度（秒）。 */
const IDLE_SECONDS = 3;

/** 0→1→0 的鐘形曲線：在 [start, end] 外為 0，起點、頂點、終點的斜率都是 0。 */
function bell(time: number, start: number, end: number): number {
  if (time <= start || time >= end) return 0;
  return Math.sin((Math.PI * (time - start)) / (end - start)) ** 2;
}

/**
 * 入場時間軸（秒），結果寫進 out 以免每幀配置物件：
 * - 0.15～1.0 先輕輕吸一口氣（肩膀上抬），
 * - 0.5～1.7 雙手繞過肚子舉到頭下緣，
 * - 1.35～3.7 坐下低頭；與抬手重疊 0.35 秒，手還在收尾時身體已開始往下，動作才連貫，
 * - 3.2～4.3 坐定後吐氣再垮一點，最後回到 0，與定格姿勢完全相同。
 * 全部使用 smootherstep（五次多項式），起訖的速度與加速度都是 0，不會硬起步或撞停。
 */
export function getNotFoundPose(time: number, out: NotFoundPose): NotFoundPose {
  out.support = THREE.MathUtils.smootherstep(time, 0.5, 1.7);
  out.seated = THREE.MathUtils.smootherstep(time, 1.35, 3.7);
  out.sigh = 0.45 * bell(time, 0.15, 1.0) - 0.55 * bell(time, 3.2, 4.3);
  return out;
}

/** 定格後的嘆氣：先吸氣抬肩（約 0.8 秒），再吐氣垮下（約 1.9 秒），3 秒內回到 0。 */
function getIdleSigh(time: number): number {
  return bell(time, 0, 1.6) - 0.6 * bell(time, 1.0, 2.9);
}

/**
 * 吐氣時上半身輕輕左右晃（弧度）：0.25 秒內平滑起步，之後以指數衰減，
 * 最後 0.4 秒再收到 0；是柔和的阻尼晃動，不是高頻抖動。
 */
function getIdleSway(time: number): number {
  const local = time - 1.0;
  if (local <= 0 || local >= 1.95) return 0;
  const envelope =
    THREE.MathUtils.smoothstep(local, 0, 0.25) *
    Math.exp(-1.6 * local) *
    (1 - THREE.MathUtils.smoothstep(local, 1.55, 1.95));
  return 0.035 * Math.sin(Math.PI * 2 * 1.15 * local) * envelope;
}

/** 404 入場只播放一次，停在低頭坐姿；偶爾嘆氣輕晃，切頁時釋放 WebGL。 */
export function initializeNotFoundCharacter(): void {
  const element = document.querySelector<HTMLElement>("[data-yezi-not-found]");
  if (!element || element.dataset.initialized === "true") return;
  const host = element;
  host.dataset.initialized = "true";
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  } catch {
    host.hidden = true;
    return;
  }
  const events = new AbortController();
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const scene = new THREE.Scene();
  const viewHeight = 2.15;
  const camera = new THREE.OrthographicCamera(-1, 1, viewHeight / 2, -viewHeight / 2, 0.1, 20);
  camera.position.set(0, 1.15, 4.4);
  camera.lookAt(0, 0.78, 0);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  host.append(renderer.domElement);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb5aca3, 1.7));
  const key = new THREE.DirectionalLight(0xfffaf4, 3.1);
  key.position.set(-3, 5, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -2, right: 2, top: 3, bottom: -1, near: 0.1, far: 12 });
  key.shadow.normalBias = 0.012;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xecf3ff, 1.2);
  fill.position.set(3, 2, -3);
  scene.add(fill);
  // 腳下用柔邊圓形陰影：投在大地板上的即時陰影會被陰影相機範圍切成一條硬邊灰帶。
  // 角色身上的自身陰影仍由 shadowMap 處理。
  const blobCanvas = document.createElement("canvas");
  blobCanvas.width = blobCanvas.height = 128;
  const blobContext = blobCanvas.getContext("2d");
  if (!blobContext) throw new Error("無法建立 404 陰影的 Canvas 2D context。");
  const blobGradient = blobContext.createRadialGradient(64, 64, 0, 64, 64, 64);
  blobGradient.addColorStop(0, "rgba(102, 93, 84, 0.32)");
  blobGradient.addColorStop(0.55, "rgba(102, 93, 84, 0.14)");
  blobGradient.addColorStop(1, "rgba(102, 93, 84, 0)");
  blobContext.fillStyle = blobGradient;
  blobContext.fillRect(0, 0, 128, 128);
  const blobTexture = new THREE.CanvasTexture(blobCanvas);
  blobTexture.colorSpace = THREE.SRGBColorSpace;
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({ map: blobTexture, transparent: true, depthWrite: false }),
  );
  floor.rotation.x = -Math.PI / 2;
  // 坐下時雙腳伸向角色前方（斜向鏡頭左下），陰影中心略往前移；壓扁成橢圓較像接觸陰影。
  floor.position.set(-0.07, 0.002, 0.1);
  floor.scale.set(1, 0.72, 1);
  scene.add(floor);
  const yezi = createYezi();
  scene.add(yezi.root);
  // 斜側面能同時看見低頭角度和前方的雙腳，避免正面投影把腿藏在腹部後。
  const angle = -0.65;
  yezi.root.rotation.y = angle;
  const pose: NotFoundPose = { support: 0, seated: 0, sigh: 0 };
  let elapsed = 0;
  // 定格後偶爾播放的嘆氣動作已經播了幾秒；undefined 表示目前沒有播放。
  let idleTime: number | undefined;
  let previousTime: number | undefined;
  let frame: number | undefined;
  let timer: number | undefined;
  let disposed = false;

  function render(): void {
    const time = reducedMotion.matches ? NOT_FOUND_ENTRANCE_SECONDS : elapsed;
    getNotFoundPose(time, pose);
    host.dataset.phase =
      time < 0.5
        ? "standing"
        : time < 1.35
          ? "raising"
          : time < 1.7
            ? "holding"
            : time < 3.7
              ? "sitting"
              : "seated";
    const idle = idleTime === undefined || reducedMotion.matches ? 0 : idleTime;
    yezi.setDisappointedPose(
      pose.support,
      pose.seated,
      getIdleSway(idle),
      pose.sigh + getIdleSigh(idle),
    );
    renderer.render(scene, camera);
  }
  function stop(): void {
    if (frame !== undefined) cancelAnimationFrame(frame);
    if (timer !== undefined) window.clearTimeout(timer);
    frame = undefined;
    timer = undefined;
    previousTime = undefined;
    // 中斷時直接回到定格姿勢；分頁隱藏時看不到，回來也不會停在搖到一半的角度。
    idleTime = undefined;
  }
  /** 依 requestAnimationFrame 時間戳記推進秒數；單幀最多 1/30 秒，首幀編譯著色器卡住時不會跳格。 */
  function advance(timestamp: number): number {
    const step =
      previousTime === undefined
        ? 0
        : Math.min(Math.max((timestamp - previousTime) / 1000, 0), 1 / 30);
    previousTime = timestamp;
    return step;
  }
  function scheduleIdle(): void {
    if (disposed || reducedMotion.matches || document.hidden) return;
    // 靜止時不持續繪圖；每隔約七秒播放一次約三秒的嘆氣與輕晃，播完回到完全相同的定格姿勢。
    timer = window.setTimeout(() => {
      timer = undefined;
      idleTime = 0;
      previousTime = undefined;
      function play(timestamp: number): void {
        if (disposed || document.hidden || idleTime === undefined) return;
        idleTime += advance(timestamp);
        if (idleTime >= IDLE_SECONDS) {
          idleTime = undefined;
          render();
          scheduleIdle();
          return;
        }
        render();
        frame = requestAnimationFrame(play);
      }
      frame = requestAnimationFrame(play);
    }, 7000);
  }
  function animate(timestamp: number): void {
    if (disposed || document.hidden) return;
    elapsed = Math.min(elapsed + advance(timestamp), NOT_FOUND_ENTRANCE_SECONDS);
    render();
    if (elapsed < NOT_FOUND_ENTRANCE_SECONDS) frame = requestAnimationFrame(animate);
    else scheduleIdle();
  }
  function resume(): void {
    if (disposed || document.hidden) return;
    render();
    if (reducedMotion.matches) return;
    if (elapsed < NOT_FOUND_ENTRANCE_SECONDS) frame = requestAnimationFrame(animate);
    else scheduleIdle();
  }
  const resize = new ResizeObserver(() => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.left = -((viewHeight * width) / height) / 2;
    camera.right = (viewHeight * width) / height / 2;
    camera.updateProjectionMatrix();
    render();
  });
  resize.observe(host);
  reducedMotion.addEventListener(
    "change",
    () => {
      stop();
      elapsed = NOT_FOUND_ENTRANCE_SECONDS;
      resume();
    },
    { signal: events.signal },
  );
  document.addEventListener(
    "visibilitychange",
    () => {
      stop();
      resume();
    },
    { signal: events.signal },
  );
  function cleanup(): void {
    if (disposed) return;
    disposed = true;
    stop();
    events.abort();
    resize.disconnect();
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    const textures = new Set<THREE.Texture>();
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        geometries.add(object.geometry);
        for (const material of Array.isArray(object.material) ? object.material : [object.material])
          materials.add(material);
      }
    });
    for (const material of materials) {
      for (const value of Object.values(material))
        if (value instanceof THREE.Texture) textures.add(value);
      material.dispose();
    }
    textures.forEach((texture) => texture.dispose());
    geometries.forEach((geometry) => geometry.dispose());
    key.shadow.dispose();
    renderer.dispose();
    renderer.domElement.remove();
    delete host.dataset.initialized;
  }
  document.addEventListener("astro:before-swap", cleanup, { once: true, signal: events.signal });
  window.addEventListener(
    "pagehide",
    (event) => {
      if (event.persisted) stop();
      else cleanup();
    },
    { signal: events.signal },
  );
  window.addEventListener(
    "pageshow",
    (event) => {
      if (event.persisted) resume();
    },
    { signal: events.signal },
  );
  resume();
}
