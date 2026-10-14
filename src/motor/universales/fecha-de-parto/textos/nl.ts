import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosNl: TextosUi<UiFechaDeParto> = {
  slug: "uitgerekende-datum",
  ui: () => ({
    metodo: "Welke datum weet je?",
    fum: "Eerste dag van je laatste menstruatie",
    concepcion: "Datum van de bevruchting",
    fecha: "Datum",
    fechaAyuda: "Kies je de laatste menstruatie, vul dan de eerste dag van de bloeding in.",
    ciclo: "Lengte van je cyclus (dagen)",
    cicloAyuda: "Alleen nodig bij je laatste menstruatie. Weet je het niet, laat dan 28 staan.",
    fpp: "Uitgerekende datum",
    edadGestacional: "Zo ver ben je vandaag",
    trimestre: "Trimester",
    faltan: "Nog te gaan (dagen)",
    fechaConcepcion: "Geschatte bevruchting",
    semanasYDias: (s, d) => `${s} ${s === 1 ? "week" : "weken"}${d ? ` en ${d} ${d === 1 ? "dag" : "dagen"}` : ""}`,
    trimestres: ["Eerste trimester", "Tweede trimester", "Derde trimester"],
    errorFutura: "De datum kan niet later zijn dan vandaag.",
    errorCiclo: "De lengte van je cyclus moet tussen 20 en 45 dagen liggen.",
    notaPasada: "Sinds die datum zijn er meer dan 42 weken voorbij, dus de zwangerschapsduur wordt niet getoond.",
    aviso: "Dit is een schatting: weinig baby's komen precies op de uitgerekende datum. De echo en de controles geven de nauwkeurigste datum. Deze rekenhulp vervangt niet het advies van je verloskundige of arts.",
  }),
};
