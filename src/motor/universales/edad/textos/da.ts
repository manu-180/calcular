import type { TextosUi } from "../../tipos";
import { duracionDa } from "../../dias-entre-fechas/textos/da";
import type { UiEdad } from "../definicion";

export const textosDa: TextosUi<UiEdad> = {
  slug: "aldersberegner",
  ui: () => ({
    nacimiento: "Fødselsdato",
    referencia: "Alder den",
    referenciaAyuda: "Dagens dato som standard. Skift den for at se alderen på en anden dato.",
    edad: "Alder",
    anios: "År",
    totalMeses: "I måneder",
    totalSemanas: "I uger",
    totalDias: "I dage",
    proximo: "Næste fødselsdag",
    faltan: "Dage tilbage",
    cumplira: "Fylder",
    duracion: duracionDa,
    errorFutura: "Fødselsdatoen kan ikke ligge efter den dato, du regner til.",
    cumpleHoy: (anios) => `Der er fødselsdag i dag. Personen fylder ${anios} år.`,
    nota29: "Er man født den 29. februar, regnes fødselsdagen som den 28. februar i år, der ikke er skudår.",
  }),
};
