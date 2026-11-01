import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionIs } from "../../dias-entre-fechas/textos/is";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Aldursreiknivél",
    title: tituloQueEntre(
      `Aldursreiknivél: nákvæmur aldur í árum, mánuðum og dögum | ${ctx.nombrePais}`,
      `Aldursreiknivél | ${ctx.nombrePais}`,
      "Aldursreiknivél",
    ),
    description: "Reiknaðu nákvæman aldur þinn í árum, mánuðum og dögum, hversu marga daga þú hefur lifað og hversu langt er í næsta afmæli.",
    intro: [
      "Sláðu inn fæðingardaginn þinn og þú sérð nákvæman aldur í dag, líka í mánuðum, vikum og dögum.",
      "Breyttu hinni dagsetningunni til að sjá hversu gamall einhver var á tilteknum degi eða verður síðar.",
    ],
    comoSeCalcula: [
      "Við teljum heila mánuði frá fæðingu til valinnar dagsetningar. Hverjir 12 mánuðir verða að einu ári.",
      "Dagarnir sem eftir standa að loknum síðasta heila mánuðinum eru dagarnir í aldrinum.",
      "Hlaupár eru talin með sína 366 daga.",
    ],
    ejemplo: [
      `Aldur þess sem fæddist ${fechaLarga(ctx.locale, nac)} þann ${fechaLarga(ctx.locale, ref)}: ${duracionIs(Math.floor(meses / 12), meses % 12, dias)}.`,
      `Fjöldi daga: ${formatearNumero(ctx, total)}.`,
    ],
    faq: [
      {
        pregunta: "Hvernig er nákvæmur aldur reiknaður?",
        respuesta: "Fyrst eru talin heil ár, svo heilir mánuðir frá síðasta afmæli og loks dagarnir sem eftir standa.",
      },
      {
        pregunta: "Hvað gildir um þá sem fæddust 29. febrúar?",
        respuesta: "Þau ár sem eru ekki hlaupár miðar þessi reiknivél við 28. febrúar sem afmælisdag. Í sumum lögum gildir hins vegar 1. mars.",
      },
      {
        pregunta: "Hversu marga daga gamall er ég?",
        respuesta: "Skoðaðu línuna „Í dögum“. Hún telur hvern dag frá fæðingu til valinnar dagsetningar, án síðasta dagsins.",
      },
    ],
    glosario: [
      { termino: "Aldur", definicion: "Fjöldi heilla ára frá fæðingu." },
      { termino: "Hlaupár", definicion: "Ár með 366 daga og 29. febrúar. Það kemur á fjögurra ára fresti, nema á sumum aldamótaárum." },
    ],
  };
};
