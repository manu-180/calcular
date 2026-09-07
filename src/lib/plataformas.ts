import { TOPE_MAXIMO, type Categoria } from "@/data/monotributo";
import { categoriaParaFacturacion, cuotaMensual, type Cuota } from "@/lib/monotributo";
import {
  DIVISOR_DIA_NORMAL,
  DIVISOR_VACACIONES,
  ESCALA_VACACIONES,
} from "@/data/vacaciones";

// Repartir y trasladar personas es PRESTACIÓN DE SERVICIOS, no venta de cosas muebles:
// por eso la cuota sale siempre de la columna "servicios" de la escala de ARCA (que además
// es la más cara de las dos, así que la cuenta nunca subestima el costo).
export const ACTIVIDAD = "servicios" as const;

/** LCT arts. 121 y 122: el empleado cobra 13 pagos al año (12 sueldos + el SAC). */
export const PAGOS_ANUALES_EMPLEADO = 13;

/** El prestador independiente cobra 12: no hay SAC (no se le aplica la LCT). */
export const PAGOS_ANUALES_PRESTADOR = 12;

/** Días de licencia anual con menos de 5 años de antigüedad (LCT art. 150). */
export const DIAS_VACACIONES_BASE = ESCALA_VACACIONES[0].dias;

/**
 * El "plus vacacional" medido en sueldos mensuales. El art. 155 inc. a) de la LCT manda pagar
 * cada día de licencia dividiendo la remuneración por 25, mientras que el mes corriente ya
 * cubre esos días a razón de 1/30. La diferencia por los 14 días es plata extra que el
 * empleado cobra y el prestador independiente no: 14 × (1/25 − 1/30) = 0,09333 sueldos.
 */
export const PLUS_VACACIONAL_EN_SUELDOS =
  DIAS_VACACIONES_BASE * (1 / DIVISOR_VACACIONES - 1 / DIVISOR_DIA_NORMAL);

/** Pagos-equivalentes anuales de un empleado con el mismo bolsillo mensual: 13 + el plus. */
export const PAGOS_EQUIVALENTES_EMPLEADO =
  PAGOS_ANUALES_EMPLEADO + PLUS_VACACIONAL_EN_SUELDOS;

export type BrechaEmpleado = {
  /** Cuánto se lleva en el año un empleado que cobra el mismo neto por mes. */
  ingresoAnualEmpleado: number;
  /** Lo que se lleva el prestador: 12 pagos, sin aguinaldo ni plus vacacional. */
  ingresoAnualPrestador: number;
  /** La diferencia, en pesos del año. */
  brechaAnual: number;
  /** La misma diferencia como % de lo que cobra el prestador en el año. */
  brechaPorcentaje: number;
  /** Cuánto vale el aguinaldo que no cobra (un neto mensual). */
  aguinaldoNoCobrado: number;
  /** Cuánto vale el plus vacacional que no cobra. */
  plusVacacionalNoCobrado: number;
};

export type ResultadoPlataforma =
  | { tipo: "excedido"; tope: number; facturacionAnual: number }
  | {
      tipo: "ok";
      brutoMensual: number;
      facturacionAnual: number;
      categoria: Categoria;
      cuota: Cuota;
      cuotaAnual: number;
      netoMensual: number;
      netoAnual: number;
      /** Qué porcentaje del bruto mensual se va en la cuota. */
      porcentajeCuota: number;
      /** Cuánto le falta a la facturación anual para saltar de categoría. */
      margenHastaTope: number;
      /** El mismo margen expresado en meses de facturación al ritmo actual. */
      mesesHastaSaltarDeCategoria: number | null;
      brecha: BrechaEmpleado;
    };

export function calcularPlataforma(params: {
  /** Lo que la app te transfiere por mes, en promedio. */
  brutoMensual: number;
  /** ¿Además trabajás en relación de dependencia? Entonces sólo pagás el impuesto integrado. */
  otroEmpleo: boolean;
}): ResultadoPlataforma {
  const brutoMensual = Math.max(0, params.brutoMensual);
  const facturacionAnual = brutoMensual * 12;

  const categoria = categoriaParaFacturacion(facturacionAnual);
  if (!categoria) return { tipo: "excedido", tope: TOPE_MAXIMO, facturacionAnual };

  const cuota = cuotaMensual(categoria, ACTIVIDAD, params.otroEmpleo);
  const netoMensual = brutoMensual - cuota.total;
  const netoAnual = netoMensual * PAGOS_ANUALES_PRESTADOR;

  const ingresoAnualEmpleado = netoMensual * PAGOS_EQUIVALENTES_EMPLEADO;
  const brechaAnual = ingresoAnualEmpleado - netoAnual;

  const margenHastaTope = categoria.ingresosBrutosMax - facturacionAnual;

  return {
    tipo: "ok",
    brutoMensual,
    facturacionAnual,
    categoria,
    cuota,
    cuotaAnual: cuota.total * 12,
    netoMensual,
    netoAnual,
    porcentajeCuota: brutoMensual > 0 ? (cuota.total / brutoMensual) * 100 : 0,
    margenHastaTope,
    mesesHastaSaltarDeCategoria:
      brutoMensual > 0 ? margenHastaTope / brutoMensual : null,
    brecha: {
      ingresoAnualEmpleado,
      ingresoAnualPrestador: netoAnual,
      brechaAnual,
      brechaPorcentaje: netoAnual > 0 ? (brechaAnual / netoAnual) * 100 : 0,
      aguinaldoNoCobrado: netoMensual,
      plusVacacionalNoCobrado: netoMensual * PLUS_VACACIONAL_EN_SUELDOS,
    },
  };
}
