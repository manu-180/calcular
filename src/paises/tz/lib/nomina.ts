import { aplicarEscalaMarginal, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export type Residencia = "resident" | "non-resident";
export type Empleo = "primary" | "secondary";

export const APORTE_NSSF = [
  { valor: "10", etiqueta: "10% (employer pays the other 10%)" },
  { valor: "5", etiqueta: "5% (employer pays 15%)" },
  { valor: "0", etiqueta: "Nothing (employer pays the full 20%)" },
] as const;

export interface Paye {
  nssf: number;
  gravable: number;
  paye: number;
  marginal: number;
}

// TRA: el empleo secundario retiene a la tasa más alta y el no residente paga 15 % sobre el bruto,
// como retención final. El aporte al NSSF se resta del bruto antes del impuesto.
export function paye(
  bruto: number,
  aporteNssf: number,
  residencia: Residencia,
  empleo: Empleo,
  bandas: readonly FilaEscala[],
  tasaNoResidente: number,
): Paye {
  const nssf = porcentaje(Math.max(0, bruto), aporteNssf);
  const gravable = Math.max(0, bruto - nssf);
  const tope = bandas[bandas.length - 1].tasa;
  if (residencia === "non-resident") return { nssf, gravable, paye: porcentaje(bruto, tasaNoResidente), marginal: tasaNoResidente };
  if (empleo === "secondary") return { nssf, gravable, paye: porcentaje(gravable, tope), marginal: tope };
  let marginal = 0;
  for (const f of bandas) if (gravable > f.desde) marginal = f.tasa;
  return { nssf, gravable, paye: aplicarEscalaMarginal(bandas, gravable), marginal };
}

export function tzs(n: number): string {
  return `TSh ${n.toLocaleString("en-TZ", { minimumFractionDigits: n % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}`;
}
