import { paraSuiza } from "../../comun/locales";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

const contenido: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  const c = {
    h1: "Arbeitszeitrechner",
    title: tituloQueEntre(
      `Arbeitszeitrechner: Stunden und Überstunden | ${ctx.nombrePais}`,
      `Arbeitszeitrechner | ${ctx.nombrePais}`,
      "Arbeitszeitrechner",
    ),
    description:
      "Rechnen Sie Ihre Arbeitsstunden der Woche aus Beginn, Ende und Pausen zusammen und berechnen Sie Ihren Lohn mit Überstunden.",
    intro: [
      "Wählen Sie für jeden Tag Beginn und Ende, Ihre unbezahlte Pause und Ihren Stundenlohn. Sie sehen die Stunden insgesamt, die Überstunden und Ihren Wochenlohn.",
      "So prüfen Sie Ihre Lohnabrechnung, füllen einen Stundenzettel aus oder rechnen Stundenarbeit ab.",
    ],
    comoSeCalcula: [
      "Stunden pro Tag = Ende − Beginn − Pause. Liegt das Ende vor dem Beginn, endet die Schicht am nächsten Tag.",
      "Überstunden = Wochenstunden − Regelarbeitszeit, wenn die Summe darüber liegt.",
      "Lohn = reguläre Stunden × Stundenlohn + Überstunden × Stundenlohn × (1 + Zuschlag).",
    ],
    ejemplo: [
      `Von ${hora("09:00")} bis ${hora("17:30")} mit 30 Minuten Pause sind ${n(jornada)} Stunden am Tag. Von Montag bis Freitag sind das ${n(jornada * 5)} Stunden, bei ${m(pago)} pro Stunde also ${m(jornada * 5 * pago)}.`,
      `Von ${hora("08:00")} bis ${hora("18:00")} mit einer Stunde Pause sind es ${n(larga * 5)} Stunden in der Woche, davon ${n(extra)} Überstunden. Mit 25 % Zuschlag ergibt das ${m(40 * pago + extra * pago * 1.25)}.`,
    ],
    faq: [
      {
        pregunta: "Wie berechne ich meine Arbeitszeit?",
        respuesta: "Ziehen Sie den Beginn vom Ende ab und dann die Pause. Danach zählen Sie alle Tage der Woche zusammen.",
      },
      {
        pregunta: "Wie rechne ich Minuten in Industrieminuten um?",
        respuesta: `Teilen Sie die Minuten durch 60. Eine halbe Stunde sind ${n(0.5, 1)}, 15 Minuten ${n(0.25, 2)} und 45 Minuten ${n(0.75, 2)}. 7 Stunden und 45 Minuten sind also ${n(7.75, 2)} Stunden.`,
      },
      {
        pregunta: "Wie viele Überstunden sind erlaubt und wie werden sie bezahlt?",
        respuesta: "Das regeln Gesetz, Tarifvertrag und Arbeitsvertrag. Einen gesetzlichen Zuschlag für Überstunden gibt es nicht überall. Der Rechner nutzt die Regelarbeitszeit und den Zuschlag, die Sie eintragen.",
      },
    ],
    glosario: [
      { termino: "Überstunden", definicion: "Stunden über die vereinbarte Regelarbeitszeit hinaus." },
      { termino: "Industrieminuten", definicion: "Arbeitszeit als Dezimalzahl, bei der eine Stunde 100 statt 60 Einheiten hat." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};

export const contenidoDe: ContenidoUniversal = (ctx) => paraSuiza(ctx.locale, contenido(ctx));
