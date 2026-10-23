import { aplicarEscala, ErrorEntrada, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

const FORMATO_PESO = new Intl.NumberFormat("en-PH", { maximumFractionDigits: 2, minimumFractionDigits: 0 });

export function peso(n: number): string {
  return `₱${FORMATO_PESO.format(n)}`;
}

export function noNegativo(valor: number, campo: string, texto: string): void {
  if (valor < 0) throw new ErrorEntrada(texto, campo);
}

export function impuestoAnual(escala: readonly FilaEscala[], gravable: number): number {
  return aplicarEscala(escala, Math.max(0, gravable));
}

export function tasaMarginal(escala: readonly FilaEscala[], gravable: number): number {
  if (gravable <= 0) return 0;
  let tasa = escala[0].tasa;
  for (const f of escala) if (gravable > f.desde) tasa = f.tasa;
  return tasa;
}

export interface ValoresSss {
  "ph.sss-employee-rate": number;
  "ph.sss-employer-rate": number;
  "ph.sss-msc-minimum": number;
  "ph.sss-msc-maximum": number;
  "ph.sss-regular-msc-maximum": number;
  "ph.sss-ec": Readonly<Record<string, number>>;
}

export const REQUIERE_SSS = {
  "ph.sss-employee-rate": "numero",
  "ph.sss-employer-rate": "numero",
  "ph.sss-msc-minimum": "numero",
  "ph.sss-msc-maximum": "numero",
  "ph.sss-regular-msc-maximum": "numero",
  "ph.sss-ec": "mapa",
} as const;

// El cuadro de la Circular 2024-006 sube el salary credit de a 500 y cada fila abarca 250 por debajo
// y 249,99 por encima de su credit (5.250 a 5.749,99 es 5.500). EC pasa de 10 a 30 desde el credit
// de 15.000, que es la fila que empieza en 14.750.
export function sss(sueldo: number, v: ValoresSss) {
  const paso = 500;
  const credito = Math.min(v["ph.sss-msc-maximum"], Math.max(v["ph.sss-msc-minimum"], Math.floor((sueldo + paso / 2) / paso) * paso));
  const regular = Math.min(credito, v["ph.sss-regular-msc-maximum"]);
  const mpf = credito - regular;
  const ec = credito >= 15000 ? v["ph.sss-ec"]["from-15000"] : v["ph.sss-ec"]["below-15000"];
  const empleado = porcentaje(credito, v["ph.sss-employee-rate"]);
  const empleador = porcentaje(credito, v["ph.sss-employer-rate"]);
  return {
    credito,
    regular,
    mpf,
    ec,
    empleado,
    empleadoMpf: porcentaje(mpf, v["ph.sss-employee-rate"]),
    empleador,
    empleadorMpf: porcentaje(mpf, v["ph.sss-employer-rate"]),
    total: empleado + empleador + ec,
  };
}

export interface ValoresPhilhealth {
  "ph.philhealth-rate": number;
  "ph.philhealth-floor": number;
  "ph.philhealth-ceiling": number;
  "ph.philhealth-employee-share": number;
}

export const REQUIERE_PHILHEALTH = {
  "ph.philhealth-rate": "numero",
  "ph.philhealth-floor": "numero",
  "ph.philhealth-ceiling": "numero",
  "ph.philhealth-employee-share": "numero",
} as const;

export function philhealth(sueldo: number, v: ValoresPhilhealth, redondear: (n: number) => number) {
  const base = Math.min(v["ph.philhealth-ceiling"], Math.max(v["ph.philhealth-floor"], sueldo));
  const prima = redondear(porcentaje(base, v["ph.philhealth-rate"]));
  const empleado = redondear(porcentaje(prima, v["ph.philhealth-employee-share"]));
  return { base, prima, empleado, empleador: redondear(prima - empleado) };
}

export interface ValoresPagibig {
  "ph.pagibig-max-fund-salary": number;
  "ph.pagibig-low-salary-limit": number;
  "ph.pagibig-rates": Readonly<Record<string, number>>;
}

export const REQUIERE_PAGIBIG = {
  "ph.pagibig-max-fund-salary": "numero",
  "ph.pagibig-low-salary-limit": "numero",
  "ph.pagibig-rates": "mapa",
} as const;

export function pagibig(sueldo: number, v: ValoresPagibig, redondear: (n: number) => number) {
  const base = Math.min(sueldo, v["ph.pagibig-max-fund-salary"]);
  const tasaEmpleado = sueldo <= v["ph.pagibig-low-salary-limit"] ? v["ph.pagibig-rates"]["employee-low"] : v["ph.pagibig-rates"].employee;
  const tasaEmpleador = v["ph.pagibig-rates"].employer;
  return {
    base,
    tasaEmpleado,
    tasaEmpleador,
    empleado: redondear(porcentaje(base, tasaEmpleado)),
    empleador: redondear(porcentaje(base, tasaEmpleador)),
  };
}

export const OPCIONES_PERIODO = [
  { valor: "monthly", etiqueta: "Monthly" },
  { valor: "semi-monthly", etiqueta: "Semi-monthly (twice a month)" },
  { valor: "weekly", etiqueta: "Weekly" },
  { valor: "daily", etiqueta: "Daily" },
] as const;

export type Periodo = (typeof OPCIONES_PERIODO)[number]["valor"];

// Las tablas de retención de la BIR salen de dividir la escala anual por la cantidad de períodos
// del año (20.833 al mes es 250.000 / 12, 685 al día es 250.000 / 365).
export const PERIODOS_POR_ANIO: Record<Periodo, number> = { monthly: 12, "semi-monthly": 24, weekly: 52, daily: 365 };
