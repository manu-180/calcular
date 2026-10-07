import type { ReactNode } from "react";

export function Barra({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`block animate-pulse rounded-full bg-zinc-900/[0.07] motion-reduce:animate-none ${className}`} />;
}

export function Bloque({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`block animate-pulse rounded-2xl bg-zinc-900/[0.05] motion-reduce:animate-none ${className}`} />;
}

export function Esqueleto({ aviso, children, className = "" }: { aviso: string; children: ReactNode; className?: string }) {
  return (
    <div aria-busy="true" className={className}>
      <p role="status" className="sr-only">
        {aviso}
      </p>
      {children}
    </div>
  );
}
