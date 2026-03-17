import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'app';
  isGlow?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  isGlow = true,
  className = '',
  children,
  ...props
}) => {
  const baseClass = variant === 'app' ? 'app-btn' : `btn-${variant}`;
  const rippleClass = variant !== 'app' ? 'ripple-btn' : '';
  const glowClass = isGlow ? 'glow-effect' : '';
  
  const finalClassName = `${baseClass} ${rippleClass} ${glowClass} ${className}`.trim().replace(/\s+/g, ' ');

  return (
    <button className={finalClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
