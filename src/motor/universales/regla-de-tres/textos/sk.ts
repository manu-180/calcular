import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosSk: TextosUi<UiReglaDeTres> = {
  slug: "trojclenka",
  ui: () => ({
    tipo: "Druh úmernosti",
    directa: "Priama (keď A rastie, rastie aj B)",
    inversa: "Nepriama (keď A rastie, B klesá)",
    a: "A",
    aAyuda: "Čítajte to takto: A je k B ako C k X. Zadajte A, B a C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Táto hodnota nesmie byť 0: výpočet ňou delí.",
    fraseDirecta: (a, b, c, x) => `Keď ${a} zodpovedá ${b}, potom ${c} zodpovedá ${x}. Výpočet: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Keď ${a} dáva ${b}, potom ${c} dáva ${x}. Výpočet: ${a} × ${b} ÷ ${c}.`,
  }),
};
