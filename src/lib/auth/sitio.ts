import { COOKIE_SITIO } from "@/motor/hosts";
import { entornoDePrueba, origenAR, origenIntl } from "@/motor/sitio";
import { MERCADO_GLOBAL, mercadoDeRuta } from "@/lib/medicion/mercados";

// Sin "server-only": lo usan proxy.ts, las APIs y las Server Actions.

export type SitioCuenta = "ar" | "intl";

const sinPuerto = (host: string | null | undefined) => (host ?? "").split(":", 1)[0].trim().toLowerCase();

export function hostIntl(): string | null {
  const o = origenIntl();
  return o ? new URL(o).hostname : null;
}

// www también: hosts.ts lo manda con 308 al dominio sin www antes de llegar acá, pero si alguna vez
// llega, es el mismo sitio y no uno ajeno.
export function esHostIntl(host: string | null | undefined): boolean {
  const intl = hostIntl();
  if (!intl) return false;
  const h = sinPuerto(host);
  return h === intl || h === `www.${intl}`;
}

// Mismo criterio que el ruteo por host (src/motor/hosts.ts) y que proxy.ts: el Host, o en un preview
// la cookie sitio=intl. Sin NEXT_PUBLIC_SITIO_INTL_URL nunca es intl.
export function sitioDeHost(host: string | null | undefined, cookieSitio: string | null | undefined): SitioCuenta {
  if (!hostIntl()) return "ar";
  if (esHostIntl(host)) return "intl";
  return entornoDePrueba() && cookieSitio === COOKIE_SITIO.valor ? "intl" : "ar";
}

// El origen de los enlaces (mails, redirect_uri de Google) sale de una lista cerrada y nunca del
// Host a secas: un Host inyectado mandaría el token_hash de otra persona a un dominio ajeno. En
// producción hay dos valores posibles; en dev y previews, además, el host de la máquina o del deploy.
export function origenDeSitio(sitio: SitioCuenta, hostCrudo: string | null | undefined): string {
  const fijo = sitio === "intl" ? (origenIntl() ?? origenAR()) : origenAR();
  if (process.env.VERCEL_ENV === "production") return fijo;
  const host = (hostCrudo ?? "").trim().toLowerCase();
  if (/^(localhost|127\.0\.0\.1)(:\d{2,5})?$/.test(host)) return `http://${host}`;
  if (/^[a-z0-9-]+\.vercel\.app$/.test(host)) return `https://${host}`;
  return fijo;
}

// Path ya validado (destinoSeguro o rutaDeOrigen): su primer segmento dice el país. Sin path, global.
export function mercadoDeDesde(ruta: string | null | undefined): string {
  return ruta && ruta.startsWith("/") ? mercadoDeRuta(ruta) : MERCADO_GLOBAL;
}

export type OrigenAlta = { sitio: "intl"; mercado: string };
