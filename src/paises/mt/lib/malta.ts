import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FechaISO, FilaEscala } from "@/motor/tipos";
import { diaDeSemana, domingoDePascua, sumarDias } from "./fechas";

export type EstadoFiscal =
  | "single"
  | "married"
  | "parent"
  | "parent-one-child"
  | "parent-two-children"
  | "married-one-child"
  | "married-two-children";

export const ESCALAS = {
  "mt.income-tax-single": "escala",
  "mt.income-tax-married": "escala",
  "mt.income-tax-parent": "escala",
  "mt.income-tax-parent-one-child": "escala",
  "mt.income-tax-parent-two-children": "escala",
  "mt.income-tax-married-one-child": "escala",
  "mt.income-tax-married-two-children": "escala",
} as const;

export const OPCIONES_ESTADO = [
  { valor: "single", etiqueta: "Single" },
  { valor: "married", etiqueta: "Married, joint computation" },
  { valor: "married-one-child", etiqueta: "Married with one child" },
  { valor: "married-two-children", etiqueta: "Married with two or more children" },
  { valor: "parent-one-child", etiqueta: "Parent with one child" },
  { valor: "parent-two-children", etiqueta: "Parent with two or more children" },
  { valor: "parent", etiqueta: "Parent rates (not eligible for the new parent rates)" },
] as const;

type ValoresEscalas = { readonly [K in keyof typeof ESCALAS]: readonly FilaEscala[] };

export function escalaDe(estado: EstadoFiscal, v: ValoresEscalas): readonly FilaEscala[] {
  return v[`mt.income-tax-${estado}`];
}

export function impuestoRenta(estado: EstadoFiscal, ingreso: number, v: ValoresEscalas): number {
  return aplicarEscalaMarginal(escalaDe(estado, v), Math.max(0, ingreso));
}

export function tasaMarginal(estado: EstadoFiscal, ingreso: number, v: ValoresEscalas): number {
  const escala = escalaDe(estado, v);
  let tasa = 0;
  for (const f of escala) if (ingreso > f.desde) tasa = f.tasa;
  return tasa;
}

// Feriados del art. 6 y del Schedule de la National Holidays and Other Public Holidays Act (Cap. 252):
// cinco nacionales y nueve públicos; el único movible es Viernes Santo.
const FIJOS: readonly [number, number, string][] = [
  [1, 1, "New Year's Day"],
  [2, 10, "St Paul's Shipwreck"],
  [3, 19, "St Joseph"],
  [3, 31, "Freedom Day"],
  [5, 1, "Workers' Day"],
  [6, 7, "Sette Giugno"],
  [6, 29, "St Peter and St Paul"],
  [8, 15, "Assumption"],
  [9, 8, "Victory Day"],
  [9, 21, "Independence Day"],
  [12, 8, "Immaculate Conception"],
  [12, 13, "Republic Day"],
  [12, 25, "Christmas Day"],
];

export interface Feriado {
  fecha: FechaISO;
  nombre: string;
}

export function feriados(anio: number): Feriado[] {
  const lista: Feriado[] = FIJOS.map(([m, d, nombre]) => ({
    fecha: `${anio}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}` as FechaISO,
    nombre,
  }));
  lista.push({ fecha: sumarDias(domingoDePascua(anio), -2), nombre: "Good Friday" });
  return lista.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
}

export function feriadosEnFinDeSemana(anio: number): Feriado[] {
  return feriados(anio).filter((f) => {
    const dia = diaDeSemana(f.fecha);
    return dia === 0 || dia === 6;
  });
}

export function euros(n: number): string {
  return `€${n.toLocaleString("en-MT", { minimumFractionDigits: n % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}`;
}
