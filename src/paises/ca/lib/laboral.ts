import { ErrorEntrada } from "@/motor/calculo";

export const JURISDICCIONES = [
  { valor: "on", etiqueta: "Ontario" },
  { valor: "bc", etiqueta: "British Columbia" },
  { valor: "ab", etiqueta: "Alberta" },
  { valor: "federal", etiqueta: "Federally regulated job (Canada Labour Code)" },
] as const;

export type Jurisdiccion = (typeof JURISDICCIONES)[number]["valor"];

// Las tablas de preaviso se guardan como { meses de antigüedad desde los que rige: semanas }.
export function semanasPorAntiguedad(tabla: Readonly<Record<string, number>>, meses: number): number {
  let semanas = 0;
  for (const [desde, valor] of Object.entries(tabla).sort((a, b) => Number(a[0]) - Number(b[0]))) {
    if (meses >= Number(desde)) semanas = valor;
  }
  return semanas;
}

export function mesesDeServicio(anios: number, meses: number): number {
  if (anios < 0 || meses < 0 || meses > 11) throw new ErrorEntrada("Enter full years and 0 to 11 extra months.", "meses");
  return anios * 12 + meses;
}
