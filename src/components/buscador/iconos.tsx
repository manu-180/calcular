import type { TipoPagina } from "@/data/navegacion";

type P = { className?: string };

export function IconoLupa({ className }: P) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      <circle cx="8.75" cy="8.75" r="5.75" stroke="currentColor" strokeWidth="1.6" />
      <path d="M13.2 13.2 17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconoCruz({ className }: P) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// El "=" es la marca del sitio (el resultado de una cuenta): las calculadoras lo llevan.
const TRAZOS: Record<TipoPagina, React.ReactNode> = {
  calculadora: (
    <>
      <path d="M6.5 8.5h7M6.5 11.5h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </>
  ),
  guia: (
    <>
      <path d="M6.5 6.5h7M6.5 9.5h7M6.5 12.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  planilla: (
    <>
      <rect x="5.5" y="5.5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.5 10h9M10 5.5v9" stroke="currentColor" strokeWidth="1.4" />
    </>
  ),
  archivo: (
    <>
      <rect x="5.5" y="6.5" width="9" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.5 9.5h9M8 5v2.5M12 5v2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
  info: (
    <>
      <circle cx="10" cy="10" r="4.75" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 9.5v3M10 7.4v.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
};

export function IconoTipo({ tipo, className }: P & { tipo: TipoPagina }) {
  return (
    <span className={className} data-tipo={tipo} aria-hidden>
      <svg viewBox="0 0 20 20" fill="none" className="size-5">
        {TRAZOS[tipo]}
      </svg>
    </span>
  );
}
