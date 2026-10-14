import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoDe: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  const c = {
    h1: "Quadratmeter berechnen",
    title: tituloQueEntre(
      `Quadratmeter berechnen: Flächenrechner | ${ctx.nombrePais}`,
      `Quadratmeter berechnen | ${ctx.nombrePais}`,
      "Quadratmeter berechnen",
    ),
    description:
      "Berechnen Sie die Fläche eines Zimmers, Bodens oder Grundstücks: Rechtecke, Dreiecke und Kreise, bis zu fünf Teilflächen zusammen.",
    intro: [
      "Wählen Sie eine Form und tragen Sie die Maße ein. Ist der Raum kein einfaches Rechteck, teilen Sie ihn in Teilflächen auf. Der Rechner zählt sie zusammen.",
      imperial ? "Das Ergebnis sehen Sie auch in Quadratmetern." : "Das Ergebnis sehen Sie auch in Quadratfuß.",
    ],
    comoSeCalcula: [
      "Rechteck: Länge × Breite.",
      "Dreieck: Grundseite × Höhe ÷ 2.",
      `Kreis: π × Radius × Radius. Der Radius ist der halbe Durchmesser. 1 m² sind ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `Ein L-förmiges Wohnzimmer lässt sich in ein Rechteck von 16 × 12 ft und eines von 10 × 6 ft teilen. Das sind zusammen ${n(enL, 0)} ft².`
        : `Ein L-förmiges Wohnzimmer lässt sich in ein Rechteck von 5 × 4 m und eines von 3 × 2 m teilen. Das sind zusammen ${n(enL, 0)} m².`,
      `Ein runder Tisch mit 2 ${u} Durchmesser hat eine Fläche von ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: "Wie berechne ich die Quadratmeter eines Zimmers?",
        respuesta: "Messen Sie Länge und Breite in Metern und multiplizieren Sie beide. Ein Zimmer mit 4 × 3 m hat 12 m².",
      },
      {
        pregunta: "Was mache ich mit Maßen in Zentimetern?",
        respuesta: `Rechnen Sie sie vorher in Meter um, indem Sie durch 100 teilen. 350 cm sind ${n(3.5, 1)} m.`,
      },
      {
        pregunta: "Ist die Bodenfläche dasselbe wie die Wohnfläche?",
        respuesta: "Nicht immer. Bei der Wohnfläche zählen zum Beispiel Flächen unter Dachschrägen oder Balkone oft nur anteilig. Für Mietvertrag oder Kauf gelten eigene Regeln.",
      },
    ],
    glosario: [
      { termino: "Quadratmeter (m²)", definicion: "Die Fläche eines Quadrats mit 1 Meter Seitenlänge." },
      { termino: "Teilfläche", definicion: "Ein einfacher Teil eines unregelmäßigen Raums, der sich leicht berechnen lässt." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};
