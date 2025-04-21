
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn("w-full border px-3 py-2 rounded-md focus:outline-none", className)}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
