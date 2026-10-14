import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoDe: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `Ein Zimmer mit 48 ft Wandlänge, 8 ft Höhe und 40 ft² Türen und Fenstern hat ${n(neta, 0)} ft² zu streichende Fläche.`,
          `Mit 2 Anstrichen und einer Farbe für 350 ft² pro Gallone brauchen Sie ${n(gal, 2)} Gallonen. Mit Reserve sind es ${n(gal * (1 + MARGEN), 2)} Gallonen.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `Ein Zimmer mit 14 m Wandumfang, ${n(2.6)} m Raumhöhe und 4 m² Türen und Fenstern hat ${n(neta)} m² zu streichende Fläche.`,
          `Mit 2 Anstrichen und einer Ergiebigkeit von 10 m² pro Liter brauchen Sie ${n(litros, 2)} Liter. Mit Reserve sind es ${n(litros * (1 + MARGEN), 2)} Liter.`,
        ];
      })();
  const c = {
    h1: "Farbbedarf berechnen",
    title: tituloQueEntre(
      `Farbbedarf berechnen: Wie viel Wandfarbe? | ${ctx.nombrePais}`,
      `Farbbedarf berechnen | ${ctx.nombrePais}`,
      "Farbbedarf berechnen",
    ),
    description:
      "Berechnen Sie, wie viel Wandfarbe Sie brauchen. Aus Wandfläche, Türen und Fenstern, Anzahl der Anstriche und Ergiebigkeit laut Eimer.",
    intro: [
      "Geben Sie Länge und Höhe der Wände ein (oder direkt die Fläche), dazu Türen und Fenster und die Zahl der Anstriche.",
      "Der Rechner schlägt 10 % Reserve auf, damit Ihnen die Farbe nicht mitten in der Wand ausgeht.",
    ],
    comoSeCalcula: [
      "Fläche = Gesamtlänge der Wände × Raumhöhe, minus Türen und Fenster.",
      "Farbe = Fläche × Anstriche ÷ Ergiebigkeit.",
      `Dazu kommt eine Reserve von ${MARGEN * 100} %.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Wie viel Fläche schafft ein Liter Wandfarbe?",
        respuesta: "Die meisten Innenfarben reichen für etwa 6 bis 10 m² pro Liter und Anstrich. Den genauen Wert finden Sie auf dem Eimer unter Ergiebigkeit oder Verbrauch.",
      },
      {
        pregunta: "Wie oft muss ich streichen?",
        respuesta: "Üblich sind zwei Anstriche. Neuer Putz, stark saugende Wände oder ein großer Farbwechsel können einen dritten nötig machen. Eine Grundierung hilft bei saugenden Untergründen.",
      },
      {
        pregunta: "Soll ich Türen und Fenster abziehen?",
        respuesta: "Ja, wenn sie groß sind. Kleine Flächen ziehen Sie besser nicht ab. Die Reserve brauchen Sie für Kanten und Ecken.",
      },
      {
        pregunta: "Wie berechne ich die Deckenfläche?",
        respuesta: "Nehmen Sie Länge mal Breite des Raums und wählen Sie oben „Die gesamte Fläche“. Ein Raum mit 4 mal 5 Metern hat 20 m² Decke.",
      },
    ],
    glosario: [
      { termino: "Ergiebigkeit", definicion: "Wie viel Fläche ein Liter Farbe bei einem Anstrich deckt, angegeben in m² pro Liter." },
      { termino: "Anstrich", definicion: "Jede Farbschicht, die Sie auf die Wand auftragen." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};
