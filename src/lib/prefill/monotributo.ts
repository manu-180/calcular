import type ExcelJS from "exceljs";
import type { Prefill } from "./tipos";
import { booleano, escribir, numero, objeto, opcion } from "./_campos";
import { CATEGORIAS, TOPE_MAXIMO } from "@/data/monotributo";
import type { Actividad } from "@/lib/monotributo";

export type Datos = {
  actividad: Actividad;
  /** La categoría en la que está hoy (recategorización) o la que le dio la calculadora (/monotributo). */
  categoriaActual: string;
  dependencia: boolean;
  /** Ingresos brutos de los últimos 12 meses. Más del tope de K es exclusión: no hay oferta. */
  facturacion: number;
};

// Espejo de scripts/gen_planilla_monotributo.ts (HOJAS_MONO, CELDAS_MONO, ACTIVIDADES): no se
// importa de ahí porque este módulo entra al bundle del sitio. check_prefill_planillas.ts compara
// las dos copias y evalúa el archivo con los datos aplicados.
export const HOJA = "Mi monotributo";
export const CELDAS = {
  actividad: "B5",
  categoriaActual: "B6",
  dependencia: "B7",
  primeraFilaMes: 11,
  facturacion12: "B31",
  categoria: "B37",
  margen: "B40",
  cuota: "B41",
  cuotaActual: "B42",
} as const;
export const ACTIVIDAD_EN_PLANILLA: Record<Actividad, string> = {
  servicios: "Servicios",
  venta: "Venta de cosas muebles",
};
export const MESES = 12;

const CATS = CATEGORIAS.map((c) => c.cat);
const ACTIVIDADES = Object.keys(ACTIVIDAD_EN_PLANILLA) as Actividad[];
const r2 = (n: number) => Math.round(n * 100) / 100;

/** La calculadora pide el total de 12 meses y la planilla lo quiere mes por mes: se reparte en
 *  pesos enteros y el resto (con centavos) va al último mes, así la suma da exacta y la categoría
 *  de la planilla coincide con la de la calculadora también en el tope justo. */
export function repartirEnMeses(total: number): number[] {
  const base = Math.floor(total / MESES);
  return Array.from({ length: MESES }, (_, i) => (i < MESES - 1 ? base : r2(total - base * (MESES - 1))));
}

function validar(raw: unknown): Datos | null {
  const o = objeto(raw);
  if (!o) return null;
  const actividad = opcion(o, "actividad", ACTIVIDADES);
  const categoriaActual = opcion(o, "categoriaActual", CATS);
  const dependencia = booleano(o, "dependencia");
  const facturacion = numero(o, "facturacion", 1, TOPE_MAXIMO);
  if (actividad === null || categoriaActual === null || dependencia === null || facturacion === null) return null;
  return { actividad, categoriaActual, dependencia, facturacion: r2(facturacion) };
}

function aplicar(wb: ExcelJS.Workbook, d: Datos): void {
  const valores: Record<string, string | number> = {
    [CELDAS.actividad]: ACTIVIDAD_EN_PLANILLA[d.actividad],
    [CELDAS.categoriaActual]: d.categoriaActual,
    [CELDAS.dependencia]: d.dependencia ? "Sí" : "No",
  };
  repartirEnMeses(d.facturacion).forEach((v, i) => {
    valores[`B${CELDAS.primeraFilaMes + i}`] = v;
  });
  escribir(wb, HOJA, valores);
}

export const prefill: Prefill<Datos> = { validar, aplicar };
