import type { ParametrosNssf, ParametrosPaye } from "./nomina";
import type { FilaEscala } from "@/motor/tipos";

export const REQUIERE_NOMINA = {
  "ke.paye-bands": "escala",
  "ke.personal-relief": "numero",
  "ke.insurance-relief-rate": "numero",
  "ke.insurance-relief-cap": "numero",
  "ke.pension-deduction-cap": "numero",
  "ke.mortgage-interest-cap": "numero",
  "ke.medical-fund-cap": "numero",
  "ke.housing-levy-rate": "numero",
  "ke.shif-rate": "numero",
  "ke.shif-minimum": "numero",
  "ke.nssf-rate": "numero",
  "ke.nssf-lel": "numero",
  "ke.nssf-uel": "numero",
} as const;

export interface ValoresNomina {
  "ke.paye-bands": readonly FilaEscala[];
  "ke.personal-relief": number;
  "ke.insurance-relief-rate": number;
  "ke.insurance-relief-cap": number;
  "ke.pension-deduction-cap": number;
  "ke.mortgage-interest-cap": number;
  "ke.medical-fund-cap": number;
  "ke.housing-levy-rate": number;
  "ke.shif-rate": number;
  "ke.shif-minimum": number;
  "ke.nssf-rate": number;
  "ke.nssf-lel": number;
  "ke.nssf-uel": number;
}

export function parametrosNssf(v: Pick<ValoresNomina, "ke.nssf-rate" | "ke.nssf-lel" | "ke.nssf-uel">): ParametrosNssf {
  return { tasa: v["ke.nssf-rate"], lel: v["ke.nssf-lel"], uel: v["ke.nssf-uel"] };
}

export function parametrosPaye(v: ValoresNomina): ParametrosPaye {
  return {
    bandas: v["ke.paye-bands"],
    alivioPersonal: v["ke.personal-relief"],
    tasaSeguro: v["ke.insurance-relief-rate"],
    topeSeguroAnual: v["ke.insurance-relief-cap"],
    topePension: v["ke.pension-deduction-cap"],
    topeFondoMedico: v["ke.medical-fund-cap"],
    topeHipoteca: v["ke.mortgage-interest-cap"],
  };
}
