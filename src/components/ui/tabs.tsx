'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'bg-muted/60 text-muted-foreground inline-flex h-10 w-fit items-center justify-center rounded-xl p-1 gap-1',
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow data-[state=active]:font-semibold data-[state=active]:border data-[state=active]:border-border dark:data-[state=active]:bg-white/10 data-[state=inactive]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex h-8 px-4 items-center justify-center gap-1.5 rounded-lg border border-transparent transition-all duration-150 text-sm font-medium whitespace-nowrap hover:bg-accent/60 hover:text-foreground focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
