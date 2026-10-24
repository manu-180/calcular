import { aplicarEscalaMarginal, enMapa, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

type Mapa = Readonly<Record<string, number>>;

export const REQUIERE_IMPUESTO = {
  "jo.income-tax": "escala",
  "jo.personal-exemption": "numero",
  "jo.dependents-exemption": "numero",
  "jo.expense-exemption": "mapa",
  "jo.exemption-cap": "numero",
  "jo.national-contribution": "numero",
  "jo.national-contribution-threshold": "numero",
} as const;

export interface TablasImpuesto {
  readonly "jo.income-tax": readonly FilaEscala[];
  readonly "jo.personal-exemption": number;
  readonly "jo.dependents-exemption": number;
  readonly "jo.expense-exemption": Mapa;
  readonly "jo.exemption-cap": number;
  readonly "jo.national-contribution": number;
  readonly "jo.national-contribution-threshold": number;
}

export interface Familia {
  dependientes: boolean;
  conyuge: boolean;
  hijos: number;
  facturas: number;
}

export interface ImpuestoAnual {
  exenciones: number;
  exencionGastos: number;
  topeGastos: number;
  imponible: number;
  impuesto: number;
  contribucion: number;
  total: number;
  tasaMarginal: number;
}

// Ley 34/2014 reformada por la 38/2018. Art. 9: exención personal y por dependientes (una sola, sin
// importar cuántos), más hasta 1.000 por facturas de salud, educación, alquiler o intereses de vivienda
// para el contribuyente, el cónyuge y cada hijo (hijos hasta 3.000), con el tope total de 23.000.
// Art. 11 (هـ): el ingreso imponible y el impuesto se bajan al dinar entero. La contribución nacional
// (art. 11, و) es 1 % de lo imponible que pase de 200.000.
export function impuestoAnual(ingreso: number, fam: Familia, t: TablasImpuesto): ImpuestoAnual {
  const gastos = t["jo.expense-exemption"];
  const conyuge = fam.dependientes && fam.conyuge;
  const hijos = fam.dependientes ? Math.max(0, Math.floor(fam.hijos)) : 0;
  const topeGastos =
    enMapa(gastos, "taxpayer") + (conyuge ? enMapa(gastos, "spouse") : 0) + Math.min(hijos * enMapa(gastos, "child"), enMapa(gastos, "children-max"));
  const exencionGastos = Math.min(Math.max(0, fam.facturas), topeGastos);
  const exenciones = Math.min(
    t["jo.personal-exemption"] + (fam.dependientes ? t["jo.dependents-exemption"] : 0) + exencionGastos,
    t["jo.exemption-cap"],
  );
  const imponible = Math.floor(Math.max(0, ingreso - exenciones));
  const impuesto = Math.floor(aplicarEscalaMarginal(t["jo.income-tax"], imponible));
  const umbral = t["jo.national-contribution-threshold"];
  const contribucion = Math.floor(porcentaje(Math.max(0, imponible - umbral), t["jo.national-contribution"]));
  const fila = [...t["jo.income-tax"]].reverse().find((f) => imponible > f.desde);
  return {
    exenciones,
    exencionGastos,
    topeGastos,
    imponible,
    impuesto,
    contribucion,
    total: impuesto + contribucion,
    tasaMarginal: imponible > 0 && fila ? fila.tasa : 0,
  };
}
