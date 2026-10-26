import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosFi: TextosUi<UiCeramicos> = {
  slug: "laattalaskuri",
  ui: () => ({
    superficie: (u) => `Laatoitettava pinta-ala (${u})`,
    largo: (u) => `Laatan pituus (${u})`,
    ancho: (u) => `Laatan leveys (${u})`,
    desperdicio: "Hukka (%)",
    desperdicioAyuda: "Leikkauksia ja rikkoutuvia laattoja varten. Varaa 10 % suoraan ladontaan ja 15 % vinoladontaan.",
    porCaja: "Laattoja laatikossa",
    porCajaAyuda: "Vapaaehtoinen. Täytä, jos haluat nähdä, montako laatikkoa ostat.",
    piezas: "Laattojen määrä",
    cajas: "Ostettavat laatikot",
    conDesperdicio: (u) => `Pinta-ala hukan kanssa (${u})`,
    cubre: (u) => `Laatikoiden kattama pinta-ala (${u})`,
    errorSuperficie: "Pinta-alan on oltava suurempi kuin 0.",
    errorPieza: "Laatan mittojen on oltava suurempia kuin 0.",
  }),
};
