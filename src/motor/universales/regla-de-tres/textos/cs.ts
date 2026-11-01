import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosCs: TextosUi<UiReglaDeTres> = {
  slug: "trojclenka",
  ui: () => ({
    tipo: "Druh úměrnosti",
    directa: "Přímá (když A roste, roste i B)",
    inversa: "Nepřímá (když A roste, B klesá)",
    a: "A",
    aAyuda: "Čtěte to takto: A je k B jako C k X. Zadejte A, B a C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Tato hodnota nesmí být 0: výpočet jí dělí.",
    fraseDirecta: (a, b, c, x) => `Když ${a} odpovídá ${b}, pak ${c} odpovídá ${x}. Výpočet: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Když ${a} dává ${b}, pak ${c} dává ${x}. Výpočet: ${a} × ${b} ÷ ${c}.`,
  }),
};
