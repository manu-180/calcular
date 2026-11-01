import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosUz: TextosUi<UiMetrosCuadrados> = {
  slug: "kvadrat-metr-kalkulyatori",
  ui: () => ({
    forma: (n) => `Maydon ${n}: shakli`,
    formaAyuda: "Xona L shaklida yoki notekis boʻlsa, uni qismlarga boʻling va qoʻshib chiqing.",
    ninguna: "Ishlatilmaydi",
    rectangulo: "Toʻrtburchak yoki kvadrat",
    triangulo: "Uchburchak",
    circulo: "Doira",
    medidaA: (n, u) => `Maydon ${n}: uzunlik, asos yoki diametr (${u})`,
    medidaAAyuda: "Toʻrtburchak: uzunlik va eni. Uchburchak: asos va balandlik. Doira: faqat diametr.",
    medidaB: (n, u) => `Maydon ${n}: eni yoki balandligi (${u})`,
    total: (u) => `Umumiy maydon (${u})`,
    equivale: (u) => `Boshqa birlikda (${u})`,
    parcial: (n, u) => `Maydon ${n} (${u})`,
    errorMedida: "Bu oʻlcham kiritilmagan yoki nolga teng.",
  }),
};
