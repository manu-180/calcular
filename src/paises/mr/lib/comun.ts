import { aplicarEscalaMarginal, porcentaje } from "@/motor/calculo";
import type { Campo, FilaEscala } from "@/motor/tipos";

// Lo que comparten sueldo neto, bruto desde neto, ITS, cotizaciones y costo empleador.
export const REQUIERE_SALARIO = {
  "mr.its-bareme": "escala",
  "mr.its-abattement": "numero",
  "mr.cnss-plafond": "numero",
  "mr.cnss-salarie": "numero",
  "mr.cnam-salarie": "numero",
} as const;

export interface ValoresSalario {
  "mr.its-bareme": readonly FilaEscala[];
  "mr.its-abattement": number;
  "mr.cnss-plafond": number;
  "mr.cnss-salarie": number;
  "mr.cnam-salarie": number;
}

// Art. 114, 3) del CGI: la base imponible se redondea a la decena de ouguiya inferior.
export function baseItsRedondeada(base: number): number {
  return base <= 0 ? 0 : Math.floor(base / 10 + 1e-9) * 10;
}

export function its(v: ValoresSalario, base: number): number {
  return aplicarEscalaMarginal(v["mr.its-bareme"], baseItsRedondeada(base));
}

export interface Retenciones {
  baseCnss: number;
  cnss: number;
  cnam: number;
  imponible: number;
  its: number;
  neto: number;
}

// Bruto mensual imponible -> retenciones del asalariado. La CNSS va sobre el bruto con el tope del
// decreto 2021-186; la CNAM sobre todo el bruto (decreto 2012-261). Las dos se restan antes del ITS
// (art. 113, 2) a) del CGI: retenciones obligatorias de pensión y cotizaciones sociales), y después
// el abattement mensual del art. 110.
export function retenciones(v: ValoresSalario, bruto: number, conCnam: boolean, exentas = 0): Retenciones {
  const baseCnss = Math.min(bruto, v["mr.cnss-plafond"]);
  const cnss = porcentaje(baseCnss, v["mr.cnss-salarie"]);
  const cnam = conCnam ? porcentaje(bruto, v["mr.cnam-salarie"]) : 0;
  const imponible = Math.max(0, bruto - exentas - cnss - cnam - v["mr.its-abattement"]);
  const impuesto = its(v, imponible);
  return { baseCnss, cnss, cnam, imponible: baseItsRedondeada(imponible), its: impuesto, neto: bruto - cnss - cnam - impuesto };
}

export const CAMPO_CNAM = {
  id: "cnam",
  tipo: "si-no",
  etiqueta: "مشترك في التأمين الصحي لدى CNAM",
  ayuda: "يشمل عمال الشركات الخاصة بعقد غير محدد المدة.",
  porDefecto: true,
} as const satisfies Campo;
