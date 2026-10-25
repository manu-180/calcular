import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: imperial ? "Regn ut kvadratfot" : "Regn ut kvadratmeter",
    title: tituloQueEntre(
      `Kvadratmeter: regn ut m² for rom og tomt | ${ctx.nombrePais}`,
      `Kvadratmeterkalkulator | ${ctx.nombrePais}`,
      `Kvadratmeter | ${ctx.nombrePais}`,
      "Kvadratmeterkalkulator",
    ),
    description: "Regn ut arealet av et rom, et gulv eller en tomt: rektangler, trekanter og sirkler, med opptil fem former som legges sammen.",
    intro: [
      "Velg en form og fyll inn målene. Er arealet ikke et enkelt rektangel, del det opp i flere deler, så legger kalkulatoren dem sammen.",
      imperial ? "Du ser også resultatet i kvadratmeter." : "Du ser også resultatet i kvadratfot.",
    ],
    comoSeCalcula: [
      "Rektangel: lengde × bredde.",
      "Trekant: grunnlinje × høyde ÷ 2.",
      `Sirkel: π × radius × radius, der radius er halve diameteren. 1 m² er ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `En L-formet stue kan deles opp i et rektangel på 16 × 12 ft og et på 10 × 6 ft. Det gir ${n(enL, 0)} ft² til sammen.`
        : `En L-formet stue kan deles opp i et rektangel på 5 × 4 m og et på 3 × 2 m. Det gir ${n(enL, 0)} m² til sammen.`,
      `Et rundt bord med 2 ${u} i diameter tar ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: "Hvordan regner jeg ut kvadratmeter for et rom?",
        respuesta: imperial
          ? `Mål lengde og bredde i fot, og gang dem. Et rom på 12 × 10 ft er ${n(area("rectangulo", 12, 10), 0)} ft².`
          : `Mål lengde og bredde i meter, og gang dem. Et rom på 4 × 3 m er ${n(area("rectangulo", 4, 3), 0)} m².`,
      },
      {
        pregunta: "Hva gjør jeg hvis målene er i centimeter?",
        respuesta: `Gjør dem om først: del centimeter på 100 for å få meter, eller tommer på 12 for å få fot. 350 cm er ${n(350 / 100, 1)} m.`,
      },
      {
        pregunta: "Hvordan gjør jeg om kvadratmeter til kvadratfot?",
        respuesta: `Gang med ${n(FT2_POR_M2)}. 20 m² er ${n(20 * FT2_POR_M2)} ft².`,
      },
    ],
    glosario: [
      { termino: "Kvadratmeter (m², kvm)", definicion: "Arealet av et kvadrat med 1 meter på hver side." },
      { termino: "Kvadratfot (ft²)", definicion: "Arealet av et kvadrat med 1 fot på hver side." },
    ],
  };
};
