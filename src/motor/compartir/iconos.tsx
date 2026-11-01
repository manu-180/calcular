import type { ReactNode } from "react";

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

const trazo = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const ICONOS: Record<"instagram" | "facebook" | "whatsapp" | "x" | "copiar" | "mas" | "bajar", ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" {...trazo}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.4 21v-7.7h2.6l.4-3h-3V8.4c0-.9.3-1.5 1.5-1.5h1.6V4.2a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.7v3h2.6V21Z" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" {...trazo}>
      <path d="M4.5 19.5l1.1-3.6A7.8 7.8 0 1 1 8.4 18.6Z" />
      <path d="M9.3 8.6c.2-.4.6-.4.8 0l.6 1.4c.1.3 0 .5-.2.7l-.4.4c.5 1.1 1.4 2 2.5 2.5l.4-.4c.2-.2.5-.3.7-.2l1.4.6c.4.2.4.6 0 .8-.6.6-1.4.9-2.2.6a7 7 0 0 1-4.2-4.2c-.3-.8 0-1.6.6-2.2Z" fill="currentColor" stroke="none" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12Z" />
    </svg>
  ),
  copiar: (
    <svg viewBox="0 0 24 24" {...trazo}>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </svg>
  ),
  mas: (
    <svg viewBox="0 0 24 24" {...trazo}>
      <path d="M12 15V4M8 7.5 12 4l4 3.5M5 12v6.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V12" />
    </svg>
  ),
  bajar: (
    <svg viewBox="0 0 24 24" {...trazo}>
      <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14" />
    </svg>
  ),
};
