import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCredentials } from '@/lib/storage';
import { toast } from 'sonner';

export function useCredentialsGuard() {
  const router = useRouter();
  useEffect(() => {
    const creds = getCredentials();
    if (!creds) {
      toast('Please provide your API credentials to continue.');
      router.replace('/auth');
    }
  }, [router]);
}
