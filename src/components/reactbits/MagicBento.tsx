import React, { useRef, useState, useEffect } from 'react';

export interface MagicBentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  glowColor?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const MagicBento: React.FC<MagicBentoProps> = ({
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = true,
  enableMagnetism: _enableMagnetism = true,
  spotlightRadius = 260,
  glowColor = '139, 92, 246',
  className = '',
  style = {},
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });

      if (enableTilt) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rx = ((y - centerY) / centerY) * -6;
        const ry = ((x - centerX) / centerX) * 6;
        setTilt({ rx, ry });
      }
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      setTilt({ rx: 0, ry: 0 });
      setMousePos({ x: -1000, y: -1000 });
    };

    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enableTilt]);

  return (
    <div
      ref={containerRef}
      className={`magic-bento-container ${className}`}
      style={{
        position: 'relative',
        borderRadius: '20px',
        transform: enableTilt && isHovered ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {/* Border Glow */}
      {enableBorderGlow && (
        <div
          style={{
            position: 'absolute',
            inset: -1,
            borderRadius: '21px',
            padding: '1px',
            background: isHovered
              ? `radial-gradient(${spotlightRadius}px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${glowColor}, 0.6), transparent 80%)`
              : 'transparent',
            pointerEvents: 'none',
            zIndex: 1,
            transition: 'background 0.15s ease',
          }}
          aria-hidden="true"
        />
      )}

      {/* Spotlight Overlay */}
      {enableSpotlight && isHovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '20px',
            background: `radial-gradient(${spotlightRadius}px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${glowColor}, 0.12), transparent 75%)`,
            pointerEvents: 'none',
            zIndex: 2,
            mixBlendMode: 'soft-light',
          }}
          aria-hidden="true"
        />
      )}

      <div style={{ position: 'relative', zIndex: 3, height: '100%' }}>
        {children}
      </div>
    </div>
  );
};

export default MagicBento;
