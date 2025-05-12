import React from 'react';

export default function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <span className="relative flex h-12 w-12">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40"></span>
        <span className="relative inline-flex rounded-full h-12 w-12 border-4 border-primary border-t-transparent border-b-transparent animate-spin"></span>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-lg"></span>
      </span>
      <span className="text-sm text-muted-foreground mt-2">Loading...</span>
    </div>
  );
}
