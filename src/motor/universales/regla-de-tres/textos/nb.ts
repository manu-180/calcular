import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosNb: TextosUi<UiReglaDeTres> = {
  slug: "reguladetri",
  ui: () => ({
    tipo: "Type forhold",
    directa: "Proporsjonalt (når A øker, øker B)",
    inversa: "Omvendt proporsjonalt (når A øker, går B ned)",
    a: "A",
    aAyuda: "Les det slik: A forholder seg til B som C til X. Fyll inn A, B og C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Verdien kan ikke være 0, fordi regnestykket deler på den.",
    fraseDirecta: (a, b, c, x) => `Hvis ${a} tilsvarer ${b}, tilsvarer ${c} ${x}. Utregning: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Hvis ${a} gir ${b}, gir ${c} ${x}. Utregning: ${a} × ${b} ÷ ${c}.`,
  }),
};
