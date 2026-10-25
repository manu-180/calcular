import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosFi: TextosUi<UiReglaDeTres> = {
  slug: "verrantolaskuri",
  ui: () => ({
    tipo: "Verrannon tyyppi",
    directa: "Suora verranto (kun A kasvaa, B kasvaa)",
    inversa: "Käänteinen verranto (kun A kasvaa, B pienenee)",
    a: "A",
    aAyuda: "Lue näin: A suhteessa B:hen on sama kuin C suhteessa X:ään. Syötä A, B ja C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Arvo ei voi olla 0, koska laskussa jaetaan sillä.",
    fraseDirecta: (a, b, c, x) => `Jos ${a} vastaa arvoa ${b}, niin ${c} vastaa arvoa ${x}. Lasku: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Jos arvolla ${a} saadaan ${b}, niin arvolla ${c} saadaan ${x}. Lasku: ${a} × ${b} ÷ ${c}.`,
  }),
};
