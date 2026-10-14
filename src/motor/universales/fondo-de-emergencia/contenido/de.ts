import { paraSuiza } from "../../comun/locales";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

const contenido: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  const c = {
    h1: "Notgroschen berechnen",
    title: tituloQueEntre(
      `Notgroschen berechnen: Wie viel Rücklage brauche ich? | ${ctx.nombrePais}`,
      `Notgroschen berechnen | ${ctx.nombrePais}`,
      "Notgroschen berechnen",
    ),
    description:
      "Berechnen Sie, wie hoch Ihr Notgroschen sein sollte und wie viele Monate Sie brauchen, um ihn mit Ihrer Sparrate aufzubauen.",
    intro: [
      "Der Notgroschen ist Geld für das, was sich nicht planen lässt: Jobverlust, Krankheit oder eine dringende Reparatur an Wohnung oder Auto.",
      "Mit einer Rücklage müssen Sie in schwierigen Momenten nicht den Dispo nutzen. Geben Sie Ihre festen Ausgaben ein und wie viele Monate Sie absichern möchten.",
    ],
    comoSeCalcula: [
      "Empfohlener Notgroschen = feste Ausgaben pro Monat × abzudeckende Monate.",
      "Noch zu sparen = empfohlener Notgroschen − bereits Zurückgelegtes.",
      "Monate bis zum Ziel = noch zu sparen ÷ monatliche Sparrate, aufgerundet.",
    ],
    ejemplo: [
      `Bei ${m(gastos)} festen Ausgaben im Monat beträgt ein Notgroschen für 6 Monate ${m(gastos * 6)}.`,
      `Mit ${m(aporte)} Sparrate im Monat haben Sie ihn in ${Math.ceil((gastos * 6) / aporte)} Monaten zusammen.`,
    ],
    faq: [
      {
        pregunta: "Wie hoch sollte ein Notgroschen sein?",
        respuesta:
          "Die übliche Faustregel sind 3 bis 6 Monatsausgaben. Wer selbstständig ist, ein schwankendes Einkommen hat oder Alleinverdiener ist, plant besser 6 bis 12 Monate ein.",
      },
      {
        pregunta: "Wo lege ich den Notgroschen am besten an?",
        respuesta: "Auf einem sicheren Konto, auf das Sie sofort zugreifen können, getrennt vom Girokonto. Ein Tagesgeldkonto ist dafür typisch. Für riskante Anlagen ist das Geld nicht gedacht.",
      },
      {
        pregunta: "Erst den Notgroschen aufbauen oder erst Schulden tilgen?",
        respuesta: "Ein verbreiteter Weg: zuerst eine Monatsausgabe zurücklegen, dann teure Schulden wie den Dispo abbauen und danach den Notgroschen vervollständigen.",
      },
    ],
    glosario: [
      { termino: "Feste Ausgaben", definicion: "Kosten, die Sie auch ohne Einkommen weiter zahlen müssen: Miete, Lebensmittel, Energie, Versicherungen." },
      { termino: "Tagesgeld", definicion: "Ein verzinstes Konto, über dessen Guthaben Sie täglich verfügen können." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};

export const contenidoDe: ContenidoUniversal = (ctx) => paraSuiza(ctx.locale, contenido(ctx));
