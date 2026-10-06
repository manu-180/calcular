// Qué muestra la vista previa de la planilla de plazos fijos para un caso: las filas reales del
// archivo (número de fila incluido) con los números de calcularPlazoFijo(), el motor de la
// calculadora. check_planilla_plazo_fijo.ts aplica el prefill con el mismo caso, evalúa el archivo y
// exige que cada `esperado` coincida. La usan la oferta de /plazo-fijo y la landing.

import type { FilaHoja, HojaPrevia } from "@/components/HojaCalculo";
import { calcularPlazoFijo, type ResultadoPlazoFijo } from "@/lib/plazofijo";
import { formatARS, formatPct } from "@/lib/formato";
import { UVA } from "@/data/plazofijo";
import { PLANILLA_PF, fechaCorta, isoDeSerial, renovacionesSimulador, serialDeISO, type Datos } from "@/lib/prefill/plazo-fijo";

const H = PLANILLA_PF.hojas;

export const PESTANAS_PF = [H.inicio, H.registro, H.calendario, H.renovacion, H.uva, H.escalera, H.resumen, H.ipc, H.fuentes];

/** Celda del archivo y el número que tiene que dar (fracciones para porcentajes). */
export type Esperado = { hoja: string; ref: string; valor: number };

export type FilaRegistro = {
  fila: number;
  banco: string;
  constituido: string;
  capital: number;
  tnaPct: number;
  dias: number;
  vence: string;
  cobras: number;
  realPct: number;
  resultado: string;
};

export type PreviaPlazoFijo = {
  resultado: ResultadoPlazoFijo;
  renovaciones: number;
  registro: FilaRegistro;
  renovacion: HojaPrevia;
  uva: HojaPrevia;
  /** Inflación mensual que empata UVA y tradicional, en % (null si el plazo no llega al mínimo del UVA). */
  empatePct: number | null;
  esperado: Esperado[];
};

const pct = (n: number) => formatPct(n, 2);
const tasa = (n: number) => `${n.toLocaleString("es-AR", { maximumFractionDigits: 2 })}%`;
const dias = (n: number) => `${n.toLocaleString("es-AR")} ${n === 1 ? "día" : "días"}`;

export function inflacionDeEmpate(r: ResultadoPlazoFijo, capital: number): number | null {
  if (!r.uva) return null;
  const extra = 1 + (r.uva.tnaAdicionalPct / 100) * r.diasTotales / 365;
  return (Math.pow(r.totalFinal / capital / extra, 30 / r.diasTotales) - 1) * 100;
}

export function previaPlazoFijo(archivo: string, d: Datos): PreviaPlazoFijo | null {
  const renovaciones = renovacionesSimulador(d);
  const r = calcularPlazoFijo({
    capital: d.capital,
    dias: d.dias,
    tnaPct: d.tnaPct,
    renovaciones,
    inflacionMensualPct: d.inflacionMensualPct,
    uvaTnaAdicionalPct: d.uvaTnaAdicionalPct,
  });
  // La fila del registro es el plazo fijo sin renovar, que es lo que la persona tiene en el banco.
  const unico = calcularPlazoFijo({ capital: d.capital, dias: d.dias, tnaPct: d.tnaPct, inflacionMensualPct: d.inflacionMensualPct });
  if (!r || !unico) return null;

  const venceSerial = serialDeISO(d.fecha) + d.dias;
  const fila = PLANILLA_PF.registro.fila0;
  const RC = PLANILLA_PF.registro.col;
  const registro: FilaRegistro = {
    fila,
    banco: "",
    constituido: fechaCorta(d.fecha),
    capital: d.capital,
    tnaPct: d.tnaPct,
    dias: d.dias,
    vence: fechaCorta(isoDeSerial(venceSerial)),
    cobras: unico.total,
    realPct: unico.resultadoRealPct,
    resultado: unico.leGanaALaInflacion ? "Le gana, si la inflación es la estimada" : "Pierde, si la inflación es la estimada",
  };

  const renovacionFilas: FilaHoja[] = [
    { fila: 4, etiqueta: "DATOS", tono: "seccion" },
    { fila: 5, etiqueta: "Capital", valor: formatARS(d.capital, 0), tono: "input" },
    { fila: 6, etiqueta: "TNA", valor: tasa(d.tnaPct), tono: "input" },
    { fila: 7, etiqueta: "Días de cada plazo", valor: String(d.dias), tono: "input" },
    { fila: 8, etiqueta: "Renovaciones", valor: String(renovaciones), tono: "input" },
    { fila: 9, etiqueta: "Inflación mensual estimada", valor: tasa(d.inflacionMensualPct), tono: "input" },
    { fila: 11, etiqueta: "EL PRIMER PLAZO", tono: "seccion" },
    { fila: 12, etiqueta: "Interés del primer plazo", valor: r.interes },
    { fila: 13, etiqueta: "Total al vencimiento", valor: r.total, tono: "total" },
    { fila: 16, etiqueta: "Tasa efectiva anual (TEA)", valor: pct(r.teaPct) },
    { fila: 18, etiqueta: "RENOVANDO CAPITAL + INTERESES", tono: "seccion" },
    { fila: 19, etiqueta: "Días en total", valor: dias(r.diasTotales) },
    { fila: 20, etiqueta: "Terminás con", valor: r.totalFinal, tono: "total" },
    { fila: 23, etiqueta: "Inflación estimada del período", valor: pct(r.inflacionPeriodoPct) },
    { fila: 24, etiqueta: "En plata de hoy", valor: r.poderCompraFinal },
    { fila: 25, etiqueta: "Resultado real", valor: `${r.resultadoRealPct >= 0 ? "+" : ""}${pct(r.resultadoRealPct)}`, tono: "total" },
  ];

  const empatePct = inflacionDeEmpate(r, d.capital);
  const uvaFilas: FilaHoja[] = [
    { fila: 4, etiqueta: "DATOS", tono: "seccion" },
    { fila: 5, etiqueta: "Capital", valor: formatARS(d.capital, 0), tono: "input" },
    { fila: 8, etiqueta: "TNA del tradicional", valor: tasa(d.tnaPct), tono: "input" },
    { fila: 10, etiqueta: "Tasa adicional del UVA", valor: tasa(d.uvaTnaAdicionalPct), tono: "input" },
    { fila: 12, etiqueta: "AL MISMO PLAZO", tono: "seccion" },
    { fila: 13, etiqueta: "Plazo que se compara", valor: dias(r.diasTotales) },
    { fila: 15, etiqueta: "Tradicional renovado", valor: r.totalFinal, tono: "total" },
    ...(r.uva && empatePct !== null
      ? [
          { fila: 16, etiqueta: "UVA", valor: r.uva.total, tono: "total" as const },
          { fila: 18, etiqueta: "Inflación mensual que los empata", valor: pct(empatePct) },
        ]
      : [{ fila: 16, etiqueta: "UVA", valor: `mínimo ${UVA.plazoMinimoDias} días`, nota: "Com. «A» 8246 del BCRA" }]),
  ];

  const esperado: Esperado[] = [
    { hoja: H.registro, ref: `${RC.vence}${fila}`, valor: venceSerial },
    { hoja: H.registro, ref: `${RC.cobras}${fila}`, valor: unico.total },
    { hoja: H.registro, ref: `${RC.interes}${fila}`, valor: unico.interes },
    { hoja: H.registro, ref: `${RC.tea}${fila}`, valor: unico.teaPct / 100 },
    { hoja: H.registro, ref: `${RC.inflacion}${fila}`, valor: unico.inflacionPeriodoPct / 100 },
    { hoja: H.registro, ref: `${RC.real}${fila}`, valor: unico.resultadoRealPct / 100 },
    { hoja: H.renovacion, ref: "B12", valor: r.interes },
    { hoja: H.renovacion, ref: "B13", valor: r.total },
    { hoja: H.renovacion, ref: "B14", valor: r.tasaEfectivaPeriodoPct / 100 },
    { hoja: H.renovacion, ref: "B15", valor: r.temPct / 100 },
    { hoja: H.renovacion, ref: "B16", valor: r.teaPct / 100 },
    { hoja: H.renovacion, ref: "B19", valor: r.diasTotales },
    { hoja: H.renovacion, ref: "B20", valor: r.totalFinal },
    { hoja: H.renovacion, ref: "B21", valor: r.interesTotal },
    { hoja: H.renovacion, ref: "B22", valor: r.rendimientoTotalPct / 100 },
    { hoja: H.renovacion, ref: "B23", valor: r.inflacionPeriodoPct / 100 },
    { hoja: H.renovacion, ref: "B24", valor: r.poderCompraFinal },
    { hoja: H.renovacion, ref: "B25", valor: r.resultadoRealPct / 100 },
    { hoja: H.uva, ref: "B13", valor: r.diasTotales },
    { hoja: H.uva, ref: "B15", valor: r.totalFinal },
    ...(r.uva && empatePct !== null
      ? [
          { hoja: H.uva, ref: "B16", valor: r.uva.total },
          { hoja: H.uva, ref: "B17", valor: r.uva.total - r.totalFinal },
          { hoja: H.uva, ref: "B18", valor: empatePct / 100 },
        ]
      : []),
  ];

  return {
    resultado: r,
    renovaciones,
    registro,
    renovacion: { archivo, pestanas: PESTANAS_PF, hoja: H.renovacion, filas: renovacionFilas },
    uva: { archivo, pestanas: PESTANAS_PF, hoja: H.uva, filas: uvaFilas },
    empatePct,
    esperado,
  };
}
