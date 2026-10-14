import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosEn: TextosUi<UiMetrosCuadrados> = {
  slug: "square-footage",
  ui: () => ({
    forma: (n) => `Area ${n}: shape`,
    formaAyuda: "If the room is L-shaped or irregular, split it into parts and add them up.",
    ninguna: "Not used",
    rectangulo: "Rectangle or square",
    triangulo: "Triangle",
    circulo: "Circle",
    medidaA: (n, u) => `Area ${n}: length, base or diameter (${u})`,
    medidaAAyuda: "Rectangle: length and width. Triangle: base and height. Circle: just the diameter.",
    medidaB: (n, u) => `Area ${n}: width or height (${u})`,
    total: (u) => `Total area (${u})`,
    equivale: (u) => `Equivalent in ${u}`,
    parcial: (n, u) => `Area ${n} (${u})`,
    errorMedida: "This measurement is missing or 0.",
  }),
};
