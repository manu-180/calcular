// Proclamación 1156/2019, artículos 39 a 41. Para un sueldo mensual se toma el salario diario como
// el mensual dividido por 30, de modo que "30 veces el salario diario" es un mes de sueldo.
export const DIAS_DEL_MES = 30;

export const MOTIVOS = ["closure", "redundancy", "unlawful", "employer-fault", "harassment", "disability", "resignation"] as const;
export type Motivo = (typeof MOTIVOS)[number];

export const OPCIONES_MOTIVO = [
  { valor: "closure", etiqueta: "The business closed down for good" },
  { valor: "redundancy", etiqueta: "Reduction of workforce (redundancy)" },
  { valor: "unlawful", etiqueta: "Dismissed by the employer in breach of the law" },
  { valor: "employer-fault", etiqueta: "I left without notice because of the employer's conduct (Article 32(1))" },
  { valor: "harassment", etiqueta: "I left because of sexual harassment or violence (Article 32(1)(b))" },
  { valor: "disability", etiqueta: "Ended because of disability certified by a medical board" },
  { valor: "resignation", etiqueta: "I resigned, fell ill or died after at least five years" },
] as const;

export interface ParametrosIndemnizacion {
  diasPrimerAnio: number;
  fraccionAdicional: number;
  topeMeses: number;
  extraCierre: number;
  compensacion: number;
  compensacionAcoso: number;
  aniosRenuncia: number;
}

export interface Indemnizacion {
  diasIndemnizacion: number;
  indemnizacion: number;
  topada: boolean;
  diasCompensacion: number;
  compensacion: number;
  diasExtra: number;
  extra: number;
  total: number;
  sinDerecho: boolean;
}

export function indemnizacion(sueldo: number, anios: number, meses: number, motivo: Motivo, p: ParametrosIndemnizacion): Indemnizacion {
  const diario = sueldo / DIAS_DEL_MES;
  const servicio = anios + meses / 12;
  const sinDerecho = motivo === "resignation" && servicio < p.aniosRenuncia;
  let dias = 0;
  if (!sinDerecho) {
    dias = servicio < 1 ? p.diasPrimerAnio * servicio : p.diasPrimerAnio + p.diasPrimerAnio * p.fraccionAdicional * (Math.floor(servicio) - 1);
  }
  const tope = p.topeMeses * DIAS_DEL_MES;
  const topada = dias > tope;
  const diasIndemnizacion = Math.min(dias, tope);
  const diasCompensacion = motivo === "employer-fault" ? p.compensacion : motivo === "harassment" ? p.compensacionAcoso : 0;
  const diasExtra = motivo === "closure" || motivo === "redundancy" ? p.extraCierre : 0;
  const indem = diario * diasIndemnizacion;
  const comp = diario * diasCompensacion;
  const extra = diario * diasExtra;
  return {
    diasIndemnizacion,
    indemnizacion: indem,
    topada,
    diasCompensacion,
    compensacion: comp,
    diasExtra,
    extra,
    total: indem + comp + extra,
    sinDerecho,
  };
}

export const REQUIERE_INDEMNIZACION = {
  "et.severance-first-year": "numero",
  "et.severance-extra-share": "numero",
  "et.severance-cap": "numero",
  "et.severance-closure-extra": "numero",
  "et.compensation-no-notice": "numero",
  "et.compensation-harassment": "numero",
  "et.severance-min-years-resign": "numero",
} as const;

export function parametrosIndemnizacion(v: {
  "et.severance-first-year": number;
  "et.severance-extra-share": number;
  "et.severance-cap": number;
  "et.severance-closure-extra": number;
  "et.compensation-no-notice": number;
  "et.compensation-harassment": number;
  "et.severance-min-years-resign": number;
}): ParametrosIndemnizacion {
  return {
    diasPrimerAnio: v["et.severance-first-year"],
    fraccionAdicional: v["et.severance-extra-share"],
    topeMeses: v["et.severance-cap"],
    extraCierre: v["et.severance-closure-extra"],
    compensacion: v["et.compensation-no-notice"],
    compensacionAcoso: v["et.compensation-harassment"],
    aniosRenuncia: v["et.severance-min-years-resign"],
  };
}
