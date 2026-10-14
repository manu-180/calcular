import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosDe: TextosUi<UiFechaDeParto> = {
  slug: "geburtstermin-rechner",
  ui: () => ({
    metodo: "Welches Datum kennen Sie?",
    fum: "Erster Tag der letzten Periode",
    concepcion: "Tag der Empfängnis",
    fecha: "Datum",
    fechaAyuda: "Wenn Sie die letzte Periode wählen, tragen Sie den ersten Tag der Blutung ein.",
    ciclo: "Zykluslänge (Tage)",
    cicloAyuda: "Zählt nur bei der letzten Periode. Wenn Sie sie nicht kennen, lassen Sie 28 stehen.",
    fpp: "Errechneter Geburtstermin",
    edadGestacional: "Schwangerschaftswoche heute",
    trimestre: "Trimester",
    faltan: "Tage bis zum Termin",
    fechaConcepcion: "Ungefähre Empfängnis",
    semanasYDias: (s, d) => `${s} ${s === 1 ? "Woche" : "Wochen"}${d ? ` und ${d} ${d === 1 ? "Tag" : "Tage"}` : ""}`,
    trimestres: ["Erstes Trimester", "Zweites Trimester", "Drittes Trimester"],
    errorFutura: "Das Datum darf nicht nach heute liegen.",
    errorCiclo: "Die Zykluslänge muss zwischen 20 und 45 Tagen liegen.",
    notaPasada: "Seit diesem Datum sind mehr als 42 Wochen vergangen. Die Schwangerschaftswoche wird deshalb nicht angezeigt.",
    aviso: "Das ist eine Schätzung. Nur wenige Babys kommen genau am errechneten Termin. Den genauesten Termin bestimmen Ihre Frauenärztin, Ihr Frauenarzt oder Ihre Hebamme, etwa per Ultraschall.",
  }),
};
