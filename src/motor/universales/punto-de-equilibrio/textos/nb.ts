import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosNb: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "nullpunktsberegning",
  ui: () => ({
    fijos: "Faste kostnader per måned",
    fijosAyuda: "Det du betaler selv om du ikke selger noe: husleie, faste lønninger, strøm, programvare og abonnementer.",
    precio: "Salgspris per enhet",
    variable: "Variable kostnader per enhet",
    variableAyuda: "Hva hver solgte enhet koster deg: materialer, innkjøp, provisjon og frakt.",
    objetivo: "Ønsket overskudd per måned (valgfritt)",
    objetivoAyuda: "Så ser du hvor mye du må selge utover det som dekker kostnadene.",
    unidades: "Antall enheter til nullpunktet",
    facturacion: "Nullpunktsomsetning",
    contribucion: "Dekningsbidrag per enhet",
    contribucionAyuda: "Det hvert salg bidrar med til de faste kostnadene: salgspris minus variable kostnader.",
    contribucionPct: "Dekningsgrad (%)",
    unidadesObjetivo: "Antall enheter for ønsket overskudd",
    facturacionObjetivo: "Omsetning for ønsket overskudd",
    errorPrecio: "Fyll inn salgsprisen for én enhet.",
    errorMargen: "De variable kostnadene er like høye som prisen eller høyere. Hvert salg gir underskudd, og du når aldri nullpunktet. Sjekk pris og kostnader.",
    observacionRedondeo: "Antall enheter rundes opp, fordi du ikke kan selge en del av en enhet.",
  }),
};
