import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosIs: TextosUi<UiMetrosCuadrados> = {
  slug: "fermetrar",
  ui: () => ({
    forma: (n) => `Flötur ${n}: lögun`,
    formaAyuda: "Ef rýmið er L-laga eða óreglulegt skaltu skipta því í hluta og þeir eru lagðir saman.",
    ninguna: "Ekki notað",
    rectangulo: "Rétthyrningur eða ferningur",
    triangulo: "Þríhyrningur",
    circulo: "Hringur",
    medidaA: (n, u) => `Flötur ${n}: lengd, grunnlína eða þvermál (${u})`,
    medidaAAyuda: "Rétthyrningur: lengd og breidd. Þríhyrningur: grunnlína og hæð. Hringur: aðeins þvermál.",
    medidaB: (n, u) => `Flötur ${n}: breidd eða hæð (${u})`,
    total: (u) => `Heildarflatarmál (${u})`,
    equivale: (u) => `Jafngildir í ${u}`,
    parcial: (n, u) => `Flötur ${n} (${u})`,
    errorMedida: "Þetta mál vantar eða er 0.",
  }),
};
