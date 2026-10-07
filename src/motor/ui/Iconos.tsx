// Trazo fino y uniforme (1.5) para todo el sitio intl. Decorativos: el texto de al lado nombra la acción.
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, focusable: false } as const;

export function IconoFlecha({ className }: { className?: string }) {
  return (
    <svg {...base} className={className} width="16" height="16">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconoExterno({ className }: { className?: string }) {
  return (
    <svg {...base} className={className} width="14" height="14">
      <path d="M14 5h5v5M19 5l-8 8M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4" />
    </svg>
  );
}

export function IconoGlobo({ className }: { className?: string }) {
  return (
    <svg {...base} className={className} width="18" height="18">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.2 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.2-3.5-8.5S9.6 5.9 12 3.5Z" />
    </svg>
  );
}

export function IconoChevron({ className }: { className?: string }) {
  return (
    <svg {...base} className={className} width="14" height="14">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function IconoCerrar({ className }: { className?: string }) {
  return (
    <svg {...base} className={className} width="16" height="16">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconoSello({ className }: { className?: string }) {
  return (
    <svg {...base} className={className} width="18" height="18">
      <path d="M12 3.2 14 5l2.6-.3.9 2.5 2.3 1.3-.7 2.5.7 2.5-2.3 1.3-.9 2.5L14 19l-2 1.8L10 19l-2.6.3-.9-2.5-2.3-1.3.7-2.5-.7-2.5 2.3-1.3.9-2.5L10 5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function IconoInfo({ className }: { className?: string }) {
  return (
    <svg {...base} className={className} width="18" height="18">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5M12 8h.01" />
    </svg>
  );
}

export function IconoAlerta({ className }: { className?: string }) {
  return (
    <svg {...base} className={className} width="18" height="18">
      <path d="M10.3 4.3 2.9 17.2A2 2 0 0 0 4.6 20h14.8a2 2 0 0 0 1.7-2.8L13.7 4.3a2 2 0 0 0-3.4 0Z" />
      <path d="M12 10v4M12 17h.01" />
    </svg>
  );
}

export function Marca({ nombre }: { nombre: string }) {
  const corte = nombre.endsWith("Ya") ? nombre.length - 2 : nombre.length;
  return (
    <span className="cy-marca">
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" focusable="false" className="cy-marca-signo">
        <rect width="32" height="32" rx="9" fill="var(--cy-tinta)" />
        <path d="M9 12.5h14" stroke="var(--cy-papel)" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M9 19.5h8.5" stroke="var(--cy-maiz)" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="22.5" cy="19.5" r="1.6" fill="var(--cy-maiz)" />
      </svg>
      <span className="cy-marca-texto">
        {nombre.slice(0, corte)}
        <span className="cy-marca-ya">{nombre.slice(corte)}</span>
      </span>
    </span>
  );
}
