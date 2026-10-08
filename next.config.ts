import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";
import { reglasPorHost } from "./src/motor/hosts";
import { PAGINAS_GLOBALES } from "./src/motor/paginas";
import { entornoDePrueba, modoPublicacion, origenAR, origenIntl } from "./src/motor/sitio";

const HOY_BUILD =
  process.env.CALCULAR_HOY ||
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

// Las primeras carpetas de src/app/(ar) son las rutas de calcular.ar: en calcularya.com cada una
// redirige a su par argentino. Se leen del disco para que una página AR nueva no haya que anotarla.
const RUTAS_AR = readdirSync(path.join(__dirname, "src", "app", "(ar)"), { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^[a-z0-9]/.test(d.name))
  .map((d) => d.name);

// La allowlist de mercados sale del registro real (src/paises/index.ts) y no de una lista a mano.
// No se importa directo: el loader de next.config.ts compila los imports de alias (`@/motor/...`,
// que usan los países) como relativos a la raíz y no al archivo, y revienta. tsx sí los resuelve.
// Corre solo con el sitio intl prendido: sin la variable, calcular.ar no paga este medio segundo.
// En producción, un país "publicado" con errores de datos corta el build: el registro lo oculta
// (mercadoVisible) y sin este corte desaparecía de calcularya.com con el build en verde.
function mercadosDelRegistro(modo: string): string[] {
  const codigo = `const m = await import("./src/paises/index.ts");
const r = m.registro ?? m.default.registro;
const modo = ${JSON.stringify(modo)};
const rotos = modo === "produccion" ? r.paises.filter((p) => p.mercado.estado === "publicado" && p.errores.length) : [];
if (rotos.length) {
  for (const p of rotos) console.error(p.mercado.codigo + " (" + p.mercado.nombre + ") tiene " + p.errores.length + " errores de datos:", p.errores);
  process.exit(1);
}
process.stdout.write(JSON.stringify(r.mercados(modo).map((x) => x.codigo)));`;
  let salida: string;
  try {
    salida = execFileSync(process.execPath, ["--import", "tsx", "--input-type=module", "-e", codigo], { cwd: __dirname, encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] });
  } catch {
    throw new Error(
      "calcularya: hay países publicados con errores de datos (detalle arriba). Corregí los datos o pasá el país a estado \"interno\"; el build no sigue para que no desaparezca en silencio de producción.",
    );
  }
  return (JSON.parse(salida) as string[]).filter((c) => c !== "global");
}

const ORIGEN_INTL = origenIntl();
const REGLAS_HOSTS = reglasPorHost({
  origenIntl: ORIGEN_INTL,
  origenAR: origenAR(),
  mercados: ORIGEN_INTL ? mercadosDelRegistro(modoPublicacion()) : [],
  paginasGlobales: PAGINAS_GLOBALES,
  rutasAR: RUTAS_AR,
  // La cookie sitio=intl (la pone /api/dev/sitio) deja ver calcularya en los previews de *.vercel.app.
  // Solo previews y next dev: cualquier otro build (producción incluida) nunca lleva estas reglas.
  cookiePreview: entornoDePrueba(),
});

const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === "development" && ORIGEN_INTL ? { allowedDevOrigins: [new URL(ORIGEN_INTL).hostname] } : {}),
  // Congela el "hoy" del build en server y cliente por igual: ver src/lib/hoy.ts.
  env: { CALCULAR_HOY_BUILD: HOY_BUILD },
  // inlineCss apagado a propósito (30/9/2026): Next mete el CSS inline TRES veces por página (el
  // <style> y dos copias en el payload RSC). Con 127 KB de CSS, /aguinaldo pesaba 508 KB de HTML y
  // Lighthouse móvil daba 83-88 (TBT 320-430 ms); como archivo aparte, cacheado entre páginas,
  // 123 KB y 94-95 (FCP 0,9 s, TBT 110-170 ms). No volver a prenderlo sin medir las dos variantes.
  // `cpus` sale de una env var porque el build spawnea un worker por núcleo (acá 16) y en una
  // máquina cargada eso agota el commit charge antes que la RAM: muere con "Zone Allocation
  // failed", que se lee como un bug del código y no lo es. BUILD_CPUS=2 lo hace sobrevivir.
  experimental: {
    inlineCss: false,
    // Sin esto, con AR en src/app/(ar) y sin layout en la raíz, el 404 de calcular.ar pierde el
    // lang, el header y el footer: ver src/app/global-not-found.tsx.
    globalNotFound: true,
    ...(process.env.BUILD_CPUS ? { cpus: Number(process.env.BUILD_CPUS) } : {}),
  },
  // Los <slug>.cliente.tsx de los países (docs/paises/RECETA.md) los importa el registro con
  // import(), y el registro lo importan todas las páginas intl. Next 16 no parte el bundle cuando un
  // Server Component importa un Client Component con import(): sin esta regla, el JS de TODAS las
  // calculadoras viajaba en cada página intl (medido en el build del 7/10/2026). Del lado del
  // servidor se cambian por un componente vacío y nadie los usa: la página de calculadora baja
  // calcular() desde el navegador (src/app/(intl)/intl/[mercado]/[slug]/calculadora-intl.tsx).
  turbopack: {
    rules: {
      "*.cliente.tsx": {
        condition: { all: [{ not: "browser" }, { path: /^src\/paises\// }] },
        loaders: [path.join(__dirname, "src", "motor", "cliente-servidor.cjs")],
        as: "*.tsx",
      },
    },
  },
  // exceljs se carga con require nativo y no dentro del bundle del servidor: abre y reescribe el
  // .xlsx de la entrega personalizada (src/lib/prefill/servidor.ts).
  serverExternalPackages: ["exceljs"],
  // Incluí el .xlsx de /private en el bundle de la función de descarga. Sin esto,
  // en Vercel la serverless function no lleva el archivo y la entrega rompe.
  // (Key top-level confirmada en Next 16.2.9: NextConfig.outputFileTracingIncludes.)
  outputFileTracingIncludes: {
    "/api/planilla-comercio/download": ["./private/**"],
    "/api/planilla-uocra/download": ["./private/**"],
    "/api/planilla-casas-particulares/download": ["./private/**"],
    "/api/planilla-monotributo/download": ["./private/**"],
    "/api/planilla-alquileres/download": ["./private/**"],
    "/api/planilla-camioneros/download": ["./private/**"],
    "/api/planilla-mi-sueldo/download": ["./private/**"],
    "/api/planilla-vacaciones/download": ["./private/**"],
    "/api/planilla-plazo-fijo/download": ["./private/**"],
    "/api/cuenta/descargar/[id]": ["./private/**"],
    "/api/pagos/descarga": ["./private/intl/**"],
  },
  // Sin script-src a propósito: AdSense, FundingChoices y Google Ads inyectan scripts de dominios
  // que rotan, y un CSP de scripts roto en las páginas públicas se paga en anuncios y conversiones.
  // Sin form-action en NINGUNA ruta: el checkout redirige a MercadoPago y Chrome aplica form-action
  // también a ese redirect. Y el CSP es del documento: entrar por /cuenta y navegar sin recargar a
  // una planilla arrastraba el form-action privado y el pago quedaba colgado en «Te llevamos…».
  async headers() {
    // En dev sobre http://localhost, upgrade-insecure-requests pasa a https los redirects de fetch.
    const upgrade = process.env.NODE_ENV === "production" ? "; upgrade-insecure-requests" : "";
    const base = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
      { key: "Content-Security-Policy", value: `frame-ancestors 'self'; base-uri 'self'; object-src 'none'${upgrade}` },
    ];
    const privado = [
      { key: "Content-Security-Policy", value: `frame-ancestors 'none'; base-uri 'self'; object-src 'none'${upgrade}` },
      { key: "X-Robots-Tag", value: "noindex, nofollow" },
      { key: "Cache-Control", value: "private, no-store" },
      // Va después de `base` y la pisa: la URL de estas rutas puede llevar la llave (payment_id, token).
      { key: "Referrer-Policy", value: "no-referrer" },
    ];
    // /informes/cuota-alimentaria/ver lleva el payment_id en la URL (es la llave del informe): nunca se
    // indexa, nunca se cachea y nunca se embebe.
    const rutasPrivadas = [
      "/dashboard",
      "/cuenta",
      "/login",
      "/registro",
      "/recuperar",
      "/auth",
      "/informes/cuota-alimentaria/ver",
      "/informes/indemnizacion/ver",
      "/informes/ganancias/ver",
      "/informes/inflacion/ver",
      "/informes/credito-laboral/ver",
    ];
    return [
      { source: "/:path*", headers: base },
      ...rutasPrivadas.flatMap((r) => [
        { source: r, headers: privado },
        { source: `${r}/:path*`, headers: privado },
      ]),
    ];
  },
  async redirects() {
    return [
      // Radar Monotributo: el experimento de preventa cerró sin señal el 5/8/2026 (cero preventas)
      // y el proyecto quedó archivado el 11/8. La landing prometía una ventana ya vencida, así que
      // sale de producción y su intent ("¿me recategorizaron?") va a la calculadora de monotributo,
      // que sí tiene la respuesta viva. Veredicto: radar-monotributo/VEREDICTO.md.
      { source: "/radar", destination: "/monotributo/recategorizacion", permanent: true },
      // Dominio canónico: https://calcular.ar
      {
        source: "/:path*",
        has: [{ type: "host", value: "calcular-ar.vercel.app" }],
        destination: "https://calcular.ar/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.calcular.ar" }],
        destination: "https://calcular.ar/:path*",
        permanent: true,
      },
      ...REGLAS_HOSTS.redirects,
    ];
  },
  async rewrites() {
    return { beforeFiles: REGLAS_HOSTS.beforeFiles, afterFiles: [], fallback: REGLAS_HOSTS.fallback };
  },
};

export default nextConfig;
