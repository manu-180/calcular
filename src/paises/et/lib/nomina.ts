import { aplicarEscalaMarginal, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export const REQUIERE_NOMINA = {
  "et.employment-income-tax": "escala",
  "et.pension-employee": "numero",
} as const;

export interface Nomina {
  impuesto: number;
  pension: number;
  neto: number;
  marginal: number;
}

// Schedule A grava el ingreso de empleo bruto: el aporte del 7 % no se resta antes de aplicar la tabla.
export function nomina(bruto: number, bandas: readonly FilaEscala[], tasaPension: number): Nomina {
  const base = Math.max(0, bruto);
  const impuesto = aplicarEscalaMarginal(bandas, base);
  const pension = porcentaje(base, tasaPension);
  return { impuesto, pension, neto: base - impuesto - pension, marginal: tasaMarginal(bandas, base) };
}

export function tasaMarginal(bandas: readonly FilaEscala[], base: number): number {
  let tasa = 0;
  for (const f of bandas) if (base > f.desde) tasa = f.tasa;
  return tasa;
}

// Deducción equivalente de la tabla: impuesto = base × tasa − deducción, la forma en que se suele
// mostrar la tabla en las nóminas. Sale de la misma escala marginal.
export function deduccionTramo(bandas: readonly FilaEscala[], base: number): number {
  return (base * tasaMarginal(bandas, base)) / 100 - aplicarEscalaMarginal(bandas, base);
}

// Bruto que deja un neto dado. El neto crece con el bruto en todos los tramos (la tasa más alta más
// el 7 % queda bajo el 100 %), así que la bisección converge.
export function brutoDesdeNeto(neto: number, bandas: readonly FilaEscala[], tasaPension: number): number {
  let bajo = neto;
  let alto = neto * 3 + 10000;
  for (let i = 0; i < 200; i++) {
    const medio = (bajo + alto) / 2;
    if (nomina(medio, bandas, tasaPension).neto < neto) bajo = medio;
    else alto = medio;
  }
  return alto;
}

export function birr(n: number): string {
  return `ETB ${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
