import { porcentaje } from "@/motor/calculo";

// Deducciones de nómina según la guía de TAJ (Payroll Taxes and Statutory Contributions, dic. 2025):
// NIS sobre el bruto con tope anual, NHT sobre el bruto, Education Tax y PAYE sobre el statutory income
// (bruto menos NIS y aportes a un plan de pensión aprobado).

export const REQUIERE_EMPLEADO = {
  "jm.nis-employee-rate": "numero",
  "jm.nis-ceiling": "numero",
  "jm.nht-employee-rate": "numero",
  "jm.education-tax-employee-rate": "numero",
  "jm.paye-threshold-monthly": "numero",
  "jm.income-tax-rate": "numero",
  "jm.income-tax-higher-rate": "numero",
  "jm.income-tax-higher-band-monthly": "numero",
} as const;

export interface ValoresEmpleado {
  "jm.nis-employee-rate": number;
  "jm.nis-ceiling": number;
  "jm.nht-employee-rate": number;
  "jm.education-tax-employee-rate": number;
  "jm.paye-threshold-monthly": number;
  "jm.income-tax-rate": number;
  "jm.income-tax-higher-rate": number;
  "jm.income-tax-higher-band-monthly": number;
}

export interface DeduccionesMes {
  nis: number;
  pension: number;
  ingresoEstatutario: number;
  educationTax: number;
  nht: number;
  paye: number;
  total: number;
  neto: number;
}

/** NIS de un mes: la tasa sobre el bruto, hasta un doceavo del tope anual. */
export function nisMes(bruto: number, tasa: number, topeAnual: number): number {
  return Math.min(porcentaje(bruto, tasa), porcentaje(topeAnual, tasa) / 12);
}

/** PAYE de un mes sobre el statutory income. */
export function payeMes(ingreso: number, umbral: number, tasa: number, tasaAlta: number, tramoAlto: number): number {
  const base = Math.max(0, Math.min(ingreso, tramoAlto) - umbral);
  const alto = Math.max(0, ingreso - Math.max(tramoAlto, umbral));
  return porcentaje(base, tasa) + porcentaje(alto, tasaAlta);
}

export function deduccionesMes(bruto: number, pension: number, v: ValoresEmpleado, redondear: (n: number) => number): DeduccionesMes {
  const nis = redondear(nisMes(bruto, v["jm.nis-employee-rate"], v["jm.nis-ceiling"]));
  const ingresoEstatutario = redondear(Math.max(0, bruto - nis - pension));
  const educationTax = redondear(porcentaje(ingresoEstatutario, v["jm.education-tax-employee-rate"]));
  const nht = redondear(porcentaje(bruto, v["jm.nht-employee-rate"]));
  const paye = redondear(
    payeMes(ingresoEstatutario, v["jm.paye-threshold-monthly"], v["jm.income-tax-rate"], v["jm.income-tax-higher-rate"], v["jm.income-tax-higher-band-monthly"]),
  );
  const total = redondear(nis + pension + educationTax + nht + paye);
  return { nis, pension, ingresoEstatutario, educationTax, nht, paye, total, neto: redondear(bruto - total) };
}
