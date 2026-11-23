/**
 * The PDF reader: draws a document into the `PdfViewer` dialog. It is loaded only when a document is opened.
 *
 * A "leaf" is what the counter and the URL count. A plain document has one leaf per page, shown one at a time. In a
 * `book` a PDF page wider than it is tall holds two leaves: a wide screen shows it whole, a phone shows each half on
 * its own, and the pages between the covers face each other. Only the pages around the current one stay drawn, so a
 * long document does not fill a phone's memory.
 */
import { getDocument, GlobalWorkerOptions, type PDFPageProxy, type RenderTask } from "pdfjs-dist/legacy/build/pdf.mjs";
import workerUrl from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?worker&url";

GlobalWorkerOptions.workerSrc = workerUrl;

const MAX_ZOOM = 5;
const ZOOM_STEP = 1.6;
const TAP_ZOOM = 2.5;
const TAP_DISTANCE = 8;
const SWIPE_DISTANCE = 60;
const DOUBLE_TAP_MS = 300;
const WIDE_PAGE = 1.15;
const PHONE_WIDTH = 768;
const THUMB_HEIGHT = 64;

/** A piece of a PDF page on screen; `half` is set when a phone shows one side of a two-page sheet. */
interface Part {
  page: number;
  half: 0 | 1 | null;
  width: number;
  height: number;
}

interface View {
  parts: Part[];
  first: number;
  last: number;
  width: number;
  height: number;
  fit: number;
  drawn: number;
  sheet: HTMLElement;
  thumb: HTMLButtonElement;
  thumbDrawn: boolean;
}

export interface PdfSession {
  goToLeaf: (leaf: number) => void;
  destroy: () => void;
}

export function openPdf(dialog: HTMLDialogElement, file: string, startLeaf: number, book: boolean, onLeaf: (leaf: number) => void): PdfSession {
  const find = <T extends HTMLElement>(name: string) => dialog.querySelector<T>(`[data-pdf-${name}]`)!;
  const stage = find("stage");
  const track = find("track");
  const thumbs = find("thumbs");
  const loader = find("loader");
  const percent = find("percent");
  const failure = find("error");
  const pageInput = find<HTMLInputElement>("page");
  const total = find("total");
  const range = find<HTMLInputElement>("range");
  const prev = find<HTMLButtonElement>("prev");
  const next = find<HTMLButtonElement>("next");
  const fullscreen = find<HTMLButtonElement>("fullscreen");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const events = new AbortController();
  const { signal } = events;

  let alive = true;
  let pages: PDFPageProxy[] = [];
  let leafCount = 0;
  let views: View[] = [];
  let phone = false;
  let index = 0;
  let leaf = startLeaf;
  let zoom = 1;
  let x = 0;
  let y = 0;

  const current = () => views[index];

  const showFailure = () => {
    loader.hidden = true;
    failure.hidden = false;
  };

  /* Layout */

  const buildViews = (): Omit<View, "fit" | "drawn" | "sheet" | "thumb" | "thumbDrawn">[] => {
    const isWide = (page: PDFPageProxy) => {
      const { width, height } = page.getViewport({ scale: 1 });
      return width > height * WIDE_PAGE;
    };
    const result: Omit<View, "fit" | "drawn" | "sheet" | "thumb" | "thumbDrawn">[] = [];
    const add = (parts: Part[], first: number, last: number) =>
      result.push({ parts, first, last, width: parts.reduce((sum, part) => sum + part.width, 0), height: Math.max(...parts.map((part) => part.height)) });

    let number = 1;
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i]!;
      const { width, height } = page.getViewport({ scale: 1 });
      if (!book) {
        add([{ page: i, half: null, width, height }], number, number);
        number++;
        continue;
      }
      if (isWide(page)) {
        if (phone) {
          add([{ page: i, half: 0, width: width / 2, height }], number, number);
          add([{ page: i, half: 1, width: width / 2, height }], number + 1, number + 1);
        } else {
          add([{ page: i, half: null, width, height }], number, number + 1);
        }
        number += 2;
        continue;
      }
      const following = pages[i + 1];
      // The covers stand alone, the pages between them face each other as in the printed book.
      if (!phone && i > 0 && following && i + 1 < pages.length - 1 && !isWide(following)) {
        const size = following.getViewport({ scale: 1 });
        add([{ page: i, half: null, width, height }, { page: i + 1, half: null, width: size.width, height: size.height }], number, number + 1);
        number += 2;
        i++;
        continue;
      }
      add([{ page: i, half: null, width, height }], number, number);
      number++;
    }
    leafCount = number - 1;
    return result;
  };

  const layout = () => {
    const gap = phone ? 0 : 32;
    const width = Math.max(1, stage.clientWidth - gap * 2);
    const height = Math.max(1, stage.clientHeight - gap);
    for (const view of views) {
      view.fit = Math.min(width / view.width, height / view.height);
      view.sheet.style.width = `${Math.round(view.width * view.fit)}px`;
      view.sheet.style.height = `${Math.round(view.height * view.fit)}px`;
    }
  };

  const build = () => {
    phone = innerWidth <= PHONE_WIDTH;
    const plans = buildViews();
    const slides: HTMLElement[] = [];
    const buttons: HTMLElement[] = [];
    observer.disconnect();
    views = plans.map((plan) => {
      const slide = document.createElement("div");
      slide.className = "pdf-view-slide";
      const sheet = document.createElement("div");
      sheet.className = "pdf-view-sheet";
      slide.append(sheet);
      slides.push(slide);

      const thumb = document.createElement("button");
      thumb.type = "button";
      thumb.className = "pdf-view-thumb";
      thumb.style.aspectRatio = `${plan.width} / ${plan.height}`;
      thumb.setAttribute("aria-label", `${thumbs.dataset.label} ${label(plan.first, plan.last)}`);
      buttons.push(thumb);
      return { ...plan, fit: 1, drawn: 0, sheet, thumb, thumbDrawn: false };
    });
    track.replaceChildren(...slides);
    thumbs.replaceChildren(...buttons);
    views.forEach((view, i) => {
      view.thumb.dataset.index = String(i);
      observer.observe(view.thumb);
    });
    total.textContent = String(leafCount);
    range.max = String(leafCount);
    // A one-page document needs no page controls.
    for (const control of [thumbs, range, prev, next, pageInput.closest<HTMLElement>("label")!]) control.style.display = views.length < 2 ? "none" : "";
    leaf = Math.min(Math.max(1, leaf), leafCount);
    index = Math.max(0, views.findIndex((view) => leaf >= view.first && leaf <= view.last));
    layout();
    place(false);
    update();
  };

  const label = (first: number, last: number) => (first === last ? String(first) : `${first}–${last}`);

  const place = (animate: boolean, offset = 0) => {
    track.style.transition = animate && !reducedMotion.matches ? "transform 280ms ease" : "none";
    track.style.transform = `translate3d(calc(${-index * 100}% + ${offset}px), 0, 0)`;
  };

  const update = () => {
    const view = current();
    if (!view) return;
    if (document.activeElement !== pageInput) pageInput.value = label(view.first, view.last);
    range.value = String(view.first);
    prev.disabled = index === 0;
    next.disabled = index === views.length - 1;
    views.forEach((other, i) => other.thumb.setAttribute("aria-current", String(i === index)));
    if (thumbs.clientWidth > 0) {
      thumbs.scrollTo({
        left: view.thumb.offsetLeft - thumbs.clientWidth / 2 + view.thumb.offsetWidth / 2,
        behavior: reducedMotion.matches ? "auto" : "smooth",
      });
    }
  };

  const go = (target: number, animate = true) => {
    const nextIndex = Math.min(views.length - 1, Math.max(0, target));
    if (nextIndex !== index) resetZoom();
    index = nextIndex;
    leaf = views[index]!.first;
    place(animate);
    update();
    onLeaf(leaf);
    schedule();
  };

  /* Drawing: one page at a time, the current one first. */

  let running = false;
  let again = false;
  let drawing = -2;
  let task: RenderTask | null = null;

  const pixelScale = (view: View, factor: number) => {
    const limit = matchMedia("(pointer: coarse)").matches ? 6e6 : 14e6;
    const wanted = view.fit * Math.min(devicePixelRatio || 1, 3) * factor;
    return Math.min(wanted, Math.sqrt(limit / (view.width * view.height)));
  };

  const drawPart = async (part: Part, scale: number) => {
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(part.width * scale));
    canvas.height = Math.max(1, Math.round(part.height * scale));
    const viewport = pages[part.page]!.getViewport({ scale, offsetX: part.half === 1 ? -part.width * scale : 0 });
    task = pages[part.page]!.render({ canvas, viewport });
    await task.promise;
    task = null;
    return canvas;
  };

  const drawView = async (i: number) => {
    const view = views[i]!;
    const scale = pixelScale(view, i === index ? zoom : 1);
    if (view.drawn >= scale * 0.9) return;
    drawing = i;
    const canvases: HTMLCanvasElement[] = [];
    for (const part of view.parts) {
      const canvas = await drawPart(part, scale);
      canvas.className = "pdf-view-canvas";
      canvas.style.width = `${(part.width / view.width) * 100}%`;
      canvases.push(canvas);
    }
    if (!alive || views[i] !== view) return;
    for (const old of view.sheet.querySelectorAll("canvas")) old.width = old.height = 0;
    view.sheet.replaceChildren(...canvases);
    view.drawn = scale;
    if (i === index) loader.hidden = true;
  };

  const drawThumb = async (view: View) => {
    drawing = -1;
    const scale = (THUMB_HEIGHT * Math.min(devicePixelRatio || 1, 2)) / view.height;
    const canvases: HTMLCanvasElement[] = [];
    for (const part of view.parts) {
      const canvas = await drawPart(part, scale);
      canvas.className = "pdf-view-canvas";
      canvas.style.width = `${(part.width / view.width) * 100}%`;
      canvases.push(canvas);
    }
    if (!alive) return;
    view.thumb.replaceChildren(...canvases);
    view.thumbDrawn = true;
  };

  const forgetFarViews = () => {
    const near = new Set<number>();
    views.forEach((view, i) => {
      if (Math.abs(i - index) > 2) {
        if (view.drawn === 0) return;
        for (const old of view.sheet.querySelectorAll("canvas")) old.width = old.height = 0;
        view.sheet.replaceChildren();
        view.drawn = 0;
      } else {
        for (const part of view.parts) near.add(part.page);
      }
    });
    pages.forEach((page, i) => {
      if (!near.has(i)) page.cleanup();
    });
  };

  const work = async () => {
    for (const i of [index, index + 1, index - 1]) {
      if (!views[i]) continue;
      await drawView(i);
      if (again || !alive) return;
    }
    forgetFarViews();
    for (const view of visibleThumbs) {
      if (view.thumbDrawn) continue;
      await drawThumb(view);
      if (again || !alive) return;
    }
  };

  const pump = async () => {
    if (running) return;
    running = true;
    do {
      again = false;
      try {
        await work();
      } catch (error) {
        const cancelled = error instanceof Error && error.name === "RenderingCancelledException";
        if (!cancelled && alive) {
          if (!current()?.drawn) showFailure();
          else console.warn(error);
        }
      }
    } while (again && alive);
    drawing = -2;
    running = false;
  };

  const schedule = () => {
    if (!alive) return;
    if (running) {
      again = true;
      if (drawing !== index) task?.cancel();
      return;
    }
    void pump();
  };

  const visibleThumbs = new Set<View>();
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const view = views[Number((entry.target as HTMLElement).dataset.index)];
      if (!view) continue;
      if (entry.isIntersecting) visibleThumbs.add(view);
      else visibleThumbs.delete(view);
    }
    schedule();
  }, { root: thumbs, rootMargin: "200px" });

  /* Zoom */

  const applyZoom = (animate = false) => {
    const view = current();
    if (!view) return;
    const limitX = Math.max(0, (view.width * view.fit * zoom - stage.clientWidth) / 2);
    const limitY = Math.max(0, (view.height * view.fit * zoom - stage.clientHeight) / 2);
    x = Math.min(limitX, Math.max(-limitX, x));
    y = Math.min(limitY, Math.max(-limitY, y));
    view.sheet.style.transition = animate && !reducedMotion.matches ? "transform 200ms ease" : "none";
    view.sheet.style.transform = zoom === 1 ? "" : `translate(${x}px, ${y}px) scale(${zoom})`;
    stage.style.cursor = zoom > 1 ? "grab" : "";
  };

  let settle = 0;
  const zoomTo = (target: number, pointX = 0, pointY = 0, animate = false) => {
    const nextZoom = Math.min(MAX_ZOOM, Math.max(1, target));
    const ratio = nextZoom / zoom;
    x = pointX - (pointX - x) * ratio;
    y = pointY - (pointY - y) * ratio;
    zoom = nextZoom;
    if (zoom === 1) x = y = 0;
    applyZoom(animate);
    // The sharper drawing waits until the zoom stops changing.
    clearTimeout(settle);
    settle = window.setTimeout(schedule, 220);
  };

  const resetZoom = () => {
    const view = current();
    zoom = 1;
    x = y = 0;
    if (view) view.sheet.style.transform = "";
    stage.style.cursor = "";
  };

  const fromCentre = (clientX: number, clientY: number) => {
    const box = stage.getBoundingClientRect();
    return { x: clientX - box.left - box.width / 2, y: clientY - box.top - box.height / 2 };
  };

  /* Gestures */

  const pointers = new Map<number, { x: number; y: number }>();
  let start = { x: 0, y: 0 };
  let moved = false;
  let pinched = false;
  let lastTap = { time: 0, x: 0, y: 0 };

  const pinch = () => {
    const [a, b] = [...pointers.values()] as [{ x: number; y: number }, { x: number; y: number }];
    return { distance: Math.hypot(a.x - b.x, a.y - b.y), x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  };

  stage.addEventListener("pointerdown", (event) => {
    if ((event.target as Element).closest("button, a")) return;
    stage.setPointerCapture(event.pointerId);
    if (pointers.size === 0) {
      start = { x: event.clientX, y: event.clientY };
      moved = false;
      pinched = false;
    }
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size > 1) {
      pinched = true;
      place(true);
    }
  }, { signal });

  stage.addEventListener("pointermove", (event) => {
    const last = pointers.get(event.pointerId);
    if (!last) return;
    if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > TAP_DISTANCE) moved = true;
    if (pointers.size === 2) {
      const before = pinch();
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      const after = pinch();
      const point = fromCentre(after.x, after.y);
      if (before.distance > 0) zoomTo(zoom * (after.distance / before.distance), point.x, point.y);
      x += after.x - before.x;
      y += after.y - before.y;
      applyZoom();
      return;
    }
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (zoom > 1) {
      x += event.clientX - last.x;
      y += event.clientY - last.y;
      applyZoom();
    } else if (moved && !pinched) {
      const dx = event.clientX - start.x;
      const atEdge = (dx > 0 && index === 0) || (dx < 0 && index === views.length - 1);
      place(false, atEdge ? dx * 0.3 : dx);
    }
  }, { signal });

  const release = (event: PointerEvent) => {
    if (!pointers.delete(event.pointerId) || pointers.size > 0) return;
    if (event.type === "pointercancel" || pinched) {
      place(true);
      return;
    }
    if (!moved) {
      const isDouble = event.timeStamp - lastTap.time < DOUBLE_TAP_MS && Math.hypot(event.clientX - lastTap.x, event.clientY - lastTap.y) < 30;
      lastTap = isDouble ? { time: 0, x: 0, y: 0 } : { time: event.timeStamp, x: event.clientX, y: event.clientY };
      if (isDouble) {
        const point = fromCentre(event.clientX, event.clientY);
        zoomTo(zoom > 1 ? 1 : TAP_ZOOM, point.x, point.y, true);
      }
      return;
    }
    if (zoom > 1) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy)) {
      const before = index;
      go(index + (dx < 0 ? 1 : -1));
      if (index === before) place(true);
    } else {
      place(true);
    }
  };
  stage.addEventListener("pointerup", release, { signal });
  stage.addEventListener("pointercancel", release, { signal });

  stage.addEventListener("wheel", (event) => {
    event.preventDefault();
    const point = fromCentre(event.clientX, event.clientY);
    zoomTo(zoom * Math.exp(-Math.max(-100, Math.min(100, event.deltaY)) * 0.004), point.x, point.y);
  }, { passive: false, signal });

  /* Controls */

  prev.addEventListener("click", () => go(index - 1), { signal });
  next.addEventListener("click", () => go(index + 1), { signal });
  find("zoom-in").addEventListener("click", () => zoomTo(zoom * ZOOM_STEP, 0, 0, true), { signal });
  find("zoom-out").addEventListener("click", () => zoomTo(zoom / ZOOM_STEP, 0, 0, true), { signal });
  thumbs.addEventListener("click", (event) => {
    const button = (event.target as Element).closest<HTMLElement>("[data-index]");
    if (button) go(Number(button.dataset.index));
  }, { signal });

  const goToLeaf = (target: number, animate = true) => {
    if (views.length === 0) {
      leaf = target;
      return;
    }
    const clamped = Math.min(leafCount, Math.max(1, target));
    const found = views.findIndex((view) => clamped >= view.first && clamped <= view.last);
    if (found >= 0) go(found, animate);
  };

  pageInput.addEventListener("focus", () => pageInput.select(), { signal });
  pageInput.addEventListener("change", () => {
    const value = Number.parseInt(pageInput.value, 10);
    if (Number.isFinite(value)) goToLeaf(value);
    pageInput.blur();
    update();
  }, { signal });
  pageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") pageInput.blur();
  }, { signal });
  pageInput.addEventListener("blur", update, { signal });
  range.addEventListener("input", () => goToLeaf(Number(range.value), false), { signal });

  // On the document: after the page field loses focus, keys no longer pass through the dialog.
  document.addEventListener("keydown", (event) => {
    if (event.target === range || event.target === pageInput) return;
    const actions: Record<string, () => void> = {
      ArrowLeft: () => go(index - 1),
      ArrowRight: () => go(index + 1),
      PageUp: () => go(index - 1),
      PageDown: () => go(index + 1),
      Home: () => go(0),
      End: () => go(views.length - 1),
      "+": () => zoomTo(zoom * ZOOM_STEP, 0, 0, true),
      "=": () => zoomTo(zoom * ZOOM_STEP, 0, 0, true),
      "-": () => zoomTo(zoom / ZOOM_STEP, 0, 0, true),
      "0": () => zoomTo(1, 0, 0, true),
    };
    const action = actions[event.key];
    if (!action) return;
    event.preventDefault();
    action();
  }, { signal });

  fullscreen.hidden = !document.fullscreenEnabled;
  const syncFullscreen = () => dialog.toggleAttribute("data-fullscreen", document.fullscreenElement === dialog);
  fullscreen.addEventListener("click", () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void dialog.requestFullscreen().catch(() => undefined);
  }, { signal });
  document.addEventListener("fullscreenchange", syncFullscreen, { signal });

  let resizeTimer = 0;
  const resize = new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (views.length === 0 || !alive) return;
      resetZoom();
      if ((innerWidth <= PHONE_WIDTH) !== phone) {
        leaf = current()?.first ?? leaf;
        build();
      } else {
        layout();
        place(false);
        update();
      }
      schedule();
    }, 120);
  });
  resize.observe(stage);

  /* Loading */

  loader.hidden = false;
  failure.hidden = true;
  percent.textContent = "";
  track.replaceChildren();
  thumbs.replaceChildren();

  // Ranged loading fetches only the pages being read of a large document, where the server allows it.
  const loading = getDocument({ url: file, disableAutoFetch: true, disableStream: true, rangeChunkSize: 262144, verbosity: 0 });
  loading.onProgress = ({ loaded, total: size }: { loaded: number; total: number }) => {
    if (size > 0) percent.textContent = `${Math.min(99, Math.round((loaded / size) * 100))}%`;
  };

  void (async () => {
    try {
      const doc = await loading.promise;
      const loaded = await Promise.all(Array.from({ length: doc.numPages }, (_, i) => doc.getPage(i + 1)));
      if (!alive) return;
      pages = loaded;
      build();
      onLeaf(current()!.first);
      schedule();
    } catch {
      if (alive) showFailure();
    }
  })();

  return {
    goToLeaf,
    destroy: () => {
      alive = false;
      events.abort();
      observer.disconnect();
      resize.disconnect();
      clearTimeout(settle);
      clearTimeout(resizeTimer);
      task?.cancel();
      for (const canvas of dialog.querySelectorAll("canvas")) canvas.width = canvas.height = 0;
      track.replaceChildren();
      thumbs.replaceChildren();
      track.style.transform = "";
      stage.style.cursor = "";
      dialog.removeAttribute("data-fullscreen");
      void loading.destroy();
    },
  };
}
