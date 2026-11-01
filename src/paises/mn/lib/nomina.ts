import { aplicarEscala, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export const REQUIERE_NDSH = {
  "mn.ndsh-ajiltan": "mapa",
  "mn.emd-ajiltan": "numero",
  "mn.hhdh-sar": "numero",
  "mn.ndsh-dahin": "numero",
} as const;

export const REQUIERE_NOMINA = {
  ...REQUIERE_NDSH,
  "mn.khkhoat": "escala",
  "mn.khongololt": "escala",
} as const;

export const REQUIERE_EMPLEADOR = {
  "mn.ndsh-ajil-olgogch": "mapa",
  "mn.uomsho": "mapa",
  "mn.emd-ajil-olgogch": "numero",
} as const;

export interface ValoresNdsh {
  "mn.ndsh-ajiltan": Readonly<Record<string, number>>;
  "mn.emd-ajiltan": number;
  "mn.hhdh-sar": number;
  "mn.ndsh-dahin": number;
}

export interface ValoresNomina extends ValoresNdsh {
  "mn.khkhoat": readonly FilaEscala[];
  "mn.khongololt": readonly FilaEscala[];
}

// El tope del art. 19.4 de la ley general alcanza al seguro social. El decreto del seguro de salud habla
// de la remuneración sin tope, y su ley no se pudo leer: la salud se calcula sobre el sueldo entero.
export function ndshAjiltan(bruto: number, v: ValoresNdsh) {
  const tope = v["mn.hhdh-sar"] * v["mn.ndsh-dahin"];
  const base = Math.min(bruto, tope);
  const m = v["mn.ndsh-ajiltan"];
  const tetgever = porcentaje(base, m.tetgever);
  const tetgemj = porcentaje(base, m.tetgemj);
  const ajilguidel = porcentaje(base, m.ajilguidel);
  const emd = porcentaje(bruto, v["mn.emd-ajiltan"]);
  return { tope, base, tetgever, tetgemj, ajilguidel, ndsh: tetgever + tetgemj + ajilguidel, emd, total: tetgever + tetgemj + ajilguidel + emd };
}

// Art. 21.1 y 23.1 de la ley del ХХОАТ: el impuesto y la bonificación se determinan con el ingreso anual.
// El mes sale de pasar el sueldo a doce meses, igual que la calculadora de la autoridad tributaria.
export function khkhoatJiliin(orlogoJil: number, v: Pick<ValoresNomina, "mn.khkhoat" | "mn.khongololt">) {
  const tatvar = aplicarEscala(v["mn.khkhoat"], orlogoJil);
  const khongololt = aplicarEscala(v["mn.khongololt"], orlogoJil);
  return { tatvar, khongololt, tolokh: Math.max(0, tatvar - khongololt) };
}

export function tsever(bruto: number, v: ValoresNomina) {
  const n = ndshAjiltan(bruto, v);
  const orlogoSar = bruto - n.total;
  const k = khkhoatJiliin(orlogoSar * 12, v);
  const khkhoat = k.tolokh / 12;
  return { ...n, orlogoSar, orlogoJil: orlogoSar * 12, khkhoatJil: k.tatvar, khongololtJil: k.khongololt, khkhoat, tsever: bruto - n.total - khkhoat };
}

export function ajilOlgogch(bruto: number, tuvshin: string, v: { "mn.ndsh-ajil-olgogch": Readonly<Record<string, number>>; "mn.uomsho": Readonly<Record<string, number>>; "mn.emd-ajil-olgogch": number }) {
  const m = v["mn.ndsh-ajil-olgogch"];
  const uomsho = v["mn.uomsho"][tuvshin];
  const tetgever = porcentaje(bruto, m.tetgever);
  const tetgemj = porcentaje(bruto, m.tetgemj);
  const ajilguidel = porcentaje(bruto, m.ajilguidel);
  const osol = porcentaje(bruto, uomsho);
  const emd = porcentaje(bruto, v["mn.emd-ajil-olgogch"]);
  return { tetgever, tetgemj, ajilguidel, osol, emd, shimtgel: tetgever + tetgemj + ajilguidel + osol + emd };
}

export const TUVSHIN_OPCIONES = [
  { valor: "1", etiqueta: "Эхний түвшин (хамгийн бага эрсдэл)" },
  { valor: "2", etiqueta: "Хоёрдугаар түвшин" },
  { valor: "3", etiqueta: "Гуравдугаар түвшин (хамгийн өндөр эрсдэл)" },
] as const;
