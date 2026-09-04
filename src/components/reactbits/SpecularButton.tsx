import React, { useRef, useState, useEffect } from 'react';

export interface SpecularButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  speed?: number;
  followMouse?: boolean;
  proximity?: number;
  autoAnimate?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const SpecularButton: React.FC<SpecularButtonProps> = ({
  size = 'md',
  radius = 12,
  tint = '#8B5CF6',
  tintOpacity = 0.08,
  blur = 0,
  textColor = '#ffffff',
  lineColor = '#A78BFA',
  baseColor = '#6D28D9',
  intensity = 1,
  shineSize = 14,
  shineFade = 45,
  thickness = 1,
  speed = 0.35,
  followMouse = true,
  proximity = 220,
  autoAnimate = false,
  className = '',
  children,
  onClick,
  style = {},
  ...props
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    if (!followMouse) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (dist < proximity) {
        setIsNear(true);
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      } else {
        setIsNear(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [followMouse, proximity]);

  const paddingMap = {
    sm: '8px 16px',
    md: '12px 24px',
    lg: '16px 32px',
  };

  const fontSizeMap = {
    sm: '0.85rem',
    md: '0.95rem',
    lg: '1.05rem',
  };

  const shineStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: paddingMap[size],
    fontSize: fontSizeMap[size],
    fontWeight: 600,
    color: textColor,
    background: `linear-gradient(135deg, ${baseColor} 0%, ${tint} 100%)`,
    borderRadius: `${radius}px`,
    border: `${thickness}px solid ${lineColor}`,
    cursor: 'pointer',
    overflow: 'hidden',
    boxShadow: isNear
      ? `0 0 20px rgba(139, 92, 246, ${0.4 * intensity}), 0 8px 24px rgba(109, 40, 217, 0.3)`
      : `0 4px 14px rgba(109, 40, 217, 0.25)`,
    transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, border-color 0.2s ease',
    transform: isNear ? 'translateY(-1px) scale(1.01)' : 'translateY(0) scale(1)',
    ...style,
  };

  return (
    <button
      ref={btnRef}
      className={`specular-button ${className}`}
      style={shineStyle}
      onClick={onClick}
      {...props}
    >
      {/* Specular shine overlay tracking cursor */}
      {(isNear || autoAnimate) && (
        <span
          style={{
            position: 'absolute',
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            width: `${shineSize * 10}px`,
            height: `${shineSize * 10}px`,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, rgba(255,255,255,${0.6 * intensity}) 0%, rgba(167,139,250,${tintOpacity}) ${shineFade}%, transparent 70%)`,
            pointerEvents: 'none',
            borderRadius: '50%',
            mixBlendMode: 'overlay',
            transition: `opacity ${speed}s ease`,
          }}
          aria-hidden="true"
        />
      )}
      <span style={{ position: 'relative', zIndex: 2, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        {children}
      </span>
    </button>
  );
};

export default SpecularButton;
