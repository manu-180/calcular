import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosLv: TextosUi<UiReglaDeTres> = {
  slug: "proporcijas-kalkulators",
  ui: () => ({
    tipo: "Proporcionalitātes veids",
    directa: "Tieša (ja A pieaug, pieaug arī B)",
    inversa: "Apgriezta (ja A pieaug, B samazinās)",
    a: "A",
    aAyuda: "Lasiet tā: A attiecība pret B ir tāda pati kā C pret X. Ievadiet A, B un C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Šī vērtība nevar būt 0: ar to tiek dalīts.",
    fraseDirecta: (a, b, c, x) => `Ja ${a} atbilst ${b}, tad ${c} atbilst ${x}. Aprēķins: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Ja ${a} dod ${b}, tad ${c} dod ${x}. Aprēķins: ${a} × ${b} ÷ ${c}.`,
  }),
};
