import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoDe: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const c = {
    h1: "Effektivzins berechnen",
    title: tituloQueEntre(
      `Effektivzins berechnen: Nominalzins umrechnen | ${ctx.nombrePais}`,
      `Effektivzins berechnen | ${ctx.nombrePais}`,
      "Effektivzins berechnen",
    ),
    description:
      "Rechnen Sie einen Nominalzins in den effektiven Jahreszins um und zurück, bei monatlicher, vierteljährlicher, halbjährlicher oder täglicher Zinsverrechnung.",
    intro: [
      "Zwei Angebote mit demselben Zinssatz können unterschiedlich viel kosten. Der Unterschied liegt darin, wie oft die Zinsen verrechnet werden.",
      "Der effektive Jahreszins macht Angebote vergleichbar: Er zeigt, was Sie in einem Jahr wirklich zahlen oder bekommen. Wählen Sie den Zinssatz, den Sie kennen, und Sie sehen den anderen.",
    ],
    comoSeCalcula: [
      "Effektivzins = (1 + Nominalzins ÷ m) hoch m, minus 1. Dabei ist m die Zahl der Zinsperioden pro Jahr, also 12 bei monatlicher und 4 bei vierteljährlicher Verrechnung.",
      "Nominalzins = m × ((1 + Effektivzins) hoch 1 ÷ m, minus 1).",
      "Der Zinssatz pro Periode ist der Nominalzins geteilt durch m.",
    ],
    ejemplo: [
      `Ein Nominalzins von 12 % mit monatlicher Verrechnung entspricht einem Effektivzins von ${p(aEfectiva(12, 12))}.`,
      `Ein Effektivzins von 10 % entspricht bei monatlicher Verrechnung einem Nominalzins von ${p(aNominal(10, 12))}.`,
    ],
    faq: [
      {
        pregunta: "Was ist der Unterschied zwischen Nominalzins und Effektivzins?",
        respuesta:
          "Der Nominalzins ist der Jahreszins ohne Zinseszins. Der Effektivzins berücksichtigt, dass Zinsen wieder Zinsen bringen. Deshalb ist er immer gleich hoch oder höher.",
      },
      {
        pregunta: "Welchen Zinssatz nehme ich für den Vergleich von Angeboten?",
        respuesta:
          "Beim Sparen den Effektivzins, weil er zeigt, was Sie wirklich bekommen. Bei Krediten enthält der in Angeboten genannte effektive Jahreszins oft auch Gebühren. Dieser Rechner rechnet nur den Zinseszins ein.",
      },
      {
        pregunta: "Warum steigt der Effektivzins bei häufigerer Verrechnung?",
        respuesta:
          "Die Zinsen kommen früher zum Saldo dazu und bringen selbst wieder Zinsen. Bei jährlicher Verrechnung sind Nominal- und Effektivzins gleich.",
      },
    ],
    glosario: [
      { termino: "Nominalzins", definicion: "Der Jahreszins ohne den Effekt des Zinseszinses. Bei Krediten heißt er auch Sollzins." },
      { termino: "Effektivzins", definicion: "Der Jahreszins mit Zinseszins, also das, was im Jahr wirklich anfällt." },
      { termino: "Zinsverrechnung", definicion: "Der Zeitpunkt, an dem die Zinsen dem Saldo zugerechnet werden." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};
