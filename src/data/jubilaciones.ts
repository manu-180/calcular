// Haber mínimo jubilatorio garantizado (ANSES), mes a mes, bajo el régimen de movilidad MENSUAL.
// GENERADO por scripts/gen_jubilaciones.ts — NO editar a mano.
//   https://apis.datos.gob.ar/series/api/series/?ids=58.1_MP_0_M_24&format=json&limit=5000&start_date=2024-01-01
// Descargado el 2026-10-07. Último período: octubre 2026 ($435748.51).
//
// EL MOTOR (Decreto 274/2024): la movilidad de cada mes es la variación del IPC del INDEC de DOS
// MESES ANTES, redondeada a dos decimales en porcentaje. El generador reconstruye toda la serie con
// esa fórmula y aborta si un mes no cierra al centavo: los valores de acá están verificados contra
// la serie oficial de ANSES, no calculados por nosotros.
//
// Consecuencia práctica: cuando el INDEC publica el IPC del mes X (~día 12 del mes siguiente), el
// haber del mes X+2 ya quedó determinado por la norma, antes de que salga la resolución de ANSES.
//
// Corte FIJO en 2024-05 (primer mes del régimen mensual). NO convertirlo en ventana móvil.

import { prestacionesVigentes } from "./prestaciones";

export type MesJubilacion = {
  periodo: string; // "2026-08"
  /** Haber mínimo garantizado del mes, en pesos corrientes. */
  haberMinimo: number;
  /** Movilidad aplicada ese mes, en % (variación del IPC de dos meses antes). null en el primer mes. */
  movilidad: number | null;
};

const SERIE_COMPLETA: MesJubilacion[] = [
  { periodo: "2024-05", haberMinimo: 190141.6, movilidad: null },
  { periodo: "2024-06", haberMinimo: 206931.1, movilidad: 8.83 },
  { periodo: "2024-07", haberMinimo: 215580.82, movilidad: 4.18 },
  { periodo: "2024-08", haberMinimo: 225454.42, movilidad: 4.58 },
  { periodo: "2024-09", haberMinimo: 234540.23, movilidad: 4.03 },
  { periodo: "2024-10", haberMinimo: 244320.56, movilidad: 4.17 },
  { periodo: "2024-11", haberMinimo: 252798.48, movilidad: 3.47 },
  { periodo: "2024-12", haberMinimo: 259598.76, movilidad: 2.69 },
  { periodo: "2025-01", haberMinimo: 265907.01, movilidad: 2.43 },
  { periodo: "2025-02", haberMinimo: 273086.5, movilidad: 2.7 },
  { periodo: "2025-03", haberMinimo: 279121.71, movilidad: 2.21 },
  { periodo: "2025-04", haberMinimo: 285820.63, movilidad: 2.4 },
  { periodo: "2025-05", haberMinimo: 296481.74, movilidad: 3.73 },
  { periodo: "2025-06", haberMinimo: 304723.93, movilidad: 2.78 },
  { periodo: "2025-07", haberMinimo: 309294.79, movilidad: 1.5 },
  { periodo: "2025-08", haberMinimo: 314305.37, movilidad: 1.62 },
  { periodo: "2025-09", haberMinimo: 320277.17, movilidad: 1.9 },
  { periodo: "2025-10", haberMinimo: 326298.38, movilidad: 1.88 },
  { periodo: "2025-11", haberMinimo: 333085.39, movilidad: 2.08 },
  { periodo: "2025-12", haberMinimo: 340879.59, movilidad: 2.34 },
  { periodo: "2026-01", haberMinimo: 349299.32, movilidad: 2.47 },
  { periodo: "2026-02", haberMinimo: 359254.35, movilidad: 2.85 },
  { periodo: "2026-03", haberMinimo: 369600.88, movilidad: 2.88 },
  { periodo: "2026-04", haberMinimo: 380319.31, movilidad: 2.9 },
  { periodo: "2026-05", haberMinimo: 393174.1, movilidad: 3.38 },
  { periodo: "2026-06", haberMinimo: 403317.99, movilidad: 2.58 },
  { periodo: "2026-07", haberMinimo: 411989.33, movilidad: 2.15 },
  { periodo: "2026-08", haberMinimo: 419775.93, movilidad: 1.89 },
  { periodo: "2026-09", haberMinimo: 428633.2, movilidad: 2.11 },
  { periodo: "2026-10", haberMinimo: 435748.51, movilidad: 1.66 },
];

// Una resolución puede salir antes de que empiece su mes (la de octubre de 2026, el 23/9): la
// serie que ve el sitio se corta en el mes vigente de prestaciones.ts, que ya sabe la fecha.
export const HABER_MINIMO_SERIE: MesJubilacion[] = SERIE_COMPLETA.filter(
  (f) => f.periodo <= prestacionesVigentes().periodo,
);

/** Último mes con haber mínimo publicado por fuente oficial. */
export const HABER_MINIMO_ULTIMO: MesJubilacion =
  HABER_MINIMO_SERIE[HABER_MINIMO_SERIE.length - 1];

/**
 * Normas del Boletín Oficial que fijaron meses que todavía no están en la serie de la API de ANSES.
 * Se usan para citar la fuente exacta del mes vigente en la página.
 */
export const NORMAS_POR_PERIODO: Record<string, { norma: string; url: string }> = {
  "2026-08": { norma: "Resolución ANSES 232/2026, art. 1 (Boletín Oficial, 30/7/2026)", url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/345155/20260730" },
  "2026-09": { norma: "Resolución ANSES 257/2026, art. 1 (Boletín Oficial, 1/9/2026)", url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/346683/20260901" },
  "2026-10": { norma: "Resolución ANSES 284/2026, art. 1 (Boletín Oficial, 23/9/2026)", url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/347832/20260923" },
};

export const HABER_MINIMO_FUENTE = {
  nombre: "ANSES: Haber mínimo jubilatorio (serie mensual en pesos corrientes)",
  api: "https://apis.datos.gob.ar/series/api/series/?ids=58.1_MP_0_M_24&format=json&limit=5000&start_date=2024-01-01",
  serie: "https://datos.gob.ar/dataset/sspm-haber-minimo-jubilatorio-pesos-corrientes",
  movilidad:
    "Decreto 274/2024: movilidad mensual por IPC (INDEC), con dos meses de rezago",
  movilidadUrl: "https://www.boletinoficial.gob.ar/detalleAviso/primera/305905/20240322",
  consultadoEl: "2026-10-07",
  ultimoPeriodo: "2026-10",
};
