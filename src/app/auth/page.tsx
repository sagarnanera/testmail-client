'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getCredentials, setCredentials } from '@/lib/storage';

export default function AuthPage() {
  const [apiToken, setApiToken] = useState('');
  const [inboxId, setInboxId] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // if the user is already logged in, redirect to the inbox page
  useEffect(() => {
    if (getCredentials()) {
      router.replace('/inbox');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiToken || !inboxId) return;
    setLoading(true);
    setCredentials(apiToken, inboxId);
    router.replace('/inbox');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary px-2">
      <Card className="p-6 max-w-md w-full rounded-xl shadow-lg border border-border sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">Enter Credentials</h1>
        <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
          <Input
            type="password"
            value={apiToken}
            onChange={(e) => setApiToken(e.target.value)}
            placeholder="API Token"
            required
            className="text-base py-3 px-4 rounded-md"
          />
          <Input
            value={inboxId}
            onChange={(e) => setInboxId(e.target.value)}
            placeholder="Inbox ID"
            required
            className="text-base py-3 px-4 rounded-md"
          />
          <Button
            className="w-full py-3 text-base rounded-md"
            type="submit"
            disabled={!apiToken || !inboxId || loading}
          >
            {loading ? 'Saving...' : 'Save & Continue'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
