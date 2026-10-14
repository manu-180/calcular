import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosNl: TextosUi<UiReglaDeTres> = {
  slug: "verhoudingen-berekenen",
  ui: () => ({
    tipo: "Soort verhouding",
    directa: "Recht evenredig (meer A geeft meer B)",
    inversa: "Omgekeerd evenredig (meer A geeft minder B)",
    a: "A",
    aAyuda: "Lees het zo: A staat tot B zoals C tot X. Vul A, B en C in.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Deze waarde kan geen 0 zijn: de som deelt erdoor.",
    fraseDirecta: (a, b, c, x) => `Hoort ${b} bij ${a}, dan hoort ${x} bij ${c}. Som: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Geeft ${a} een uitkomst van ${b}, dan geeft ${c} een uitkomst van ${x}. Som: ${a} × ${b} ÷ ${c}.`,
  }),
};
