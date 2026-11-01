import { pluralHr } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosHr: TextosUi<UiFechaDeParto> = {
  slug: "kalkulator-termina-poroda",
  ui: () => ({
    metodo: "Koji datum znate?",
    fum: "Prvi dan posljednje menstruacije",
    concepcion: "Datum začeća",
    fecha: "Datum",
    fechaAyuda: "Ako je odabrana posljednja menstruacija, unesite prvi dan krvarenja.",
    ciclo: "Duljina menstrualnog ciklusa (dani)",
    cicloAyuda: "Koristi se samo uz datum posljednje menstruacije. Ako ga ne znate, ostavite 28.",
    fpp: "Očekivani termin poroda",
    edadGestacional: "Tjedan trudnoće danas",
    trimestre: "Tromjesečje",
    faltan: "Dana do poroda",
    fechaConcepcion: "Približan datum začeća",
    semanasYDias: (s, d) => `${pluralHr(s, "tjedan", "tjedna", "tjedana")}${d ? ` i ${pluralHr(d, "dan", "dana", "dana")}` : ""}`,
    trimestres: ["Prvo tromjesečje", "Drugo tromjesečje", "Treće tromjesečje"],
    errorFutura: "Datum ne može biti kasniji od današnjeg.",
    errorCiclo: "Duljina ciklusa mora biti između 20 i 45 dana.",
    notaPasada: "Od ovog datuma prošlo je više od 42 tjedna, pa tjedan trudnoće ne prikazujemo.",
    aviso:
      "Ovo je procjena: točno na očekivani dan rodi se malo beba. Najtočniji termin određuju ultrazvuk i pregledi kod ginekologa ili primalje.",
  }),
};
