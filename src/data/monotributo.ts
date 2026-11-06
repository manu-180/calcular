// Escalas oficiales del monotributo publicadas por ARCA.
// Fuente: https://www.afip.gob.ar/monotributo/categorias.asp
// Vigencia: desde el 1/08/2026. Actualización semestral por IPC (próxima: febrero 2027).
// REGLA DE ORO: estos valores se actualizan SOLO desde la fuente oficial, nunca desde blogs.
//
// Rotación 1/08/2026 (verificada el 29/07/2026 contra la tabla de ARCA):
// todos los parámetros e importes subieron por el MISMO factor 1,16846 (+16,85%) respecto de la
// escala de febrero 2026 — así aplica ARCA la actualización semestral por IPC. Los 22 totales
// (servicios y venta de las 11 categorías) reconcilian exacto contra
// impuesto integrado + aportes SIPA + aportes obra social.
import { enHoraAR } from "@/lib/hora-argentina";

export const VIGENCIA = {
  desde: "1 de agosto de 2026",
  proximaActualizacion: "febrero 2027",
  fuenteUrl: "https://www.afip.gob.ar/monotributo/categorias.asp",
  consultadoEl: "29 de julio de 2026",
};

// ---------------------------------------------------------------------------
// VENTANA DE RECATEGORIZACIÓN — se DERIVA, no se escribe a mano.
//
// Fuente oficial (consultada el 5/8/2026):
// https://www.afip.gob.ar/monotributo/ayuda/recategorizacion.asp
//   · "La recategorización se realiza dos veces por año: En febrero. En agosto."
//   · "El trámite puede realizarse hasta el día 5."
//   · "En cada período, se deben evaluar los últimos 12 meses de actividad."
//   · Vigencia de la nueva categoría: la de agosto rige desde el período devengado
//     agosto hasta enero inclusive; la de febrero, desde febrero hasta julio inclusive.
//
// POR QUÉ DERIVADA (5/8/2026): estas fechas no dependen de ninguna resolución — son la
// regla permanente del régimen. Tenerlas como string obligaba a rotarlas a mano dos veces
// por año (y a reescribir media página de copy), o sea una tarea recurrente: prohibido por
// la regla «100% automático». El 5/8/2026 la ventana cerraba ESE MISMO DÍA y la página
// entera hablaba de "julio 2026" en el título, la descripción y el schema.
// Ahora sale de la fecha: el día 6 la página ya habla sola de la ventana de febrero.
// Las páginas que la muestran revalidan a diario (ISR), así que no dependen del deploy.
// ---------------------------------------------------------------------------

const MESES_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
] as const;

export type VentanaRecategorizacion = {
  /** Mes de la ventana: 2 (febrero) u 8 (agosto). */
  mes: 2 | 8;
  anio: number;
  /** Último día para hacer el trámite, en ISO (el día 5, inclusive). */
  cierreISO: string;
  /** "hasta el 5 de agosto de 2026" */
  textoCierre: string;
  /** "agosto de 2026" */
  textoMes: string;
  /** true si hoy todavía se puede hacer el trámite (del 1 al 5 de ese mes). */
  abierta: boolean;
  /** Días que faltan para el cierre (0 = cierra hoy). */
  diasParaElCierre: number;
  /** "agosto de 2026" — primer período devengado con la cuota nueva. */
  rigeDesde: string;
  /** "enero de 2027" — último período devengado con esa categoría. */
  rigeHasta: string;
  /** "agosto de 2025 y julio de 2026" — los 12 meses de actividad que se evalúan. */
  dozeMeses: string;
};

/** Componentes de la fecha en hora argentina (del tzdata), sin depender del TZ del server. */
function fechaAR(d: Date): { anio: number; mes: number; dia: number } {
  const t = enHoraAR(d);
  return { anio: t.getUTCFullYear(), mes: t.getUTCMonth() + 1, dia: t.getUTCDate() };
}

/**
 * La ventana de recategorización vigente o la próxima que viene.
 * Mientras estamos entre el 1 y el 5 de febrero/agosto devuelve esa (abierta: true);
 * el día 6 pasa sola a la siguiente.
 */
export function ventanaRecategorizacion(hoy: Date = new Date()): VentanaRecategorizacion {
  const { anio, mes, dia } = fechaAR(hoy);

  // Candidatas en orden; la primera que todavía no cerró es la que corresponde.
  const candidatas: Array<{ anio: number; mes: 2 | 8 }> = [
    { anio, mes: 2 },
    { anio, mes: 8 },
    { anio: anio + 1, mes: 2 },
  ];
  const v = candidatas.find(
    (c) => c.anio > anio || c.mes > mes || (c.mes === mes && dia <= 5),
  )!;

  const abierta = v.anio === anio && v.mes === mes && dia <= 5;
  const cierreUTC = Date.UTC(v.anio, v.mes - 1, 5);
  const hoyUTC = Date.UTC(anio, mes - 1, dia);
  const nombreMes = MESES_ES[v.mes - 1];

  // Agosto rige devengado agosto→enero del año siguiente; febrero, febrero→julio.
  const rige =
    v.mes === 8
      ? { desde: `agosto de ${v.anio}`, hasta: `enero de ${v.anio + 1}` }
      : { desde: `febrero de ${v.anio}`, hasta: `julio de ${v.anio}` };

  // Los últimos 12 meses de actividad al momento del trámite.
  const dozeMeses =
    v.mes === 8
      ? `agosto de ${v.anio - 1} y julio de ${v.anio}`
      : `febrero de ${v.anio - 1} y enero de ${v.anio}`;

  return {
    mes: v.mes,
    anio: v.anio,
    cierreISO: `${v.anio}-${String(v.mes).padStart(2, "0")}-05`,
    textoCierre: `hasta el 5 de ${nombreMes} de ${v.anio}`,
    textoMes: `${nombreMes} de ${v.anio}`,
    abierta,
    diasParaElCierre: Math.round((cierreUTC - hoyUTC) / 86_400_000),
    rigeDesde: rige.desde,
    rigeHasta: rige.hasta,
    dozeMeses,
  };
}

export const RECATEGORIZACION = {
  /** Derivado de la fecha — ver ventanaRecategorizacion(). Nunca se escribe a mano. */
  get proximaVentana(): string {
    return ventanaRecategorizacion().textoCierre;
  },
  periodoEvaluado: "los últimos 12 meses de actividad",
  fuenteUrl: "https://www.afip.gob.ar/monotributo/ayuda/recategorizacion.asp",
};

export type Categoria = {
  cat: string;
  ingresosBrutosMax: number; // tope de facturación anual (últimos 12 meses)
  superficieM2: number;
  energiaKw: number;
  alquileresMax: number;
  precioUnitarioMax: number; // solo venta de cosas muebles
  impuestoServicios: number;
  impuestoVenta: number;
  sipa: number;
  obraSocial: number;
  totalServicios: number;
  totalVenta: number;
};

export const CATEGORIAS: Categoria[] = [
  { cat: "A", ingresosBrutosMax: 12009410.45, superficieM2: 30, energiaKw: 3330, alquileresMax: 2792886.15, precioUnitarioMax: 716840.77, impuestoServicios: 5585.77, impuestoVenta: 5585.77, sipa: 18246.86, obraSocial: 25694.55, totalServicios: 49527.18, totalVenta: 49527.18 },
  { cat: "B", ingresosBrutosMax: 17595182.74, superficieM2: 45, energiaKw: 5000, alquileresMax: 2792886.15, precioUnitarioMax: 716840.77, impuestoServicios: 10612.98, impuestoVenta: 10612.98, sipa: 20071.55, obraSocial: 25694.55, totalServicios: 56379.08, totalVenta: 56379.08 },
  { cat: "C", ingresosBrutosMax: 24670494.31, superficieM2: 60, energiaKw: 6700, alquileresMax: 3816944.41, precioUnitarioMax: 716840.77, impuestoServicios: 18246.86, impuestoVenta: 16757.32, sipa: 22078.71, obraSocial: 25694.55, totalServicios: 66020.12, totalVenta: 64530.58 },
  { cat: "D", ingresosBrutosMax: 30628651.43, superficieM2: 85, energiaKw: 10000, alquileresMax: 3816944.41, precioUnitarioMax: 716840.77, impuestoServicios: 29790.79, impuestoVenta: 27742.67, sipa: 24286.58, obraSocial: 30535.56, totalServicios: 84612.93, totalVenta: 82564.81 },
  { cat: "E", ingresosBrutosMax: 36028231.33, superficieM2: 110, energiaKw: 13000, alquileresMax: 4841002.66, precioUnitarioMax: 716840.77, impuestoServicios: 55857.73, impuestoVenta: 44313.79, sipa: 26715.24, obraSocial: 37238.48, totalServicios: 119811.45, totalVenta: 108267.51 },
  { cat: "F", ingresosBrutosMax: 45151659.41, superficieM2: 150, energiaKw: 16500, alquileresMax: 4841002.66, precioUnitarioMax: 716840.77, impuestoServicios: 78573.2, impuestoVenta: 57719.64, sipa: 29386.76, obraSocial: 42824.25, totalServicios: 150784.21, totalVenta: 129930.65 },
  { cat: "G", ingresosBrutosMax: 53995798.87, superficieM2: 200, energiaKw: 20000, alquileresMax: 5771964.69, precioUnitarioMax: 716840.77, impuestoServicios: 142995.76, impuestoVenta: 71497.87, sipa: 41141.46, obraSocial: 46175.72, totalServicios: 230312.94, totalVenta: 158815.05 },
  { cat: "H", ingresosBrutosMax: 81924660.37, superficieM2: 200, energiaKw: 20000, alquileresMax: 8378658.45, precioUnitarioMax: 716840.77, impuestoServicios: 409623.31, impuestoVenta: 204811.64, sipa: 57598.04, obraSocial: 55485.33, totalServicios: 522706.68, totalVenta: 317895.01 },
  { cat: "I", ingresosBrutosMax: 91699761.9, superficieM2: 200, energiaKw: 20000, alquileresMax: 8378658.45, precioUnitarioMax: 716840.77, impuestoServicios: 814591.79, impuestoVenta: 325836.71, sipa: 80637.26, obraSocial: 68518.81, totalServicios: 963747.86, totalVenta: 474992.78 },
  { cat: "J", ingresosBrutosMax: 105012519.2, superficieM2: 200, energiaKw: 20000, alquileresMax: 8378658.45, precioUnitarioMax: 716840.77, impuestoServicios: 977510.14, impuestoVenta: 391004.07, sipa: 112892.16, obraSocial: 76897.46, totalServicios: 1167299.76, totalVenta: 580793.69 },
  { cat: "K", ingresosBrutosMax: 126610838.75, superficieM2: 200, energiaKw: 20000, alquileresMax: 8378658.45, precioUnitarioMax: 716840.77, impuestoServicios: 1368514.2, impuestoVenta: 456171.4, sipa: 158049.02, obraSocial: 87882.82, totalServicios: 1614446.04, totalVenta: 702103.24 },
];

export const TOPE_MAXIMO = CATEGORIAS[CATEGORIAS.length - 1].ingresosBrutosMax;
