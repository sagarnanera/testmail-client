'use client';
import { useState, useEffect } from 'react';
import { getCredentials } from '@/lib/storage';
import { useCredentialsGuard } from '@/lib/useCredentialsGuard';
import Navbar from '@/components/Navbar';
import EmailList from '@/components/EmailList';
import EmailPreview from '@/components/EmailPreview';
import { Email } from '@/lib/api';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';

export default function InboxPage() {
  const [ready, setReady] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  useEffect(() => {
    // Only render if credentials are present
    const creds = getCredentials();
    if (creds) {
      setReady(true);
    }
  }, []);

  useCredentialsGuard();

  if (!ready) {
    // Show a centered spinner while checking credentials
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-muted text-foreground">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4">
        <Navbar />
        {/* Mobile: show either list or preview. Desktop: show both side by side. */}
        <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-110px)]">
          {/* Inbox List */}
          <div
            className={`md:w-1/3 w-full bg-card border border-border shadow-sm rounded-lg flex flex-col min-h-[300px] ${selectedEmail ? 'hidden' : ''} md:flex`}
          >
            <EmailList selectedEmail={selectedEmail} setSelectedEmail={setSelectedEmail} />
          </div>
          {/* Email Preview */}
          <div
            className={`md:w-2/3 w-full bg-card border border-border shadow-sm rounded-lg flex flex-col min-h-[300px] ${!selectedEmail ? 'hidden' : ''} md:flex`}
          >
            {/* Show back button on mobile */}
            {selectedEmail && (
              <div className="md:hidden p-2 border-b border-border flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedEmail(null)}
                  className="w-full"
                >
                  ← Back
                </Button>
              </div>
            )}
            <EmailPreview email={selectedEmail} />
          </div>
        </div>
      </div>
    </main>
  );
}
