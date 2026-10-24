// Ruteo de la calculadora embebida. La URL pública es /<mercado>/embed/<slug>, pero el árbol
// src/app/(intl)/intl/[mercado] tiene el header y el footer del sitio en su layout, y el embed no
// puede llevarlos: vive en su propio layout raíz, src/app/(embed)/embebido/[mercado]/[slug]. Estas
// reglas mapean una cosa en la otra y las usa next.config.ts. Relativo y sin alias a propósito:
// next.config.ts no resuelve los `@/` (ver el comentario sobre mercadosDelRegistro ahí).
import { COOKIE_SITIO, type Condicion, type Regla } from "../hosts";

export const SEGMENTO_EMBED = "embed";
export const RAIZ_INTERNA_EMBED = "embebido";

const RE_MERCADO = /^[a-z0-9][a-z0-9-]*$/;
const escapar = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function reglasEmbed(o: { origenIntl: string | null; mercados: readonly string[]; cookiePreview: boolean }): Regla[] {
  if (o.origenIntl === null) return [];
  const mercados = [...new Set(o.mercados)].filter((m) => RE_MERCADO.test(m)).sort().join("|");
  if (!mercados) return [];
  const porHost: Condicion = { type: "host", value: escapar(new URL(o.origenIntl).hostname) };
  const porCookie: Condicion = { type: "cookie", key: COOKIE_SITIO.nombre, value: COOKIE_SITIO.valor };
  const intl: Condicion[] = o.cookiePreview ? [porHost, porCookie] : [porHost];
  return [
    // Fuera de calcularya la raíz interna no existe (igual que /intl/*).
    { source: `/${RAIZ_INTERNA_EMBED}/:path*`, missing: intl, destination: "/__no_existe/:path*" },
    ...intl.map((c): Regla => ({ source: `/:mercado(${mercados})/${SEGMENTO_EMBED}/:slug`, has: [c], destination: `/${RAIZ_INTERNA_EMBED}/:mercado/:slug` })),
  ];
}
