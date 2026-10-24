const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, focusable: false } as const;

export function IconoCompartir({ className }: { className?: string }) {
  return (
    <svg {...base} className={className} width="16" height="16">
      <path d="M12 15V4M8 7.5 12 4l4 3.5M5 12v6.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V12" />
    </svg>
  );
}

export function IconoCheck({ className }: { className?: string }) {
  return (
    <svg {...base} className={className} width="16" height="16">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}
