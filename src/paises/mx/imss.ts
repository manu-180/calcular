import { enMapa, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";
import { diasDeVacaciones } from "./nomina";

export interface ValoresImss {
  uma: number;
  salarioMinimo: number;
  topeSbcUma: number;
  umbralExcedenteUma: number;
  obrero: Readonly<Record<string, number>>;
  patron: Readonly<Record<string, number>>;
  cesantiaVejez: readonly FilaEscala[];
  cesantiaVejezMinimo: number;
  aportacionVivienda: number;
}

export interface CuotasDiarias {
  sbc: number;
  ganaMinimo: boolean;
  obrero: number;
  imssPatron: number;
  rcvPatron: number;
  tasaCesantia: number;
  infonavit: number;
}

// Factor de integración con las prestaciones mínimas de ley (LSS art. 27): aguinaldo y prima
// vacacional repartidos en el año.
export function factorIntegracion(anios: number, diasAguinaldo: number, primaVacacional: number, vacacionesPrimerAnio: number): number {
  const vacaciones = diasDeVacaciones(Math.max(1, anios), vacacionesPrimerAnio);
  return 1 + (diasAguinaldo + porcentaje(vacaciones, primaVacacional)) / 365;
}

export function topeSbc(sbc: number, v: Pick<ValoresImss, "uma" | "salarioMinimo" | "topeSbcUma">): number {
  return Math.min(Math.max(sbc, v.salarioMinimo), v.topeSbcUma * v.uma);
}

// La tabla de cesantía y vejez está en UMA con huecos de un centésimo entre renglones (1.50 y 1.51):
// se toma el último renglón cuyo límite inferior no pasa del salario, igual que la tarifa del ISR.
export function tasaCesantiaPatron(sbc: number, v: Pick<ValoresImss, "uma" | "salarioMinimo" | "cesantiaVejez" | "cesantiaVejezMinimo">): number {
  if (sbc <= v.salarioMinimo) return v.cesantiaVejezMinimo;
  const enUma = sbc / v.uma;
  let tasa = v.cesantiaVejez[0].tasa;
  for (const f of v.cesantiaVejez) if (enUma >= f.desde) tasa = f.tasa;
  return tasa;
}

// Cuotas por día cotizado. primaRiesgo en %. Quien gana el salario mínimo no paga su parte: la cubre
// la empresa (LSS art. 36), por eso se suma a la cuota patronal.
export function cuotasDiarias(sbcSinTope: number, primaRiesgo: number, v: ValoresImss): CuotasDiarias {
  const sbc = topeSbc(sbcSinTope, v);
  const ganaMinimo = sbc <= v.salarioMinimo;
  const excedente = Math.max(0, sbc - v.umbralExcedenteUma * v.uma);
  const o = v.obrero;
  const obreroCalculado =
    porcentaje(excedente, enMapa(o, "excedente-eym")) +
    porcentaje(sbc, enMapa(o, "prestaciones-dinero") + enMapa(o, "gastos-medicos-pensionados") + enMapa(o, "invalidez-vida") + enMapa(o, "cesantia-vejez"));
  const p = v.patron;
  const imssPatron =
    porcentaje(v.uma, enMapa(p, "cuota-fija")) +
    porcentaje(excedente, enMapa(p, "excedente-eym")) +
    porcentaje(sbc, enMapa(p, "prestaciones-dinero") + enMapa(p, "gastos-medicos-pensionados") + enMapa(p, "invalidez-vida") + enMapa(p, "guarderias") + primaRiesgo) +
    (ganaMinimo ? obreroCalculado : 0);
  const tasaCesantia = tasaCesantiaPatron(sbc, v);
  const rcvPatron = porcentaje(sbc, enMapa(p, "retiro") + tasaCesantia);
  return {
    sbc,
    ganaMinimo,
    obrero: ganaMinimo ? 0 : obreroCalculado,
    imssPatron,
    rcvPatron,
    tasaCesantia,
    infonavit: porcentaje(sbc, v.aportacionVivienda),
  };
}

export const REQUIERE_IMSS = {
  "mx.uma-diaria": "numero",
  "mx.salario-minimo": "numero-por-region",
  "mx.tope-sbc-imss": "numero",
  "mx.umbral-excedente-imss": "numero",
  "mx.cuotas-imss-obrero": "mapa",
  "mx.cuotas-imss-patron": "mapa",
  "mx.cesantia-vejez-patron": "escala",
  "mx.cesantia-vejez-patron-minimo": "numero",
  "mx.aportacion-vivienda": "numero",
  "mx.prima-riesgo-trabajo": "mapa",
  "mx.prima-riesgo-minima": "numero",
  "mx.prima-riesgo-maxima": "numero",
  "mx.dias-aguinaldo": "numero",
  "mx.prima-vacacional": "numero",
  "mx.vacaciones-primer-anio": "numero",
} as const;
