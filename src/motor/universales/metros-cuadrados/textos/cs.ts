import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosCs: TextosUi<UiMetrosCuadrados> = {
  slug: "vypocet-metru-ctverecnich",
  ui: () => ({
    forma: (n) => `Plocha ${n}: tvar`,
    formaAyuda: "Pokud má místnost tvar písmene L nebo je nepravidelná, rozdělte ji na části a ty se sečtou.",
    ninguna: "Nepoužívat",
    rectangulo: "Obdélník nebo čtverec",
    triangulo: "Trojúhelník",
    circulo: "Kruh",
    medidaA: (n, u) => `Plocha ${n}: délka, základna nebo průměr (${u})`,
    medidaAAyuda: "Obdélník: délka a šířka. Trojúhelník: základna a výška. Kruh: jen průměr.",
    medidaB: (n, u) => `Plocha ${n}: šířka nebo výška (${u})`,
    total: (u) => `Celková plocha (${u})`,
    equivale: (u) => `Odpovídá v ${u}`,
    parcial: (n, u) => `Plocha ${n} (${u})`,
    errorMedida: "Tento rozměr chybí nebo je 0.",
  }),
};
