import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosEt: TextosUi<UiReglaDeTres> = {
  slug: "kolmreegel",
  ui: () => ({
    tipo: "Kolmreegli tüüp",
    directa: "Otsene võrdelisus (kui A kasvab, kasvab ka B)",
    inversa: "Pöördvõrdelisus (kui A kasvab, B kahaneb)",
    a: "A",
    aAyuda: "Loe nii: kui A vastab väärtusele B, siis C vastab väärtusele X. Sisesta A, B ja C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Väärtus ei saa olla 0, sest arvutuses jagatakse sellega.",
    fraseDirecta: (a, b, c, x) => `Kui ${a} vastab väärtusele ${b}, siis ${c} vastab väärtusele ${x}. Arvutus: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Kui väärtusega ${a} saadakse ${b}, siis väärtusega ${c} saadakse ${x}. Arvutus: ${a} × ${b} ÷ ${c}.`,
  }),
};
