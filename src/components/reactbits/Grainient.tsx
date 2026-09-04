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
  zoom?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Grainient: React.FC<GrainientProps> = ({
  color1 = '#EDE9FE',
  color2 = '#DBEAFE',
  color3 = '#F5F3FF',
  timeSpeed = 0.15,
  blendAngle = 135,
  grainAmount = 0.02,
  className = '',
  style = {},
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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

    const render = () => {
      time += timeSpeed * 0.01;
      const w = canvas.width;
      const h = canvas.height;

      // Soft animated gradient mesh
      const rad = (blendAngle * Math.PI) / 180;
      const x1 = w / 2 + Math.cos(rad + time) * (w / 3);
      const y1 = h / 2 + Math.sin(rad + time) * (h / 3);
      const x2 = w / 2 - Math.cos(rad - time) * (w / 3);
      const y2 = h / 2 - Math.sin(rad - time) * (h / 3);

      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(0.5, color2);
      gradient.addColorStop(1, color3);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Imperceptible subtle grain
      if (grainAmount > 0) {
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 16) {
          const noise = (Math.random() - 0.5) * grainAmount * 255;
          data[i] = Math.min(255, Math.max(0, data[i] + noise));
          data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
          data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
        }
        ctx.putImageData(imgData, 0, 0);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [color1, color2, color3, timeSpeed, blendAngle, grainAmount]);

  return (
    <canvas
      ref={canvasRef}
      className={`grainient-canvas ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.65,
        ...style,
      }}
      aria-hidden="true"
    />
  );
};

export default Grainient;
