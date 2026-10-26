import { enMapa } from "@/motor/calculo";
import type { ParametriSalariu } from "./fiscal";

export const REQ_SALARIU = {
  "ro.salariu-minim": "numero",
  "ro.cas": "numero",
  "ro.cass": "numero",
  "ro.impozit-venit": "numero",
  "ro.deducere-baza": "mapa",
  "ro.deducere-plafon": "numero",
  "ro.deducere-pas": "numero",
  "ro.deducere-scadere": "numero",
  "ro.deducere-tineri": "numero",
  "ro.deducere-copil": "numero",
  "ro.facilitate-salariu-minim": "mapa",
} as const;

type ValoriSalariu = {
  readonly "ro.salariu-minim": number;
  readonly "ro.cas": number;
  readonly "ro.cass": number;
  readonly "ro.impozit-venit": number;
  readonly "ro.deducere-baza": Readonly<Record<string, number>>;
  readonly "ro.deducere-plafon": number;
  readonly "ro.deducere-pas": number;
  readonly "ro.deducere-scadere": number;
  readonly "ro.deducere-tineri": number;
  readonly "ro.deducere-copil": number;
  readonly "ro.facilitate-salariu-minim": Readonly<Record<string, number>>;
};

export function parametriSalariu(v: ValoriSalariu): ParametriSalariu {
  const f = v["ro.facilitate-salariu-minim"];
  return {
    salariuMinim: v["ro.salariu-minim"],
    cas: v["ro.cas"],
    cass: v["ro.cass"],
    impozit: v["ro.impozit-venit"],
    deducereBaza: v["ro.deducere-baza"],
    deducerePlafon: v["ro.deducere-plafon"],
    deducerePas: v["ro.deducere-pas"],
    deducereScadere: v["ro.deducere-scadere"],
    deducereTineri: v["ro.deducere-tineri"],
    deducereCopil: v["ro.deducere-copil"],
    facilitate: { suma: enMapa(f, "suma"), plafon: enMapa(f, "plafon") },
  };
}

export const OPTIUNI_PERSOANE = [
  { valor: "0", etiqueta: "Niciuna" },
  { valor: "1", etiqueta: "Una" },
  { valor: "2", etiqueta: "Două" },
  { valor: "3", etiqueta: "Trei" },
  { valor: "4", etiqueta: "Patru sau mai multe" },
] as const;
