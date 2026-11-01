import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosEt: TextosUi<UiMetrosCuadrados> = {
  slug: "ruutmeetrite-kalkulaator",
  ui: () => ({
    forma: (n) => `Ala ${n}: kuju`,
    formaAyuda: "Kui tuba on L-kujuline või ebakorrapärane, jaga see osadeks ja kalkulaator liidab need kokku.",
    ninguna: "Ei kasuta",
    rectangulo: "Ristkülik või ruut",
    triangulo: "Kolmnurk",
    circulo: "Ring",
    medidaA: (n, u) => `Ala ${n}: pikkus, alus või läbimõõt (${u})`,
    medidaAAyuda: "Ristkülik: pikkus ja laius. Kolmnurk: alus ja kõrgus. Ring: ainult läbimõõt.",
    medidaB: (n, u) => `Ala ${n}: laius või kõrgus (${u})`,
    total: (u) => `Kogupindala (${u})`,
    equivale: (u) => `Sama ühikutes ${u}`,
    parcial: (n, u) => `Ala ${n} (${u})`,
    errorMedida: "See mõõt puudub või on 0.",
  }),
};
