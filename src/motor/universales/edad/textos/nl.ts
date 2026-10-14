import type { TextosUi } from "../../tipos";
import { duracionNl } from "../../dias-entre-fechas/textos/nl";
import type { UiEdad } from "../definicion";

export const textosNl: TextosUi<UiEdad> = {
  slug: "leeftijd-berekenen",
  ui: () => ({
    nacimiento: "Geboortedatum",
    referencia: "Leeftijd op",
    referenciaAyuda: "Standaard vandaag. Pas de datum aan om de leeftijd op een andere dag te zien.",
    edad: "Leeftijd",
    anios: "Jaar oud",
    totalMeses: "In maanden",
    totalSemanas: "In weken",
    totalDias: "In dagen",
    proximo: "Volgende verjaardag",
    faltan: "Nog te gaan (dagen)",
    cumplira: "Wordt dan",
    duracion: duracionNl,
    errorFutura: "De geboortedatum kan niet na de datum liggen waarop je de leeftijd wilt weten.",
    cumpleHoy: (anios) => `Vandaag jarig: ${anios} jaar.`,
    nota29: "Ben je op 29 februari geboren, dan telt in een jaar zonder schrikkeldag 28 februari als je verjaardag.",
  }),
};
