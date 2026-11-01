import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosDa: TextosUi<UiFechaDeParto> = {
  slug: "terminsberegner",
  ui: () => ({
    metodo: "Hvilken dato kender du?",
    fum: "Første dag i sidste menstruation",
    concepcion: "Dato for undfangelse",
    fecha: "Dato",
    fechaAyuda: "Vælger du sidste menstruation, så skriv den første blødningsdag.",
    ciclo: "Cyklussens længde (dage)",
    cicloAyuda: "Bruges kun med sidste menstruation. Ved du det ikke, så lad 28 stå.",
    fpp: "Terminsdato",
    edadGestacional: "Graviditetsuge i dag",
    trimestre: "Trimester",
    faltan: "Dage tilbage",
    fechaConcepcion: "Omtrentlig undfangelse",
    semanasYDias: (s, d) => `${s} ${s === 1 ? "uge" : "uger"}${d ? ` og ${d} ${d === 1 ? "dag" : "dage"}` : ""}`,
    trimestres: ["Første trimester", "Andet trimester", "Tredje trimester"],
    errorFutura: "Datoen kan ikke ligge efter i dag.",
    errorCiclo: "Cyklussens længde skal være mellem 20 og 45 dage.",
    notaPasada: "Der er gået mere end 42 uger siden den dato, så graviditetsugen vises ikke.",
    aviso: "Det er et skøn. Få børn bliver født præcis på terminsdatoen. Scanningen giver den mest sikre dato. Beregneren er vejledende og erstatter ikke en samtale med din læge eller jordemoder.",
  }),
};
