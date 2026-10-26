import type { FilaEscala } from "@/motor/tipos";
import type { LimitesCreditoTrabajo, ValoresRenta } from "./impuestos";
import type { TasasSeguros } from "./seguros";

export const REQ_RENTA = {
  "kr.earned-income-deduction": "escala",
  "kr.earned-income-deduction-cap": "numero",
  "kr.basic-deduction": "numero",
  "kr.income-tax-brackets": "escala",
  "kr.earned-income-tax-credit": "escala",
  "kr.earned-income-tax-credit-limits": "mapa",
  "kr.standard-tax-credit": "numero",
  "kr.child-tax-credit": "mapa",
  "kr.local-income-tax-rate": "numero",
} as const;

export const REQ_SEGUROS = {
  "kr.national-pension-rate": "numero",
  "kr.pension-income-limits": "mapa",
  "kr.health-insurance-rate": "numero",
  "kr.long-term-care-rate": "numero",
  "kr.employment-insurance-rate": "numero",
} as const;

type Mapa = Readonly<Record<string, number>>;

export function valoresRenta(v: {
  "kr.earned-income-deduction": readonly FilaEscala[];
  "kr.earned-income-deduction-cap": number;
  "kr.basic-deduction": number;
  "kr.income-tax-brackets": readonly FilaEscala[];
  "kr.earned-income-tax-credit": readonly FilaEscala[];
  "kr.earned-income-tax-credit-limits": Mapa;
  "kr.standard-tax-credit": number;
  "kr.child-tax-credit": Mapa;
  "kr.local-income-tax-rate": number;
}): ValoresRenta {
  const h = v["kr.child-tax-credit"];
  return {
    escalaTrabajo: v["kr.earned-income-deduction"],
    topeTrabajo: v["kr.earned-income-deduction-cap"],
    basico: v["kr.basic-deduction"],
    brackets: v["kr.income-tax-brackets"],
    escalaCredito: v["kr.earned-income-tax-credit"],
    limitesCredito: v["kr.earned-income-tax-credit-limits"] as unknown as LimitesCreditoTrabajo,
    estandar: v["kr.standard-tax-credit"],
    hijos: { uno: h.uno, dos: h.dos, adicional: h.adicional },
    local: v["kr.local-income-tax-rate"],
  };
}

export function tasasSeguros(v: {
  "kr.national-pension-rate": number;
  "kr.pension-income-limits": Mapa;
  "kr.health-insurance-rate": number;
  "kr.long-term-care-rate": number;
  "kr.employment-insurance-rate": number;
}): TasasSeguros {
  const l = v["kr.pension-income-limits"];
  return {
    pension: v["kr.national-pension-rate"],
    limitesPension: { min: l.min, max: l.max },
    salud: v["kr.health-insurance-rate"],
    cuidado: v["kr.long-term-care-rate"],
    empleo: v["kr.employment-insurance-rate"],
  };
}
