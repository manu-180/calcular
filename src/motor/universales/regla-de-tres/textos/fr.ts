import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosFr: TextosUi<UiReglaDeTres> = {
  slug: "regle-de-trois",
  ui: () => ({
    tipo: "Type de proportionnalité",
    directa: "Directe (quand A augmente, B augmente)",
    inversa: "Inverse (quand A augmente, B diminue)",
    a: "A",
    aAyuda: "Lisez-le ainsi : A est à B ce que C est à X. Saisissez A, B et C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Cette valeur ne peut pas être 0 : le calcul divise par elle.",
    fraseDirecta: (a, b, c, x) => `Si ${a} correspond à ${b}, alors ${c} correspond à ${x}. Calcul : ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Si ${a} donne ${b}, alors ${c} donne ${x}. Calcul : ${a} × ${b} ÷ ${c}.`,
  }),
};
