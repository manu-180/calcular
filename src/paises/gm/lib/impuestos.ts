import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

const FORMATO = new Intl.NumberFormat("en-GM", { maximumFractionDigits: 2, minimumFractionDigits: 0 });

// La GRA y la SSHFC escriben los dalasis con una D delante (D36,000).
export function dalasis(n: number): string {
  return `D${FORMATO.format(n)}`;
}

export function payeAnual(escala: readonly FilaEscala[], ingresoAnual: number): number {
  return aplicarEscalaMarginal(escala, Math.max(0, ingresoAnual));
}

// La tabla de la GRA se lee por mes: el impuesto del año sobre 12 veces el ingreso, dividido por 12.
export function payeMensual(escala: readonly FilaEscala[], ingresoMensual: number): number {
  return payeAnual(escala, ingresoMensual * 12) / 12;
}

export function tasaMarginal(escala: readonly FilaEscala[], ingresoAnual: number): number {
  let tasa = escala[0].tasa;
  for (const f of escala) if (ingresoAnual > f.desde) tasa = f.tasa;
  return tasa;
}
