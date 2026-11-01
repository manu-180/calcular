import { SLUG_CALENDARIO } from "./calendario/slugs";
import { SLUG_HORAS } from "./horas/rutas";
import { SLUG_MUNDO } from "./mundo/rutas";
import { SLUG_RANKINGS } from "./rankings/rutas";
import { SLUG_SUELDOS } from "./sueldos/rutas";

// Las secciones que se publican con un slug por idioma tienen UNA ruta cada una en
// src/app/(intl)/intl/[mercado]/i/<seccion>/[seccion]/..., y next.config reescribe ahí cada
// /intl/<m>/<slug-del-idioma>. Antes había una carpeta por idioma (28 × 13 rutas = 364 entradas) y
// el build se quedaba sin memoria en la máquina standard de Vercel (8 GB) al compilarlas todas.
// Van en afterFiles: corren después de los rewrites por dominio (beforeFiles) y antes de las rutas
// dinámicas, así que [slug] no les gana, igual que antes no le ganaba a las carpetas fijas.
export const SECCIONES = {
  horas: SLUG_HORAS,
  mundo: SLUG_MUNDO,
  rankings: SLUG_RANKINGS,
  sueldos: SLUG_SUELDOS,
  calendario: SLUG_CALENDARIO,
} as const;

export function reglasSecciones() {
  return Object.entries(SECCIONES).flatMap(([seccion, slugs]) => {
    const alt = [...new Set(Object.values(slugs))].join("|");
    return [
      { source: `/intl/:mercado/:seccion(${alt})`, destination: `/intl/:mercado/i/${seccion}/:seccion` },
      { source: `/intl/:mercado/:seccion(${alt})/:resto+`, destination: `/intl/:mercado/i/${seccion}/:seccion/:resto+` },
    ];
  });
}
