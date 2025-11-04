import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
  user: { name: string; email: string } | null;
  onLogin: () => void;
}

export default function Header({ user, onLogin }: HeaderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {/* Placeholder for mobile menu button space */}
            <div className="w-10 lg:hidden" />
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="icon"
              className="rounded-full border-slate-300 dark:border-slate-700"
            >
              {theme === 'light' ? (
                <Moon size={18} className="text-slate-600 dark:text-slate-400" />
              ) : (
                <Sun size={18} className="text-slate-600 dark:text-slate-400" />
              )}
            </Button>

            {/* User Section */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {user.email}
                  </p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user.name[0].toUpperCase()}
                  </span>
                </div>
              </div>
            ) : (
              <Button
                onClick={onLogin}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
