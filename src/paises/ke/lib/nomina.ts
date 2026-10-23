import { aplicarEscalaMarginal, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export interface ParametrosNssf {
  tasa: number;
  lel: number;
  uel: number;
}

export interface Nssf {
  tier1: number;
  tier2: number;
  total: number;
}

// Section 20 y Third Schedule: lo que se aporta sale de los "pensionable earnings", el menor entre
// el sueldo y el UEL. Tier I cubre hasta el LEL; Tier II, lo que queda entre el LEL y el UEL.
export function nssf(bruto: number, p: ParametrosNssf): Nssf {
  const base = Math.min(Math.max(0, bruto), p.uel);
  const tier1 = porcentaje(Math.min(base, p.lel), p.tasa);
  const tier2 = porcentaje(Math.max(0, base - p.lel), p.tasa);
  return { tier1, tier2, total: tier1 + tier2 };
}

export function shif(bruto: number, tasa: number, minimo: number): number {
  return Math.max(porcentaje(Math.max(0, bruto), tasa), minimo);
}

export interface EntradaPaye {
  bruto: number;
  nssf: number;
  shif: number;
  housingLevy: number;
  otraPension: number;
  fondoMedico: number;
  interesHipoteca: number;
  primasSeguro: number;
}

export interface ParametrosPaye {
  bandas: readonly FilaEscala[];
  alivioPersonal: number;
  tasaSeguro: number;
  topeSeguroAnual: number;
  topePension: number;
  topeFondoMedico: number;
  topeHipoteca: number;
}

export interface Paye {
  pension: number;
  deducciones: number;
  gravable: number;
  impuestoBruto: number;
  alivioSeguro: number;
  alivios: number;
  paye: number;
  marginal: number;
}

// Desde la Tax Laws (Amendment) Act 2024, SHIF y Housing Levy se restan del ingreso gravable en
// vez de dar un alivio del 15 %. El tope de 30.000 al mes de pensión incluye el NSSF del empleado.
export function paye(e: EntradaPaye, p: ParametrosPaye): Paye {
  const pension = Math.min(Math.max(0, e.nssf) + Math.max(0, e.otraPension), p.topePension);
  const deducciones =
    pension +
    Math.max(0, e.shif) +
    Math.max(0, e.housingLevy) +
    Math.min(Math.max(0, e.fondoMedico), p.topeFondoMedico) +
    Math.min(Math.max(0, e.interesHipoteca), p.topeHipoteca);
  const gravable = Math.max(0, e.bruto - deducciones);
  const impuestoBruto = aplicarEscalaMarginal(p.bandas, gravable);
  const alivioSeguro = Math.min(porcentaje(Math.max(0, e.primasSeguro), p.tasaSeguro), p.topeSeguroAnual / 12);
  const alivios = p.alivioPersonal + alivioSeguro;
  return {
    pension,
    deducciones,
    gravable,
    impuestoBruto,
    alivioSeguro,
    alivios,
    paye: Math.max(0, impuestoBruto - alivios),
    marginal: tasaMarginal(p.bandas, gravable),
  };
}

export function tasaMarginal(bandas: readonly FilaEscala[], base: number): number {
  let tasa = 0;
  for (const f of bandas) if (base > f.desde) tasa = f.tasa;
  return tasa;
}

export function kes(n: number): string {
  return `KSh ${n.toLocaleString("en-KE", { minimumFractionDigits: n % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}`;
}
