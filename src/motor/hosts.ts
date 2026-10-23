// Reglas de ruteo por dominio (ADR 0001, D2, y docs/adr/0001-spike-next16.md). Función pura: la
// llama next.config.ts con el registro ya resuelto y la usa check_routing_hosts.ts para saber qué
// esperar. Tres cosas probadas en el spike que no se pueden tocar sin volver a probar:
// - Los mercados van en allowlist explícita. Una regex amplia en beforeFiles se come public/ y
//   _next/static, porque beforeFiles corre antes que el filesystem.
// - Los rewrites encadenan: el path ya reescrito se vuelve a evaluar contra las reglas siguientes.
//   Por eso las de /intl/* van primero; si fueran después, /robots.txt -> /intl/global/robots.txt
//   caería en ellas y daría 404.
// - El tipo host compara solo el hostname (sin puerto) y el value es una regex anclada.

import { SLUG_MUNDO } from "./mundo/rutas";

// «Tu sueldo en el mundo» de la home global: la home está en inglés (ADR 0002, D2), así que su slug es
// el de en. Con sus duelos (/<slug>/<c>) y su imagen (/<slug>/og).
const SLUG_MUNDO_GLOBAL = SLUG_MUNDO.en;

export type Condicion = { type: "host"; value: string } | { type: "cookie"; key: string; value: string };

export interface Regla {
  source: string;
  destination: string;
  has?: Condicion[];
  missing?: Condicion[];
}

export interface ReglaRedirect extends Regla {
  permanent: boolean;
}

export interface OpcionesHosts {
  origenIntl: string | null;
  origenAR: string;
  mercados: readonly string[];
  paginasGlobales: readonly string[];
  rutasAR: readonly string[];
  cookiePreview: boolean;
  // NEXT_PUBLIC_CUENTAS_ACTIVAS: con las cuentas apagadas calcularya sigue mandando /login y compañía
  // a calcular.ar, como antes.
  cuentas?: boolean;
}

export interface ReglasHosts {
  redirects: ReglaRedirect[];
  beforeFiles: Regla[];
  fallback: Regla[];
}

export const COOKIE_SITIO = { nombre: "sitio", valor: "intl" } as const;
export const SEGMENTO_404 = "404";
// Una carpeta llamada sitemap.xml la toma Next como ruta de metadata y, con [mercado] adelante, el
// build prerenderiza un /intl/-/sitemap.xml aunque el sitio intl esté apagado. El handler vive con
// otro nombre y el /<m>/sitemap.xml público llega por rewrite.
export const RUTA_SITEMAP = "mapa-xml";
export const RUTA_LLMS = "llms.txt";
export const API_INTL_PERMITIDAS = ["geo", "dev/sitio", "e", "pagos"] as const;
// Las pantallas de cuenta de calcularya: mismo path público que en calcular.ar, servidas por
// src/app/(intl)/intl/[mercado]/(cuenta) con la marca CalcularYa. /dashboard sigue sólo en AR.
export const RUTAS_CUENTA = ["login", "registro", "recuperar", "cuenta", "auth"] as const;
const negadas = (permitidas: readonly string[]) => `(?!(?:${permitidas.map((a) => a.replace("/", "\\/")).join("|")})(?:\\/|$)).*`;

const escapar = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const RE_SEGMENTO = /^[a-z0-9][a-z0-9-]*$/;

function alternativas(lista: readonly string[]): string {
  const validas = [...new Set(lista)].filter((s) => RE_SEGMENTO.test(s)).sort();
  return validas.join("|");
}

export function reglasPorHost(o: OpcionesHosts): ReglasHosts {
  if (o.origenIntl === null) {
    return {
      // calcularya.com sin sitio intl prendido mostraría el sitio argentino duplicado en otro dominio.
      // Temporal (307) a propósito: cuando se defina NEXT_PUBLIC_SITIO_INTL_URL la reemplazan las
      // reglas de abajo y Google no tiene que olvidar un 308.
      redirects: [
        {
          source: "/:path*",
          has: [{ type: "host", value: "(?:www\\.)?calcularya\\.com" }],
          destination: "https://calcular.ar/:path*",
          permanent: false,
        },
      ],
      beforeFiles: [{ source: "/intl/:path*", destination: "/__no_existe/:path*" }],
      fallback: [],
    };
  }

  const host = new URL(o.origenIntl).hostname;
  const porHost: Condicion = { type: "host", value: escapar(host) };
  const porCookie: Condicion = { type: "cookie", key: COOKIE_SITIO.nombre, value: COOKIE_SITIO.valor };
  const intl: Condicion[] = o.cookiePreview ? [porHost, porCookie] : [porHost];

  const cuentas = o.cuentas === true;
  const reservados = new Set([...o.mercados, ...o.paginasGlobales, SLUG_MUNDO_GLOBAL, "intl", "api", "og", "_next", ...(cuentas ? RUTAS_CUENTA : [])]);
  const apiNegadas = negadas(cuentas ? [...API_INTL_PERMITIDAS, "cuenta"] : API_INTL_PERMITIDAS);
  const mercados = alternativas(o.mercados);
  const globales = alternativas(o.paginasGlobales);
  const rutasAR = alternativas(o.rutasAR.filter((r) => !reservados.has(r)));

  const redirects: ReglaRedirect[] = [];
  if (!host.startsWith("www.") && !host.endsWith(".localhost") && host !== "localhost") {
    redirects.push({ source: "/:path*", has: [{ type: "host", value: `www\\.${escapar(host)}` }], destination: `${o.origenIntl}/:path*`, permanent: true });
  }
  // Dos reglas por destino y no `/:resto*`: en Vercel un `*` vacío deja la barra final en el destino
  // (/mx -> https://calcularya.com/mx/), y esa barra la quita un segundo 308 en el sitio de destino.
  if (rutasAR) {
    redirects.push(
      { source: `/:ruta(${rutasAR})`, has: [porHost], destination: `${o.origenAR}/:ruta`, permanent: true },
      { source: `/:ruta(${rutasAR})/:resto+`, has: [porHost], destination: `${o.origenAR}/:ruta/:resto*`, permanent: true },
    );
  }
  if (mercados) {
    redirects.push(
      { source: `/:mercado(${mercados})`, missing: intl, destination: `${o.origenIntl}/:mercado`, permanent: true },
      { source: `/:mercado(${mercados})/:resto+`, missing: intl, destination: `${o.origenIntl}/:mercado/:resto*`, permanent: true },
    );
  }

  const beforeFiles: Regla[] = [{ source: "/intl/:path*", missing: intl, destination: "/__no_existe/:path*" }];
  for (const c of intl) beforeFiles.push({ source: "/intl/:path*", has: [c], destination: `/intl/global/${SEGMENTO_404}/:path*` });
  for (const c of intl) {
    beforeFiles.push(
      { source: "/", has: [c], destination: "/intl/global" },
      { source: "/robots.txt", has: [c], destination: "/intl/global/robots.txt" },
      { source: "/sitemap.xml", has: [c], destination: "/intl/global/sitemaps.xml" },
      { source: "/sitemap-global.xml", has: [c], destination: `/intl/global/${RUTA_SITEMAP}` },
      // public/llms.txt describe calcular.ar: en calcularya va su propia versión.
      { source: "/llms.txt", has: [c], destination: `/intl/global/${RUTA_LLMS}` },
      // Las APIs y la imagen OG de calcular.ar no existen en calcularya. /api/geo la usa el aviso de
      // país, /api/dev/sitio es la única forma de borrar la cookie en un preview y /api/e es la
      // medición (decide el sitio por el Origin, no por el host).
      // Con las cuentas prendidas también /api/cuenta: el handler es el de AR y decide el sitio por el Host.
      { source: `/api/:path(${apiNegadas})`, has: [c], destination: `/intl/global/${SEGMENTO_404}/api/:path` },
      { source: "/og/:path*", has: [c], destination: "/intl/global/og/:path*" },
    );
    if (globales) beforeFiles.push({ source: `/:pagina(${globales})`, has: [c], destination: "/intl/global/:pagina" });
    beforeFiles.push(
      { source: `/${SLUG_MUNDO_GLOBAL}`, has: [c], destination: `/intl/global/${SLUG_MUNDO_GLOBAL}` },
      { source: `/${SLUG_MUNDO_GLOBAL}/:resto+`, has: [c], destination: `/intl/global/${SLUG_MUNDO_GLOBAL}/:resto+` },
    );
    if (cuentas) beforeFiles.push({ source: `/:ruta(${alternativas(RUTAS_CUENTA)})/:resto*`, has: [c], destination: "/intl/global/:ruta/:resto*" });
  }
  if (mercados) {
    for (const c of intl) {
      beforeFiles.push(
        { source: `/:mercado(${mercados})/sitemap.xml`, has: [c], destination: `/intl/:mercado/${RUTA_SITEMAP}` },
        { source: `/:mercado(${mercados})/:path*`, has: [c], destination: "/intl/:mercado/:path*" },
      );
    }
  }

  // Lo que no es de ningún mercado ni de Argentina termina en el 404 intl y no en global-not-found,
  // que pinta la marca de calcular.ar. Corre después del filesystem: public/ y _next no pasan acá.
  const fallback: Regla[] = intl.map((c) => ({ source: "/:path+", has: [c], destination: `/intl/global/${SEGMENTO_404}/:path+` }));

  return { redirects, beforeFiles, fallback };
}
