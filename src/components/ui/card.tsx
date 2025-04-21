import * as React from 'react';
import { cn } from '../../lib/utils';

export function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border shadow-sm bg-white">{children}</div>;
}

export function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-6", className)}>{children}</div>;
}
