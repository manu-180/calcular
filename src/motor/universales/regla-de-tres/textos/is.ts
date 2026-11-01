import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosIs: TextosUi<UiReglaDeTres> = {
  slug: "thrilida",
  ui: () => ({
    tipo: "Tegund hlutfalls",
    directa: "Beint (þegar A eykst, eykst B)",
    inversa: "Öfugt (þegar A eykst, minnkar B)",
    a: "A",
    aAyuda: "Lestu þetta svona: A er á móti B eins og C á móti X. Sláðu inn A, B og C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Gildið má ekki vera 0, því deilt er með því.",
    fraseDirecta: (a, b, c, x) => `Ef ${a} samsvarar ${b} samsvarar ${c} gildinu ${x}. Útreikningur: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Ef ${a} gefur ${b} gefur ${c} gildið ${x}. Útreikningur: ${a} × ${b} ÷ ${c}.`,
  }),
};
