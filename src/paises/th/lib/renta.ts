import { aplicarEscalaMarginal, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export const REQ_RENTA = {
  "th.pit-brackets": "escala",
  "th.employment-expense-rate": "numero",
  "th.employment-expense-cap": "numero",
  "th.personal-allowance": "numero",
  "th.spouse-allowance": "numero",
  "th.child-allowance": "numero",
  "th.child-allowance-second": "numero",
  "th.parent-allowance": "numero",
  "th.sso-deduction-cap": "numero",
} as const;

export const REQ_SSO = {
  "th.sso-rate-employee": "numero",
  "th.sso-rate-employer": "numero",
  "th.sso-wage-floor": "numero",
  "th.sso-wage-ceiling": "numero",
} as const;

export interface ValoresRenta {
  "th.pit-brackets": readonly FilaEscala[];
  "th.employment-expense-rate": number;
  "th.employment-expense-cap": number;
  "th.personal-allowance": number;
  "th.spouse-allowance": number;
  "th.child-allowance": number;
  "th.child-allowance-second": number;
  "th.parent-allowance": number;
  "th.sso-deduction-cap": number;
}

export interface ValoresSso {
  "th.sso-rate-employee": number;
  "th.sso-rate-employer": number;
  "th.sso-wage-floor": number;
  "th.sso-wage-ceiling": number;
}

export interface Familia {
  conyuge: boolean;
  hijos: number;
  // Hijos desde el segundo nacidos en 2561 (2018) o después: la deducción es mayor.
  hijosDesde2561: number;
  padres: number;
  otras: number;
}

export interface Renta {
  gastos: number;
  deducciones: number;
  deduccionSso: number;
  neta: number;
  impuesto: number;
  marginal: number;
}

// Ingreso de sueldo (artículo 40 (1)): 50 % de gastos con tope, después las deducciones personales y
// la escala progresiva sobre la renta neta.
export function rentaSueldo(ingresoAnual: number, ssoAnual: number, f: Familia, v: ValoresRenta): Renta {
  const gastos = Math.min(porcentaje(ingresoAnual, v["th.employment-expense-rate"]), v["th.employment-expense-cap"]);
  const deduccionSso = Math.min(ssoAnual, v["th.sso-deduction-cap"]);
  const hijosComunes = Math.max(0, f.hijos - f.hijosDesde2561);
  const deducciones =
    v["th.personal-allowance"] +
    (f.conyuge ? v["th.spouse-allowance"] : 0) +
    hijosComunes * v["th.child-allowance"] +
    f.hijosDesde2561 * v["th.child-allowance-second"] +
    f.padres * v["th.parent-allowance"] +
    deduccionSso +
    Math.max(0, f.otras);
  const neta = Math.max(0, ingresoAnual - gastos - deducciones);
  const escala = v["th.pit-brackets"];
  const impuesto = aplicarEscalaMarginal(escala, neta);
  const fila = escala.find((e) => neta > e.desde && (e.hasta === null || neta <= e.hasta));
  return { gastos, deducciones, deduccionSso, neta, impuesto, marginal: fila?.tasa ?? 0 };
}

// Aporte mensual al seguro social (artículo 33): el sueldo se lleva al piso y al techo vigentes.
export function ssoMensual(sueldo: number, v: ValoresSso): { base: number; persona: number; empleador: number } {
  const base = Math.min(Math.max(sueldo, v["th.sso-wage-floor"]), v["th.sso-wage-ceiling"]);
  return { base, persona: porcentaje(base, v["th.sso-rate-employee"]), empleador: porcentaje(base, v["th.sso-rate-employer"]) };
}
