import { useEffect } from 'react';

/**
 * useLiquidGlassTracking
 * Smoothly calculates the cursor angle relative to any hovered .liquid-glass element
 * and updates its CSS custom property --light-angle for realistic dynamic specular reflection.
 */
export const useLiquidGlassTracking = () => {
  useEffect(() => {
    // Disable on coarse pointer / touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('.liquid-glass') as HTMLElement | null;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const radians = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const degrees = ((radians * 180) / Math.PI + 90 + 360) % 360;

      target.style.setProperty('--light-angle', `${degrees.toFixed(1)}deg`);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
};

export default useLiquidGlassTracking;
