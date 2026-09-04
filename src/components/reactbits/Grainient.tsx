import React, { useEffect, useRef } from 'react';

export interface GrainientProps {
  color1?: string;
  color2?: string;
  color3?: string;
  timeSpeed?: number;
  colorBalance?: number;
  warpStrength?: number;
  warpFrequency?: number;
  warpSpeed?: number;
  warpAmplitude?: number;
  blendAngle?: number;
  blendSoftness?: number;
  rotationAmount?: number;
  noiseScale?: number;
  grainAmount?: number;
  grainScale?: number;
  grainAnimated?: boolean;
  contrast?: number;
  gamma?: number;
  saturation?: number;
  centerX?: number;
  centerY?: number;
  zoom?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Grainient: React.FC<GrainientProps> = ({
  color1 = '#ff08f6',
  color2 = '#46005e',
  color3 = '#49008e',
  timeSpeed = 0.85,
  colorBalance = 0.0,
  warpStrength = 1.0,
  warpFrequency = 12,
  warpSpeed = 2.0,
  warpAmplitude = 50.0,
  blendAngle = 0.0,
  blendSoftness = 0.05,
  rotationAmount = 500.0,
  noiseScale = 0,
  grainAmount = 0,
  grainScale = 0.2,
  grainAnimated = false,
  contrast = 1.5,
  gamma = 1.0,
  saturation = 1.0,
  centerX = 0.0,
  centerY = 0.0,
  zoom = 0.9,
  className = '',
  style = {},
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) {
      // 2D Canvas Fallback if WebGL unavailable
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      let animId: number;
      let time = 0;

      const resize = () => {
        canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
        canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      };
      resize();
      window.addEventListener('resize', resize);

      const render2D = () => {
        time += timeSpeed * 0.01;
        const w = canvas.width;
        const h = canvas.height;

        const rad = (blendAngle * Math.PI) / 180 + time * (rotationAmount / 100);
        const x1 = w / 2 + Math.cos(rad) * (w * zoom * 0.5);
        const y1 = h / 2 + Math.sin(rad) * (h * zoom * 0.5);
        const x2 = w / 2 - Math.cos(rad) * (w * zoom * 0.5);
        const y2 = h / 2 - Math.sin(rad) * (h * zoom * 0.5);

        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, color1);
        grad.addColorStop(Math.min(1, Math.max(0, 0.5 + colorBalance)), color2);
        grad.addColorStop(1, color3);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
        animId = requestAnimationFrame(render2D);
      };
      render2D();
      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', resize);
      };
    }

    // WebGL Shader for Grainient
    const webgl = gl as WebGLRenderingContext;

    const vertShaderSource = `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragShaderSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform vec2 uResolution;
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform float uWarpStrength;
      uniform float uWarpFreq;
      uniform float uWarpSpeed;
      uniform float uWarpAmp;
      uniform float uRotation;
      uniform float uZoom;
      uniform float uContrast;
      uniform float uSaturation;
      uniform float uNoiseScale;
      uniform float uGrainAmount;
      uniform float uGrainScale;
      uniform float uGrainAnimated;

      void main() {
        vec2 st = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
        st /= max(0.1, uZoom);

        float t = uTime * uWarpSpeed * 0.2;
        float angle = uTime * uRotation * 0.0002;
        mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
        st = rot * st;

        float wave = sin(st.x * uWarpFreq + t) * cos(st.y * uWarpFreq + t) * (uWarpAmp * 0.02);
        float pattern = sin((st.x + wave) * 3.0 + t) * cos((st.y + wave) * 3.0 + t);
        pattern = pattern * 0.5 + 0.5;

        vec3 col = mix(uColor1, uColor2, smoothstep(0.0, 0.6, pattern * uWarpStrength));
        col = mix(col, uColor3, smoothstep(0.4, 1.0, pattern * uWarpStrength));

        // Contrast adjustment
        col = clamp((col - 0.5) * uContrast + 0.5, 0.0, 1.0);

        // Saturation adjustment
        float gray = dot(col, vec3(0.299, 0.587, 0.114));
        col = mix(vec3(gray), col, uSaturation);

        // Grain & Noise Texture
        if (uGrainAmount > 0.0) {
          vec2 grainCoord = gl_FragCoord.xy * max(0.1, uGrainScale * 0.5);
          float grainTime = uGrainAnimated > 0.5 ? uTime * 20.0 : 0.0;
          float noise = fract(sin(dot(grainCoord + grainTime, vec2(12.9898, 78.233))) * 43758.5453);
          col += (noise - 0.5) * uGrainAmount;
        }

        gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
      }
    `;

    const parseColor = (hex: string) => {
      const h = hex.replace('#', '');
      const r = parseInt(h.substring(0, 2), 16) / 255 || 0;
      const g = parseInt(h.substring(2, 4), 16) / 255 || 0;
      const b = parseInt(h.substring(4, 6), 16) / 255 || 0;
      return [r, g, b];
    };

    const createShader = (type: number, src: string) => {
      const shader = webgl.createShader(type);
      if (!shader) return null;
      webgl.shaderSource(shader, src);
      webgl.compileShader(shader);
      return shader;
    };

    const vertShader = createShader(webgl.VERTEX_SHADER, vertShaderSource);
    const fragShader = createShader(webgl.FRAGMENT_SHADER, fragShaderSource);
    if (!vertShader || !fragShader) return;

    const prog = webgl.createProgram();
    if (!prog) return;
    webgl.attachShader(prog, vertShader);
    webgl.attachShader(prog, fragShader);
    webgl.linkProgram(prog);
    webgl.useProgram(prog);

    const posBuf = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, posBuf);
    webgl.bufferData(
      webgl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      webgl.STATIC_DRAW
    );

    const aPos = webgl.getAttribLocation(prog, 'aPosition');
    webgl.enableVertexAttribArray(aPos);
    webgl.vertexAttribPointer(aPos, 2, webgl.FLOAT, false, 0, 0);

    const uRes = webgl.getUniformLocation(prog, 'uResolution');
    const uTime = webgl.getUniformLocation(prog, 'uTime');
    const uC1 = webgl.getUniformLocation(prog, 'uColor1');
    const uC2 = webgl.getUniformLocation(prog, 'uColor2');
    const uC3 = webgl.getUniformLocation(prog, 'uColor3');
    const uWarpStr = webgl.getUniformLocation(prog, 'uWarpStrength');
    const uWarpFreq = webgl.getUniformLocation(prog, 'uWarpFreq');
    const uWarpSpeed = webgl.getUniformLocation(prog, 'uWarpSpeed');
    const uWarpAmp = webgl.getUniformLocation(prog, 'uWarpAmp');
    const uRot = webgl.getUniformLocation(prog, 'uRotation');
    const uZoom = webgl.getUniformLocation(prog, 'uZoom');
    const uContrast = webgl.getUniformLocation(prog, 'uContrast');
    const uSat = webgl.getUniformLocation(prog, 'uSaturation');
    const uNoiseScaleLoc = webgl.getUniformLocation(prog, 'uNoiseScale');
    const uGrainAmtLoc = webgl.getUniformLocation(prog, 'uGrainAmount');
    const uGrainScaleLoc = webgl.getUniformLocation(prog, 'uGrainScale');
    const uGrainAnimLoc = webgl.getUniformLocation(prog, 'uGrainAnimated');

    let animId: number;
    let startTime = performance.now();

    const resize = () => {
      const w = canvas.parentElement?.clientWidth || window.innerWidth;
      const h = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      webgl.viewport(0, 0, w, h);
    };
    resize();
    window.addEventListener('resize', resize);

    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001 * timeSpeed;
      webgl.uniform2f(uRes, canvas.width, canvas.height);
      webgl.uniform1f(uTime, elapsed);

      const c1 = parseColor(color1);
      const c2 = parseColor(color2);
      const c3 = parseColor(color3);

      webgl.uniform3f(uC1, c1[0], c1[1], c1[2]);
      webgl.uniform3f(uC2, c2[0], c2[1], c2[2]);
      webgl.uniform3f(uC3, c3[0], c3[1], c3[2]);

      webgl.uniform1f(uWarpStr, warpStrength);
      webgl.uniform1f(uWarpFreq, warpFrequency);
      webgl.uniform1f(uWarpSpeed, warpSpeed);
      webgl.uniform1f(uWarpAmp, warpAmplitude);
      webgl.uniform1f(uRot, rotationAmount);
      webgl.uniform1f(uZoom, zoom);
      webgl.uniform1f(uContrast, contrast);
      webgl.uniform1f(uSat, saturation);
      webgl.uniform1f(uNoiseScaleLoc, noiseScale);
      webgl.uniform1f(uGrainAmtLoc, grainAmount);
      webgl.uniform1f(uGrainScaleLoc, grainScale);
      webgl.uniform1f(uGrainAnimLoc, grainAnimated ? 1.0 : 0.0);

      webgl.drawArrays(webgl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [
    color1,
    color2,
    color3,
    timeSpeed,
    colorBalance,
    warpStrength,
    warpFrequency,
    warpSpeed,
    warpAmplitude,
    blendAngle,
    blendSoftness,
    rotationAmount,
    noiseScale,
    grainAmount,
    grainScale,
    grainAnimated,
    contrast,
    gamma,
    saturation,
    centerX,
    centerY,
    zoom,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`grainient-canvas ${className}`}
      style={{
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        display: 'block',
        ...style,
      }}
      aria-hidden="true"
    />
  );
};

export default Grainient;
