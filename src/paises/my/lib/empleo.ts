import { ErrorEntrada } from "@/motor/calculo";

export type Antiguedad = "under-2" | "2-to-5" | "5-plus";

export function tramoAntiguedad(anios: number): Antiguedad {
  if (anios < 2) return "under-2";
  if (anios < 5) return "2-to-5";
  return "5-plus";
}

export function etiquetaTramo(t: Antiguedad): string {
  return t === "under-2" ? "Less than 2 years" : t === "2-to-5" ? "2 to less than 5 years" : "5 years or more";
}

export function sueldoValido(sueldo: number, campo = "sueldo"): void {
  if (sueldo <= 0) throw new ErrorEntrada("Enter your monthly wages.", campo);
}

export function mesesValidos(anios: number, meses: number): void {
  if (anios < 0) throw new ErrorEntrada("Years of service cannot be negative.", "anios");
  if (meses < 0 || meses > 11) throw new ErrorEntrada("Enter between 0 and 11 extra months.", "meses");
}

export const CAMPO_ANIOS = { id: "anios", tipo: "entero", etiqueta: "Completed years of service", min: 0, max: 60, porDefecto: 3 } as const;
export const CAMPO_MESES = { id: "meses", tipo: "entero", etiqueta: "Extra completed months", min: 0, max: 11, porDefecto: 0 } as const;
export const CAMPO_SUELDO = { id: "sueldo", tipo: "moneda", etiqueta: "Monthly wages", min: 0, porDefecto: 3000 } as const;
