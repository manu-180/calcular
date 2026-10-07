export function PuntoVivo({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`relative grid size-3.5 shrink-0 place-items-center rounded-full bg-emerald-500/15 ${className}`}>
      <span className="size-1.5 rounded-full bg-emerald-500" />
    </span>
  );
}

export function Flecha({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconoExterno({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d="M6.5 3.5H4A1.5 1.5 0 002.5 5v7A1.5 1.5 0 004 13.5h7a1.5 1.5 0 001.5-1.5V9.5M9 2.5h4.5V7M13 3l-6 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconoCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconoRss({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M3 7.5a5.5 5.5 0 015.5 5.5M3 3a10 10 0 0110 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="3.75" cy="12.25" r="1.25" fill="currentColor" />
    </svg>
  );
}
