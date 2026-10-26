import { enMapa, ErrorEntrada } from "@/motor/calculo";

type Mapa = Readonly<Record<string, number>>;

export const OPCIONES_AMOIVIS = [
  { valor: "misthos", etiqueta: "Μηνιαίος μισθός" },
  { valor: "imeromisthio", etiqueta: "Ημερομίσθιο" },
] as const;

export type TyposAmoivis = (typeof OPCIONES_AMOIVIS)[number]["valor"];

export function amoivi(typos: TyposAmoivis, misthos: number | null, imeromisthio: number | null): number {
  const poso = typos === "misthos" ? misthos : imeromisthio;
  const campo = typos === "misthos" ? "misthos" : "imeromisthio";
  if (poso === null || poso <= 0) throw new ErrorEntrada(typos === "misthos" ? "Εισάγετε μηνιαίο μισθό μεγαλύτερο από το μηδέν." : "Εισάγετε ημερομίσθιο μεγαλύτερο από το μηδέν.", campo);
  return poso;
}

export interface Doro {
  doro: number;
  plires: number;
  analogia: number;
  prosafxisi: number;
}

// ΚΥΑ 19040/1981: el δώρο entero es un sueldo (Navidad) o medio (Pascua), o 25 y 15 jornales; con
// menos tiempo, 2/25 del entero por cada 19 días (Navidad) o 1/15 por cada 8 días (Pascua). La base
// incluye la parte del επίδομα αδείας (art. 3 de la ΚΥΑ): medio sueldo al año, o sea 1/24 por mes.
export function doro(
  d: Mapa,
  epidomaAdeias: Mapa,
  typos: TyposAmoivis,
  poso: number,
  imeres: number,
  meAnalogiaAdeias: boolean,
  redondear: (n: number) => number,
): Doro {
  const periodos = enMapa(d, "imeres-periodou");
  if (!Number.isInteger(imeres) || imeres < 0 || imeres > periodos) throw new ErrorEntrada(`Οι ημέρες απασχόλησης είναι από 0 έως ${periodos}.`, "imeres");
  const vasi = meAnalogiaAdeias ? poso * (1 + enMapa(epidomaAdeias, "mines") / 12) : poso;
  const plires = redondear(vasi * (typos === "misthos" ? enMapa(d, "mines") : enMapa(d, "imeromisthia")));
  const analogia = imeres >= periodos ? 1 : Math.min(1, ((imeres / enMapa(d, "imeres-analogias")) * enMapa(d, "meridia-analogias")) / enMapa(d, "meridia-synolou"));
  const doroPoso = redondear(plires * analogia);
  const choris = redondear(poso * (typos === "misthos" ? enMapa(d, "mines") : enMapa(d, "imeromisthia")) * analogia);
  return { doro: doroPoso, plires, analogia: analogia * 100, prosafxisi: redondear(doroPoso - choris) };
}
