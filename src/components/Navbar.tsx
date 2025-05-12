'use client';
import { Button } from '@/components/ui/button';
import { clearCredentials } from '@/lib/storage';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useEffect } from 'react';

const themeIcon = {
  light: <Sun className="w-5 h-5" />,
  dark: <Moon className="w-5 h-5" />,
  system: <Monitor className="w-5 h-5" />,
};

export default function Navbar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Only listen for system theme changes if we're in system mode
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      e.preventDefault();
      // Only update if we're still in system mode
      if (theme === 'system') {
        setTheme('system'); // This will force next-themes to re-evaluate the system theme
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, setTheme]);

  const handleLogout = () => {
    clearCredentials();
    router.replace('/auth');
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-card border border-border rounded-lg shadow mb-2 sticky top-0 z-10">
      <span className="font-bold text-lg">Testmail Client</span>
      <div className="flex items-center gap-4">
        <Button
          size="icon"
          variant="ghost"
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="border border-border rounded-full"
        >
          {themeIcon[theme as keyof typeof themeIcon]}
        </Button>
        <Button size="sm" variant="outline" onClick={handleLogout} className="">
          Logout
        </Button>
      </div>
    </nav>
  );
}
