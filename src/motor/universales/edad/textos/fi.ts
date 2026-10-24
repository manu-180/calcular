import type { TextosUi } from "../../tipos";
import { duracionFi } from "../../dias-entre-fechas/textos/fi";
import type { UiEdad } from "../definicion";

export const textosFi: TextosUi<UiEdad> = {
  slug: "ikalaskuri",
  ui: () => ({
    nacimiento: "Syntymäaika",
    referencia: "Ikä päivänä",
    referenciaAyuda: "Oletuksena tämä päivä. Vaihda päivämäärä, niin näet iän toisena päivänä.",
    edad: "Ikä",
    anios: "Vuosia",
    totalMeses: "Kuukausina",
    totalSemanas: "Viikkoina",
    totalDias: "Päivinä",
    proximo: "Seuraava syntymäpäivä",
    faltan: "Päiviä jäljellä",
    cumplira: "Täyttää",
    duracion: duracionFi,
    errorFutura: "Syntymäaika ei voi olla myöhemmin kuin päivä, jolle ikä lasketaan.",
    cumpleHoy: (anios) => `Tänään on syntymäpäivä. Henkilö täyttää ${anios} ${anios === "1" ? "vuoden" : "vuotta"}.`,
    nota29: "Karkauspäivänä 29. helmikuuta syntyneen syntymäpäivä lasketaan muina kuin karkausvuosina 28. helmikuuta.",
  }),
};
