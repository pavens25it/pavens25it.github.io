"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const FRAME_COUNT = 20;
const TRIM_X = 18;
const TRIM_Y = 10;
const FOCAL_Y = 0.28;

const framePath = (index: number) =>
  `/pictures/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;

export function ScrollBackground() {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [useCssFallback, setUseCssFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const frames: Array<HTMLImageElement | null> = new Array(FRAME_COUNT).fill(
      null
    );

    let canvasWidth = 0;
    let canvasHeight = 0;
    let targetProgress = 0;
    let currentProgress = 0;
    let lastRenderedIndex = -1;
    let rafId: number | null = null;
    let lastTimestamp = 0;
    let disposed = false;

    let gl: WebGLRenderingContext | null = null;
    let glProgram: WebGLProgram | null = null;
    let glTextures: Array<WebGLTexture | null> | null = null;
    let glUniforms: {
      tex: WebGLUniformLocation | null;
      texelSize: WebGLUniformLocation | null;
      uvRect: WebGLUniformLocation | null;
      sharpness: WebGLUniformLocation | null;
    } | null = null;
    let ctx2d: CanvasRenderingContext2D | null = null;

    const initWebGL = () => {
      const context =
        canvas.getContext("webgl", {
          alpha: false,
          antialias: false,
          depth: false,
          stencil: false,
          powerPreference: "high-performance",
        }) ||
        (canvas.getContext("experimental-webgl", {
          alpha: false,
        }) as WebGLRenderingContext | null);

      if (!context) return false;

      const vsSource = `
        attribute vec2 a_pos;
        varying vec2 v_uv;
        void main() {
          v_uv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
          gl_Position = vec4(a_pos, 0.0, 1.0);
        }
      `;

      // Crisp single-frame Contrast-Adaptive Sharpening mapped strictly onto
      // the 3-color editorial palette (#242321 -> #76543B -> #C47A36)
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
          vec3 sharp = clamp((e + (b + d + f + h) * w) / (1.0 + 4.0 * w), 0.0, 1.0);

          float lum = dot(sharp, vec3(0.30, 0.50, 0.20));
          float bandAccent = clamp((sharp.r - sharp.g) * 0.42, 0.0, 0.34);
          float tone = clamp(pow(clamp(lum + bandAccent, 0.0, 1.0), 0.96) * 1.06, 0.0, 1.0);

          vec3 charcoal = vec3(36.0, 35.0, 33.0) / 255.0;
          vec3 earth    = vec3(118.0, 84.0, 59.0) / 255.0;
          vec3 amber    = vec3(196.0, 122.0, 54.0) / 255.0;

          vec3 mapped = tone < 0.5
            ? mix(charcoal, earth, tone * 2.0)
            : mix(earth, amber, (tone - 0.5) * 2.0);

          gl_FragColor = vec4(mapped, 1.0);
        }
      `;

      const compile = (type: number, source: string) => {
        const shader = context.createShader(type);
        if (!shader) return null;
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
      if (!program) return false;
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
      context.clearColor(36 / 255, 35 / 255, 33 / 255, 1);

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
    };

    if (!initWebGL()) {
      ctx2d = canvas.getContext("2d", { alpha: false });
      setUseCssFallback(true);
    }

    const uploadTexture = (index: number, img: HTMLImageElement) => {
      if (!gl || !glTextures) return null;
      if (glTextures[index]) return glTextures[index];
      const texture = gl.createTexture();
      if (!texture) return null;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      glTextures[index] = texture;
      return texture;
    };

    const clamp = (v: number, min: number, max: number) =>
      Math.min(max, Math.max(min, v));

    const getScrollProgress = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      return clamp(window.scrollY / maxScroll, 0, 1);
    };

    const getNearestLoadedIndex = (index: number) => {
      if (frames[index]) return index;
      for (let offset = 1; offset < FRAME_COUNT; offset++) {
        if (index - offset >= 0 && frames[index - offset]) return index - offset;
        if (index + offset < FRAME_COUNT && frames[index + offset])
          return index + offset;
      }
      return -1;
    };

    const drawFrameWebGL = (index: number, img: HTMLImageElement) => {
      if (!gl || !glProgram || !glUniforms) return;
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

      let uOffset: number;
      let vOffset: number;
      let uScale: number;
      let vScale: number;

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
    };

    const drawFrame2D = (img: HTMLImageElement) => {
      if (!ctx2d) return;
      const nw = img.naturalWidth;
      const nh = img.naturalHeight;
      const sw = nw - TRIM_X * 2;
      const sh = nh - TRIM_Y * 2;

      const imgRatio = sw / sh;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth: number;
      let drawHeight: number;
      let offsetX: number;
      let offsetY: number;

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

      ctx2d.drawImage(
        img,
        TRIM_X,
        TRIM_Y,
        sw,
        sh,
        offsetX,
        offsetY,
        drawWidth,
        drawHeight
      );
    };

    const render = (force = false) => {
      const targetIndex = reducedMotionQuery.matches
        ? 0
        : clamp(
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
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      const width = Math.max(1, Math.round(window.innerWidth * dpr));
      const height = Math.max(1, Math.round(window.innerHeight * dpr));

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
    };

    const tick = (timestamp: number) => {
      if (disposed) return;
      if (!lastTimestamp) lastTimestamp = timestamp;
      const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
      lastTimestamp = timestamp;

      if (reducedMotionQuery.matches) {
        currentProgress = 0;
        render();
        rafId = null;
        lastTimestamp = 0;
        return;
      }

      const factor = 1 - Math.exp(-11 * dt);
      currentProgress += (targetProgress - currentProgress) * factor;

      if (Math.abs(targetProgress - currentProgress) < 0.0005) {
        currentProgress = targetProgress;
        render();
        rafId = null;
        lastTimestamp = 0;
        return;
      }

      render();
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      targetProgress = getScrollProgress();
      if (rafId === null) {
        lastTimestamp = 0;
        rafId = requestAnimationFrame(tick);
      }
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";

      const markReady = () => {
        if (disposed) return;
        frames[i] = img;
        if (gl) {
          uploadTexture(i, img);
        }
        const expected = reducedMotionQuery.matches
          ? 0
          : Math.round(currentProgress * (FRAME_COUNT - 1));
        if (i === expected || lastRenderedIndex === -1) {
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

      img.src = framePath(i);
    }

    targetProgress = getScrollProgress();
    currentProgress = targetProgress;
    resizeCanvas();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas, { passive: true });

    return () => {
      disposed = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resizeCanvas);
      if (gl && glTextures) {
        glTextures.forEach((tex) => {
          if (tex) gl?.deleteTexture(tex);
        });
      }
    };
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-charcoal"
    >
      {/* SVG tritone filter strictly for 2D fallback (#242321 -> #76543B -> #C47A36) */}
      <svg className="sr-only">
        <defs>
          <filter id="bg-strict-palette-map" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0.30 0.50 0.20 0 0
                      0.30 0.50 0.20 0 0
                      0.30 0.50 0.20 0 0
                      0    0    0    1 0"
            />
            <feComponentTransfer>
              <feFuncR type="table" tableValues="0.141 0.463 0.769" />
              <feFuncG type="table" tableValues="0.137 0.329 0.478" />
              <feFuncB type="table" tableValues="0.129 0.231 0.212" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={
          useCssFallback
            ? { filter: "url(#bg-strict-palette-map)" }
            : undefined
        }
      />

      {/* Restrained Charcoal Black veil so foreground editorial typography remains crisp */}
      <div className="absolute inset-0 bg-charcoal/65" />
    </div>
  );
}
