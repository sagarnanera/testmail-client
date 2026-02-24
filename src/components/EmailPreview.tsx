'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Email } from '@/lib/api';
import DOMPurify from 'dompurify';
import CopyToClipboard from './CopyToClipBoard';

interface EmailPreviewProps {
  email: Email | null;
}

export default function EmailPreview({ email }: EmailPreviewProps) {


  if (!email) {
    return (
      <section className="flex-1 h-full overflow-y-auto bg-card shadow-sm rounded-lg flex items-center justify-center text-muted-foreground p-4">
        <span>Select an email to view details</span>
      </section>
    );
  }

  return (
    <section className="w-full h-full flex flex-col">
      <Tabs defaultValue="html" className="flex flex-col h-full">
        <div className="p-3 sm:p-4 border-b border-border flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            <h2 className="text-base font-semibold text-foreground">Email Details</h2>
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="html" className="flex-1 sm:flex-none">
                HTML
              </TabsTrigger>
              <TabsTrigger value="text" className="flex-1 sm:flex-none">
                Text
              </TabsTrigger>
              <TabsTrigger value="headers" className="flex-1 sm:flex-none">
                Headers
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground mt-2">
            <div className="flex flex-col sm:flex-row sm:gap-2">
              <span className="font-semibold text-foreground">Subject:</span>{' '}
              <span className="break-all">{email.subject}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-2">
              <span className="font-semibold text-foreground">From:</span>{' '}
              <div className="flex items-center gap-2">
                <span className="break-all text-foreground truncate w-[90%]">{email.from}</span>
                <CopyToClipboard text={email.from} />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-2">
              <span className="font-semibold text-foreground">To:</span>{' '}
              <div className="flex items-center gap-2">
                <span className="break-all text-foreground truncate w-[90%]">{email.to}</span>
                <CopyToClipboard text={email.to} />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-2">
              <span className="font-semibold text-foreground">Date:</span>{' '}
              <span>{new Date(email.date).toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <TabsContent value="html">
            <div
              className="prose dark:prose-invert max-w-none overflow-auto break-words p-2"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(email.html) }}
            />
          </TabsContent>
          <TabsContent value="text">
            <pre className="whitespace-pre-wrap text-muted-foreground p-2">{email.text}</pre>
          </TabsContent>
          <TabsContent value="headers">
            {email.headers && email.headers.length > 0 ? (
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">All Headers</span>
                  <span className="text-xs font-medium text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                    {email.headers.length}
                  </span>
                </div>
                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/60 hover:bg-muted/60">
                        <TableHead className="w-[200px] font-semibold text-foreground">Key</TableHead>
                        <TableHead className="font-semibold text-foreground">Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {email.headers.map((header, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono text-xs text-primary align-top break-all whitespace-normal py-3">
                            {header.key}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground align-top break-all whitespace-normal py-3">
                            {header.line}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground p-4">No headers available.</p>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
