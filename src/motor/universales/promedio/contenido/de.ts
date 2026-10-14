import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDe: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const gewichtet = (2 * 1 + 3 * 1 + 1 * 2) / 4;
  const einfach = (2 + 3 + 1) / 3;
  const c = {
    h1: "Notendurchschnitt berechnen",
    title: tituloQueEntre(
      `Notendurchschnitt berechnen, auch gewichtet | ${ctx.nombrePais}`,
      `Notendurchschnitt berechnen | ${ctx.nombrePais}`,
      "Notendurchschnitt berechnen",
    ),
    description:
      "Berechnen Sie Ihren Notendurchschnitt, einfach oder gewichtet, mit bis zu 10 Noten. Gewichtung in Prozent, ECTS oder als Faktor.",
    intro: [
      "Geben Sie jede Note ein und wie stark sie zählt. Sie sehen den gewichteten Durchschnitt und daneben den einfachen.",
      "Das funktioniert für Zeugnisnoten, Klausuren, das Studium und jeden anderen Durchschnitt, bei dem manche Werte mehr zählen als andere.",
    ],
    comoSeCalcula: [
      "Einfacher Durchschnitt = Summe der Noten ÷ Anzahl der Noten.",
      "Gewichteter Durchschnitt = Summe aus (Note × Gewichtung) ÷ Summe der Gewichtungen.",
      "Die Gewichtungen müssen nicht 100 ergeben. Der Rechner teilt durch ihre Summe.",
    ],
    ejemplo: [
      `Sie haben eine 2 und eine 3 in Tests und eine 1 in der Klausur, die doppelt zählt. Der gewichtete Durchschnitt ist ${n(gewichtet)}.`,
      `Der einfache Durchschnitt der drei Noten wäre ${n(einfach)}. Die doppelt gewichtete Klausur verbessert den Schnitt.`,
    ],
    faq: [
      {
        pregunta: "Wie berechne ich einen gewichteten Notendurchschnitt?",
        respuesta: "Multiplizieren Sie jede Note mit ihrer Gewichtung, zählen Sie alles zusammen und teilen Sie durch die Summe der Gewichtungen.",
      },
      {
        pregunta: "Was mache ich, wenn die Gewichtungen nicht 100 % ergeben?",
        respuesta: "Das ist kein Problem. Hat ein Modul 6 ECTS und ein anderes 4, tragen Sie 6 und 4 ein. Der Rechner teilt durch die Summe.",
      },
      {
        pregunta: "Was ist der Unterschied zwischen einfachem und gewichtetem Durchschnitt?",
        respuesta: "Beim einfachen Durchschnitt zählt jede Note gleich viel. Beim gewichteten zählt jede so viel wie ihre Gewichtung.",
      },
      {
        pregunta: "Wird der Notendurchschnitt gerundet?",
        respuesta: "Das regelt jede Schule und Hochschule selbst. Oft wird nach der ersten Nachkommastelle abgeschnitten, nicht gerundet. Der Rechner zeigt den genauen Wert.",
      },
    ],
    glosario: [
      { termino: "Gewichtung", definicion: "Wie stark eine Note in den Durchschnitt eingeht." },
      { termino: "Gewichteter Durchschnitt", definicion: "Ein Durchschnitt, bei dem jede Note mit ihrer Gewichtung multipliziert wird." },
      { termino: "ECTS", definicion: "Leistungspunkte im Studium. Sie dienen oft als Gewichtung für die Modulnoten." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};
