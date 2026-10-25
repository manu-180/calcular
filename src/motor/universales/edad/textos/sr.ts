import { pluralSr } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import { duracionSr } from "../../dias-entre-fechas/textos/sr";
import type { UiEdad } from "../definicion";

export const textosSr: TextosUi<UiEdad> = {
  slug: "kalkulator-starosti",
  ui: () => ({
    nacimiento: "Datum rođenja",
    referencia: "Starost na dan",
    referenciaAyuda: "Podrazumevano je današnji dan. Promenite datum ako želite da znate starost na neki drugi dan.",
    edad: "Starost",
    anios: "Navršene godine",
    totalMeses: "U mesecima",
    totalSemanas: "U nedeljama",
    totalDias: "U danima",
    proximo: "Sledeći rođendan",
    faltan: "Preostalo dana",
    cumplira: "Koliko godina puni",
    duracion: duracionSr,
    errorFutura: "Datum rođenja ne može biti posle datuma na koji računate starost.",
    cumpleHoy: (anios) => `Danas je rođendan: tačno ${pluralSr(anios, "godina", "godine", "godina")}.`,
    nota29: "Za rođene 29. februara, u godinama koje nisu prestupne rođendan računamo 28. februara.",
  }),
};
