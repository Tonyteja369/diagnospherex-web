import React from 'react';
import '../styles/AnimatedBackground.css';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="hero-ambient-wash" aria-hidden="true">
      {/* Single soft radial wash sampled directly from logo stops (#7C3AED -> #6366F1 -> #06B6D4) */}
      <div className="hero-logo-wash" />
    </div>
  );
};

export default AnimatedBackground;
