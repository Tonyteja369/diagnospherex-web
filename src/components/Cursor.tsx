import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Cursor.css';

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState<{ x: number, y: number, id: number }[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updateMousePosition = (e: MouseEvent) => {
      if (isMobile) return;
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (isMobile) return;
      if ((e.target as HTMLElement).tagName.toLowerCase() === 'button' || (e.target as HTMLElement).tagName.toLowerCase() === 'a' || (e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseClick = (e: MouseEvent) => {
      if (isMobile) return;
      const newRipple = { x: e.clientX, y: e.clientY, id: Date.now() };
      setRipples(prev => [...prev, newRipple]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleMouseClick);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleMouseClick);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="liquid-cursor"
        animate={{
          x: mousePosition.x - (isHovering ? 20 : 8),
          y: mousePosition.y - (isHovering ? 20 : 8),
          scale: isHovering ? 2 : 1,
          opacity: 1
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      {/* Liquid cursor trail */}
      <motion.div
        className="liquid-cursor-trail"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.8 }}
      />
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="cursor-ripple"
          style={{ left: ripple.x - 50, top: ripple.y - 50 }}
        />
      ))}
    </>
  );
};

export default Cursor;
