import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: imperial ? "Square footage calculator" : "Square metre calculator",
    title: imperial
      ? tituloQueEntre(`Square footage calculator for ${ctx.nombrePais}`, "Square footage calculator")
      : tituloQueEntre(`Square metre calculator for ${ctx.nombrePais}`, "Square metre calculator"),
    description: "Work out the area of a room, a floor or a plot: rectangles, triangles and circles, adding up to five shapes together.",
    intro: [
      "Choose a shape and enter its measurements. If the space isn't a simple rectangle, split it into parts and the calculator adds them up.",
      imperial ? "It also shows the result in square metres." : "It also shows the result in square feet.",
    ],
    comoSeCalcula: [
      "Rectangle: length × width.",
      "Triangle: base × height ÷ 2.",
      `Circle: π × radius × radius, where the radius is half the diameter. 1 m² is ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `An L-shaped living room can be split into a 16 × 12 ft rectangle and a 10 × 6 ft one. That is ${n(enL, 0)} ft² in total.`
        : `An L-shaped living room can be split into a 5 × 4 m rectangle and a 3 × 2 m one. That is ${n(enL, 0)} m² in total.`,
      `A round table 2 ${u} across covers ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: imperial ? "How do I work out the square footage of a room?" : "How do I work out the area of a room?",
        respuesta: imperial
          ? "Measure the length and width in feet and multiply them. A 12 × 10 ft room is 120 ft²."
          : "Measure the length and width in metres and multiply them. A 4 × 3 m room is 12 m².",
      },
      {
        pregunta: "What if my measurements are in inches or centimetres?",
        respuesta: `Convert them first: divide inches by 12 to get feet, or centimetres by 100 to get metres. 350 cm is ${n(3.5, 1)} m.`,
      },
      {
        pregunta: "How do I convert square metres to square feet?",
        respuesta: `Multiply by ${n(FT2_POR_M2)}. 20 m² is ${n(20 * FT2_POR_M2)} ft².`,
      },
    ],
    glosario: [
      { termino: "Square metre (m²)", definicion: "The area of a square 1 metre on each side." },
      { termino: "Square foot (ft²)", definicion: "The area of a square 1 foot on each side." },
    ],
  };
};
