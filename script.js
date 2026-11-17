(() => {
  const FRAME_COUNT = 20;
  const FRAME_PATH = (index) =>
    `pictures/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;

  // Trim 18px left/right and 10px top/bottom to remove source border artifacts
  const TRIM_X = 18;
  const TRIM_Y = 10;
  const FOCAL_Y = 0.3;

  const container = document.querySelector(".scroll-container");
  const canvas = document.getElementById("scroll-canvas");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  const frames = new Array(FRAME_COUNT).fill(null);

  let canvasWidth = 0;
  let canvasHeight = 0;
  let targetProgress = 0;
  let currentProgress = 0;
  let lastRenderedIndex = -1;
  let rafId = null;
  let lastTimestamp = 0;

  // --- Renderer (WebGL with gentle Contrast-Adaptive Sharpening + 2D fallback) ---
  let gl = null;
  let glProgram = null;
  let glUniforms = null;
  let glTextures = null;
  let ctx2d = null;

  function initWebGL() {
    if (window.location.protocol === "file:") return false;

    const context =
      canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "high-performance",
      }) ||
      canvas.getContext("experimental-webgl", { alpha: false });

    if (!context) return false;

    const vsSource = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() {
        v_uv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform sampler2D u_tex;
      uniform vec2 u_texelSize;
      uniform vec4 u_uvRect;
      uniform float u_sharpness;
      varying vec2 v_uv;

      void main() {
        vec2 uv = u_uvRect.xy + v_uv * u_uvRect.zw;

        vec3 e = texture2D(u_tex, uv).rgb;
        vec3 b = texture2D(u_tex, uv + vec2(0.0, -u_texelSize.y)).rgb;
        vec3 d = texture2D(u_tex, uv + vec2(-u_texelSize.x, 0.0)).rgb;
        vec3 f = texture2D(u_tex, uv + vec2(u_texelSize.x, 0.0)).rgb;
        vec3 h = texture2D(u_tex, uv + vec2(0.0, u_texelSize.y)).rgb;

        vec3 mn = min(min(min(d, e), min(f, b)), h);
        vec3 mx = max(max(max(d, e), max(f, b)), h);

        vec3 amp = clamp(min(mn, 1.0 - mx) / max(mx, vec3(0.0001)), 0.0, 1.0);
        amp = sqrt(amp);

        float peak = -1.0 / mix(8.0, 5.0, u_sharpness);
        vec3 w = amp * peak;

        vec3 color = (e + (b + d + f + h) * w) / (1.0 + 4.0 * w);
        gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
      }
    `;

    const compile = (type, source) => {
      const shader = context.createShader(type);
      context.shaderSource(shader, source);
      context.compileShader(shader);
      if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
        context.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(context.VERTEX_SHADER, vsSource);
    const fs = compile(context.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return false;

    const program = context.createProgram();
    context.attachShader(program, vs);
    context.attachShader(program, fs);
    context.linkProgram(program);
    if (!context.getProgramParameter(program, context.LINK_STATUS)) {
      return false;
    }

    const buffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, buffer);
    context.bufferData(
      context.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      context.STATIC_DRAW
    );

    const posLoc = context.getAttribLocation(program, "a_pos");
    context.enableVertexAttribArray(posLoc);
    context.vertexAttribPointer(posLoc, 2, context.FLOAT, false, 0, 0);

    context.useProgram(program);
    context.clearColor(0, 0, 0, 1);

    gl = context;
    glProgram = program;
    glTextures = new Array(FRAME_COUNT).fill(null);
    glUniforms = {
      tex: context.getUniformLocation(program, "u_tex"),
      texelSize: context.getUniformLocation(program, "u_texelSize"),
      uvRect: context.getUniformLocation(program, "u_uvRect"),
      sharpness: context.getUniformLocation(program, "u_sharpness"),
    };
    context.uniform1i(glUniforms.tex, 0);
    context.uniform1f(glUniforms.sharpness, 0.25);

    return true;
  }

  function uploadTexture(index, img) {
    if (!gl || glTextures[index]) return glTextures ? glTextures[index] : null;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
    glTextures[index] = texture;
    return texture;
  }

  if (!initWebGL()) {
    ctx2d = canvas.getContext("2d", { alpha: false });
  }

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function getScrollProgress() {
    const maxScroll = Math.max(1, container.offsetHeight - window.innerHeight);
    const scrolled = window.scrollY - container.offsetTop;
    return clamp(scrolled / maxScroll, 0, 1);
  }

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      canvasWidth = width;
      canvasHeight = height;

      if (gl) {
        gl.viewport(0, 0, width, height);
      } else if (ctx2d) {
        ctx2d.imageSmoothingEnabled = true;
        ctx2d.imageSmoothingQuality = "high";
      }

      lastRenderedIndex = -1;
    }

    targetProgress = getScrollProgress();
    render(true);
  }

  function drawFrameWebGL(index, img) {
    const texture = uploadTexture(index, img);
    if (!texture) return;

    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    const trimU = TRIM_X / nw;
    const trimV = TRIM_Y / nh;
    const usableU = 1 - trimU * 2;
    const usableV = 1 - trimV * 2;

    const imgRatio = (nw - TRIM_X * 2) / (nh - TRIM_Y * 2);
    const canvasRatio = canvasWidth / canvasHeight;

    let uOffset;
    let vOffset;
    let uScale;
    let vScale;

    if (canvasRatio > imgRatio) {
      uScale = usableU;
      uOffset = trimU;
      vScale = usableV * (imgRatio / canvasRatio);
      vOffset = trimV + (usableV - vScale) * FOCAL_Y;
    } else {
      vScale = usableV;
      vOffset = trimV;
      uScale = usableU * (canvasRatio / imgRatio);
      uOffset = trimU + (usableU - uScale) * 0.5;
    }

    gl.useProgram(glProgram);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform2f(glUniforms.texelSize, 1 / nw, 1 / nh);
    gl.uniform4f(glUniforms.uvRect, uOffset, vOffset, uScale, vScale);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  function drawFrame2D(img) {
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    const sw = nw - TRIM_X * 2;
    const sh = nh - TRIM_Y * 2;

    const imgRatio = sw / sh;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth;
    let drawHeight;
    let offsetX;
    let offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) * FOCAL_Y;
    } else {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) * 0.5;
      offsetY = 0;
    }

    ctx2d.drawImage(img, TRIM_X, TRIM_Y, sw, sh, offsetX, offsetY, drawWidth, drawHeight);
  }

  function getNearestLoadedIndex(index) {
    if (frames[index]) return index;
    for (let offset = 1; offset < FRAME_COUNT; offset++) {
      if (index - offset >= 0 && frames[index - offset]) return index - offset;
      if (index + offset < FRAME_COUNT && frames[index + offset]) return index + offset;
    }
    return -1;
  }

  function render(force = false) {
    const targetIndex = clamp(
      Math.round(currentProgress * (FRAME_COUNT - 1)),
      0,
      FRAME_COUNT - 1
    );

    const drawIndex = getNearestLoadedIndex(targetIndex);
    if (drawIndex === -1) return;
    if (!force && drawIndex === lastRenderedIndex) return;

    const img = frames[drawIndex];
    if (!img || !img.naturalWidth || !img.naturalHeight) return;

    if (gl) {
      drawFrameWebGL(drawIndex, img);
    } else if (ctx2d) {
      drawFrame2D(img);
    }

    lastRenderedIndex = drawIndex;
  }

  function tick(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
    lastTimestamp = timestamp;

    if (reducedMotionQuery.matches) {
      currentProgress = targetProgress;
    } else {
      const factor = 1 - Math.exp(-11 * dt);
      currentProgress += (targetProgress - currentProgress) * factor;
    }

    if (Math.abs(targetProgress - currentProgress) < 0.0002) {
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
        if (gl) {
          uploadTexture(i, img);
        }
        const activeIndex = Math.round(currentProgress * (FRAME_COUNT - 1));
        if (i === activeIndex || lastRenderedIndex === -1) {
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
