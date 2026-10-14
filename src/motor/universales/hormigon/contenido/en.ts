import { formatearNumero, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `A 10 × 10 ft patio, 4 in thick, needs ${n(ft3)} ft³ of concrete: ${n(ft3 / 27)} cubic yards.`,
          `With the reference mix, that is about ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb of cement.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `A 4 × 3 m slab, 10 cm thick, needs ${n(volumen, 1)} m³ of concrete.`,
          `With the reference mix, that is about ${n(MEZCLA.cementoKg * volumen, 0)} kg of cement, ${n(MEZCLA.arenaM3 * volumen)} m³ of sand and ${n(MEZCLA.piedraM3 * volumen)} m³ of gravel.`,
        ];
      })();
  return {
    h1: "Concrete calculator",
    title: `Concrete calculator for ${ctx.nombrePais}`,
    description: `Work out how much concrete you need for a slab, in ${imperial ? "cubic yards" : "cubic metres"}, plus roughly how much cement, sand and gravel to buy.`,
    intro: [
      "Enter the length, width and thickness. You see the concrete volume and the approximate materials to mix it.",
      "Materials depend on the mix design. This calculator uses a general-purpose 1:2:3 mix as a reference.",
    ],
    comoSeCalcula: [
      imperial ? "Volume = length × width × thickness, with the thickness in feet. Divide cubic feet by 27 for cubic yards." : "Volume = length × width × thickness, with the thickness in metres.",
      "It adds the margin for uneven ground and spillage.",
      `Per m³: about ${MEZCLA.cementoKg} kg of cement, ${n(MEZCLA.arenaM3)} m³ of sand, ${n(MEZCLA.piedraM3, 1)} m³ of gravel and ${MEZCLA.aguaL} litres of water.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "How many cubic feet are in a cubic yard?",
        respuesta: "27. A cubic yard is 3 ft × 3 ft × 3 ft. Ready-mix concrete is usually sold by the cubic yard.",
      },
      {
        pregunta: "How much cement is in a cubic metre of concrete?",
        respuesta: `With a 1:2:3 mix, about ${MEZCLA.cementoKg} kg. Stronger concrete uses more cement.`,
      },
      {
        pregunta: "Should I order ready-mix?",
        respuesta: "For large pours it is usually more consistent and faster. For small jobs, mixing on site with these amounts is common.",
      },
    ],
    glosario: [
      { termino: "Mix design", definicion: "The ratio of cement, sand, gravel and water in a mix." },
      { termino: "Cubic yard (yd³)", definicion: "The volume of a cube 1 yard on each side: 27 cubic feet." },
    ],
  };
};
