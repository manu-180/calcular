import { pluralBs } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import { duracionBs } from "../../dias-entre-fechas/textos/bs";
import type { UiEdad } from "../definicion";

export const textosBs: TextosUi<UiEdad> = {
  slug: "kalkulator-starosti",
  ui: () => ({
    nacimiento: "Datum rođenja",
    referencia: "Dob na dan",
    referenciaAyuda: "Zadan je današnji dan. Promijenite datum ako želite znati dob na neki drugi dan.",
    edad: "Dob",
    anios: "Navršene godine",
    totalMeses: "U mjesecima",
    totalSemanas: "U sedmicama",
    totalDias: "U danima",
    proximo: "Sljedeći rođendan",
    faltan: "Preostalo dana",
    cumplira: "Koliko godina puni",
    duracion: duracionBs,
    errorFutura: "Datum rođenja ne može biti nakon datuma na koji računate dob.",
    cumpleHoy: (anios) => `Danas je rođendan: tačno ${pluralBs(anios, "godina", "godine", "godina")}.`,
    nota29: "Za rođene 29. februara, u godinama koje nisu prijestupne rođendan računamo 28. februara.",
  }),
};
