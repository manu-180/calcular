import { aplicarEscalaMarginal, ErrorEntrada } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export type GrupoEdad = "under-65" | "65-to-74" | "75-and-over";

export const OPCIONES_EDAD = [
  { valor: "under-65", etiqueta: "Under 65" },
  { valor: "65-to-74", etiqueta: "65 to 74" },
  { valor: "75-and-over", etiqueta: "75 or older" },
] as const;

export interface Rebates {
  primary: number;
  secondary: number;
  tertiary: number;
}

// Las rebates se suman por edad: 65 o más suma la secundaria, 75 o más suma también la terciaria.
export function rebatePorEdad(r: Readonly<Record<string, number>>, edad: GrupoEdad): number {
  let total = r.primary;
  if (edad !== "under-65") total += r.secondary;
  if (edad === "75-and-over") total += r.tertiary;
  return total;
}

export function impuestoAntesDeRebates(escala: readonly FilaEscala[], gravable: number): number {
  return aplicarEscalaMarginal(escala, Math.max(0, gravable));
}

export function impuestoNeto(escala: readonly FilaEscala[], rebates: Readonly<Record<string, number>>, edad: GrupoEdad, gravable: number): number {
  return Math.max(0, impuestoAntesDeRebates(escala, gravable) - rebatePorEdad(rebates, edad));
}

// Crédito mensual: el titular y el primer dependiente tienen el mismo monto; del tercero en adelante, otro.
export function creditoMedicoMensual(c: Readonly<Record<string, number>>, personas: number): number {
  if (personas <= 0) return 0;
  if (personas === 1) return c["main-member"];
  return c["main-member"] + c["first-dependant"] + (personas - 2) * c["additional-dependant"];
}

export function tasaMarginal(escala: readonly FilaEscala[], gravable: number): number {
  if (gravable <= 0) return 0;
  let tasa = escala[0].tasa;
  for (const f of escala) if (gravable > f.desde) tasa = f.tasa;
  return tasa;
}

export function deduccionRetiro(aporte: number, base: number, tasa: number, tope: number): number {
  return Math.max(0, Math.min(aporte, (base * tasa) / 100, tope));
}

// Impuesto sobre un lump sum: la tabla se aplica al acumulado con los anteriores y se resta lo que
// ya correspondía a los anteriores (fórmula de la guía de SARS).
export function impuestoLumpSum(escala: readonly FilaEscala[], monto: number, anteriores: number): number {
  return aplicarEscalaMarginal(escala, anteriores + monto) - aplicarEscalaMarginal(escala, anteriores);
}

export function noNegativo(valor: number, campo: string, texto: string): void {
  if (valor < 0) throw new ErrorEntrada(texto, campo);
}

const FORMATO_RAND = new Intl.NumberFormat("en-ZA", { maximumFractionDigits: 2, minimumFractionDigits: 0 });

export function rand(n: number): string {
  return `R${FORMATO_RAND.format(n)}`;
}
