// buttons/default/theme-toggle.tsx
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { getStoredTheme, setStoredTheme } from '@/base/services/themes/theme.service.ts';
import type { Theme } from '@/base/types/themes/theme.types';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(getStoredTheme());

  useEffect(() => {
    setStoredTheme(theme);
    
    // Dispatch custom event to notify other components about theme change
    window.dispatchEvent(new CustomEvent('themeChange', { detail: theme }));
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer p-2 rounded-lg bg-white/20 hover:bg-white/30 dark:bg-white/20 dark:hover:bg-gray-700/50 transition-colors backdrop-blur-sm"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
};

export default ThemeToggle;