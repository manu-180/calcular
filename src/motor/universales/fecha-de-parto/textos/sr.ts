import { pluralSr } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosSr: TextosUi<UiFechaDeParto> = {
  slug: "termin-porodjaja",
  ui: () => ({
    metodo: "Koji datum znate?",
    fum: "Prvi dan poslednje menstruacije",
    concepcion: "Datum začeća",
    fecha: "Datum",
    fechaAyuda: "Ako je izabrana poslednja menstruacija, unesite prvi dan krvarenja.",
    ciclo: "Dužina menstrualnog ciklusa (dani)",
    cicloAyuda: "Koristi se samo uz datum poslednje menstruacije. Ako ga ne znate, ostavite 28.",
    fpp: "Očekivani termin porođaja",
    edadGestacional: "Nedelja trudnoće danas",
    trimestre: "Tromesečje",
    faltan: "Dana do porođaja",
    fechaConcepcion: "Približan datum začeća",
    semanasYDias: (s, d) => `${pluralSr(s, "nedelja", "nedelje", "nedelja")}${d ? ` i ${pluralSr(d, "dan", "dana", "dana")}` : ""}`,
    trimestres: ["Prvo tromesečje", "Drugo tromesečje", "Treće tromesečje"],
    errorFutura: "Datum ne može biti kasniji od današnjeg.",
    errorCiclo: "Dužina ciklusa mora biti između 20 i 45 dana.",
    notaPasada: "Od ovog datuma je prošlo više od 42 nedelje, pa nedelju trudnoće ne prikazujemo.",
    aviso:
      "Ovo je procena: tačno na očekivani dan rodi se malo beba. Najtačniji termin određuju ultrazvuk i pregledi kod ginekologa ili babice.",
  }),
};
