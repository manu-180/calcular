import { formatearNumero, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `A room with 48 ft of walls, 8 ft high, and 40 ft² of doors and windows has ${n(neta, 0)} ft² to paint.`,
          `With 2 coats and paint that covers 350 ft² per gallon, you need ${n(gal, 2)} gallons. With the margin, ${n(gal * (1 + MARGEN), 2)} gallons.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `A room with 14 m of walls, ${n(2.6)} m high, and 4 m² of doors and windows has ${n(neta)} m² to paint.`,
          `With 2 coats and paint that covers 10 m² per litre, you need ${n(litros, 2)} litres. With the margin, ${n(litros * (1 + MARGEN), 2)} litres.`,
        ];
      })();
  return {
    h1: "Paint calculator",
    title: `Paint calculator for ${ctx.nombrePais}`,
    description: "Work out how much paint you need for your walls from their size, doors and windows, number of coats and the coverage on the tin.",
    intro: [
      "Enter the length and height of the walls (or the area directly), what doors and windows take up, and how many coats you'll apply.",
      "It adds 10% extra so you don't run out halfway through.",
    ],
    comoSeCalcula: [
      "Area = total wall length × height, minus doors and windows.",
      "Paint = area × coats ÷ coverage.",
      `It then adds a ${MARGEN * 100}% margin.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "How much does a gallon of paint cover?",
        respuesta: "Most interior wall paint covers about 350 to 400 ft² per gallon per coat (8 to 12 m² per litre). The exact figure is on the tin.",
      },
      {
        pregunta: "How many coats do I need?",
        respuesta: "Two coats is standard. New plaster, very porous walls or a big colour change may need a third.",
      },
      {
        pregunta: "Should I leave out doors and windows?",
        respuesta: "Yes, if they are large. It is better not to subtract small ones: the extra covers edges and cutting in.",
      },
    ],
    glosario: [
      { termino: "Coverage", definicion: "How much area a litre or gallon of paint covers in one coat." },
      { termino: "Coat", definicion: "Each layer of paint applied to the wall." },
    ],
  };
};
