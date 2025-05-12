'use client';
import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DateRange } from 'react-day-picker';
import { DateRangePicker } from '@/components/ui/DateRangePicker';

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tagPrefix: string;
  dateRange: DateRange | undefined;
  onApply: (tagPrefix: string, dateRange: DateRange | undefined) => void;
  onClear: () => void;
}

export function FilterDialog({
  open,
  onOpenChange,
  tagPrefix,
  dateRange,
  onApply,
  onClear,
}: FilterDialogProps) {
  const [localTagPrefix, setLocalTagPrefix] = React.useState(tagPrefix);
  const [localDateRange, setLocalDateRange] = React.useState<DateRange | undefined>(dateRange);

  React.useEffect(() => {
    setLocalTagPrefix(tagPrefix);
  }, [tagPrefix]);
  React.useEffect(() => {
    setLocalDateRange(dateRange);
  }, [dateRange]);

  const handleApply = () => {
    onApply(localTagPrefix, localDateRange);
    onOpenChange(false);
  };

  const handleClear = () => {
    setLocalTagPrefix('');
    setLocalDateRange(undefined);
    onClear();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="mx-auto rounded-xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">Filter Emails</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleApply();
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="tagPrefix" className="block text-sm font-medium mb-1">
              Tag Prefix
            </label>
            <Input
              id="tagPrefix"
              value={localTagPrefix}
              onChange={(e) => setLocalTagPrefix(e.target.value)}
              placeholder="Enter tag prefix"
              autoFocus
              className="text-base py-3 px-4 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date Range</label>
            <DateRangePicker
              value={localDateRange}
              onChange={setLocalDateRange}
              className="w-full"
            />
          </div>
          <div className="flex flex-row gap-2 justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              className="text-base py-2 px-4 rounded-md"
            >
              Clear Filters
            </Button>
            <Button type="submit" className="text-base py-2 px-4 rounded-md">
              Apply Filters
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
