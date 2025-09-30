import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = (): void => {
    toggleTheme();
  };

  return (
    <div className="mode-switch">
      <label>
        <input
          aria-label="Toggle theme"
          type="checkbox"
          data-testid="theme-checkbox"
          style={{ display: 'none' }}
          onChange={handleToggle}
          checked={theme === 'dark'}
        />
        <span className="theme-icon">
          {theme === 'dark' ? (
            <MoonOutlined data-testid="moon-icon" />
          ) : (
            <SunOutlined data-testid="sun-icon" />
          )}
        </span>
      </label>
    </div>
  );
};
