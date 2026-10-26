import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosUz: TextosUi<UiReglaDeTres> = {
  slug: "proporsiya-kalkulyatori",
  ui: () => ({
    tipo: "Proporsiya turi",
    directa: "Toʻgʻri (A oshsa, B ham oshadi)",
    inversa: "Teskari (A oshsa, B kamayadi)",
    a: "A",
    aAyuda: "Shunday oʻqing: A va B qanday nisbatda boʻlsa, C va X ham shunday nisbatda. A, B va C qiymatlarini kiriting.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Bu qiymat 0 boʻla olmaydi: hisobda unga boʻlinadi.",
    fraseDirecta: (a, b, c, x) => `Agar A = ${a} uchun B = ${b} boʻlsa, C = ${c} uchun X = ${x}. Hisob: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Agar A = ${a} boʻlganda B = ${b} boʻlsa, C = ${c} boʻlganda X = ${x}. Hisob: ${a} × ${b} ÷ ${c}.`,
  }),
};
