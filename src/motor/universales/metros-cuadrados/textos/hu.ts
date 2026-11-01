import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosHu: TextosUi<UiMetrosCuadrados> = {
  slug: "negyzetmeter-kalkulator",
  ui: () => ({
    forma: (n) => `${n}. terület: alakzat`,
    formaAyuda: "Ha a helyiség L alakú vagy szabálytalan, oszd részekre, és add össze őket.",
    ninguna: "Nincs használatban",
    rectangulo: "Téglalap vagy négyzet",
    triangulo: "Háromszög",
    circulo: "Kör",
    medidaA: (n, u) => `${n}. terület: hossz, alap vagy átmérő (${u})`,
    medidaAAyuda: "Téglalap: hossz és szélesség. Háromszög: alap és magasság. Kör: csak az átmérő.",
    medidaB: (n, u) => `${n}. terület: szélesség vagy magasság (${u})`,
    total: (u) => `Teljes terület (${u})`,
    equivale: (u) => `Átváltva (${u})`,
    parcial: (n, u) => `${n}. terület (${u})`,
    errorMedida: "Ez a méret hiányzik, vagy nulla.",
  }),
};
