import { paraSuiza } from "../../comun/locales";
import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

const contenido: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  const c = {
    h1: "Datum plus Tage berechnen",
    title: tituloQueEntre(
      `Datum plus Tage: Tage addieren oder abziehen | ${ctx.nombrePais}`,
      `Datum plus Tage berechnen | ${ctx.nombrePais}`,
      "Datum plus Tage berechnen",
    ),
    description:
      "Addieren oder subtrahieren Sie Kalendertage oder Arbeitstage zu einem Datum und sehen Sie, auf welchen Tag es fällt. Praktisch für Fristen.",
    intro: [
      "Wählen Sie ein Datum, die Zahl der Tage und ob addiert oder abgezogen wird. Sie sehen das Ergebnisdatum und den Wochentag.",
      "Bei Arbeitstagen überspringt der Rechner Samstage und Sonntage.",
    ],
    comoSeCalcula: [
      "Bei Kalendertagen geht es für jeden eingegebenen Tag einen Tag im Kalender weiter.",
      "Bei Arbeitstagen zählen nur Montag bis Freitag. Das Ausgangsdatum selbst zählt nicht mit.",
      "Feiertage werden nicht abgezogen, weil sie je nach Land und Region verschieden sind.",
    ],
    ejemplo: [
      `${f(inicio)} plus 90 Kalendertage ergibt den ${f(mas90)}.`,
      `${f(inicio)} plus 15 Arbeitstage ergibt den ${f(aFecha(habil))}.`,
    ],
    faq: [
      {
        pregunta: "Zählt das Ausgangsdatum als erster Tag?",
        respuesta: "Nein. Ein Montag plus 1 Tag ergibt Dienstag. So werden auch die meisten Fristen gezählt.",
      },
      {
        pregunta: "Was passiert, wenn ich Arbeitstage ab einem Samstag addiere?",
        respuesta: "Der erste Arbeitstag ist dann der folgende Montag. Ein Samstag plus 1 Arbeitstag ergibt Montag.",
      },
      {
        pregunta: "Berücksichtigt der Rechner Schaltjahre?",
        respuesta: "Ja. Liegt der 29. Februar in der Spanne, zählt er als zusätzlicher Tag.",
      },
      {
        pregunta: "Gilt das Ergebnis auch für rechtliche Fristen?",
        respuesta: "Nur als Orientierung. Bei gesetzlichen Fristen können Feiertage, Wochenenden am Fristende und besondere Regeln den letzten Tag verschieben.",
      },
    ],
    glosario: [
      { termino: "Kalendertage", definicion: "Alle Tage im Kalender, ohne einen auszulassen." },
      { termino: "Arbeitstage", definicion: "In diesem Rechner Montag bis Freitag." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};

export const contenidoDe: ContenidoUniversal = (ctx) => paraSuiza(ctx.locale, contenido(ctx));
