import type { TextosUi } from "../../tipos";
import { duracionSv } from "../../dias-entre-fechas/textos/sv";
import type { UiEdad } from "../definicion";

export const textosSv: TextosUi<UiEdad> = {
  slug: "rakna-ut-alder",
  ui: () => ({
    nacimiento: "Födelsedatum",
    referencia: "Ålder den",
    referenciaAyuda: "Dagens datum som standard. Ändra det för att se åldern ett annat datum.",
    edad: "Ålder",
    anios: "År",
    totalMeses: "I månader",
    totalSemanas: "I veckor",
    totalDias: "I dagar",
    proximo: "Nästa födelsedag",
    faltan: "Dagar kvar",
    cumplira: "Fyller",
    duracion: duracionSv,
    errorFutura: "Födelsedatumet kan inte ligga efter datumet du räknar till.",
    cumpleHoy: (anios) => `Det är födelsedag i dag. Personen fyller ${anios} år.`,
    nota29: "För den som är född den 29 februari räknas födelsedagen den 28 februari de år som inte är skottår.",
  }),
};
