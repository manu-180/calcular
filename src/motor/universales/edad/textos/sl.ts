import { pluralSl } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import { duracionSl } from "../../dias-entre-fechas/textos/sl";
import type { UiEdad } from "../definicion";

export const textosSl: TextosUi<UiEdad> = {
  slug: "izracun-starosti",
  ui: () => ({
    nacimiento: "Datum rojstva",
    referencia: "Starost na dan",
    referenciaAyuda: "Privzet je današnji dan. Spremenite datum, če želite izvedeti starost na kak drug dan.",
    edad: "Starost",
    anios: "Dopolnjena leta",
    totalMeses: "V mesecih",
    totalSemanas: "V tednih",
    totalDias: "V dneh",
    proximo: "Naslednji rojstni dan",
    faltan: "Preostali dnevi",
    cumplira: "Starost ob naslednjem rojstnem dnevu",
    duracion: duracionSl,
    errorFutura: "Datum rojstva ne sme biti po datumu, za katerega računate starost.",
    cumpleHoy: (anios) => `Danes je rojstni dan. Starost: natanko ${pluralSl(anios, "leto", "leti", "leta", "let")}.`,
    nota29: "Za rojene 29. februarja v letih, ki niso prestopna, štejemo rojstni dan 28. februarja.",
  }),
};
