import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosSr: TextosUi<UiMetrosCuadrados> = {
  slug: "kalkulator-kvadrature",
  ui: () => ({
    forma: (n) => `Površina ${n}: oblik`,
    formaAyuda: "Ako prostorija ima oblik slova L ili je nepravilna, podelite je na delove i oni će se sabrati.",
    ninguna: "Ne koristi se",
    rectangulo: "Pravougaonik ili kvadrat",
    triangulo: "Trougao",
    circulo: "Krug",
    medidaA: (n, u) => `Površina ${n}: dužina, osnovica ili prečnik (${u})`,
    medidaAAyuda: "Pravougaonik: dužina i širina. Trougao: osnovica i visina. Krug: samo prečnik.",
    medidaB: (n, u) => `Površina ${n}: širina ili visina (${u})`,
    total: (u) => `Ukupna površina (${u})`,
    equivale: (u) => `Odgovara u ${u}`,
    parcial: (n, u) => `Površina ${n} (${u})`,
    errorMedida: "Ova mera nedostaje ili je 0.",
  }),
};
