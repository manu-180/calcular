import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El CSS del sitio son ~14 KiB: como request aparte bloquea el render y agrega un salto
  // de red antes del primer pintado. Inline en el HTML sale gratis a ese tamaño.
  experimental: { inlineCss: true },
  // Incluí el .xlsx de /private en el bundle de la función de descarga. Sin esto,
  // en Vercel la serverless function no lleva el archivo y la entrega rompe.
  // (Key top-level confirmada en Next 16.2.9: NextConfig.outputFileTracingIncludes.)
  outputFileTracingIncludes: {
    "/api/planilla-comercio/download": ["./private/**"],
    "/api/planilla-uocra/download": ["./private/**"],
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
