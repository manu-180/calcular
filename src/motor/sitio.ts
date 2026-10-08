import type { ModoPublicacion } from "./registro";

export const NOMBRE_SITIO_INTL = "CalcularYa";

function origen(valor: string | undefined): string | null {
  const v = valor?.trim();
  if (!v) return null;
  try {
    return new URL(v).origin;
  } catch {
    return null;
  }
}

export function origenAR(): string {
  return origen(process.env.NEXT_PUBLIC_SITIO_AR_URL) ?? "https://calcular.ar";
}

// Sin NEXT_PUBLIC_SITIO_INTL_URL el árbol intl queda apagado: generateStaticParams devuelve vacío y
// next.config.ts no agrega reglas por host. Es lo que deja a calcular.ar idéntico (ADR 0001, D2).
export function origenIntl(): string | null {
  return origen(process.env.NEXT_PUBLIC_SITIO_INTL_URL);
}

export function intlActivo(): boolean {
  return origenIntl() !== null;
}

// zz y los mercados en estado "interno" solo existen fuera de producción (previews y local).
export function modoPublicacion(): ModoPublicacion {
  return process.env.VERCEL_ENV === "production" ? "produccion" : "interno";
}

// hreflang hacia y desde calcular.ar cambia el HTML de AR: queda apagado hasta que Manuel lo apruebe
// (ADR 0001, D6 y plan 1.8). Prenderlo es poner NEXT_PUBLIC_HREFLANG_AR=1.
export function hreflangARActivo(): boolean {
  return process.env.NEXT_PUBLIC_HREFLANG_AR === "1";
}
