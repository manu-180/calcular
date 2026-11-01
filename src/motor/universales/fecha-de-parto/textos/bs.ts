import { pluralBs } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosBs: TextosUi<UiFechaDeParto> = {
  slug: "kalkulator-termina-poroda",
  ui: () => ({
    metodo: "Koji datum znate?",
    fum: "Prvi dan posljednje menstruacije",
    concepcion: "Datum začeća",
    fecha: "Datum",
    fechaAyuda: "Ako je izabrana posljednja menstruacija, unesite prvi dan krvarenja.",
    ciclo: "Dužina menstrualnog ciklusa (dani)",
    cicloAyuda: "Koristi se samo uz datum posljednje menstruacije. Ako ga ne znate, ostavite 28.",
    fpp: "Očekivani termin poroda",
    edadGestacional: "Sedmica trudnoće danas",
    trimestre: "Trimestar",
    faltan: "Dana do poroda",
    fechaConcepcion: "Približan datum začeća",
    semanasYDias: (s, d) => `${pluralBs(s, "sedmica", "sedmice", "sedmica")}${d ? ` i ${pluralBs(d, "dan", "dana", "dana")}` : ""}`,
    trimestres: ["Prvi trimestar", "Drugi trimestar", "Treći trimestar"],
    errorFutura: "Datum ne može biti kasniji od današnjeg.",
    errorCiclo: "Dužina ciklusa mora biti između 20 i 45 dana.",
    notaPasada: "Od ovog datuma prošlo je više od 42 sedmice, pa sedmicu trudnoće ne prikazujemo.",
    aviso:
      "Ovo je procjena: tačno na očekivani dan rodi se malo beba. Najtočniji termin određuju ultrazvuk i pregledi kod ginekologa ili babice.",
  }),
};
