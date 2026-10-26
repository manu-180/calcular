import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosDa: TextosUi<UiReglaDeTres> = {
  slug: "reguladetri",
  ui: () => ({
    tipo: "Type af forhold",
    directa: "Ligefrem (når A stiger, stiger B)",
    inversa: "Omvendt (når A stiger, falder B)",
    a: "A",
    aAyuda: "Læs det sådan: A forholder sig til B, som C forholder sig til X. Skriv A, B og C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Værdien kan ikke være 0, fordi regnestykket deler med den.",
    fraseDirecta: (a, b, c, x) => `Hvis ${a} svarer til ${b}, svarer ${c} til ${x}. Regnestykke: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Hvis ${a} giver ${b}, giver ${c} ${x}. Regnestykke: ${a} × ${b} ÷ ${c}.`,
  }),
};
