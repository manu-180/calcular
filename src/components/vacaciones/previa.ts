// Lo que muestra la vista previa de la planilla de vacaciones para un caso: la hoja «Liquidación»
// del archivo con sus números de fila reales, armada con el motor de la calculadora
// (calcularVacaciones) y las fechas de ./cronograma. scripts/check_planilla_vacaciones.ts aplica el
// mismo caso al .xlsx, lo evalúa y exige que cada fila de esta previa dé lo mismo que el archivo.

import type { FilaHoja, HojaPrevia } from "@/components/HojaCalculo";
import type { Datos } from "@/lib/prefill/vacaciones";
import { calcularVacaciones, antiguedadAl31 } from "@/lib/vacaciones";
import { ANIO_VACACIONES } from "@/data/vacaciones";
import { cronograma, fechaCorta, textoEstado, type Cronograma } from "./cronograma";

export const PESTANAS_VACACIONES = [
  "Instrucciones",
  "Equipo",
  "Liquidación",
  "Notificación",
  "Temporada",
  "Egresos",
  "Feriados",
  "Fuentes",
] as const;
export const HOJA_PREVIA = "Liquidación";

export function textoAntiguedad(ingresoISO: string, anio = ANIO_VACACIONES): string {
  const { anios, meses } = antiguedadAl31(ingresoISO, anio);
  return `${anios} ${anios === 1 ? "año" : "años"} y ${meses} ${meses === 1 ? "mes" : "meses"}`;
}

export type ResumenVacaciones = {
  dias: number;
  diasTramo: number;
  saldo: number;
  proporcional: boolean;
  pagar: number;
  plus: number;
  cronograma: Cronograma;
  estadoTexto: string;
  enRegla: boolean;
};

export function hojaVacaciones(
  archivo: string,
  d: Datos,
  hoyISO: string,
): { hoja: HojaPrevia; resumen: ResumenVacaciones } | null {
  const r = calcularVacaciones({ sueldo: d.sueldo, ingresoISO: d.ingresoISO, diasATomar: d.diasTramo > 0 ? d.diasTramo : undefined });
  if (!r || r.dias === 0) return null;
  const c = cronograma({ dias: r.dias, diasTramo: r.diasTomados, inicioISO: d.inicioISO, hoyISO });
  const estadoTexto = textoEstado(c.estado);
  const filas: FilaHoja[] = [
    { fila: 4, etiqueta: "EMPLEADO", tono: "seccion" },
    { fila: 5, etiqueta: "Empleado Nº", valor: "1", tono: "input" },
    { fila: 7, etiqueta: "Fecha de ingreso", valor: fechaCorta(d.ingresoISO) },
    { fila: 8, etiqueta: "Sueldo bruto mensual", valor: d.sueldo },
    { fila: 9, etiqueta: "Antigüedad al 31 de diciembre", valor: textoAntiguedad(d.ingresoISO) },
    { fila: 11, etiqueta: "DÍAS Y FECHAS", tono: "seccion" },
    {
      fila: 12,
      etiqueta: "Días de vacaciones que le corresponden",
      valor: String(r.dias),
      nota: r.modo === "proporcional" ? "proporcional: 1 cada 20 trabajados" : undefined,
    },
    ...(r.diasTomados < r.dias ? [{ fila: 13, etiqueta: "Días de este tramo", valor: String(r.diasTomados) }] : []),
    { fila: 14, etiqueta: "Primer día de vacaciones", valor: fechaCorta(c.inicio) },
    { fila: 16, etiqueta: "Vuelve a trabajar el", valor: fechaCorta(c.vuelve) },
    { fila: 17, etiqueta: "Notificar por escrito hasta el", valor: fechaCorta(c.avisarAntesDe) },
    { fila: 18, etiqueta: "PAGO (art. 155 LCT)", tono: "seccion" },
    { fila: 21, etiqueta: "A PAGAR AL INICIO DE LAS VACACIONES", valor: r.retribucion, tono: "total" },
    { fila: 22, etiqueta: "Plus vacacional incluido", valor: r.plus },
    { fila: 23, etiqueta: "Estado", valor: estadoTexto },
  ];
  return {
    hoja: { archivo, pestanas: [...PESTANAS_VACACIONES], hoja: HOJA_PREVIA, filas },
    resumen: {
      dias: r.dias,
      diasTramo: r.diasTomados,
      saldo: r.dias - r.diasTomados,
      proporcional: r.modo === "proporcional",
      pagar: r.retribucion,
      plus: r.plus,
      cronograma: c,
      estadoTexto,
      enRegla: c.estado.tipo === "en-regla" || c.estado.tipo === "notificado",
    },
  };
}
