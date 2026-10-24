import type { TextosUi } from "../../tipos";
import { duracionNb } from "../../dias-entre-fechas/textos/nb";
import type { UiEdad } from "../definicion";

export const textosNb: TextosUi<UiEdad> = {
  slug: "alderskalkulator",
  ui: () => ({
    nacimiento: "Fødselsdato",
    referencia: "Alder per dato",
    referenciaAyuda: "Dagens dato som standard. Endre den for å se alderen på en annen dato.",
    edad: "Alder",
    anios: "År",
    totalMeses: "I måneder",
    totalSemanas: "I uker",
    totalDias: "I dager",
    proximo: "Neste bursdag",
    faltan: "Dager igjen",
    cumplira: "Fyller",
    duracion: duracionNb,
    errorFutura: "Fødselsdatoen kan ikke være etter datoen du regner til.",
    cumpleHoy: (anios) => `Det er bursdag i dag. Personen fyller ${anios} år.`,
    nota29: "For den som er født 29. februar, regnes bursdagen som 28. februar i år som ikke er skuddår.",
  }),
};
