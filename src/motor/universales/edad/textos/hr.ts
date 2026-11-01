import { pluralHr } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import { duracionHr } from "../../dias-entre-fechas/textos/hr";
import type { UiEdad } from "../definicion";

export const textosHr: TextosUi<UiEdad> = {
  slug: "kalkulator-dobi",
  ui: () => ({
    nacimiento: "Datum rođenja",
    referencia: "Dob na dan",
    referenciaAyuda: "Zadan je današnji dan. Promijenite datum ako želite znati dob na neki drugi dan.",
    edad: "Dob",
    anios: "Navršene godine",
    totalMeses: "U mjesecima",
    totalSemanas: "U tjednima",
    totalDias: "U danima",
    proximo: "Sljedeći rođendan",
    faltan: "Preostalo dana",
    cumplira: "Koliko godina puni",
    duracion: duracionHr,
    errorFutura: "Datum rođenja ne može biti nakon datuma na koji računate dob.",
    cumpleHoy: (anios) => `Danas je rođendan: točno ${pluralHr(anios, "godina", "godine", "godina")}.`,
    nota29: "Za rođene 29. veljače, u godinama koje nisu prijestupne rođendan računamo 28. veljače.",
  }),
};
