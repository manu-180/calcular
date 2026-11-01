import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Reiknaðu ávöxtun fjárfestingar (ROI og CAGR)",
    title: tituloQueEntre(
      `Ávöxtun fjárfestingar: ROI og ársávöxtun | ${ctx.nombrePais}`,
      `Ávöxtun fjárfestingar | ${ctx.nombrePais}`,
      "Ávöxtun fjárfestingar",
    ),
    description: "Reiknaðu heildarávöxtun (ROI) og ársávöxtun (CAGR) fjárfestingar út frá upphæðinni sem þú lagðir inn, virðinu í dag og fjölda ára.",
    intro: [
      "50% hagnaður hljómar vel, en hann þýðir ekki það sama á 2 árum og á 10 árum. Til að bera saman fjárfestingar þarftu ávöxtunina á ári.",
      "Sláðu inn hvað þú fjárfestir, hvers virði það er í dag og hve mörg ár eru liðin. Þú sérð heildarávöxtunina og ársávöxtunina með vaxtavöxtum.",
    ],
    comoSeCalcula: [
      "ROI = (lokavirði + greiðslur − fjárfest upphæð) ÷ fjárfest upphæð × 100.",
      "CAGR = ((lokavirði + greiðslur) ÷ fjárfest upphæð) í veldinu (1 ÷ fjöldi ára), mínus 1.",
      "CAGR er meðalvöxtur á ári með vaxtavöxtum, það er hraðinn sem gefur sömu niðurstöðu ef hann endurtekur sig á hverju ári.",
    ],
    ejemplo: [
      `Ef þú fjárfestir ${m(inicial)} og endar með ${m(final)} er hagnaðurinn ${m(final - inicial)}. Það gefur ${p(roi(inicial, final))} ROI.`,
      `Ef það tók 5 ár er ársávöxtunin ${p(cagr(inicial, final, 5))}. Ef það tók 2 ár er hún ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "Hver er munurinn á ROI og CAGR?",
        respuesta: "ROI er heildarhagnaðurinn af því sem þú fjárfestir, óháð því hve langan tíma það tók. CAGR dreifir honum á árin, svo þú getir borið saman fjárfestingar með ólíkan líftíma.",
      },
      {
        pregunta: "Af hverju er ársávöxtunin ekki einfaldlega heildarávöxtunin deilt með fjölda ára?",
        respuesta: `Af því að hagnaður hvers árs bætist við höfuðstólinn og vex líka. 50% hagnaður á 5 árum samsvarar ${p(cagr(1, 1.5, 5))} á ári með vaxtavöxtum, ekki ${formatearCifra(ctx, 50 / 5)}%.`,
      },
      {
        pregunta: "Hvernig tek ég með arð eða vexti sem ég hef fengið?",
        respuesta: "Settu þá undir greiðslur ef þú tókst peningana út. Ef þú endurfjárfestir þá eru þeir nú þegar í lokavirðinu.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Return on investment, heildarhagnaðurinn sem hlutfall af því sem þú lagðir inn." },
      { termino: "CAGR", definicion: "Compound annual growth rate, meðalársávöxtun með vaxtavöxtum." },
    ],
  };
};
