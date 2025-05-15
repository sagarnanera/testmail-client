'use client';
import { Button } from '@/components/ui/button';
import { clearCredentials, getCredentials } from '@/lib/storage';
import { useRouter } from 'next/navigation';
import { useSystemTheme } from '@/hooks/useSystemTheme';
import { useMemo } from 'react';

export default function Navbar({
  from,
}: {
  from: 'inbox' | 'home';
}) {
  const router = useRouter();
  const { ThemeIcon, handleThemeToggle, mounted } = useSystemTheme();

  const handleLogout = () => {
    clearCredentials();
    router.replace('/auth');
  };

  const hasCredentials = useMemo(() => {
    return !!getCredentials();
  }, []);

  // if from home,
  //  - has no credentials -> show get started btn
  //  - has credentials -> show go to inbox btn
  // if from inbox,
  //  - show logout btn
  const getCTA = () => {
    if (from === 'home') {
      return hasCredentials ? (
        <Button size="sm" variant="outline" onClick={() => router.push('/inbox')}>
          Go to Inbox
        </Button>
      ) : (
        <Button size="sm" variant="outline" onClick={() => router.push('/auth')}>
          Get Started
        </Button>
      );
    }
    return (
      <Button size="sm" variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    );
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-card border border-border rounded-lg shadow mb-2 sticky top-0 z-10">
      <span className="font-bold text-lg">Testmail Client</span>
      <div className="flex items-center gap-4">
        <Button
          size="icon"
          variant="ghost"
          aria-label="Toggle theme"
          onClick={handleThemeToggle}
          className="border border-border rounded-full"
          disabled={!mounted}
        >
          <ThemeIcon className="w-5 h-5" />
        </Button>
        {getCTA()}
      </div>
    </nav>
  );
}
