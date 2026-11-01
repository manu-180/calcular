import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosIs: TextosUi<UiCeramicos> = {
  slug: "flisar",
  ui: () => ({
    superficie: (u) => `Flötur sem á að leggja (${u})`,
    largo: (u) => `Lengd flísar (${u})`,
    ancho: (u) => `Breidd flísar (${u})`,
    desperdicio: "Afföll (%)",
    desperdicioAyuda: "Fyrir afskurð og flísar sem brotna. Reiknaðu með 10% ef lagt er beint og 15% ef lagt er á ská.",
    porCaja: "Flísar í kassa",
    porCajaAyuda: "Valfrjálst. Fylltu út til að sjá hvað þú þarft að kaupa marga kassa.",
    piezas: "Fjöldi flísa",
    cajas: "Kassar sem þarf að kaupa",
    conDesperdicio: (u) => `Flötur með afföllum (${u})`,
    cubre: (u) => `Flötur sem kassarnir duga á (${u})`,
    errorSuperficie: "Flöturinn þarf að vera stærri en 0.",
    errorPieza: "Mál flísarinnar þurfa að vera stærri en 0.",
  }),
};
