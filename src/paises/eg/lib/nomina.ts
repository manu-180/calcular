import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export const REQUIERE_NOMINA = {
  "eg.income-tax": "escala",
  "eg.income-tax-thresholds": "mapa",
  "eg.personal-exemption": "numero",
  "eg.si-employee": "mapa",
  "eg.si-employer": "mapa",
  "eg.si-wage-min": "numero",
  "eg.si-wage-max": "numero",
} as const;

export const REQUIERE_APORTES = {
  "eg.si-employee": "mapa",
  "eg.si-employer": "mapa",
  "eg.si-wage-min": "numero",
  "eg.si-wage-max": "numero",
} as const;

export const REQUIERE_IMPUESTO = {
  "eg.income-tax": "escala",
  "eg.income-tax-thresholds": "mapa",
  "eg.personal-exemption": "numero",
} as const;

type Mapa = Readonly<Record<string, number>>;

export interface ValoresAportes {
  "eg.si-employee": Mapa;
  "eg.si-employer": Mapa;
  "eg.si-wage-min": number;
  "eg.si-wage-max": number;
}

export interface ValoresImpuesto {
  "eg.income-tax": readonly FilaEscala[];
  "eg.income-tax-thresholds": Mapa;
  "eg.personal-exemption": number;
}

export type ValoresNomina = ValoresAportes & ValoresImpuesto;

export function sumaMapa(m: Mapa): number {
  return Object.values(m).reduce((a, b) => a + b, 0);
}

// Ley 148/2019: el aporte se calcula sobre el أجر الاشتراك, que no puede quedar por debajo del mínimo
// ni por encima del máximo del año.
export function aportes(bruto: number, asegurable: number | null, v: ValoresAportes) {
  const declarado = asegurable ?? bruto;
  const base = Math.min(Math.max(declarado, v["eg.si-wage-min"]), v["eg.si-wage-max"]);
  const tasaEmpleado = sumaMapa(v["eg.si-employee"]);
  const tasaEmpleador = sumaMapa(v["eg.si-employer"]);
  return {
    base,
    tasaEmpleado,
    tasaEmpleador,
    empleado: (base * tasaEmpleado) / 100,
    empleador: (base * tasaEmpleador) / 100,
  };
}

// Ley 91/2005 art. 8 (texto de la ley 7/2024): el ingreso neto anual se redondea a la decena inferior.
// Por encima de cada umbral (600, 700, 800, 900 mil y 1,2 millones) se pierden los primeros tramos:
// con k umbrales superados, los k + 1 primeros tramos se funden en uno a la tasa del tramo k.
export function impuestoAnual(netoAnual: number, v: ValoresImpuesto) {
  const base = Math.floor(Math.max(0, netoAnual) / 10) * 10;
  const escala = v["eg.income-tax"];
  const umbrales = Object.values(v["eg.income-tax-thresholds"]).sort((a, b) => a - b);
  const k = umbrales.filter((u) => base > u).length;
  if (k === 0 || !escala[k]) return { base, impuesto: aplicarEscalaMarginal(escala, base), tramosPerdidos: 0 };
  const fundida: FilaEscala[] = [{ desde: 0, hasta: escala[k].hasta, tasa: escala[k].tasa }, ...escala.slice(k + 1)];
  return { base, impuesto: aplicarEscalaMarginal(fundida, base), tramosPerdidos: k };
}

// Impuesto del mes sobre el sueldo: el ingreso anual es (bruto − aporte del empleado) × 12 menos la
// exención personal; el impuesto anual se reparte en 12.
export function nomina(bruto: number, asegurable: number | null, v: ValoresNomina) {
  const a = aportes(bruto, asegurable, v);
  const gravableAnual = Math.max(0, (bruto - a.empleado) * 12 - v["eg.personal-exemption"]);
  const t = impuestoAnual(gravableAnual, v);
  const impuestoMensual = t.impuesto / 12;
  return {
    ...a,
    gravableAnual: t.base,
    impuestoAnual: t.impuesto,
    impuestoMensual,
    tramosPerdidos: t.tramosPerdidos,
    neto: bruto - a.empleado - impuestoMensual,
  };
}
