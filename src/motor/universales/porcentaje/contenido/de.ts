import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDe: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const c = {
    h1: "Prozentrechner",
    title: tituloQueEntre(
      `Prozentrechner: Prozente online berechnen | ${ctx.nombrePais}`,
      `Prozentrechner | ${ctx.nombrePais}`,
      "Prozentrechner",
    ),
    description:
      "Berechnen Sie Prozentwert und Prozentsatz oder schlagen Sie Prozente auf einen Betrag auf und ziehen sie ab. Mit Formeln und Beispielen.",
    intro: [
      "Wählen Sie aus, was Sie wissen möchten, und geben Sie die zwei Zahlen ein. Das Ergebnis sehen Sie sofort.",
      "Der Rechner deckt die vier Fälle ab, die im Alltag am häufigsten vorkommen: Prozentwert, Prozentsatz, Aufschlag und Abzug.",
    ],
    comoSeCalcula: [
      "Prozentwert = Grundwert × Prozentsatz ÷ 100.",
      "Prozentsatz = Prozentwert ÷ Grundwert × 100.",
      "Y plus X % = Y × (1 + X ÷ 100). Y minus X % = Y × (1 − X ÷ 100).",
    ],
    ejemplo: [
      `15 % von ${n(200)} sind ${n(30)}.`,
      `${n(30)} sind 25 % von ${n(120)}.`,
      `Ein Preis von ${m(precio)} steigt um 10 % auf ${m(precio * 1.1)}.`,
    ],
    faq: [
      {
        pregunta: "Wie berechne ich Prozent von einer Zahl?",
        respuesta: "Multiplizieren Sie die Zahl mit dem Prozentsatz und teilen Sie durch 100. 20 % von 350 sind 350 × 20 ÷ 100 = 70.",
      },
      {
        pregunta: "Wie viel Prozent sind X von Y?",
        respuesta: "Teilen Sie den Anteil durch das Ganze und multiplizieren Sie mit 100. 45 richtige Antworten von 60 sind 45 ÷ 60 × 100 = 75 %.",
      },
      {
        pregunta: "Wie schlage ich Prozente auf einen Preis auf?",
        respuesta: `Multiplizieren Sie den Preis mit 1 plus dem Prozentsatz als Dezimalzahl. Für 10 % Aufschlag rechnen Sie mal ${n(1.1, 2)}.`,
      },
      {
        pregunta: "Bin ich nach 10 % plus und 10 % minus wieder beim Ausgangswert?",
        respuesta: "Nein. 100 plus 10 % sind 110, und 110 minus 10 % sind 99. Der Abzug bezieht sich auf den größeren Wert.",
      },
    ],
    glosario: [
      { termino: "Grundwert", definicion: "Die Zahl, von der der Prozentsatz genommen wird (hier Y)." },
      { termino: "Prozentsatz", definicion: "Der Anteil in Hundertsteln, also die Zahl vor dem Prozentzeichen." },
      { termino: "Prozentwert", definicion: "Der Betrag, der sich aus Grundwert und Prozentsatz ergibt." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};
