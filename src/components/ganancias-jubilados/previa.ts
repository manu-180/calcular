// Qué muestra la vista previa de la Planilla de Ganancias para jubilados: las filas reales de la
// hoja «Mis datos» del archivo, con sus números de fila y con los importes del motor de
// src/lib/planilla-ganancias-jubilados.ts. La usan la landing (servidor) y la oferta de abajo de
// la calculadora (cliente), así las dos muestran exactamente lo que se descarga.
//
// Sin importar nada de node: la oferta es un componente de cliente. Los números de fila están
// duplicados del generador a propósito (scripts/ no se puede importar desde src/), y
// scripts/check_oferta_ganancias_jubilados.ts falla si alguno se corre.

import type { FilaHoja, HojaPrevia } from "@/components/HojaCalculo";
import { haberesMinimosProyectados } from "@/lib/ganancias-jubilados";
import {
  aguinaldosPorSemestre,
  calcularPlanillaJubilados,
  MESES_DEL_ANIO,
  type ResultadoPlanillaJubilados,
} from "@/lib/planilla-ganancias-jubilados";

/** Las filas de «Mis datos» que se muestran. Son las del archivo. */
export const FILAS_JUBILADOS = {
  regimen: 5,
  conyuge: 6,
  hijos: 7,
  especifica: 13,
  cargas: 15,
  cualRige: 16,
  bruto: 20,
  aporte: 21,
  gni: 23,
  impuesto: 24,
  segunRecibos: 28,
  segunPlanilla: 29,
  diferencia: 30,
} as const;

/** Las pestañas del libro, en orden. */
export const PESTANAS_JUBILADOS = [
  "Instrucciones",
  "Mis datos",
  "Mi año",
  "Haberes mínimos",
  "Escala y deducciones",
  "Fuentes",
] as const;

export const HOJA_PREVIA = "Mis datos";

export type CasoJubilados = {
  /** El haber bruto que la persona cargó en la calculadora, igual en los doce meses. */
  haberMensual: number;
  regimenPamiId?: string;
  conyuge?: boolean;
  hijos?: number;
  otrosIngresos?: boolean;
  bienesPersonales?: boolean;
};

export type PreviaJubilados = {
  hoja: HojaPrevia;
  resultado: ResultadoPlanillaJubilados;
  /** Retención del primer mes del año y del mes más alto: la cuenta que una estimación promedio
   *  esconde, y la razón de ser de la planilla. */
  primerMes: number;
  mesMasAlto: { nombre: string; monto: number };
};

/** La previa de un caso. Devuelve null si con ese haber no hay impuesto: a quien no paga Ganancias
 *  no se le ofrece una planilla para controlar una retención que no existe. */
export function previaJubilados(archivo: string, caso: CasoJubilados): PreviaJubilados | null {
  const haber = Math.max(0, caso.haberMensual);
  if (!(haber > 0)) return null;

  const haberes = Array.from({ length: 12 }, () => haber);
  const resultado = calcularPlanillaJubilados({
    haberes,
    aguinaldos: aguinaldosPorSemestre(haberes),
    haberesMinimos: haberesMinimosProyectados().map((m) => m.haberMinimo),
    regimenPamiId: caso.regimenPamiId,
    conyuge: caso.conyuge,
    hijos: caso.hijos,
    otrosIngresos: caso.otrosIngresos,
    bienesPersonales: caso.bienesPersonales,
  });
  if (!(resultado.impuestoAnual > 0)) return null;

  const masAlto = resultado.filas.reduce((a, b) => (b.retencionMes > a.retencionMes ? b : a));
  const filas: FilaHoja[] = [
    { fila: FILAS_JUBILADOS.conyuge, etiqueta: "¿Tenés cónyuge a cargo?", valor: caso.conyuge ? "Sí" : "No", tono: "input" },
    { fila: FILAS_JUBILADOS.hijos, etiqueta: "¿Cuántos hijos a cargo?", valor: String(Math.max(0, Math.floor(caso.hijos ?? 0))), tono: "input" },
    {
      fila: FILAS_JUBILADOS.cualRige,
      etiqueta: "La deducción que te rige",
      valor: resultado.aplicaEspecifica ? "Los 8 haberes mínimos" : "No imponible y especial",
      tono: "total",
    },
    { fila: FILAS_JUBILADOS.bruto, etiqueta: "Haberes brutos del año", valor: resultado.brutoAnual },
    { fila: FILAS_JUBILADOS.aporte, etiqueta: "Aporte de obra social del año", valor: resultado.aportesAnual },
    { fila: FILAS_JUBILADOS.gni, etiqueta: "Ganancia sujeta a impuesto", valor: resultado.gniAnual },
    { fila: FILAS_JUBILADOS.impuesto, etiqueta: "IMPUESTO DEL AÑO", valor: resultado.impuestoAnual, tono: "total" },
    { fila: FILAS_JUBILADOS.segunRecibos, etiqueta: "Según tus recibos", valor: "lo cargás vos", tono: "input" },
    { fila: FILAS_JUBILADOS.diferencia, etiqueta: "DIFERENCIA DEL AÑO", valor: "la calcula la planilla", tono: "total" },
  ];

  return {
    hoja: { archivo, pestanas: [...PESTANAS_JUBILADOS], hoja: HOJA_PREVIA, filas },
    resultado,
    primerMes: resultado.filas[0].retencionMes,
    mesMasAlto: { nombre: MESES_DEL_ANIO[masAlto.mes - 1], monto: masAlto.retencionMes },
  };
}

/** El caso de la landing: un haber que paga Ganancias de verdad. Sale del umbral que calcula el
 *  propio motor del sitio, así que no hay ningún monto escrito a mano. */
export function casoDeLanding(umbralHaber: number): CasoJubilados {
  return { haberMensual: Math.round((umbralHaber * 1.35) / 1000) * 1000 };
}
