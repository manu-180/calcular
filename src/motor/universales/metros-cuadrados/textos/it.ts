import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosIt: TextosUi<UiMetrosCuadrados> = {
  slug: "calcolo-metri-quadri",
  ui: () => ({
    forma: (n) => `Zona ${n}: forma`,
    formaAyuda: "Se la stanza è a L o irregolare, dividila in parti e la calcolatrice le somma.",
    ninguna: "Non usata",
    rectangulo: "Rettangolo o quadrato",
    triangulo: "Triangolo",
    circulo: "Cerchio",
    medidaA: (n, u) => `Zona ${n}: lunghezza, base o diametro (${u})`,
    medidaAAyuda: "Rettangolo: lunghezza e larghezza. Triangolo: base e altezza. Cerchio: solo il diametro.",
    medidaB: (n, u) => `Zona ${n}: larghezza o altezza (${u})`,
    total: (u) => `Superficie totale (${u})`,
    equivale: (u) => `Equivale a (${u})`,
    parcial: (n, u) => `Zona ${n} (${u})`,
    errorMedida: "Questa misura manca o è 0.",
  }),
};
