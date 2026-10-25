import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosSr: TextosUi<UiReglaDeTres> = {
  slug: "pravilo-trojno",
  ui: () => ({
    tipo: "Vrsta proporcije",
    directa: "Direktna (kada A raste, raste i B)",
    inversa: "Obrnuta (kada A raste, B opada)",
    a: "A",
    aAyuda: "Čita se ovako: A prema B kao C prema X. Unesite A, B i C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Ova vrednost ne može biti 0: račun deli njome.",
    fraseDirecta: (a, b, c, x) => `Ako ${a} odgovara broju ${b}, onda ${c} odgovara broju ${x}. Račun: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Ako ${a} daje ${b}, onda ${c} daje ${x}. Račun: ${a} × ${b} ÷ ${c}.`,
  }),
};
