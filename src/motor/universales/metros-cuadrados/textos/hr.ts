import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosHr: TextosUi<UiMetrosCuadrados> = {
  slug: "kalkulator-kvadrature",
  ui: () => ({
    forma: (n) => `Površina ${n}: oblik`,
    formaAyuda: "Ako prostorija ima oblik slova L ili je nepravilna, podijelite je na dijelove i oni će se zbrojiti.",
    ninguna: "Ne koristi se",
    rectangulo: "Pravokutnik ili kvadrat",
    triangulo: "Trokut",
    circulo: "Krug",
    medidaA: (n, u) => `Površina ${n}: duljina, osnovica ili promjer (${u})`,
    medidaAAyuda: "Pravokutnik: duljina i širina. Trokut: osnovica i visina. Krug: samo promjer.",
    medidaB: (n, u) => `Površina ${n}: širina ili visina (${u})`,
    total: (u) => `Ukupna površina (${u})`,
    equivale: (u) => `Preračunato u ${u}`,
    parcial: (n, u) => `Površina ${n} (${u})`,
    errorMedida: "Ova mjera nedostaje ili je 0.",
  }),
};
