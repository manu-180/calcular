import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDe: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `Für 150 ft² mit Fliesen von 12 × 12 in (je 1 ft²) und 10 % Verschnitt brauchen Sie ${piezas} Fliesen.`,
          `Sind 10 Fliesen in einem Paket, sind das ${Math.ceil(piezas / 10)} Pakete.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `Für 20 m² mit Fliesen von 60 × 60 cm (je ${n(pieza)} m²) und 10 % Verschnitt brauchen Sie ${piezas} Fliesen.`,
          `Sind 4 Fliesen in einem Paket, sind das ${Math.ceil(piezas / 4)} Pakete.`,
        ];
      })();
  const c = {
    h1: "Fliesenrechner",
    title: tituloQueEntre(
      `Fliesenrechner: Fliesenbedarf mit Verschnitt | ${ctx.nombrePais}`,
      `Fliesenrechner | ${ctx.nombrePais}`,
      "Fliesenrechner",
    ),
    description:
      "Berechnen Sie, wie viele Fliesen Sie für Boden oder Wand brauchen, inklusive Verschnitt, und wie viele Pakete Sie kaufen müssen.",
    intro: [
      "Geben Sie die Fläche, das Format der Fliesen und die Stückzahl pro Paket ein. Sie sehen, wie viele Fliesen und Pakete Sie kaufen müssen.",
      "Der Verschnitt deckt Zuschnitte am Rand und die eine oder andere zerbrochene Fliese ab.",
    ],
    comoSeCalcula: [
      `Fläche einer Fliese = Länge × Breite, umgerechnet in ${imperial ? "Quadratfuß" : "Quadratmeter"}.`,
      "Fliesen = Fläche × (1 + Verschnitt ÷ 100) ÷ Fläche einer Fliese, aufgerundet.",
      "Pakete = Fliesen ÷ Fliesen pro Paket, aufgerundet.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Mit wie viel Verschnitt sollte ich rechnen?",
        respuesta: "Mit 10 % bei gerader Verlegung. Bei diagonaler Verlegung, Fischgrätmuster oder Räumen mit vielen Ecken mit 15 bis 20 %.",
      },
      {
        pregunta: "Muss ich die Fugen einrechnen?",
        respuesta: "Nein. Fugen sind nur wenige Millimeter breit. Der Verschnitt gleicht den Unterschied schon aus.",
      },
      {
        pregunta: "Sollte ich Ersatzfliesen kaufen?",
        respuesta: "Ja, ein paar Fliesen aus derselben Charge. Geht später eine kaputt, ist der Farbton oft schwer nachzukaufen.",
      },
    ],
    glosario: [
      { termino: "Verschnitt", definicion: "Der Prozentsatz, den Sie für Zuschnitte und Bruch zusätzlich kaufen." },
      { termino: "Charge", definicion: "Die Produktionsserie. Fliesen aus verschiedenen Chargen können im Farbton leicht abweichen." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};
