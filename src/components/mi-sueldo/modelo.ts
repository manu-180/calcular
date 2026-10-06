// Lo que muestra la vista previa de la Planilla Mi Sueldo (oferta de /sueldo-neto y landing) para
// un caso dado. Cada número sale de los motores del sitio —brutoANeto, sueldoVsInflacion,
// calcularAguinaldo, estimarGananciasAnual— y scripts/check_planilla_mi_sueldo.ts evalúa el .xlsx
// con el prefill aplicado y exige que cada fila de esta previa dé lo mismo en la hoja
// «Para pedir aumento». Sin hooks ni "use client": lo usan el cliente, el server y el check.

import type { FilaHoja, HojaPrevia } from "@/components/HojaCalculo";
import { brutoANeto, type DesgloseNeto } from "@/lib/sueldo";
import { nombrePeriodo, sueldoVsInflacion, sumarMeses, ULTIMO_PERIODO, type Periodo } from "@/lib/inflacion";
import { calcularAguinaldo } from "@/lib/aguinaldo";
import { DEDUCCIONES } from "@/data/ganancias";
import { TOTAL_APORTES, TOPE_SIPA } from "@/data/sueldo";
import type { Semestre } from "@/data/aguinaldo";
import { PLANILLA_MS, type Datos } from "@/lib/prefill/mi-sueldo";

export const PESTANAS_MI_SUELDO = [
  PLANILLA_MS.hojas.inicio,
  PLANILLA_MS.hojas.datos,
  PLANILLA_MS.hojas.recibos,
  PLANILLA_MS.hojas.inflacion,
  PLANILLA_MS.hojas.resumen,
  PLANILLA_MS.hojas.aguinaldo,
  PLANILLA_MS.hojas.ipc,
  PLANILLA_MS.hojas.fuentes,
];

// Ejemplo del archivo genérico (trece recibos con dos aumentos y uno con la obra social mal
// descontada). Lo usan el generador y la landing: la previa de la landing es el resumen del archivo.
export const EJEMPLO_MS = {
  inicio: sumarMeses(ULTIMO_PERIODO, -11),
  sindicalPct: 2,
  brutos: [1_150_000, 1_150_000, 1_150_000, 1_230_500, 1_230_500, 1_230_500, 1_310_000, 1_310_000, 1_310_000, 1_310_000, 1_310_000, 1_310_000, 1_310_000],
  mesConError: 8,
} as const;

export function datosEjemplo(): Datos {
  const b = EJEMPLO_MS.brutos;
  const ultimoAumento = b.findLastIndex((x, i) => i > 0 && x > b[i - 1]);
  return {
    bruto: b[b.length - 1],
    sindicalPct: EJEMPLO_MS.sindicalPct,
    periodo: sumarMeses(EJEMPLO_MS.inicio, b.length - 1),
    ultimoAumento: sumarMeses(EJEMPLO_MS.inicio, ultimoAumento),
    conyuge: false,
    hijos: 0,
    otrasDeducciones: 0,
  };
}

/** Fracción de 85 %: desde ahí el aviso de Ganancias pasa de «lejos» a «cerca». */
export const CERCA_DEL_PISO = 0.85;

export type InflacionDesde = {
  desde: Periodo;
  hasta: Periodo;
  /** Fracción: 0,12 = 12 %. */
  inflacion: number;
  /** Variación del poder de compra, fracción (negativa = perdió). */
  poder: number;
  /** Aumento que hace falta para volver al poder de compra de `desde`, fracción (0 si ganó). */
  necesitas: number;
  equivalente: number;
};

export type ResumenMiSueldo = {
  datos: Datos;
  desglose: DesgloseNeto;
  /** Mes desde el que se mide: el último aumento que dijo, o el mes de la cuenta. */
  desde: Periodo;
  /** null: no hay IPC publicado de `desde` todavía (el aumento es más nuevo que el último dato). */
  inflacion: InflacionDesde | null;
  aguinaldo: { semestre: string; vence: string; bruto: number; neto: number };
  ganancias: { piso: number; estado: "alcanzado" | "cerca" | "lejos"; falta: number };
};

export function semestreDe(p: Periodo): Semestre {
  const [anio, mes] = p.split("-").map(Number);
  const primero = mes <= 6;
  return {
    id: primero ? "primero" : "segundo",
    etiqueta: `${primero ? "1er" : "2do"} semestre ${anio}`,
    periodo: primero ? "enero a junio" : "julio a diciembre",
    inicioISO: primero ? `${anio}-01-01` : `${anio}-07-01`,
    finISO: primero ? `${anio}-06-30` : `${anio}-12-31`,
    fechaPago: primero ? `30 de junio de ${anio}` : `18 de diciembre de ${anio}`,
  };
}

/** Bruto mensual desde el que `estimarGananciasAnual` empieza a dar impuesto (la ganancia neta
 *  imponible pasa de cero). Es la misma cuenta despejada; el check la contrasta con el motor. */
export function pisoGanancias(o: { sindicalPct: number; conyuge: boolean; hijos: number; otrasDeducciones: number }): number {
  const s = o.sindicalPct / 100;
  const deducciones =
    DEDUCCIONES.mni +
    DEDUCCIONES.deduccionEspecialDependencia +
    (o.conyuge ? DEDUCCIONES.conyuge : 0) +
    o.hijos * DEDUCCIONES.hijo +
    o.otrasDeducciones;
  const sinTope = deducciones / (13 * (1 - TOTAL_APORTES - s));
  if (sinTope <= TOPE_SIPA.baseMaxima) return sinTope;
  return (deducciones / 13 + TOTAL_APORTES * TOPE_SIPA.baseMaxima) / (1 - s);
}

export function resumenMiSueldo(d: Datos): ResumenMiSueldo {
  const desglose = brutoANeto(d.bruto, { sindicalPct: d.sindicalPct / 100 });
  const desde = d.ultimoAumento ?? d.periodo;
  const v = sueldoVsInflacion(d.bruto, desde, d.bruto);
  const inflacion: InflacionDesde | null = v
    ? {
        desde,
        hasta: v.hastaPeriodo,
        inflacion: v.inflacionPct / 100,
        poder: v.diferenciaRealPct / 100,
        necesitas: Math.max(0, v.sueldoEquivalente / d.bruto - 1),
        equivalente: v.sueldoEquivalente,
      }
    : null;
  const sem = semestreDe(d.periodo);
  const sac = calcularAguinaldo({ mejorSueldo: d.bruto, semestre: sem });
  const piso = pisoGanancias(d);
  return {
    datos: d,
    desglose,
    desde,
    inflacion,
    aguinaldo: { semestre: sem.etiqueta, vence: sem.fechaPago, bruto: sac.bruto, neto: sac.netoEstimado },
    ganancias: {
      piso,
      estado: d.bruto >= piso ? "alcanzado" : d.bruto >= piso * CERCA_DEL_PISO ? "cerca" : "lejos",
      falta: Math.max(0, piso - d.bruto),
    },
  };
}

export const pct = (x: number, signo = false) =>
  `${signo && x > 0 ? "+" : ""}${(x * 100).toLocaleString("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;

/** Filas de «Para pedir aumento» con los números de este caso. */
export function hojaMiSueldo(archivo: string, d: Datos): { hoja: HojaPrevia; resumen: ResumenMiSueldo } {
  const r = resumenMiSueldo(d);
  const F = PLANILLA_MS.resumen;
  const inf = r.inflacion;
  const filas: FilaHoja[] = [
    { fila: 8, etiqueta: "TU SUELDO HOY", tono: "seccion" },
    { fila: F.sueldoHoy, etiqueta: "Sueldo bruto del último recibo", valor: d.bruto },
    { fila: F.netoLey, etiqueta: "En mano, con los descuentos de ley", valor: r.desglose.neto },
    { fila: 11, etiqueta: "DESDE TU ÚLTIMO AUMENTO", tono: "seccion" },
    { fila: F.desde, etiqueta: "Lo medimos desde", valor: nombrePeriodo(r.desde) },
    inf
      ? { fila: F.inflacion, etiqueta: "Inflación desde entonces", valor: pct(inf.inflacion), nota: `IPC del INDEC hasta ${nombrePeriodo(inf.hasta)}` }
      : { fila: F.inflacion, etiqueta: "Inflación desde entonces", valor: "—", nota: `el INDEC todavía no publicó ${nombrePeriodo(r.desde)}` },
    ...(inf
      ? [
          { fila: F.poder, etiqueta: "Tu poder de compra", valor: pct(inf.poder, true) },
          { fila: F.necesitas, etiqueta: "Aumento para recuperarlo", valor: pct(inf.necesitas), tono: "total" as const },
          { fila: F.equivalente, etiqueta: "Sueldo que lo recupera", valor: inf.equivalente },
        ]
      : []),
    { fila: 24, etiqueta: "AGUINALDO", tono: "seccion" },
    { fila: F.aguinaldoBruto, etiqueta: `Aguinaldo del ${r.aguinaldo.semestre}`, valor: r.aguinaldo.bruto },
    { fila: F.aguinaldoNeto, etiqueta: "En mano, estimado", valor: r.aguinaldo.neto, nota: `se paga hasta el ${r.aguinaldo.vence}` },
    { fila: 28, etiqueta: "GANANCIAS", tono: "seccion" },
    { fila: F.pisoGanancias, etiqueta: "Piso aproximado (bruto por mes)", valor: r.ganancias.piso },
  ];
  return {
    hoja: { archivo, pestanas: PESTANAS_MI_SUELDO, hoja: PLANILLA_MS.hojas.resumen, filas },
    resumen: r,
  };
}


