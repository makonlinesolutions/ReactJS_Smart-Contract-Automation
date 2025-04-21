
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  className?: string;
}

export function Button({ className, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp className={cn("px-4 py-2 bg-blue-600 text-white rounded-md", className)} {...props} />
  );
}
