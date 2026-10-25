import { pluralPl } from "../../../i18n/plural";
import { duracionPl } from "../../dias-entre-fechas/textos/pl";
import type { TextosUi } from "../../tipos";
import type { UiEdad } from "../definicion";

export const textosPl: TextosUi<UiEdad> = {
  slug: "kalkulator-wieku",
  ui: () => ({
    nacimiento: "Data urodzenia",
    referencia: "Wiek na dzień",
    referenciaAyuda: "Domyślnie dzisiaj. Zmień datę, żeby sprawdzić wiek w innym dniu.",
    edad: "Wiek",
    anios: "Pełne lata",
    totalMeses: "W miesiącach",
    totalSemanas: "W tygodniach",
    totalDias: "W dniach",
    proximo: "Najbliższe urodziny",
    faltan: "Zostało dni",
    cumplira: "Skończy lat",
    duracion: duracionPl,
    errorFutura: "Data urodzenia nie może być późniejsza niż sprawdzana data.",
    cumpleHoy: (anios) => `Dziś są urodziny: ${pluralPl(anios, "rok", "lata", "lat")}.`,
    nota29: "Osobom urodzonym 29 lutego w latach nieprzestępnych liczymy urodziny 28 lutego.",
  }),
};
