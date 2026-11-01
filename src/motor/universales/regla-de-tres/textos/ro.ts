import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosRo: TextosUi<UiReglaDeTres> = {
  slug: "regula-de-trei-simpla",
  ui: () => ({
    tipo: "Tipul de proporționalitate",
    directa: "Directă (când A crește, crește și B)",
    inversa: "Inversă (când A crește, B scade)",
    a: "A",
    aAyuda: "Se citește așa: A corespunde lui B cum C corespunde lui X. Introduceți A, B și C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Această valoare nu poate fi 0: calculul se împarte la ea.",
    fraseDirecta: (a, b, c, x) => `Dacă lui ${a} îi corespunde ${b}, atunci lui ${c} îi corespunde ${x}. Calcul: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Dacă ${a} dă ${b}, atunci ${c} dă ${x}. Calcul: ${a} × ${b} ÷ ${c}.`,
  }),
};
