import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Initial check: if user already has saved preference
    const savedTheme = localStorage.getItem('diagnospherex-theme');
    if (savedTheme === 'dark') {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      const meta = document.getElementById('theme-color-meta');
      if (meta) meta.setAttribute('content', '#0F0F14');
    } else {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
      const meta = document.getElementById('theme-color-meta');
      if (meta) meta.setAttribute('content', '#FAFAFC');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('diagnospherex-theme', nextTheme);
    const meta = document.getElementById('theme-color-meta');
    if (meta) meta.setAttribute('content', nextTheme === 'dark' ? '#0F0F14' : '#FAFAFC');
  };

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle-btn ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <Moon size={18} className="theme-icon moon-icon" />
      ) : (
        <Sun size={18} className="theme-icon sun-icon" />
      )}
    </button>
  );
};

export default ThemeToggle;
