import { aplicarEscalaMarginal, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export const REQUIERE_NOMINA = {
  "rw.paye-bands": "escala",
  "rw.pension-employee": "numero",
  "rw.maternity-employee": "numero",
  "rw.cbhi-rate": "numero",
  "rw.medical-employee": "numero",
} as const;

export interface ValoresNomina {
  "rw.paye-bands": readonly FilaEscala[];
  "rw.pension-employee": number;
  "rw.maternity-employee": number;
  "rw.cbhi-rate": number;
  "rw.medical-employee": number;
}

// La calculadora de PAYE de la RRA divide el impuesto anual por 12 y redondea hacia arriba al franco
// ("No fractions on tax"). Con las bandas anuales iguales a las mensuales por 12, da lo mismo
// aplicar las mensuales y redondear hacia arriba. El margen evita que un error de coma flotante
// sume un franco.
export function redondearImpuesto(x: number): number {
  return Math.ceil(x - 1e-9);
}

export function paye(bruto: number, bandas: readonly FilaEscala[]): number {
  return redondearImpuesto(aplicarEscalaMarginal(bandas, Math.max(0, bruto)));
}

export function tasaMarginal(bandas: readonly FilaEscala[], base: number): number {
  let tasa = 0;
  for (const f of bandas) if (base > f.desde) tasa = f.tasa;
  return tasa;
}

export interface Nomina {
  paye: number;
  pension: number;
  maternidad: number;
  medico: number;
  cbhi: number;
  neto: number;
}

// La RRA cobra el CBHI sobre el "net salary". Lo tomamos como el sueldo después de PAYE y de los
// aportes de pensión y maternidad del trabajador, que es la base que usan las nóminas del país.
export function nomina(
  bruto: number,
  basico: number,
  v: ValoresNomina,
  redondear: (x: number) => number,
): Nomina {
  const impuesto = paye(bruto, v["rw.paye-bands"]);
  const pension = redondear(porcentaje(bruto, v["rw.pension-employee"]));
  const maternidad = redondear(porcentaje(bruto, v["rw.maternity-employee"]));
  const medico = redondear(porcentaje(Math.max(0, basico), v["rw.medical-employee"]));
  const cbhi = redondear(porcentaje(Math.max(0, bruto - impuesto - pension - maternidad), v["rw.cbhi-rate"]));
  const neto = redondear(bruto - impuesto - pension - maternidad - medico - cbhi);
  return { paye: impuesto, pension, maternidad, medico, cbhi, neto };
}

export function rwf(n: number): string {
  return `RWF ${n.toLocaleString("en-RW", { maximumFractionDigits: 0 })}`;
}
