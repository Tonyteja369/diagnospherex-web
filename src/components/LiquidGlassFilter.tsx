import React from 'react';

const LiquidGlassFilter: React.FC = () => {
  return (
    <svg 
      style={{ display: 'none', position: 'absolute', width: 0, height: 0 }} 
      aria-hidden="true"
    >
      <filter id="liquid-glass-distortion" x="0%" y="0%" width="100%" height="100%">
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
          scale="16" 
          xChannelSelector="R" 
          yChannelSelector="G" 
        />
      </filter>
    </svg>
  );
};

export default LiquidGlassFilter;
