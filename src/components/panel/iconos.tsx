import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const IcoPersonas = (p: P) => (
  <Base {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 19c.6-3.1 2.9-5 5.5-5s4.9 1.9 5.5 5" />
    <path d="M15.5 5.2a3 3 0 0 1 0 5.6M17.5 14.3c1.6.6 2.7 2.2 3 4.7" />
  </Base>
);

export const IcoCalculadora = (p: P) => (
  <Base {...p}>
    <rect x="5" y="3" width="14" height="18" rx="3" />
    <path d="M8.5 7.5h7M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 15.5h.01M12 15.5h.01M15.5 15.5h.01" />
  </Base>
);

export const IcoReloj = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Base>
);

export const IcoMano = (p: P) => (
  <Base {...p}>
    <path d="M8 13V6.5a1.5 1.5 0 0 1 3 0V12m0-1.5V5a1.5 1.5 0 0 1 3 0v6m0-4a1.5 1.5 0 0 1 3 0v6.5c0 3.6-2.4 6.5-6 6.5-2.3 0-3.8-1-5.1-2.8L3.8 15a1.5 1.5 0 0 1 2.4-1.8L8 15" />
  </Base>
);

export const IcoTarjeta = (p: P) => (
  <Base {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <path d="M3 10h18M7 15h3" />
  </Base>
);

export const IcoBolsa = (p: P) => (
  <Base {...p}>
    <path d="M5.5 8h13l-1 11.5a1.5 1.5 0 0 1-1.5 1.5H8a1.5 1.5 0 0 1-1.5-1.5z" />
    <path d="M9 10V7a3 3 0 0 1 6 0v3" />
  </Base>
);

export const IcoFlechaArriba = (p: P) => (
  <Base {...p}>
    <path d="M7 17 17 7M9 7h8v8" />
  </Base>
);

export const IcoFlechaDerecha = (p: P) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);

export const IcoRefrescar = (p: P) => (
  <Base {...p}>
    <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" />
    <path d="M19.5 4.5v4h-4" />
  </Base>
);

export const IcoCerrar = (p: P) => (
  <Base {...p}>
    <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
  </Base>
);

export const IcoLupa = (p: P) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </Base>
);

export const IcoAlerta = (p: P) => (
  <Base {...p}>
    <path d="M12 4.5 21 19.5H3z" />
    <path d="M12 10v4M12 17h.01" />
  </Base>
);

export const IcoIdea = (p: P) => (
  <Base {...p}>
    <path d="M9 17.5h6M10 21h4" />
    <path d="M12 3a6 6 0 0 0-3.6 10.8c.4.3.6.8.6 1.3v.4h6v-.4c0-.5.2-1 .6-1.3A6 6 0 0 0 12 3z" />
  </Base>
);

export const IcoLogro = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m8.5 12.3 2.4 2.4 4.8-5" />
  </Base>
);

export const IcoDato = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5M12 8h.01" />
  </Base>
);

export const IcoExterno = (p: P) => (
  <Base {...p}>
    <path d="M14 5h5v5M19 5l-8 8" />
    <path d="M17 13.5V18a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 5 18V8.5A1.5 1.5 0 0 1 6.5 7H11" />
  </Base>
);

export const IcoChevron = (p: P) => (
  <Base {...p}>
    <path d="m6 9 6 6 6-6" />
  </Base>
);

export const IcoCuenta = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
  </Base>
);

export const IcoBrujula = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m15.5 8.5-2 5-5 2 2-5z" />
  </Base>
);
