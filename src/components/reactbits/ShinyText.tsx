import React from 'react';
import { motion } from 'framer-motion';

export interface ShinyTextProps {
  text: string;
  speed?: number;
  delay?: number;
  color?: string;
  shineColor?: string;
  spread?: number;
  direction?: 'left' | 'right';
  yoyo?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  speed = 3,
  delay = 1.5,
  color = '#8B5CF6',
  shineColor = '#DDD6FE',
  spread = 100,
  className = '',
  style = {},
}) => {
  return (
    <span
      className={`shiny-text-wrap ${className}`}
      style={{
        display: 'inline-block',
        position: 'relative',
        ...style,
      }}
    >
      <motion.span
        style={{
          backgroundImage: `linear-gradient(120deg, ${color} 0%, ${color} 40%, ${shineColor} 50%, ${color} 60%, ${color} 100%)`,
          backgroundSize: `${spread * 3}% 100%`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          display: 'inline-block',
        }}
        initial={{ backgroundPosition: '100% 0%' }}
        animate={{ backgroundPosition: ['100% 0%', '-100% 0%'] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          repeatDelay: delay,
          ease: 'easeInOut',
        }}
      >
        {text}
      </motion.span>
    </span>
  );
};

export default ShinyText;
