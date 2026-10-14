import { formatearNumero, type ContenidoUniversal } from "../../tipos";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `For 150 ft² with 12 × 12 in tiles (1 ft² each) and 10% waste, you need ${piezas} tiles.`,
          `If a box holds 10 tiles, that is ${Math.ceil(piezas / 10)} boxes.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `For 20 m² with 60 × 60 cm tiles (${n(pieza)} m² each) and 10% waste, you need ${piezas} tiles.`,
          `If a box holds 4 tiles, that is ${Math.ceil(piezas / 4)} boxes.`,
        ];
      })();
  return {
    h1: "Tile calculator",
    title: `Tile calculator for ${ctx.nombrePais}`,
    description: "Work out how many tiles you need for a floor or wall, including a waste allowance, and how many boxes to buy.",
    intro: [
      "Enter the area, the size of each tile and how many come in a box. You see how many tiles and boxes to buy.",
      "The waste allowance covers cuts at the edges and the odd broken tile.",
    ],
    comoSeCalcula: [
      `Area of one tile = length × width, converted to ${imperial ? "square feet" : "square metres"}.`,
      "Tiles = area × (1 + waste ÷ 100) ÷ area of one tile, rounded up.",
      "Boxes = tiles ÷ tiles per box, rounded up.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "How much waste should I allow?",
        respuesta: "10% for a straight layout. For diagonal or herringbone patterns, or rooms with lots of cuts, 15% to 20%.",
      },
      {
        pregunta: "Do I need to account for grout lines?",
        respuesta: "No. Grout lines are a few millimetres wide and the waste allowance already covers the difference.",
      },
      {
        pregunta: "Should I buy extra?",
        respuesta: "Yes, a few spare tiles from the same batch. If one breaks later, it can be hard to match the shade.",
      },
    ],
    glosario: [
      { termino: "Waste allowance", definicion: "The extra percentage you buy for cuts and breakage." },
      { termino: "Batch", definicion: "The production run. Tiles from different batches can vary slightly in shade." },
    ],
  };
};
