import { paraSuiza } from "../../comun/locales";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

const contenido: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.1;
  const m = (n: number) => formatearMonto(ctx, n);
  const c = {
    h1: "Trinkgeldrechner",
    title: tituloQueEntre(
      `Trinkgeldrechner: Trinkgeld und Anteil berechnen | ${ctx.nombrePais}`,
      `Trinkgeldrechner | ${ctx.nombrePais}`,
      "Trinkgeldrechner",
    ),
    description:
      "Berechnen Sie Trinkgeld, Gesamtbetrag und den Anteil pro Person, wenn Sie die Rechnung teilen. Auf Wunsch auf glatte Beträge aufgerundet.",
    intro: [
      "Geben Sie den Rechnungsbetrag, das Trinkgeld in Prozent und die Zahl der Personen ein. Sie sehen Trinkgeld, Gesamtbetrag und den Anteil pro Kopf.",
      "Wenn Sie lieber runde Beträge zahlen, rundet der Rechner jeden Anteil auf. Der Unterschied geht ins Trinkgeld.",
    ],
    comoSeCalcula: [
      "Trinkgeld = Rechnungsbetrag × Prozentsatz ÷ 100.",
      "Gesamtbetrag = Rechnungsbetrag + Trinkgeld.",
      "Der Anteil pro Person ist der Gesamtbetrag geteilt durch die Zahl der Personen.",
    ],
    ejemplo: [
      `Bei einer Rechnung von ${m(cuenta)} und 10 % Trinkgeld kommen ${m(propina)} dazu. Insgesamt sind das ${m(cuenta + propina)}.`,
      `Teilen sich 3 Personen die Rechnung, zahlt jede ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Wie viel Trinkgeld ist üblich?",
        respuesta: `Das hängt vom Ort und vom Service ab. In ${ctx.nombrePais} sollten Sie prüfen, was üblich ist und ob das Bedienungsgeld schon im Preis enthalten ist.`,
      },
      {
        pregunta: "Gebe ich Trinkgeld auf den Betrag mit oder ohne Mehrwertsteuer?",
        respuesta: "Meist rechnet man mit dem Betrag, der auf der Rechnung steht. Wenn Sie lieber vom Nettobetrag ausgehen, geben Sie diesen ein.",
      },
      {
        pregunta: "Wie rechne ich 10 % Trinkgeld schnell im Kopf?",
        respuesta: `Teilen Sie den Betrag durch 10. Bei 46 sind das ${formatearNumero(ctx, 4.6, 2)}. Viele runden dann einfach auf 50 auf.`,
      },
    ],
    glosario: [
      { termino: "Trinkgeld", definicion: "Ein freiwilliger Betrag für den Service, zusätzlich zum Preis." },
      { termino: "Bedienungsgeld", definicion: "Ein Aufschlag für den Service, den das Lokal schon auf die Rechnung gesetzt hat." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};

export const contenidoDe: ContenidoUniversal = (ctx) => paraSuiza(ctx.locale, contenido(ctx));
