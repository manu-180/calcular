// Valores previsionales mes a mes que no viven en ninguna serie de la API: se transcriben de la
// resolución mensual de ANSES y del decreto del bono, ambos del Boletín Oficial.
//
// REGLA DE ORO: verificados SOLO contra fuente oficial, nunca blogs. La fecha de verificación y el
// link a la norma van visibles en la página.
//
// CÓMO SE CARGA UN MES (desde el 28/9/2026 ya no se "rota" a mano el día 1):
//   1. Cuando sale la resolución de ANSES del mes siguiente (~día 23-30), se AGREGA su fila al final
//      de MESES_PREVISIONALES con `bono: null`. Cuando sale el decreto del bono, se completa `bono`.
//   2. Se agrega la fila del mes en RESOLUCIONES de scripts/gen_jubilaciones.ts y se corre ese script.
//   3. `npx -y tsx scripts/check_jubilaciones.ts` — verifica que cada mes sea el anterior movido por la
//      movilidad (IPC de dos meses antes): un número mal tipeado no llega a producción.
// El día 1 el sitio pasa solo al mes nuevo: PRESTACIONES_VIGENTES es el último mes COMPLETO (con
// resolución y decreto del bono) cuyo período ya empezó, según src/lib/hoy.ts. El workflow
// datos-vivos redeploya el día 1 a la madrugada para que las páginas estáticas lo tomen.
//
// POR QUÉ SE EXIGE EL BONO PARA ENTRAR EN VIGENCIA: toda página previsional muestra "haber + bono".
// Un mes sin decreto mostraría el bono del mes anterior como si rigiera. Mientras el decreto no
// salga, se sigue mostrando el mes anterior entero y el semáforo lo marca en rojo.

import { periodoActualAR, vigenteEn } from "../lib/hoy";

export type BonoPrevisional = {
  monto: number;
  norma: string;
  normaUrl: string;
  normaBO: string;
};

export type MesPrevisional = {
  periodo: string;
  vigencia: string;
  /** Movilidad del mes, en % — variación del IPC de dos meses antes (Dec. 274/2024). */
  movilidad: number;
  /** Haber mínimo garantizado (art. 1 de la resolución). */
  haberMinimo: number;
  /** Haber máximo del SIPA (art. 2). */
  haberMaximo: number;
  /** Prestación Básica Universal (art. 4). */
  pbu: number;
  /** Pensión Universal para el Adulto Mayor — 80% del haber mínimo por Ley 27.260 art. 13 (art. 5). */
  puam: number;
  /** Bases imponibles de aportes y contribuciones al SIPA (art. 3). */
  baseImponibleMinima: number;
  baseImponibleMaxima: number;
  resolucion: string;
  resolucionUrl: string;
  resolucionBO: string;
  /**
   * Bono extraordinario previsional del mes. Es DISCRECIONAL: lo fija un decreto mes a mes y puede
   * no existir. null = el decreto todavía no salió (nunca se proyecta hacia adelante).
   *
   * Cómo se liquida (arts. 3 y 4 de cada decreto, redacción idéntica desde 2024):
   *   · haber ≤ haber mínimo               → bono completo
   *   · haber mínimo < haber < mínimo+bono → bono parcial: lo justo para llegar a mínimo + bono
   *   · haber ≥ mínimo + bono              → sin bono
   * Es no remunerativo, no sufre descuentos, y se cuenta por TITULAR.
   */
  bono: BonoPrevisional | null;
};

export const MESES_PREVISIONALES: MesPrevisional[] = [
  {
    periodo: "2026-09",
    vigencia: "septiembre de 2026",
    movilidad: 2.11,
    haberMinimo: 428_633.20,
    haberMaximo: 2_884_295.54,
    pbu: 196_080.12,
    puam: 342_906.56,
    baseImponibleMinima: 144_363.55,
    baseImponibleMaxima: 4_691_748.47,
    resolucion: "Resolución ANSES 257/2026",
    resolucionUrl: "https://www.boletinoficial.gob.ar/detalleAviso/primera/346683/20260901",
    resolucionBO: "Boletín Oficial del 1 de septiembre de 2026",
    bono: {
      monto: 70_000,
      norma: "Decreto 824/2026",
      normaUrl: "https://www.boletinoficial.gob.ar/detalleAviso/primera/346555/20260831",
      normaBO: "Boletín Oficial del 31 de agosto de 2026",
    },
  },
  {
    periodo: "2026-10",
    vigencia: "octubre de 2026",
    movilidad: 1.66,
    haberMinimo: 435_748.51,
    haberMaximo: 2_932_174.85,
    pbu: 199_335.05,
    puam: 348_598.81,
    baseImponibleMinima: 146_759.98,
    baseImponibleMaxima: 4_769_631.49,
    resolucion: "Resolución ANSES 284/2026",
    resolucionUrl: "https://www.boletinoficial.gob.ar/detalleAviso/primera/347832/20260923",
    resolucionBO: "Boletín Oficial del 23 de septiembre de 2026",
    bono: {
      monto: 70_000,
      norma: "Decreto 1108/2026",
      normaUrl: "https://www.boletinoficial.gob.ar/detalleAviso/primera/348024/20260928",
      normaBO: "Boletín Oficial del 28 de septiembre de 2026",
    },
  },
];

const COMPLETOS = MESES_PREVISIONALES.filter((m) => m.bono !== null);
const VIGENTE = vigenteEn(COMPLETOS, (m) => m.periodo);

/** El mes que se liquida hoy. Sin el campo `bono`: el bono se lee de BONO_VIGENTE. */
export const PRESTACIONES_VIGENTES: Omit<MesPrevisional, "bono"> = (({ bono: _bono, ...resto }) => resto)(VIGENTE);

/** Bono del mes vigente: siempre el del MISMO período que PRESTACIONES_VIGENTES. */
export const BONO_VIGENTE: BonoPrevisional & { periodo: string } = {
  periodo: VIGENTE.periodo,
  ...(VIGENTE.bono as BonoPrevisional),
};

/**
 * Resolución del mes SIGUIENTE, cuando ANSES la dicta antes de que empiece ese mes. No reemplaza a
 * PRESTACIONES_VIGENTES: el mes en curso se sigue liquidando con su resolución. check_jubilaciones
 * exige que el haber mínimo coincida al centavo con el que ya derivaba la fórmula.
 */
export const RESOLUCION_PROXIMA: Omit<MesPrevisional, "bono" | "vigencia" | "movilidad"> | null = (() => {
  const siguiente = MESES_PREVISIONALES.find((m) => m.periodo > VIGENTE.periodo);
  if (!siguiente) return null;
  const { bono: _b, vigencia: _v, movilidad: _m, ...resto } = siguiente;
  return resto;
})();

/**
 * true cuando ya empezó un mes cuya resolución está cargada pero cuyo decreto del bono todavía no:
 * el sitio sigue mostrando el mes anterior entero. Lo lee el semáforo para gritarlo.
 */
export const MES_PREVISIONAL_SIN_BONO: string | null =
  MESES_PREVISIONALES.find((m) => m.bono === null && m.periodo <= periodoActualAR())?.periodo ?? null;

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
  consultadoEl: "28 de septiembre de 2026",
};
