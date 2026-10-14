import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: "Oppervlakte berekenen",
    title: tituloQueEntre(`Oppervlakte berekenen in ${ctx.nombrePais}`, "Oppervlakte berekenen in m²", "Oppervlakte berekenen"),
    description: "Bereken de oppervlakte van een kamer, een vloer of een stuk grond in m². Rechthoeken, driehoeken en cirkels, tot vijf delen bij elkaar opgeteld.",
    intro: [
      "Kies een vorm en vul de maten in. Is de ruimte geen gewone rechthoek, verdeel hem dan in stukken en de rekenhulp telt ze op.",
      imperial ? "Je ziet de uitkomst ook in vierkante meter." : "Je ziet de uitkomst ook in vierkante voet.",
    ],
    comoSeCalcula: [
      "Rechthoek: lengte × breedte.",
      "Driehoek: basis × hoogte ÷ 2.",
      `Cirkel: π × straal × straal. De straal is de helft van de diameter. 1 m² is ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `Een L-vormige woonkamer verdeel je in een rechthoek van 16 × 12 ft en een van 10 × 6 ft. Samen is dat ${n(enL, 0)} ft².`
        : `Een L-vormige woonkamer verdeel je in een rechthoek van 5 × 4 m en een van 3 × 2 m. Samen is dat ${n(enL, 0)} m².`,
      `Een ronde tafel van 2 ${u} doorsnee beslaat ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: "Hoe bereken je de oppervlakte van een kamer?",
        respuesta: imperial
          ? `Meet de lengte en de breedte in voet en vermenigvuldig ze. Een kamer van 12 × 10 ft is ${n(12 * 10, 0)} ft².`
          : `Meet de lengte en de breedte in meter en vermenigvuldig ze. Een kamer van 4 × 3 m is ${n(4 * 3, 0)} m².`,
      },
      {
        pregunta: "Wat als ik in centimeters gemeten heb?",
        respuesta: `Reken ze eerst om naar meter door ze te delen door 100. 350 cm is ${n(350 / 100, 1)} m.`,
      },
      {
        pregunta: `Hoeveel m² is een kamer van ${n(3.5, 1)} bij 4 meter?`,
        respuesta: `${n(3.5, 1)} × 4 = ${n(3.5 * 4, 0)} m². Bij een schuine muur of een nis tel je dat stuk apart op of trek je het eraf.`,
      },
    ],
    glosario: [
      { termino: "Vierkante meter (m²)", definicion: "De oppervlakte van een vierkant van 1 meter bij 1 meter." },
      { termino: "Vierkante voet (ft²)", definicion: "De oppervlakte van een vierkant van 1 voet bij 1 voet. Gebruikt in onder meer de Verenigde Staten." },
    ],
  };
};
