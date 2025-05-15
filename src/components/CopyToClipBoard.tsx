// copy to clipboard component

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Check, Copy } from 'lucide-react';

interface CopyToClipboardProps {
    text: string;
}

const handleCopy = (text: string, setCopied: (copied: boolean) => void) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
        setCopied(true);
    } else {
        prompt('Copy to clipboard', text);
    }
}

// copy to clipboard component
// show the green checkmark when the text is copied (for 500ms)
export default function CopyToClipboard({ text }: CopyToClipboardProps) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (copied) {
            timeout = setTimeout(() => setCopied(false), 500);
        }
        return () => clearTimeout(timeout);
    }, [copied]);

    return (
        <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
            onClick={() => handleCopy(text, setCopied)}
        >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
    )
}