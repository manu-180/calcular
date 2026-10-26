import { formatearCifra, formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const margen = formatearCifra(ctx, MARGEN * 100);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `Et rom med 48 ft vegg, 8 ft takhøyde og 40 ft² dører og vinduer har ${n(neta, 0)} ft² som skal males.`,
          `Med 2 strøk og en maling som dekker 350 ft² per gallon, trenger du ${n(gal, 2)} gallon. Med tillegget blir det ${n(gal * (1 + MARGEN), 2)} gallon.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `Et rom med 14 m vegg, ${n(2.6)} m takhøyde og 4 m² dører og vinduer har ${n(neta)} m² som skal males.`,
          `Med 2 strøk og en maling som dekker 10 m² per liter, trenger du ${n(litros, 2)} liter. Med tillegget blir det ${n(litros * (1 + MARGEN), 2)} liter.`,
        ];
      })();
  return {
    h1: "Hvor mye maling trenger jeg?",
    title: tituloQueEntre(
      `Hvor mye maling trenger jeg? Regn ut forbruket | ${ctx.nombrePais}`,
      `Hvor mye maling trenger jeg? | ${ctx.nombrePais}`,
      `Malingkalkulator | ${ctx.nombrePais}`,
      "Hvor mye maling trenger jeg?",
    ),
    description: "Regn ut hvor mye maling du trenger til veggene ut fra målene, dører og vinduer, antall strøk og rekkeevnen som står på spannet.",
    intro: [
      "Fyll inn lengden og høyden på veggene (eller arealet direkte), hvor mye dører og vinduer utgjør og hvor mange strøk du vil male.",
      `Beregningen legger til ${margen} % ekstra, så malingen ikke tar slutt halvveis.`,
    ],
    comoSeCalcula: [
      "Areal = samlet lengde på veggene × høyde, minus dører og vinduer.",
      "Maling = areal × antall strøk ÷ rekkeevne.",
      `Deretter legges det til et tillegg på ${margen} %.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Hvor langt rekker en liter maling?",
        respuesta: "De fleste veggmalinger til innendørs bruk dekker omtrent 8 til 12 m² per liter og strøk. Det nøyaktige tallet står på spannet.",
      },
      {
        pregunta: "Hvor mange strøk trenger jeg?",
        respuesta: "To strøk er det vanlige. Nysparklede eller svært sugende vegger, eller et stort fargeskifte, kan kreve et tredje.",
      },
      {
        pregunta: "Skal jeg trekke fra dører og vinduer?",
        respuesta: "Ja, hvis de er store. Små åpninger er det bedre å la stå i regnestykket, fordi det ekstra går med til kanter og hjørner.",
      },
    ],
    glosario: [
      { termino: "Rekkeevne", definicion: "Hvor stort areal én liter eller gallon maling dekker i ett strøk." },
      { termino: "Strøk", definicion: "Hver runde med maling som kommer på veggen." },
    ],
  };
};
