'use client';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="p-8 max-w-md w-full flex flex-col items-center gap-6 shadow-md">
        <h1 className="text-3xl font-bold text-foreground">404 - Page Not Found</h1>
        <p className="text-muted-foreground text-center">
          Sorry, the page you are looking for does not exist.
        </p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            Go Back
          </Button>
          <Button onClick={() => router.push('/')}>Go Home</Button>
        </div>
      </Card>
    </div>
  );
}
