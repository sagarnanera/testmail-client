import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export type ThemeType = 'light' | 'dark' | 'system';

export const themeIcon = {
    light: Sun,
    dark: Moon,
    system: Monitor,
} as const;

export const toggleTheme = (currentTheme: ThemeType, setTheme: (theme: ThemeType) => void) => {
    if (currentTheme === 'light') {
        setTheme('dark');
    } else if (currentTheme === 'dark') {
        setTheme('system');
    } else {
        setTheme('light');
    }
};

export function useSystemTheme() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Handle system theme changes
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

    const handleThemeToggle = () => {
        if (theme) {
            toggleTheme(theme as ThemeType, setTheme);
        }
    };

    const ThemeIcon = theme ? themeIcon[theme as keyof typeof themeIcon] : Monitor;

    return {
        theme,
        mounted,
        ThemeIcon,
        handleThemeToggle,
    };
} 