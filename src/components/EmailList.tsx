'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { getCredentials } from '@/lib/storage';
import { TestmailClient, Email } from '@/lib/api';
import { format } from 'date-fns';
import { FilterDialog } from './FilterDialog';
import { DateRange } from 'react-day-picker';
import { Filter, RefreshCw } from 'lucide-react';
import CopyToClipboard from './CopyToClipBoard';

interface EmailListProps {
  selectedEmail: Email | null;
  setSelectedEmail: (email: Email | null) => void;
}

export default function EmailList({ selectedEmail, setSelectedEmail }: EmailListProps) {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedTagPrefix, setAppliedTagPrefix] = useState('');
  const [appliedDateRange, setAppliedDateRange] = useState<DateRange | undefined>(undefined);

  const LIMIT = 10;
  const creds = getCredentials();
  const apiToken = creds?.apiToken;
  const inboxId = creds?.inboxId;

  // For API use
  const dateFrom = appliedDateRange?.from ? appliedDateRange.from.toISOString().slice(0, 10) : '';
  const dateTo = appliedDateRange?.to ? appliedDateRange.to.toISOString().slice(0, 10) : '';

  const fetchEmails = async (reset = false) => {
    if (!apiToken || !inboxId) return;
    setLoading(true);
    setError(null);

    if (reset) {
      setEmails([]);
      setOffset(0);
      setSelectedEmail(null);
    }

    try {
      const client = new TestmailClient(apiToken, inboxId);
      const {
        emails: fetchedEmails,
        count,
        message,
      } = await client.getEmails(reset ? 0 : offset, LIMIT, appliedTagPrefix, dateFrom, dateTo);

      if (message?.includes('warning')) {
        setWarning(message);
      } else {
        setWarning(null);
      }

      if (reset) {
        setEmails(fetchedEmails);
        setOffset(LIMIT);
      } else {
        setEmails((prev) => [...prev, ...fetchedEmails]);
        setOffset((prev) => prev + LIMIT);
      }

      setHasMore((reset ? LIMIT : offset + LIMIT) < count);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch emails');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiToken, inboxId, appliedTagPrefix, dateFrom, dateTo]);

  const handleApplyFilters = (tagPrefix: string, dateRange: DateRange | undefined) => {
    setAppliedTagPrefix(tagPrefix);
    setAppliedDateRange(dateRange);
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setAppliedTagPrefix('');
    setAppliedDateRange(undefined);
    setIsFilterOpen(false);
  };

  const hasActiveFilters = Boolean(appliedTagPrefix || (dateFrom && dateTo));

  return (
    <aside className="w-full h-full flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="text-foreground flex items-center gap-1">
          <h2 className="text-base font-semibold">Inbox</h2>
          <span className="text-muted-foreground">({inboxId})</span>
          <CopyToClipboard text={inboxId} />
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              {/* Filter */}
            </Button>
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-background" />
            )}
          </div>
          <Button size="sm" variant="outline" onClick={() => fetchEmails(true)} disabled={loading}>
            {/* Refresh */}
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <FilterDialog
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        tagPrefix={appliedTagPrefix}
        dateRange={appliedDateRange}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />

      <div className="flex-1 overflow-y-auto">
        {warning && !loading && (
          <div className="p-3 mb-2 rounded bg-yellow-100 text-yellow-900 border border-yellow-300 text-sm">
            {warning}
          </div>
        )}
        {loading && emails.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">Loading emails...</div>
        ) : null}
        {error ? (
          <div className="p-4 text-center text-destructive-foreground bg-destructive/10 rounded mb-2">
            {error}
            <Button size="sm" className="ml-2" onClick={() => fetchEmails(true)}>
              Retry
            </Button>
          </div>
        ) : null}
        {!loading && !error && emails.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">No emails found.</div>
        ) : null}
        {emails.map((email) => (
          <div
            key={email.id}
            className={`relative px-4 py-2 border-b border-border cursor-pointer transition-colors group
              ${
                selectedEmail?.id === email.id
                  ? 'bg-primary/10 shadow-sm text-primary-foreground font-semibold before:content-[""] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:rounded-r-md before:bg-primary'
                  : 'hover:bg-accent/60'
              }
            `}
            onClick={() => setSelectedEmail(email)}
          >
            <div className="font-medium truncate text-foreground group-hover:text-primary">
              {email.subject}
            </div>
            <div className="text-xs text-muted-foreground truncate">From: {email.from}</div>
            <div className="text-xs text-muted-foreground truncate">To: {email.to}</div>
            <div className="text-xs text-muted-foreground">
              {format(new Date(email.date), 'PPp')}
            </div>
          </div>
        ))}
        {!error && hasMore && emails.length ? (
          <Button
            className="m-4 w-[calc(100%-2rem)] flex items-center justify-center gap-2"
            onClick={() => fetchEmails(false)}
            disabled={loading}
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
            ) : null}
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        ) : null}
      </div>
    </aside>
  );
}
