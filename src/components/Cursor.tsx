import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import '../styles/Cursor.css';

const Cursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Smooth trailing spring (lerp ~0.15 feel)
  const springConfig = { stiffness: 350, damping: 26, mass: 0.5 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  useEffect(() => {
    // Check if device is touch-based
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'button, a, [role="button"], input, select, textarea, .saas-card, .demo-tab-chip, .code-tab-btn'
      );

      if (interactive) {
        setIsHovered(true);
        if (target.closest('.demo-panel') || target.closest('.demo-tab-chip')) {
          setCursorText('Explore');
        } else if (target.closest('.code-window-container')) {
          setCursorText('Code');
        } else {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [rawX, rawY, isVisible]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Small trailing center dot */}
      <motion.div
        className="liquid-cursor-dot"
        style={{
          x: rawX,
          y: rawY,
          opacity: isVisible ? (isHovered ? 0 : 1) : 0,
        }}
      />

      {/* Lagged liquid glass follower ring */}
      <motion.div
        className={`liquid-cursor-ring ${isHovered ? 'is-expanded' : ''}`}
        style={{
          x: smoothX,
          y: smoothY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        {cursorText && <span className="cursor-label">{cursorText}</span>}
      </motion.div>
    </>
  );
};

export default Cursor;
