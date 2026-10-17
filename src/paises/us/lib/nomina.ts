import { porcentaje } from "@/motor/calculo";

export const OPCIONES_FRECUENCIA = [
  { valor: "weekly", etiqueta: "Weekly (52 paychecks)" },
  { valor: "biweekly", etiqueta: "Every two weeks (26 paychecks)" },
  { valor: "semimonthly", etiqueta: "Twice a month (24 paychecks)" },
  { valor: "monthly", etiqueta: "Monthly (12 paychecks)" },
] as const;

export const PAGOS_POR_ANIO: Readonly<Record<string, number>> = { weekly: 52, biweekly: 26, semimonthly: 24, monthly: 12 };

export const FICA = {
  "us.social-security-rate": "numero",
  "us.medicare-rate": "numero",
  "us.additional-medicare-rate": "numero",
  "us.social-security-wage-base": "numero",
} as const;

export interface TasasFica {
  readonly "us.social-security-rate": number;
  readonly "us.medicare-rate": number;
  readonly "us.additional-medicare-rate": number;
  readonly "us.social-security-wage-base": number;
}

// Parte del empleado sobre los salarios del año. El Additional Medicare Tax se calcula sobre lo que
// pasa el umbral que corresponda (el de la declaración o el de retención de 200 000).
export function ficaEmpleado(
  v: TasasFica,
  salarios: number,
  umbralAdicional: number,
  redondear: (n: number) => number,
): { socialSecurity: number; medicare: number; adicional: number } {
  const base = Math.max(0, salarios);
  return {
    socialSecurity: redondear(porcentaje(Math.min(base, v["us.social-security-wage-base"]), v["us.social-security-rate"])),
    medicare: redondear(porcentaje(base, v["us.medicare-rate"])),
    adicional: redondear(porcentaje(Math.max(0, base - umbralAdicional), v["us.additional-medicare-rate"])),
  };
}
