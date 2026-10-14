import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoDe: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const c = {
    h1: "Tage zwischen zwei Daten berechnen",
    title: tituloQueEntre(
      `Tagerechner: Tage zwischen zwei Daten | ${ctx.nombrePais}`,
      `Tagerechner | ${ctx.nombrePais}`,
      "Tagerechner",
    ),
    description:
      "Zählen Sie die Tage zwischen zwei Daten: Kalendertage, Wochen, Monate und Arbeitstage von Montag bis Freitag.",
    intro: [
      "Wählen Sie ein Start- und ein Enddatum. Sie sehen die Kalendertage, dieselbe Spanne in Wochen und Monaten und die Arbeitstage.",
      "Praktisch für Fristen, Abgabetermine, den Urlaub, die Schwangerschaft oder einen Countdown.",
    ],
    comoSeCalcula: [
      "Kalendertage sind alle Tage zwischen den beiden Daten. Der Starttag zählt mit, der Endtag nicht, außer Sie aktivieren die Option.",
      "Arbeitstage sind die Tage von Montag bis Freitag in derselben Spanne. Feiertage werden nicht abgezogen.",
      "Schaltjahre zählen mit ihrem 29. Februar.",
    ],
    ejemplo: [
      `Vom ${f(desde)} bis zum ${f(hasta)} sind es ${dias} Kalendertage.`,
      `Davon fallen ${habiles} auf Montag bis Freitag.`,
    ],
    faq: [
      {
        pregunta: "Wird der erste oder der letzte Tag mitgezählt?",
        respuesta: "Standardmäßig zählt der erste Tag mit und der letzte nicht, so wie beim Abziehen zweier Daten. Brauchen Sie beide, aktivieren Sie „Enddatum mitzählen“.",
      },
      {
        pregunta: "Werden Feiertage bei den Arbeitstagen abgezogen?",
        respuesta: "Nein. Gezählt werden Montag bis Freitag. Feiertage sind je nach Land, Bundesland oder Kanton und Jahr verschieden. Ziehen Sie sie bitte selbst ab.",
      },
      {
        pregunta: "Was ist der Unterschied zwischen Werktagen und Arbeitstagen?",
        respuesta: "Werktage sind im Alltag oft Montag bis Samstag. Arbeitstage sind die Tage, an denen üblicherweise gearbeitet wird, meist Montag bis Freitag. Dieser Rechner zählt Arbeitstage.",
      },
      {
        pregunta: "Wie viele Tage hat ein Jahr?",
        respuesta: "365, im Schaltjahr 366. Deshalb können dieselben zwei Daten in verschiedenen Jahren unterschiedlich weit auseinanderliegen.",
      },
    ],
    glosario: [
      { termino: "Kalendertage", definicion: "Alle Tage im Kalender, Wochenenden und Feiertage eingeschlossen." },
      { termino: "Arbeitstage", definicion: "In diesem Rechner Montag bis Freitag." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};
