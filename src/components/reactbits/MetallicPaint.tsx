import React, { useRef, useState, useEffect } from 'react';

export interface MetallicPaintProps {
  imageSrc?: string;
  seed?: number;
  scale?: number;
  patternSharpness?: number;
  noiseScale?: number;
  speed?: number;
  liquid?: number;
  mouseAnimation?: boolean;
  brightness?: number;
  contrast?: number;
  refraction?: number;
  blur?: number;
  chromaticSpread?: number;
  fresnel?: number;
  lightColor?: string;
  darkColor?: string;
  tintColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const MetallicPaint: React.FC<MetallicPaintProps> = ({
  imageSrc = '/logo1.png',
  speed = 0.15,
  liquid = 0.3,
  mouseAnimation = true,
  brightness = 1.6,
  lightColor = '#F5F3FF',
  darkColor = '#4C1D95',
  tintColor = '#DDD6FE',
  className = '',
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!mouseAnimation) return;
    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePos({ x: 50, y: 50 });
    };

    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseAnimation]);

  return (
    <div
      ref={containerRef}
      className={`metallic-paint-wrap ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: '16px',
        ...style,
      }}
    >
      {/* Liquid metallic sheen overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${lightColor} 0%, ${tintColor} 35%, ${darkColor} 80%)`,
          mixBlendMode: 'color-dodge',
          opacity: isHovered ? liquid * brightness : liquid * 0.5,
          transition: `opacity ${speed}s ease, background 0.15s ease-out`,
          pointerEvents: 'none',
          zIndex: 2,
        }}
        aria-hidden="true"
      />

      {/* Source Image / Logo Mark */}
      <img
        src={imageSrc}
        alt="Brand Mark"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          position: 'relative',
          zIndex: 1,
          filter: `brightness(${brightness * 100}%) contrast(110%)`,
        }}
      />
    </div>
  );
};

export default MetallicPaint;
