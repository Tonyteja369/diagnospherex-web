import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface LiquidTransitionProps {
  children: React.ReactNode;
}

const LiquidTransition = ({ children }: LiquidTransitionProps) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevLocationRef = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevLocationRef.current) {
      prevLocationRef.current = location.pathname;
      setIsTransitioning(true);
      
      // Delay updating the content until the liquid pour is fully covering the screen (approx 600ms)
      const timer = setTimeout(() => {
        setDisplayChildren(children);
      }, 600);

      const endTimer = setTimeout(() => {
        setIsTransitioning(false);
      }, 1300);

      return () => {
        clearTimeout(timer);
        clearTimeout(endTimer);
      };
    } else {
      // If children update but path doesn't (e.g. form state)
      setDisplayChildren(children);
    }
  }, [location.pathname, children]);

  // SVG morph paths for liquid pour
  const pourInPath = [
    "M 0 0 L 100 0 L 100 0 C 75 0 25 0 0 0 Z", // Flat top
    "M 0 0 L 100 0 L 100 40 C 75 90 25 90 0 40 Z", // Deep liquid scoop down
    "M 0 0 L 100 0 L 100 100 C 75 100 25 100 0 100 Z" // Fully covered
  ];

  const pourOutPath = [
    "M 0 0 L 100 0 L 100 100 C 75 100 25 100 0 100 Z", // Fully covered
    "M 0 100 L 100 100 L 100 100 C 75 100 25 100 0 100 Z", // Melt down
    "M 0 100 L 100 100 L 100 100 C 75 100 25 100 0 100 Z" // Drained out
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
      {/* Content wrapper */}
      <div key={location.pathname === '/' ? 'landing' : 'app-page'}>
        {displayChildren}
      </div>

      {/* SVG Liquid Pour Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 99999,
              pointerEvents: 'all',
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 1 }}
          >
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
              }}
            >
              {/* Refraction highlighted liquid pour */}
              <motion.path
                d={pourInPath[0]}
                animate={{
                  d: [...pourInPath, ...pourOutPath]
                }}
                transition={{
                  duration: 1.3,
                  times: [0, 0.4, 0.6, 0.6, 0.9, 1],
                  ease: "easeInOut"
                }}
                fill="#020206"
              />

              {/* Trailing secondary flow (ambient reflection inside the pour) */}
              <motion.path
                d={pourInPath[0]}
                animate={{
                  d: [...pourInPath, ...pourOutPath]
                }}
                transition={{
                  duration: 1.3,
                  times: [0, 0.4, 0.6, 0.6, 0.9, 1],
                  ease: "easeInOut",
                  delay: 0.05
                }}
                fill="rgba(98, 54, 255, 0.15)"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiquidTransition;
