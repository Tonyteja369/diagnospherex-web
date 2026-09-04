import React, { useRef } from 'react';
import './MetallicBorderButton.css';

export interface MetallicBorderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'glass';
  className?: string;
  children: React.ReactNode;
}

export const MetallicBorderButton: React.FC<MetallicBorderButtonProps> = ({
  size = 'md',
  variant = 'solid',
  className = '',
  children,
  onClick,
  style = {},
  ...props
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const paddingMap = {
    sm: '8px 18px',
    md: '12px 26px',
    lg: '16px 32px',
  };

  const fontSizeMap = {
    sm: '0.85rem',
    md: '0.95rem',
    lg: '1.05rem',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const rad = Math.atan2(y, x);
    const deg = ((rad * 180) / Math.PI + 90 + 360) % 360;
    btnRef.current.style.setProperty('--metallic-angle', `${deg.toFixed(1)}deg`);
  };

  return (
    <button
      ref={btnRef}
      className={`metallic-border-btn ${variant === 'glass' ? 'btn-glass-mode' : ''} ${className}`}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      style={{
        padding: paddingMap[size],
        fontSize: fontSizeMap[size],
        ...style,
      }}
      {...props}
    >
      <span style={{ position: 'relative', zIndex: 2, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        {children}
      </span>
    </button>
  );
};

export default MetallicBorderButton;
