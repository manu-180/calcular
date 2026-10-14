import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `Een kamer met 48 ft muur, 8 ft hoog, en 40 ft² aan deuren en ramen heeft ${n(neta, 0)} ft² te verven.`,
          `Met 2 lagen en verf die 350 ft² per gallon dekt, heb je ${n(gal, 2)} gallon nodig. Met de marge erbij is dat ${n(gal * (1 + MARGEN), 2)} gallon.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `Een kamer met 14 m muur, ${n(2.6)} m hoog, en 4 m² aan deuren en ramen heeft ${n(neta)} m² te verven.`,
          `Met 2 lagen en verf die 10 m² per liter dekt, heb je ${n(litros, 2)} liter nodig. Met de marge erbij is dat ${n(litros * (1 + MARGEN), 2)} liter.`,
        ];
      })();
  return {
    h1: "Verf berekenen",
    title: tituloQueEntre(`Verf berekenen in ${ctx.nombrePais}`, "Verf berekenen"),
    description: "Bereken hoeveel verf je nodig hebt voor je muren, met de maten, de deuren en ramen, het aantal lagen en het rendement op het blik.",
    intro: [
      "Vul de lengte en hoogte van de muren in (of meteen de oppervlakte), hoeveel ruimte deuren en ramen innemen en hoeveel lagen je verft.",
      "De rekenhulp telt er 10% bij op, zodat je niet halverwege zonder verf zit.",
    ],
    comoSeCalcula: [
      "Oppervlakte = totale lengte van de muren × hoogte, min deuren en ramen.",
      "Verf = oppervlakte × aantal lagen ÷ rendement.",
      `Daarna komt er ${n(MARGEN * 100, 0)}% marge bij.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Hoeveel m² kun je verven met een liter verf?",
        respuesta: "Met de meeste muurverf voor binnen verf je 8 tot 12 m² per liter per laag. Het precieze getal staat op het blik.",
      },
      {
        pregunta: "Hoeveel lagen heb je nodig?",
        respuesta: "Twee lagen is normaal. Nieuw stucwerk, een muur die veel opzuigt of een heel andere kleur kan een derde laag nodig hebben.",
      },
      {
        pregunta: "Moet je deuren en ramen eraf trekken?",
        respuesta: "Ja, als ze groot zijn. Kleine ramen kun je beter laten staan: de extra verf gaat op aan randen en hoeken.",
      },
    ],
    glosario: [
      { termino: "Rendement", definicion: "Hoeveel oppervlakte je met een liter verf in één laag dekt." },
      { termino: "Laag", definicion: "Elke keer dat je de muur helemaal verft." },
    ],
  };
};
