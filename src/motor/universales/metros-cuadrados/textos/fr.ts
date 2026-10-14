import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosFr: TextosUi<UiMetrosCuadrados> = {
  slug: "calcul-surface-m2",
  ui: () => ({
    forma: (n) => `Partie ${n} : forme`,
    formaAyuda: "Si la pièce est en L ou irrégulière, découpez-la en parties : le calcul les additionne.",
    ninguna: "Non utilisée",
    rectangulo: "Rectangle ou carré",
    triangulo: "Triangle",
    circulo: "Cercle",
    medidaA: (n, u) => `Partie ${n} : longueur, base ou diamètre (${u})`,
    medidaAAyuda: "Rectangle : longueur et largeur. Triangle : base et hauteur. Cercle : seulement le diamètre.",
    medidaB: (n, u) => `Partie ${n} : largeur ou hauteur (${u})`,
    total: (u) => `Surface totale (${u})`,
    equivale: (u) => `Équivalent en ${u}`,
    parcial: (n, u) => `Partie ${n} (${u})`,
    errorMedida: "Cette mesure manque ou vaut 0.",
  }),
};
