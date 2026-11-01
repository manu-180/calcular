import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosDa: TextosUi<UiMetrosCuadrados> = {
  slug: "kvadratmeterberegner",
  ui: () => ({
    forma: (n) => `Areal ${n}: form`,
    formaAyuda: "Er rummet L-formet eller skævt, så del det op i flere dele, der lægges sammen.",
    ninguna: "Bruges ikke",
    rectangulo: "Rektangel eller kvadrat",
    triangulo: "Trekant",
    circulo: "Cirkel",
    medidaA: (n, u) => `Areal ${n}: længde, grundlinje eller diameter (${u})`,
    medidaAAyuda: "Rektangel: længde og bredde. Trekant: grundlinje og højde. Cirkel: kun diameteren.",
    medidaB: (n, u) => `Areal ${n}: bredde eller højde (${u})`,
    total: (u) => `Samlet areal (${u})`,
    equivale: (u) => `Svarer til i ${u}`,
    parcial: (n, u) => `Areal ${n} (${u})`,
    errorMedida: "Dette mål mangler eller er 0.",
  }),
};
