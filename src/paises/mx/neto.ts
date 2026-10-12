import { enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";
import { DIAS_PERIODO, diasDeVacaciones, retencionIsr, salarioDiario } from "./nomina";

export const REQUIERE_NETO = {
  "mx.tarifa-isr-semanal": "escala",
  "mx.tarifa-isr-decenal": "escala",
  "mx.tarifa-isr-quincenal": "escala",
  "mx.tarifa-isr-mensual": "escala",
  "mx.uma-diaria": "numero",
  "mx.uma-mensual": "numero",
  "mx.subsidio-empleo": "numero",
  "mx.subsidio-empleo-limite": "numero",
  "mx.salario-minimo": "numero-por-region",
  "mx.cuotas-imss-obrero": "mapa",
  "mx.tope-sbc-imss": "numero",
  "mx.umbral-excedente-imss": "numero",
  "mx.dias-aguinaldo": "numero",
  "mx.prima-vacacional": "numero",
  "mx.vacaciones-primer-anio": "numero",
} as const;

export interface ValoresNeto {
  tarifas: Readonly<Record<"semanal" | "decenal" | "quincenal" | "mensual", readonly FilaEscala[]>>;
  umaDiaria: number;
  umaMensual: number;
  subsidio: number;
  limiteSubsidio: number;
  salarioMinimo: number;
  cuotasObrero: Readonly<Record<string, number>>;
  topeSbcUma: number;
  umbralExcedenteUma: number;
  diasAguinaldo: number;
  primaVacacional: number;
  vacacionesPrimerAnio: number;
}

export interface Neto {
  diario: number;
  sbc: number;
  isr: number;
  subsidio: number;
  isrRetenido: number;
  imss: number;
  neto: number;
  ganaMinimo: boolean;
  sbcTopado: boolean;
}

// Recibo de nómina de un asalariado: ISR del art. 96 con subsidio para el empleo y cuotas obreras del IMSS.
export function calcularNeto(sueldo: number, periodo: string, antiguedad: number, sbcDado: number | null, v: ValoresNeto, redondear: (n: number) => number): Neto {
  if (!(periodo in DIAS_PERIODO)) throw new ErrorEntrada({ codigo: "opcion-invalida" });
  const p = periodo as keyof typeof DIAS_PERIODO;
  const dias = DIAS_PERIODO[p];
  const diario = redondear(salarioDiario(sueldo, p));
  const ganaMinimo = diario <= v.salarioMinimo;

  const subsidioMensual = (v.umaMensual * v.subsidio) / 100;
  const subsidioPeriodo = p === "mensual" ? subsidioMensual : (subsidioMensual / DIAS_PERIODO.mensual) * dias;
  const ingresoMensual = p === "mensual" ? sueldo : (sueldo / dias) * DIAS_PERIODO.mensual;
  const isr = ganaMinimo ? { isr: 0, subsidio: 0, retener: 0 } : retencionIsr(sueldo, v.tarifas[p], subsidioPeriodo, ingresoMensual, v.limiteSubsidio, redondear);

  const vacaciones = diasDeVacaciones(Math.max(1, antiguedad), v.vacacionesPrimerAnio);
  const factor = 1 + (v.diasAguinaldo + porcentaje(vacaciones, v.primaVacacional)) / 365;
  const sbcSinTope = sbcDado ?? redondear(diario * factor);
  const sbc = Math.min(Math.max(sbcSinTope, v.salarioMinimo), v.topeSbcUma * v.umaDiaria);
  const c = v.cuotasObrero;
  const sobreSbc = enMapa(c, "prestaciones-dinero") + enMapa(c, "gastos-medicos-pensionados") + enMapa(c, "invalidez-vida") + enMapa(c, "cesantia-vejez");
  const excedente = Math.max(0, sbc - v.umbralExcedenteUma * v.umaDiaria);
  const imssDiario = porcentaje(sbc, sobreSbc) + porcentaje(excedente, enMapa(c, "excedente-eym"));
  const imss = ganaMinimo ? 0 : redondear(imssDiario * dias);
  return {
    diario,
    sbc: redondear(sbc),
    isr: isr.isr,
    subsidio: isr.subsidio,
    isrRetenido: isr.retener,
    imss,
    neto: redondear(sueldo - isr.retener - imss),
    ganaMinimo,
    sbcTopado: sbcSinTope > sbc && !ganaMinimo,
  };
}

type Valores = { readonly [K in keyof typeof REQUIERE_NETO]: unknown };

export function valoresNeto(valores: Valores & Record<string, unknown>, salarioMinimo: number): ValoresNeto {
  const n = (id: string) => valores[id] as number;
  const e = (id: string) => valores[id] as readonly FilaEscala[];
  return {
    tarifas: { semanal: e("mx.tarifa-isr-semanal"), decenal: e("mx.tarifa-isr-decenal"), quincenal: e("mx.tarifa-isr-quincenal"), mensual: e("mx.tarifa-isr-mensual") },
    umaDiaria: n("mx.uma-diaria"),
    umaMensual: n("mx.uma-mensual"),
    subsidio: n("mx.subsidio-empleo"),
    limiteSubsidio: n("mx.subsidio-empleo-limite"),
    salarioMinimo,
    cuotasObrero: valores["mx.cuotas-imss-obrero"] as Readonly<Record<string, number>>,
    topeSbcUma: n("mx.tope-sbc-imss"),
    umbralExcedenteUma: n("mx.umbral-excedente-imss"),
    diasAguinaldo: n("mx.dias-aguinaldo"),
    primaVacacional: n("mx.prima-vacacional"),
    vacacionesPrimerAnio: n("mx.vacaciones-primer-anio"),
  };
}
