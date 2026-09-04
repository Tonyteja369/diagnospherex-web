import React, { useId } from 'react';

export interface GlassSurfaceProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  displace?: number;
  blur?: number;
  brightness?: number;
  opacity?: number;
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const GlassSurface: React.FC<GlassSurfaceProps> = ({
  width = '100%',
  height = 'auto',
  borderRadius = 18,
  backgroundOpacity = 0.08,
  saturation = 1.4,
  distortionScale = -90,
  redOffset = 2,
  greenOffset = 6,
  blueOffset = 12,
  displace = 2,
  blur = 14,
  brightness = 100,
  opacity = 0.95,
  mixBlendMode = 'normal',
  className = '',
  style = {},
  children,
}) => {
  const filterId = useId().replace(/:/g, '');

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    background: `rgba(255, 255, 255, ${backgroundOpacity})`,
    backdropFilter: `url(#${filterId}) blur(${blur}px) saturate(${saturation * 100}%) brightness(${brightness}%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation * 100}%) brightness(${brightness}%)`,
    opacity,
    mixBlendMode,
    boxShadow: `
      inset ${redOffset}px ${greenOffset}px 0px rgba(124, 58, 237, 0.16),
      inset -${blueOffset / 2}px -${displace}px 0px rgba(6, 182, 212, 0.16),
      0 8px 32px rgba(20, 20, 31, 0.05)
    `,
    border: '1px solid rgba(255, 255, 255, 0.25)',
    overflow: 'hidden',
    ...style,
  };

  return (
    <div className={`glass-surface-container ${className}`} style={containerStyle}>
      <svg
        style={{ display: 'none', position: 'absolute', width: 0, height: 0 }}
        aria-hidden="true"
      >
        <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.008"
            numOctaves="2"
            seed="4"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={Math.abs(distortionScale) / 5}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      {children}
    </div>
  );
};

export default GlassSurface;
