import type { TextosUi } from "../../tipos";
import { duracionEn } from "../../dias-entre-fechas/textos/en";
import type { UiEdad } from "../definicion";

export const textosEn: TextosUi<UiEdad> = {
  slug: "age",
  ui: () => ({
    nacimiento: "Date of birth",
    referencia: "Age on",
    referenciaAyuda: "Today by default. Change it to see the age on another date.",
    edad: "Age",
    anios: "Years old",
    totalMeses: "In months",
    totalSemanas: "In weeks",
    totalDias: "In days",
    proximo: "Next birthday",
    faltan: "Days to go",
    cumplira: "Turning",
    duracion: duracionEn,
    errorFutura: "The date of birth can't be after the date you're checking.",
    cumpleHoy: (anios) => `It's the birthday today: ${anios} years old.`,
    nota29: "For anyone born on 29 February, the birthday counts on 28 February in years that aren't leap years.",
  }),
};
