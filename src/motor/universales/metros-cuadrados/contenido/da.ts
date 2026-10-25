import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: imperial ? "Beregn kvadratfod" : "Beregn kvadratmeter",
    title: tituloQueEntre(
      `Kvadratmeterberegner: beregn m² for rum og grund | ${ctx.nombrePais}`,
      `Kvadratmeterberegner | ${ctx.nombrePais}`,
      "Kvadratmeterberegner",
    ),
    description: "Beregn arealet af et rum, et gulv eller en grund: rektangler, trekanter og cirkler, med op til fem former, der lægges sammen.",
    intro: [
      "Vælg en form, og skriv målene. Er arealet ikke et enkelt rektangel, så del det op i flere dele, så lægger beregneren dem sammen.",
      imperial ? "Du ser også resultatet i kvadratmeter." : "Du ser også resultatet i kvadratfod.",
    ],
    comoSeCalcula: [
      "Rektangel: længde × bredde.",
      "Trekant: grundlinje × højde ÷ 2.",
      `Cirkel: π × radius × radius, hvor radius er den halve diameter. 1 m² er ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `En L-formet stue kan deles op i et rektangel på 16 × 12 ft og et på 10 × 6 ft. Det giver ${n(enL, 0)} ft² i alt.`
        : `En L-formet stue kan deles op i et rektangel på 5 × 4 m og et på 3 × 2 m. Det giver ${n(enL, 0)} m² i alt.`,
      `Et rundt bord med 2 ${u} i diameter fylder ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: "Hvordan beregner jeg kvadratmeter for et rum?",
        respuesta: imperial
          ? `Mål længde og bredde i fod, og gang dem. Et rum på 12 × 10 ft er ${n(area("rectangulo", 12, 10), 0)} ft².`
          : `Mål længde og bredde i meter, og gang dem. Et rum på 4 × 3 m er ${n(area("rectangulo", 4, 3), 0)} m².`,
      },
      {
        pregunta: "Hvad gør jeg, hvis målene er i centimeter?",
        respuesta: `Regn dem om først: del centimeter med 100 for at få meter, eller tommer med 12 for at få fod. 350 cm er ${n(350 / 100, 1)} m.`,
      },
      {
        pregunta: "Hvordan regner jeg kvadratmeter om til kvadratfod?",
        respuesta: `Gang med ${n(FT2_POR_M2)}. 20 m² er ${n(20 * FT2_POR_M2)} ft².`,
      },
    ],
    glosario: [
      { termino: "Kvadratmeter (m², kvm)", definicion: "Arealet af et kvadrat med 1 meter på hver side." },
      { termino: "Kvadratfod (ft²)", definicion: "Arealet af et kvadrat med 1 fod på hver side." },
    ],
  };
};
