'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className='flex items-center'>
      {theme === 'light' && (
        <button
          aria-label='Enable Dark Mode'
          onClick={() => setTheme('dark')}
          className='text-orange-500'
        >
          <Sun className='w-5 h-5' />
        </button>
      )}

      {theme === 'dark' && (
        <button
          aria-label='Enable Light Mode'
          onClick={() => setTheme('light')}
          className='text-slate-400'
        >
          <Moon className='w-5 h-5 ' />
        </button>
      )}
    </div>
  );
};
