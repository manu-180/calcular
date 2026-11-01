import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosHr: TextosUi<UiReglaDeTres> = {
  slug: "pravilo-trojno",
  ui: () => ({
    tipo: "Vrsta proporcionalnosti",
    directa: "Upravna (kada A raste, raste i B)",
    inversa: "Obrnuta (kada A raste, B pada)",
    a: "A",
    aAyuda: "Čita se ovako: A prema B kao C prema X. Unesite A, B i C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Ova vrijednost ne može biti 0: račun dijeli njome.",
    fraseDirecta: (a, b, c, x) => `Ako ${a} odgovara broju ${b}, onda ${c} odgovara broju ${x}. Račun: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Ako ${a} daje ${b}, onda ${c} daje ${x}. Račun: ${a} × ${b} ÷ ${c}.`,
  }),
};
