import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDe: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const c = {
    h1: "Zinsrechner",
    title: tituloQueEntre(
      `Zinsrechner: Zinsen für Tage, Monate, Jahre | ${ctx.nombrePais}`,
      `Zinsrechner | ${ctx.nombrePais}`,
      "Zinsrechner",
    ),
    description:
      "Berechnen Sie die Zinsen auf ein Kapital bei einem Jahreszins, für Tage, Monate oder Jahre. Mit 365 oder 360 Tagen pro Jahr und Endbetrag.",
    intro: [
      "Bei der einfachen Zinsrechnung werden die Zinsen immer auf das ursprüngliche Kapital berechnet. Sie kommen während der Laufzeit nicht zum Kapital dazu.",
      "So rechnet man bei kurzen Festgeldanlagen, privaten Darlehen und in vielen Schulaufgaben.",
    ],
    comoSeCalcula: [
      "Zinsen = Kapital × Zinssatz × Laufzeit in Jahren.",
      "Bei Monaten teilen Sie durch 12, bei Tagen durch 365 oder 360, je nachdem, wie die Bank das Jahr zählt.",
      "Endbetrag = Kapital + Zinsen.",
    ],
    ejemplo: [
      `${m(capital)} bringen bei 10 % Zinsen in 6 Monaten ${m(capital * 0.1 * 0.5)} Zinsen.`,
      `Dasselbe Kapital bringt in 90 Tagen ${m((capital * 0.1 * 90) / 365)} Zinsen bei 365 Tagen pro Jahr und ${m((capital * 0.1 * 90) / 360)} bei 360 Tagen.`,
    ],
    faq: [
      {
        pregunta: "Wie lautet die Zinsformel?",
        respuesta: `Z = K × p × t ÷ 100. K ist das Kapital, p der Zinssatz in Prozent und t die Zeit in Jahren. Mit dem Zinssatz als Dezimalzahl (10 % sind ${formatearNumero(ctx, 0.1, 2)}) entfällt das ÷ 100.`,
      },
      {
        pregunta: "Was ist der Unterschied zum Zinseszins?",
        respuesta: "Einfache Zinsen werden immer auf dasselbe Kapital berechnet. Beim Zinseszins kommen die Zinsen zum Kapital dazu und bringen selbst wieder Zinsen.",
      },
      {
        pregunta: "Warum rechnen manche Banken mit 360 Tagen?",
        respuesta: "Das ist eine kaufmännische Konvention: 12 Monate zu je 30 Tagen. Mit 360 Tagen fallen die Zinsen etwas höher aus. Fragen Sie nach, welche Methode Ihre Bank verwendet.",
      },
    ],
    glosario: [
      { termino: "Kapital", definicion: "Das Geld, das verliehen oder angelegt wird." },
      { termino: "Kaufmännisches Jahr", definicion: "Ein Jahr mit 360 Tagen und Monaten zu je 30 Tagen." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};
