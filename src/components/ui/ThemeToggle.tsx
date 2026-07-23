import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme, Theme } from '../../context/ThemeContext';
import './ThemeToggle.css';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const options: { mode: Theme; label: string; icon: React.ReactNode }[] = [
    { mode: 'dark', label: 'Dark', icon: <Moon size={14} /> },
    { mode: 'light', label: 'Light', icon: <Sun size={14} /> },
    { mode: 'system', label: 'System', icon: <Monitor size={14} /> },
  ];

  return (
    <div className="theme-toggle-group glass-panel" role="radiogroup" aria-label="Theme selection">
      {options.map((opt) => (
        <button
          key={opt.mode}
          className={`theme-toggle-btn ${theme === opt.mode ? 'active' : ''}`}
          onClick={() => setTheme(opt.mode)}
          title={`Switch to ${opt.label} mode`}
          aria-label={`${opt.label} mode`}
          aria-checked={theme === opt.mode}
          role="radio"
        >
          {opt.icon}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
