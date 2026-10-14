import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export type EstadoCivil = "single" | "single-parent" | "married-one-income" | "married-two-incomes";

export interface DatosRenta {
  tasas: Readonly<Record<string, number>>;
  bandas: Readonly<Record<string, number>>;
  creditos: Readonly<Record<string, number>>;
  ingresoCreditoCompleto: number;
}

export interface Renta {
  banda: number;
  bruto: number;
  creditos: number;
  impuesto: number;
  tasaMarginal: number;
}

export function bandaEstandar(estado: EstadoCivil, ingresos: readonly number[], bandas: Readonly<Record<string, number>>): number {
  if (estado === "married-two-incomes") {
    const menor = Math.min(...ingresos);
    return bandas["married-two-incomes"] + Math.min(bandas["married-increase-max"], Math.max(0, menor));
  }
  return bandas[estado];
}

// Revenue limita el Employee Tax Credit al 20 % del ingreso PAYE cuando ese ingreso no llega al
// umbral (€10,000 en 2026): por eso no es simplemente el máximo.
export function creditoEmpleado(ingreso: number, d: DatosRenta): number {
  const maximo = d.creditos.employee;
  if (ingreso >= d.ingresoCreditoCompleto) return maximo;
  return Math.min(maximo, (Math.max(0, ingreso) * d.tasas.standard) / 100);
}

export function creditosPersonales(estado: EstadoCivil, d: DatosRenta): number {
  if (estado === "married-one-income" || estado === "married-two-incomes") return d.creditos.married;
  if (estado === "single-parent") return d.creditos.single + d.creditos["single-person-child-carer"];
  return d.creditos.single;
}

export function impuestoRenta(estado: EstadoCivil, ingresosPaye: readonly number[], d: DatosRenta): Renta {
  const total = ingresosPaye.reduce((a, b) => a + b, 0);
  const banda = bandaEstandar(estado, ingresosPaye, d.bandas);
  const bruto = (Math.min(total, banda) * d.tasas.standard) / 100 + (Math.max(0, total - banda) * d.tasas.higher) / 100;
  const creditos = creditosPersonales(estado, d) + ingresosPaye.reduce((a, i) => a + creditoEmpleado(i, d), 0);
  return {
    banda,
    bruto,
    creditos,
    impuesto: Math.max(0, bruto - creditos),
    tasaMarginal: total > banda ? d.tasas.higher : total > 0 ? d.tasas.standard : 0,
  };
}

export function creditoAlquiler(alquiler: number, tope: number, tasa: number, impuestoRestante: number): number {
  return Math.max(0, Math.min((Math.max(0, alquiler) * tasa) / 100, tope, impuestoRestante));
}

export interface DatosUsc {
  escala: readonly FilaEscala[];
  escalaReducida: readonly FilaEscala[];
  exencion: number;
  limiteReducida: number;
}

export interface Usc {
  usc: number;
  exento: boolean;
  reducida: boolean;
}

export function usc(ingreso: number, pideReducida: boolean, d: DatosUsc): Usc {
  if (ingreso <= d.exencion) return { usc: 0, exento: true, reducida: false };
  const reducida = pideReducida && ingreso <= d.limiteReducida;
  return { usc: aplicarEscalaMarginal(reducida ? d.escalaReducida : d.escala, ingreso), exento: false, reducida };
}

export interface DatosPrsi {
  tasa: number;
  desde: number;
  finCredito: number;
  creditoMaximo: number;
}

export interface PrsiSemanal {
  bruto: number;
  credito: number;
  prsi: number;
}

// SW14: el PRSI Credit es €12 menos un sexto de lo que pasa de €352.01 y se resta del PRSI, que
// se cobra sobre todo el ingreso semanal (no solo sobre lo que pasa del umbral).
export function prsiSemanal(semanal: number, d: DatosPrsi, redondear: (x: number) => number): PrsiSemanal {
  if (semanal <= d.desde) return { bruto: 0, credito: 0, prsi: 0 };
  const bruto = redondear((semanal * d.tasa) / 100);
  const inicioCredito = d.desde + 0.01;
  const credito = semanal <= d.finCredito ? Math.max(0, redondear(d.creditoMaximo - redondear(Math.max(0, semanal - inicioCredito) / 6))) : 0;
  return { bruto, credito, prsi: Math.max(0, redondear(bruto - credito)) };
}

export function euros(n: number): string {
  return `€${n.toLocaleString("en-IE", { minimumFractionDigits: n % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}`;
}
