import React from 'react';
import '../styles/AnimatedBackground.css';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="ambient-blob ambient-blob-1" />
      <div className="ambient-blob ambient-blob-2" />
      <div className="ambient-blob ambient-blob-3" />
      <div className="ambient-blob ambient-blob-4" />
    </div>
  );
};

export default AnimatedBackground;
