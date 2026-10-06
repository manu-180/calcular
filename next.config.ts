import type { NextConfig } from "next";

const HOY_BUILD =
  process.env.CALCULAR_HOY ||
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

const nextConfig: NextConfig = {
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
    ...(process.env.BUILD_CPUS ? { cpus: Number(process.env.BUILD_CPUS) } : {}),
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
    "/api/cuenta/descargar/[id]": ["./private/**"],
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
    const rutasPrivadas = ["/dashboard", "/cuenta", "/login", "/registro", "/recuperar", "/auth", "/informes/cuota-alimentaria/ver"];
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
    ];
  },
};

export default nextConfig;
