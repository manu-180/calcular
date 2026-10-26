import { formatearCifra, formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const margen = formatearCifra(ctx, MARGEN * 100);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `Et rum med 48 ft væg, 8 ft til loftet og 40 ft² døre og vinduer har ${n(neta, 0)} ft², der skal males.`,
          `Med 2 lag og en maling, der dækker 350 ft² pr. gallon, skal du bruge ${n(gal, 2)} gallon. Med tillægget bliver det ${n(gal * (1 + MARGEN), 2)} gallon.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `Et rum med 14 m væg, ${n(2.6)} m til loftet og 4 m² døre og vinduer har ${n(neta)} m², der skal males.`,
          `Med 2 lag og en maling, der dækker 10 m² pr. liter, skal du bruge ${n(litros, 2)} liter. Med tillægget bliver det ${n(litros * (1 + MARGEN), 2)} liter.`,
        ];
      })();
  return {
    h1: "Hvor meget maling skal jeg bruge?",
    title: tituloQueEntre(
      `Hvor meget maling skal jeg bruge? Beregn forbruget | ${ctx.nombrePais}`,
      `Hvor meget maling skal jeg bruge? | ${ctx.nombrePais}`,
      `Malingberegner | ${ctx.nombrePais}`,
      "Hvor meget maling skal jeg bruge?",
    ),
    description: "Beregn, hvor meget maling du skal bruge til væggene ud fra målene, døre og vinduer, antal lag og den rækkeevne, der står på spanden.",
    intro: [
      "Skriv væggenes længde og højde (eller arealet direkte), hvor meget døre og vinduer fylder, og hvor mange lag du vil male.",
      `Beregningen lægger ${margen} % ekstra til, så malingen ikke slipper op halvvejs.`,
    ],
    comoSeCalcula: [
      "Areal = væggenes samlede længde × højde, minus døre og vinduer.",
      "Maling = areal × antal lag ÷ rækkeevne.",
      `Derefter lægges et tillæg på ${margen} % til.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Hvor langt rækker en liter maling?",
        respuesta: "De fleste vægmalinger til indendørs brug dækker cirka 8 til 12 m² pr. liter og lag. Det præcise tal står på spanden.",
      },
      {
        pregunta: "Hvor mange lag skal der til?",
        respuesta: "To lag er det normale. Nyspartlede eller meget sugende vægge, eller et stort farveskift, kan kræve et tredje.",
      },
      {
        pregunta: "Skal jeg trække døre og vinduer fra?",
        respuesta: "Ja, hvis de er store. Små åbninger er bedre at lade blive i regnestykket, fordi det ekstra går til kanter og hjørner.",
      },
    ],
    glosario: [
      { termino: "Rækkeevne", definicion: "Hvor stort et areal en liter eller gallon maling dækker i ét lag." },
      { termino: "Lag", definicion: "Hver omgang maling, der kommer på væggen." },
    ],
  };
};
