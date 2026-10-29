// Sección 35 del Labour Act: quién cobra indemnización.
export const MOTIVOS = [
  { valor: "dismissed", etiqueta: "Dismissed (including retrenchment)" },
  { valor: "retired", etiqueta: "Resigned or retired at 65" },
  { valor: "died", etiqueta: "Died while employed" },
  { valor: "misconduct", etiqueta: "Fairly dismissed for misconduct or poor performance" },
  { valor: "resigned", etiqueta: "Resigned before 65" },
] as const;

export function tieneIndemnizacion(motivo: string, anios: number): boolean {
  return anios >= 1 && (motivo === "dismissed" || motivo === "retired" || motivo === "died");
}

// Sección 30(1): un día, una semana o un mes de preaviso según la antigüedad.
export const ANTIGUEDADES = [
  { valor: "up-to-4-weeks", etiqueta: "Four weeks or less" },
  { valor: "up-to-1-year", etiqueta: "More than four weeks, up to one year" },
  { valor: "over-1-year", etiqueta: "More than one year" },
] as const;

export type Antiguedad = (typeof ANTIGUEDADES)[number]["valor"];

export interface Preaviso {
  cantidad: number;
  unidad: "day" | "week" | "month";
  // Pago en lugar del preaviso a partir del sueldo mensual.
  pago: number;
}

export function preaviso(
  antiguedad: Antiguedad,
  mapa: Readonly<Record<string, number>>,
  mensual: number,
  semanasMes: number,
  diasSemana: number,
): Preaviso {
  if (antiguedad === "up-to-4-weeks") {
    const cantidad = mapa["days-up-to-4-weeks"];
    return { cantidad, unidad: "day", pago: (mensual / (semanasMes * diasSemana)) * cantidad };
  }
  if (antiguedad === "up-to-1-year") {
    const cantidad = mapa["weeks-up-to-1-year"];
    return { cantidad, unidad: "week", pago: (mensual / semanasMes) * cantidad };
  }
  const cantidad = mapa["months-over-1-year"];
  return { cantidad, unidad: "month", pago: mensual * cantidad };
}

export function textoPreaviso(p: Preaviso): string {
  return `${p.cantidad} ${p.unidad}${p.cantidad === 1 ? "" : "s"}`;
}
