'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Key, Zap, Palette } from 'lucide-react';
import { getCredentials } from '@/lib/storage';
import Navbar from '@/components/Navbar';

export default function Home() {

  // we don't need state for this
  const hasCredentials = useMemo(() => !!getCredentials(), []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar from="home" />

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
            Effortless Test Email Viewer
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connect your Testmail inbox and preview emails instantly.
          </p>
          <Link
            href={hasCredentials ? '/inbox' : '/auth'}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {hasCredentials ? 'Go to Inbox' : 'Get Started'}
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-background">
              <Key className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Paste your Testmail token, no signup</h3>
              <p className="text-muted-foreground">
                Quick and easy setup with your existing Testmail credentials.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-background">
              <Palette className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Dark/light mode</h3>
              <p className="text-muted-foreground">
                Choose your preferred theme or let the system decide.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-background">
              <Zap className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Minimal, fast UI</h3>
              <p className="text-muted-foreground">
                Clean interface designed for speed and efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 text-center text-sm text-muted-foreground border-t border-border">
        <p>Open-source • <a href="https://github.com/sagarnanera/testmail-client" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">View on GitHub</a></p>
      </footer>
    </div>
  );
}
