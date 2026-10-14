import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosNl: TextosUi<UiVariacion> = {
  slug: "procentuele-verandering",
  ui: () => ({
    inicial: "Oude waarde",
    final: "Nieuwe waarde",
    variacion: "Procentuele verandering",
    diferencia: "Verschil",
    vuelta: "Terug naar het begin",
    vueltaAyuda: "Hoeveel de nieuwe waarde moet veranderen om weer bij de oude waarde uit te komen.",
    errorInicialCero: "De oude waarde kan geen 0 zijn: vanaf nul bestaat geen procentuele verandering.",
    subio: (p) => `Het is ${p}% gestegen.`,
    bajo: (p) => `Het is ${p}% gedaald.`,
    igual: "Geen verandering: beide waarden zijn gelijk.",
  }),
};
