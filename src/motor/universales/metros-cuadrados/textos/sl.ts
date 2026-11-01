import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosSl: TextosUi<UiMetrosCuadrados> = {
  slug: "izracun-kvadratnih-metrov",
  ui: () => ({
    forma: (n) => `Površina ${n}: oblika`,
    formaAyuda: "Če ima prostor obliko črke L ali je nepravilen, ga razdelite na dele, ki se bodo sešteli.",
    ninguna: "Ni v uporabi",
    rectangulo: "Pravokotnik ali kvadrat",
    triangulo: "Trikotnik",
    circulo: "Krog",
    medidaA: (n, u) => `Površina ${n}: dolžina, osnovnica ali premer (${u})`,
    medidaAAyuda: "Pravokotnik: dolžina in širina. Trikotnik: osnovnica in višina. Krog: samo premer.",
    medidaB: (n, u) => `Površina ${n}: širina ali višina (${u})`,
    total: (u) => `Skupna površina (${u})`,
    equivale: (u) => `Preračunano v ${u}`,
    parcial: (n, u) => `Površina ${n} (${u})`,
    errorMedida: "Ta mera manjka ali je 0.",
  }),
};
