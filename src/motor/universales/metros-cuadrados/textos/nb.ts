import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosNb: TextosUi<UiMetrosCuadrados> = {
  slug: "kvadratmeter",
  ui: () => ({
    forma: (n) => `Areal ${n}: form`,
    formaAyuda: "Er rommet L-formet eller skjevt, del det opp i flere deler som legges sammen.",
    ninguna: "Brukes ikke",
    rectangulo: "Rektangel eller kvadrat",
    triangulo: "Trekant",
    circulo: "Sirkel",
    medidaA: (n, u) => `Areal ${n}: lengde, grunnlinje eller diameter (${u})`,
    medidaAAyuda: "Rektangel: lengde og bredde. Trekant: grunnlinje og høyde. Sirkel: bare diameteren.",
    medidaB: (n, u) => `Areal ${n}: bredde eller høyde (${u})`,
    total: (u) => `Samlet areal (${u})`,
    equivale: (u) => `Tilsvarer i ${u}`,
    parcial: (n, u) => `Areal ${n} (${u})`,
    errorMedida: "Dette målet mangler eller er 0.",
  }),
};
