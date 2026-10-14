import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosDe: TextosUi<UiHorasTrabajadas> = {
  slug: "arbeitszeitrechner",
  ui: () => ({
    dias: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
    entrada: (dia) => `${dia}: Beginn`,
    salida: (dia) => `${dia}: Ende`,
    horarioAyuda: "Tage, an denen Sie nicht gearbeitet haben, lassen Sie leer. Endet die Schicht nach Mitternacht, zählt sie als dieselbe Schicht.",
    pausa: "Unbezahlte Pause pro Tag (Minuten)",
    pausaAyuda: "Mittagspause oder andere Pausen, die nicht bezahlt werden. Sie wird an jedem Arbeitstag abgezogen.",
    pagoHora: "Stundenlohn",
    umbral: "Regelarbeitszeit pro Woche (optional)",
    umbralAyuda: "Stunden darüber werden mit Zuschlag bezahlt. Lassen Sie das Feld leer, wenn es keine Überstunden gibt.",
    recargo: "Überstundenzuschlag (%)",
    recargoAyuda: "Um wie viel mehr jede Überstunde bezahlt wird. Bei 25 % bekommen Sie für jede Überstunde ein Viertel mehr.",
    horasTotales: "Gearbeitete Stunden",
    horasReloj: "In Stunden und Minuten",
    horasNormales: "Reguläre Stunden",
    horasExtra: "Überstunden",
    pagoNormal: "Lohn für reguläre Stunden",
    pagoExtra: "Lohn für Überstunden",
    pagoTotal: "Lohn für die Woche",
    tabla: "Tag für Tag",
    colDia: "Tag",
    colEntrada: "Beginn",
    colSalida: "Ende",
    colHoras: "Stunden",
    errorFaltaSalida: (dia) => `Am ${dia} fehlt das Ende.`,
    errorFaltaEntrada: (dia) => `Am ${dia} fehlt der Beginn.`,
    errorIguales: (dia) => `Am ${dia} sind Beginn und Ende gleich.`,
    errorPausa: (dia) => `Die Pause ist so lang wie die Schicht am ${dia} oder länger.`,
    errorSinDias: "Tragen Sie für mindestens einen Tag Beginn und Ende ein.",
    observacionNoche: "Manche Schichten enden am nächsten Tag. Sie zählen ganz für den Tag, an dem sie beginnen.",
    observacionGenerico:
      "Das ist eine allgemeine Berechnung. Höchstarbeitszeit, Regeln für Überstunden und Zuschläge für Nacht- oder Feiertagsarbeit hängen vom Gesetz, vom Tarifvertrag und von Ihrem Arbeitsvertrag ab.",
  }),
};
