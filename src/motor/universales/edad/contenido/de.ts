import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionDe } from "../../dias-entre-fechas/textos/de";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDe: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  const c = {
    h1: "Altersrechner",
    title: tituloQueEntre(
      `Altersrechner: Alter in Jahren, Monaten, Tagen | ${ctx.nombrePais}`,
      `Altersrechner | ${ctx.nombrePais}`,
      "Altersrechner",
    ),
    description:
      "Berechnen Sie Ihr genaues Alter in Jahren, Monaten und Tagen, wie viele Tage Sie schon leben und wie lange es bis zum nächsten Geburtstag dauert.",
    intro: [
      "Geben Sie Ihr Geburtsdatum ein. Sie sehen Ihr genaues Alter von heute, auch in Monaten, Wochen und Tagen.",
      "Ändern Sie das zweite Datum, um das Alter an einem bestimmten Tag zu erfahren, auch in der Zukunft.",
    ],
    comoSeCalcula: [
      "Der Rechner zählt die vollen Monate von der Geburt bis zum gewählten Datum. Je 12 Monate ergeben ein Jahr.",
      "Die Tage nach dem letzten vollen Monat sind die Tage des Alters.",
      "Schaltjahre zählen mit ihren 366 Tagen.",
    ],
    ejemplo: [
      `Wer am ${fechaLarga(ctx.locale, nac)} geboren ist, war am ${fechaLarga(ctx.locale, ref)} genau ${duracionDe(Math.floor(meses / 12), meses % 12, dias)} alt.`,
      `Das sind ${formatearNumero(ctx, total)} Tage.`,
    ],
    faq: [
      {
        pregunta: "Wie wird das genaue Alter berechnet?",
        respuesta: "Zuerst zählen die vollen Jahre, dann die vollen Monate seit dem letzten Geburtstag und zum Schluss die übrigen Tage.",
      },
      {
        pregunta: "Wann hat jemand Geburtstag, der am 29. Februar geboren ist?",
        respuesta: "In Jahren ohne Schalttag nimmt dieser Rechner den 28. Februar. Manche Regelungen setzen stattdessen den 1. März an.",
      },
      {
        pregunta: "Wie viele Tage bin ich alt?",
        respuesta: "Das zeigt die Zeile „In Tagen“. Gezählt wird jeder Tag von der Geburt bis zum gewählten Datum, ohne diesen letzten Tag.",
      },
    ],
    glosario: [
      { termino: "Alter", definicion: "Die Zahl der vollen Jahre seit der Geburt." },
      { termino: "Schaltjahr", definicion: "Ein Jahr mit 366 Tagen und einem 29. Februar. Es kommt alle vier Jahre, mit Ausnahme mancher Jahrhundertjahre." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};
