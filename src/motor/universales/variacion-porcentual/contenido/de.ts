import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDe: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  const c = {
    h1: "Prozentuale Veränderung berechnen",
    title: tituloQueEntre(
      `Prozentuale Veränderung berechnen | ${ctx.nombrePais}`,
      `Prozentuale Veränderung | ${ctx.nombrePais}`,
      "Prozentuale Veränderung berechnen",
    ),
    description:
      "Berechnen Sie, um wie viel Prozent ein Wert gestiegen oder gesunken ist. Für Preise, Gehalt, Umsatz oder jede andere Zahl.",
    intro: [
      "Geben Sie den alten und den neuen Wert ein. Sie sehen sofort die prozentuale Steigerung oder Abnahme und die Differenz.",
      "Außerdem zeigt der Rechner, um wie viel Prozent sich der Wert ändern müsste, um wieder beim alten Wert zu landen. Das ist fast nie derselbe Prozentsatz.",
    ],
    comoSeCalcula: [
      "Prozentuale Veränderung = (neuer Wert − alter Wert) ÷ alter Wert × 100.",
      "Ein positives Ergebnis heißt, der Wert ist gestiegen. Ein negatives heißt, er ist gesunken.",
      "Ist der alte Wert negativ, teilt der Rechner durch seinen Betrag. So zeigt das Vorzeichen weiterhin, ob sich der Wert verbessert hat.",
    ],
    ejemplo: [
      `Was früher ${m(antes)} gekostet hat und heute ${m(despues)} kostet, ist um 25 % teurer geworden.`,
      "Um wieder beim alten Preis zu landen, müsste er um 20 % sinken, nicht um 25 %.",
    ],
    faq: [
      {
        pregunta: "Wie berechne ich eine prozentuale Steigerung?",
        respuesta:
          "Ziehen Sie den alten Wert vom neuen ab, teilen Sie durch den alten Wert und multiplizieren Sie mit 100. Von 80 auf 100: 20 ÷ 80 × 100 = 25 %.",
      },
      {
        pregunta: "Wie berechne ich eine prozentuale Abnahme?",
        respuesta: "Mit derselben Formel. Von 100 auf 80: −20 ÷ 100 × 100 = −20 %. Der Wert ist also um 20 % gesunken.",
      },
      {
        pregunta: "Warum heben sich 25 % plus und 25 % minus nicht auf?",
        respuesta: "Weil sich jeder Prozentsatz auf einen anderen Grundwert bezieht. 80 plus 25 % sind 100, aber 100 minus 25 % sind 75.",
      },
      {
        pregunta: "Was ist der Unterschied zwischen Prozent und Prozentpunkten?",
        respuesta: "Steigt ein Zinssatz von 10 % auf 12 %, ist er um 2 Prozentpunkte gestiegen. Prozentual ist das eine Steigerung um 20 %.",
      },
    ],
    glosario: [
      { termino: "Prozentuale Veränderung", definicion: "Um wie viel sich ein Wert verändert hat, gemessen in Prozent des alten Werts." },
      { termino: "Prozentpunkt", definicion: "Die einfache Differenz zwischen zwei Prozentangaben." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};
