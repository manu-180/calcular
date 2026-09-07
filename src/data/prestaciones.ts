// Valores previsionales del mes VIGENTE que no viven en ninguna serie de la API: se transcriben de
// la resolución mensual de ANSES y del decreto del bono, ambos del Boletín Oficial.
//
// REGLA DE ORO: verificados SOLO contra fuente oficial, nunca blogs. La fecha de verificación y el
// link a la norma van visibles en la página.
//
// CÓMO SE ROTA (mensual, ~último día hábil del mes anterior):
//   1. Buscar la resolución de ANSES del mes en boletinoficial.gob.ar y el decreto del bono.
//   2. Actualizar este archivo + la fila del mes en RESOLUCIONES de scripts/gen_jubilaciones.ts.
//   3. Correr `npx -y tsx scripts/gen_jubilaciones.ts` (reconstruye y verifica la serie) y
//      `npx -y tsx scripts/check_jubilaciones.ts`.
// El check verifica que el haber mínimo y la base imponible de acá salgan de aplicar la movilidad
// del mes al valor del mes anterior: un número mal tipeado no llega a producción.

export const PRESTACIONES_VIGENTES = {
  periodo: "2026-09",
  vigencia: "septiembre de 2026",

  /** Movilidad del mes, en % — variación del IPC de dos meses antes (Dec. 274/2024). */
  movilidad: 2.11,

  /** Haber mínimo garantizado (Res. ANSES 257/2026, art. 1). */
  haberMinimo: 428_633.20,
  /** Haber máximo del SIPA (art. 2). */
  haberMaximo: 2_884_295.54,
  /** Prestación Básica Universal (art. 4). */
  pbu: 196_080.12,
  /** Pensión Universal para el Adulto Mayor — 80% del haber mínimo por Ley 27.260 art. 13 (art. 5). */
  puam: 342_906.56,
  /** Bases imponibles de aportes y contribuciones al SIPA (art. 3). */
  baseImponibleMinima: 144_363.55,
  baseImponibleMaxima: 4_691_748.47,

  resolucion: "Resolución ANSES 257/2026",
  resolucionUrl: "https://www.boletinoficial.gob.ar/detalleAviso/primera/346683/20260901",
  resolucionBO: "Boletín Oficial del 1 de septiembre de 2026",
} as const;

/**
 * Bono extraordinario previsional del mes. Es DISCRECIONAL: lo fija un decreto mes a mes y puede
 * no existir. Nunca se proyecta hacia adelante — si no hay decreto del mes, no hay bono que mostrar.
 *
 * Cómo se liquida (Decreto 824/2026, arts. 3 y 4):
 *   · haber ≤ haber mínimo               → bono completo ($70.000)
 *   · haber mínimo < haber < mínimo+bono → bono parcial: lo justo para llegar a mínimo + $70.000
 *   · haber ≥ mínimo + bono              → sin bono
 * Es no remunerativo, no sufre descuentos, y se cuenta por TITULAR (una pensión con varios
 * copartícipes cuenta como un solo titular).
 */
export const BONO_VIGENTE = {
  periodo: "2026-09",
  monto: 70_000,
  norma: "Decreto 824/2026",
  normaUrl: "https://www.boletinoficial.gob.ar/detalleAviso/primera/346555/20260831",
  normaBO: "Boletín Oficial del 31 de agosto de 2026",
} as const;

export const PRESTACIONES_FUENTES = {
  movilidad: {
    nombre: "Decreto 274/2024 — movilidad mensual por IPC con dos meses de rezago",
    url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/305905/20240322",
  },
  puam: {
    nombre: "Ley 27.260, art. 13 — la PUAM equivale al 80% del haber mínimo garantizado",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/260000-264999/263691/texact.htm",
  },
  pbu: {
    nombre: "Ley 24.241, art. 20 — Prestación Básica Universal",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/639/texact.htm",
  },
  consultadoEl: "1 de septiembre de 2026",
};
