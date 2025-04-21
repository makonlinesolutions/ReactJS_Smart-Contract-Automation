
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn("w-full border px-3 py-2 rounded-md focus:outline-none", className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
