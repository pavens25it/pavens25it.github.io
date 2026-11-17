(() => {
  const FRAME_COUNT = 20;
  const FRAME_PATH = (index) =>
    `pictures/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;

  const container = document.querySelector(".scroll-container");
  const canvas = document.getElementById("scroll-canvas");
  const ctx = canvas.getContext("2d", { alpha: false });

  const frames = new Array(FRAME_COUNT).fill(null);
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  let canvasWidth = 0;
  let canvasHeight = 0;
  let targetProgress = 0;
  let currentProgress = 0;
  let lastRenderedFrame = -1;
  let rafId = null;
  let lastTimestamp = 0;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function getScrollProgress() {
    const maxScroll = Math.max(1, container.offsetHeight - window.innerHeight);
    const scrolled = window.scrollY - container.offsetTop;
    return clamp(scrolled / maxScroll, 0, 1);
  }

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      canvasWidth = width;
      canvasHeight = height;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      lastRenderedFrame = -1;
    }

    targetProgress = getScrollProgress();
    render(true);
  }

  function drawCover(img) {
    if (!img || !img.naturalWidth || !img.naturalHeight) return;

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth;
    let drawHeight;
    let offsetX;
    let offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) * 0.5;
    } else {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) * 0.5;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }

  function getNearestLoadedFrame(index) {
    if (frames[index]) return frames[index];
    for (let offset = 1; offset < FRAME_COUNT; offset++) {
      if (index - offset >= 0 && frames[index - offset]) return frames[index - offset];
      if (index + offset < FRAME_COUNT && frames[index + offset]) return frames[index + offset];
    }
    return null;
  }

  function render(force = false) {
    const framePos = currentProgress * (FRAME_COUNT - 1);
    if (!force && Math.abs(framePos - lastRenderedFrame) < 0.0004) {
      return;
    }

    const indexA = Math.floor(framePos);
    const indexB = Math.min(indexA + 1, FRAME_COUNT - 1);
    const blend = framePos - indexA;

    const imgA = getNearestLoadedFrame(indexA);
    if (!imgA) return;

    ctx.globalAlpha = 1;
    drawCover(imgA);

    const imgB = frames[indexB];
    if (blend > 0.001 && indexB !== indexA && imgB && imgB !== imgA) {
      ctx.globalAlpha = blend;
      drawCover(imgB);
      ctx.globalAlpha = 1;
    }

    lastRenderedFrame = framePos;
  }

  function tick(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
    lastTimestamp = timestamp;

    if (reducedMotionQuery.matches) {
      currentProgress = targetProgress;
    } else {
      // Frame-rate independent exponential smoothing for butter-smooth scroll inertia
      const factor = 1 - Math.exp(-8.5 * dt);
      currentProgress += (targetProgress - currentProgress) * factor;
    }

    const diff = Math.abs(targetProgress - currentProgress);
    if (diff < 0.0001) {
      currentProgress = targetProgress;
      render();
      rafId = null;
      lastTimestamp = 0;
      return;
    }

    render();
    rafId = requestAnimationFrame(tick);
  }

  function scheduleRender() {
    if (rafId === null) {
      lastTimestamp = 0;
      rafId = requestAnimationFrame(tick);
    }
  }

  function onScroll() {
    targetProgress = getScrollProgress();
    scheduleRender();
  }

  function preloadFrames() {
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";

      const markReady = () => {
        frames[i] = img;
        const activePos = currentProgress * (FRAME_COUNT - 1);
        if (Math.abs(activePos - i) <= 1.2 || lastRenderedFrame === -1) {
          render(true);
        }
      };

      img.onload = () => {
        if (typeof img.decode === "function") {
          img.decode().then(markReady).catch(markReady);
        } else {
          markReady();
        }
      };

      img.src = FRAME_PATH(i);
    }
  }

  targetProgress = getScrollProgress();
  currentProgress = targetProgress;

  resizeCanvas();
  preloadFrames();

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", resizeCanvas, { passive: true });
  window.addEventListener("pageshow", () => {
    targetProgress = getScrollProgress();
    currentProgress = targetProgress;
    render(true);
  });
})();
