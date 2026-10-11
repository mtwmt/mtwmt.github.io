import { home, panels, messages, type PanelId } from "../../data/home";
import { destinations, type DestinationId, type InteractionId } from "../../data/island";
import { requireElement } from "./dom";
import type { IslandWorld } from "./world";

export function initIsland() {
  const candidate = document.getElementById("island-stage");
  if (!candidate || candidate.dataset.initialized) return;
  const stage: HTMLElement = candidate;
  stage.dataset.initialized = "true";
  const controller = new AbortController(),
    { signal } = controller;
  const dialog = requireElement("#island-dialog", HTMLDialogElement);
  const title = requireElement("#dialog-title", HTMLHeadingElement);
  const eyebrow = requireElement("#dialog-eyebrow", HTMLParagraphElement);
  const description = requireElement("#dialog-description", HTMLParagraphElement);
  const toast = requireElement("#island-toast", HTMLDivElement);
  const startButton = requireElement("#start-exploring", HTMLButtonElement);
  const shell = requireElement(".game-shell", HTMLElement);
  const dialogPanels = document.querySelectorAll<HTMLElement>("[data-dialog-panel]");
  let world: IslandWorld | undefined;
  let toastTimer: ReturnType<typeof setTimeout> | undefined;
  let opener: Element | null = null;
  let started = false;
  function notify(message: string) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("visible");
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 4000);
  }
  // 標題區共用，面板 HTML 留在 ContentDialog.astro，這裡只切換可見性。
  function openDialog(panelId: PanelId, label: string, heading: string, body: string) {
    eyebrow.textContent = label;
    title.textContent = heading;
    description.textContent = body;
    dialogPanels.forEach((panel) => {
      panel.hidden = panel.dataset.dialogPanel !== panelId;
    });
    world?.suspend(true);
    if (!dialog.open) {
      opener = document.activeElement;
      dialog.showModal();
    }
    dialog.scrollTop = 0;
  }

  function openPanel(id: PanelId) {
    const panel = panels[id];
    openDialog(id, panel.eyebrow, panel.title, panel.description);
  }

  function activate(place: InteractionId) {
    switch (place) {
      case "bench":
        notify(world?.toggleSeat() ? messages.seated : messages.standing);
        return;
      case "wind":
        world?.wind();
        notify(messages.wind);
        return;
      case "yezi":
        world?.wave();
        notify(messages.greeting);
        return;
      default:
        openPanel(place);
    }
  }

  // DOM 的 data-* 是字串；先確認它是合法地標，再交給遊戲。
  function isDestination(value: string | undefined): value is DestinationId {
    return value !== undefined && Object.hasOwn(destinations, value);
  }
  function start() {
    if (!world) return;
    started = true;
    requireElement("#welcome", HTMLElement).classList.add("dismissed");
    shell.classList.add("playing");
    world.start();
  }
  startButton.addEventListener("click", start, { signal });
  function travelTo(place: DestinationId) {
    if (!world) return;
    start();
    world.travel(place);
    notify(messages.arrived);
  }
  document.querySelectorAll<HTMLButtonElement>("[data-place], [data-travel]").forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        const destination = button.dataset.place ?? button.dataset.travel;
        if (isDestination(destination)) travelTo(destination);
      },
      { signal },
    );
  });
  document.querySelectorAll<HTMLButtonElement>("[data-open]").forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        const destination = button.dataset.open;
        if (isDestination(destination)) activate(destination);
      },
      { signal },
    );
  });
  requireElement("#interact", HTMLButtonElement).addEventListener(
    "click",
    () => world?.interact(),
    { signal },
  );
  requireElement("#jump-button", HTMLButtonElement).addEventListener(
    "click",
    () => {
      start();
      world?.jump();
    },
    { signal },
  );
  requireElement("#help-toggle", HTMLButtonElement).addEventListener(
    "click",
    () => openPanel("help"),
    { signal },
  );
  const joystick = requireElement("#joystick", HTMLDivElement),
    thumb = requireElement("#joystick-thumb", HTMLSpanElement);
  let joystickPointer: number | null = null;
  function moveStick(e: PointerEvent) {
    const r = joystick.getBoundingClientRect(),
      x = e.clientX - r.left - r.width / 2,
      y = e.clientY - r.top - r.height / 2,
      len = Math.hypot(x, y),
      scale = Math.min(1, 35 / Math.max(1, len));
    thumb.style.transform = `translate(${x * scale}px,${y * scale}px)`;
    world?.joystick((x * scale) / 35, (y * scale) / 35);
  }
  joystick.addEventListener(
    "pointerdown",
    (e) => {
      start();
      joystickPointer = e.pointerId;
      joystick.setPointerCapture(e.pointerId);
      moveStick(e);
    },
    { signal },
  );
  joystick.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerId === joystickPointer) moveStick(e);
    },
    { signal },
  );
  function releaseStick() {
    joystickPointer = null;
    thumb.style.transform = "";
    world?.joystick(0, 0);
  }
  joystick.addEventListener("pointerup", releaseStick, { signal });
  joystick.addEventListener("pointercancel", releaseStick, { signal });
  window.addEventListener("blur", releaseStick, { signal });
  requireElement(".dialog-close", HTMLButtonElement).addEventListener(
    "click",
    () => dialog.close(),
    { signal },
  );
  dialog.addEventListener(
    "click",
    (e) => {
      if (e.target === dialog) {
        const rect = dialog.getBoundingClientRect();
        if (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        )
          dialog.close();
      }
    },
    { signal },
  );
  dialog.addEventListener(
    "close",
    () => {
      world?.suspend(false);
      if (started) stage.focus({ preventScroll: true });
      else if (opener instanceof HTMLElement && opener.isConnected)
        opener.focus({ preventScroll: true });
    },
    { signal },
  );
  requireElement("#reset-view", HTMLButtonElement).addEventListener(
    "click",
    () => {
      start();
      world?.reset();
      notify(messages.reset);
    },
    { signal },
  );
  function failed() {
    const status = requireElement("#scene-status", HTMLDivElement);
    status.hidden = false;
    requireElement("#scene-status p", HTMLParagraphElement).textContent = messages.sceneFailed;
    requireElement("#scene-fallback-actions", HTMLDivElement).hidden = false;
    shell.classList.add("scene-failed");
    requireElement("#reset-view", HTMLButtonElement).disabled = true;
  }
  /**
   * 白天／夜晚與筆記頁的深色模式共用 localStorage 的 theme；
   * 沒有設定過就跟著系統，系統切換時也同步。
   */
  function initTimeOfDay(islandWorld: IslandWorld) {
    const toggle = requireElement("#night-toggle", HTMLButtonElement);
    const systemDark = matchMedia("(prefers-color-scheme: dark)");
    const stored = (): string | null => {
      try {
        return localStorage.getItem("theme");
      } catch {
        return null;
      }
    };
    const preferredNight = () => {
      const theme = stored();
      return theme === "dark" || (theme !== "light" && systemDark.matches);
    };
    let night = preferredNight();
    const render = (instant: boolean) => {
      islandWorld.setNight(night, instant);
      document.documentElement.classList.toggle("dark", night);
      toggle.setAttribute("aria-pressed", String(night));
      toggle.setAttribute("aria-label", night ? "切換成白天" : "切換成夜晚");
    };
    render(true);
    toggle.addEventListener(
      "click",
      () => {
        night = !night;
        try {
          localStorage.setItem("theme", night ? "dark" : "light");
        } catch {
          // 無痕模式等情況存不了設定，仍然可以切換。
        }
        render(false);
      },
      { signal },
    );
    systemDark.addEventListener(
      "change",
      () => {
        if (stored()) return;
        night = systemDark.matches;
        render(false);
      },
      { signal },
    );
  }
  // 遊戲獨立載入；文章與作品的快捷入口不依賴 WebGL。
  import("./world")
    .then(({ createWorld }) => {
      if (signal.aborted) return;
      try {
        world = createWorld(
          stage,
          activate,
          () => {
            requireElement("#scene-status", HTMLDivElement).hidden = true;
            requireElement("#landmarks", HTMLDivElement).hidden = false;
            startButton.disabled = false;
            startButton.replaceChildren(document.createTextNode(home.startLabel));
          },
          failed,
        );
        world.suspend(dialog.open);
        initTimeOfDay(world);
      } catch (error) {
        console.warn("Island scene unavailable:", error);
        failed();
      }
    })
    .catch((error) => {
      if (!signal.aborted) {
        console.warn("Island loading failed:", error);
        failed();
      }
    });
  function cleanup() {
    controller.abort();
    world?.dispose();
    clearTimeout(toastTimer);
    delete stage.dataset.initialized;
  }
  document.addEventListener("astro:before-swap", cleanup, {
    once: true,
    signal,
  });
  window.addEventListener(
    "pagehide",
    (e) => {
      if (!e.persisted) cleanup();
    },
    { signal },
  );
}
document.addEventListener("astro:page-load", initIsland);
