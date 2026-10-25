import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: imperial ? "Räkna ut kvadratfot" : "Räkna ut kvadratmeter",
    title: tituloQueEntre(
      `Kvadratmeter: räkna ut kvm för rum och tomt | ${ctx.nombrePais}`,
      `Räkna ut kvadratmeter | ${ctx.nombrePais}`,
      "Räkna ut kvadratmeter",
    ),
    description: "Räkna ut ytan på ett rum, ett golv eller en tomt: rektanglar, trianglar och cirklar, med upp till fem former som läggs ihop.",
    intro: [
      "Välj en form och fyll i måtten. Är ytan inte en enkel rektangel, dela upp den i delar så lägger kalkylatorn ihop dem.",
      imperial ? "Du ser också resultatet i kvadratmeter." : "Du ser också resultatet i kvadratfot.",
    ],
    comoSeCalcula: [
      "Rektangel: längd × bredd.",
      "Triangel: bas × höjd ÷ 2.",
      `Cirkel: π × radie × radie, där radien är halva diametern. 1 m² är ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `Ett L-format vardagsrum kan delas upp i en rektangel på 16 × 12 ft och en på 10 × 6 ft. Det blir ${n(enL, 0)} ft² totalt.`
        : `Ett L-format vardagsrum kan delas upp i en rektangel på 5 × 4 m och en på 3 × 2 m. Det blir ${n(enL, 0)} m² totalt.`,
      `Ett runt bord med 2 ${u} i diameter tar upp ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: "Hur räknar jag ut kvadratmeter för ett rum?",
        respuesta: imperial
          ? `Mät längd och bredd i fot och multiplicera dem. Ett rum på 12 × 10 ft är ${n(area("rectangulo", 12, 10), 0)} ft².`
          : `Mät längd och bredd i meter och multiplicera dem. Ett rum på 4 × 3 m är ${n(area("rectangulo", 4, 3), 0)} m².`,
      },
      {
        pregunta: "Vad gör jag om måtten är i centimeter?",
        respuesta: `Gör om dem först: dela centimeter med 100 för att få meter, eller tum med 12 för att få fot. 350 cm är ${n(350 / 100, 1)} m.`,
      },
      {
        pregunta: "Hur räknar jag om kvadratmeter till kvadratfot?",
        respuesta: `Multiplicera med ${n(FT2_POR_M2)}. 20 m² är ${n(20 * FT2_POR_M2)} ft².`,
      },
    ],
    glosario: [
      { termino: "Kvadratmeter (m², kvm)", definicion: "Ytan av en kvadrat med 1 meter på varje sida." },
      { termino: "Kvadratfot (ft²)", definicion: "Ytan av en kvadrat med 1 fot på varje sida." },
    ],
  };
};
