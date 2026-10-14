import { aplicarEscalaMarginal, enMapa } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

const FORMATO = new Intl.NumberFormat("en-SG", { style: "currency", currency: "SGD" });

export function dolares(n: number): string {
  return FORMATO.format(n);
}

// El margen evita que 0.2 × 8000 = 1599.9999… baje un dólar al truncar.
const EPSILON = 1e-7;

export function bajarAlDolar(n: number): number {
  return Math.floor(n + EPSILON);
}

export function dolarMasCercano(n: number): number {
  return Math.floor(n + 0.5 + EPSILON);
}

export const GRUPOS_CPF = [
  { valor: "55-y-menos", etiqueta: "55 and below" },
  { valor: "55-60", etiqueta: "Above 55 to 60" },
  { valor: "60-65", etiqueta: "Above 60 to 65" },
  { valor: "65-70", etiqueta: "Above 65 to 70" },
  { valor: "mas-70", etiqueta: "Above 70" },
] as const;

export interface TablaCpf {
  tasaEmpleador: Readonly<Record<string, number>>;
  tasaEmpleado: Readonly<Record<string, number>>;
  factorGradual: Readonly<Record<string, number>>;
  topeOw: number;
  tramos: Readonly<Record<string, number>>;
}

export interface AporteCpf {
  total: number;
  empleado: number;
  empleador: number;
  base: number;
}

// Tabla 1 del CPF Board (ciudadanos y PR desde el tercer año): el total se redondea al dólar más
// cercano y la parte del empleado se trunca; la del empleador es la diferencia, nunca un cálculo propio.
export function aporteCpf(salario: number, grupo: string, t: TablaCpf): AporteCpf {
  const er = enMapa(t.tasaEmpleador, grupo);
  const ee = enMapa(t.tasaEmpleado, grupo);
  const factor = enMapa(t.factorGradual, grupo);
  const sinAporte = enMapa(t.tramos, "sin-aporte");
  const soloEmpleador = enMapa(t.tramos, "solo-empleador");
  const pleno = enMapa(t.tramos, "pleno");
  let total = 0;
  let empleado = 0;
  const base = Math.min(salario, t.topeOw);
  if (salario > pleno) {
    total = dolarMasCercano((base * (er + ee)) / 100);
    empleado = bajarAlDolar((base * ee) / 100);
  } else if (salario > soloEmpleador) {
    total = dolarMasCercano((salario * er) / 100 + factor * (salario - soloEmpleador));
    empleado = bajarAlDolar(factor * (salario - soloEmpleador));
  } else if (salario > sinAporte) {
    total = dolarMasCercano((salario * er) / 100);
  }
  return { total, empleado, empleador: total - empleado, base: salario > sinAporte ? base : 0 };
}

export function impuestoResidente(gravable: number, escala: readonly FilaEscala[]): number {
  return aplicarEscalaMarginal(escala, Math.max(0, gravable));
}

export function tasaMarginal(escala: readonly FilaEscala[], gravable: number): number {
  let tasa = 0;
  for (const f of escala) if (gravable > f.desde) tasa = f.tasa;
  return tasa;
}

export function desgloseEscala(escala: readonly FilaEscala[], base: number, redondear: (n: number) => number): string[] {
  const lineas: string[] = [];
  for (const f of escala) {
    if (base <= f.desde) break;
    const tope = f.hasta === null ? base : Math.min(base, f.hasta);
    const parte = tope - f.desde;
    lineas.push(`${f.tasa}% on ${dolares(redondear(parte))}: ${dolares(redondear((parte * f.tasa) / 100))}.`);
  }
  return lineas;
}
