import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Bættu dögum við dagsetningu",
    title: tituloQueEntre(
      `Bæta dögum við dagsetningu: reiknaðu fram eða aftur | ${ctx.nombrePais}`,
      `Bæta dögum við dagsetningu | ${ctx.nombrePais}`,
      "Bæta dögum við dagsetningu",
    ),
    description: "Bættu almanaksdögum eða virkum dögum við dagsetningu eða dragðu þá frá og sjáðu hvaða dagur kemur út. Hentar vel fyrir fresti og gjalddaga.",
    intro: [
      "Veldu dagsetningu, fjölda daga og hvort þú vilt bæta við eða draga frá. Þú sérð nýju dagsetninguna og vikudaginn.",
      "Með virkum dögum sleppir reiknivélin laugardögum og sunnudögum.",
    ],
    comoSeCalcula: [
      "Með almanaksdögum færist dagsetningin um einn dag á almanakinu fyrir hvern dag sem þú slærð inn.",
      "Með virkum dögum eru aðeins mánudagar til föstudagar taldir. Upphafsdagurinn sjálfur telst ekki með.",
      "Frídagar eru ekki dregnir frá, því þeir eru mismunandi eftir löndum og svæðum.",
    ],
    ejemplo: [
      `Ef þú bætir 90 almanaksdögum við ${f(inicio)} færðu ${f(mas90)}.`,
      `Ef þú bætir 15 virkum dögum við ${f(inicio)} færðu ${f(aFecha(habil))}.`,
    ],
    faq: [
      {
        pregunta: "Telst upphafsdagurinn sem dagur eitt?",
        respuesta: "Nei. Ef þú bætir 1 degi við mánudag færðu þriðjudag. Þannig eru flestir frestir taldir.",
      },
      {
        pregunta: "Hvað gerist ef ég bæti virkum dögum við laugardag?",
        respuesta: "Fyrsti virki dagurinn er mánudagurinn á eftir. Ef þú bætir 1 virkum degi við laugardag færðu mánudag.",
      },
      {
        pregunta: "Tekur reiknivélin tillit til hlaupára?",
        respuesta: "Já. Ef tímabilið nær yfir 29. febrúar telst hann einn dagur í viðbót.",
      },
    ],
    glosario: [
      { termino: "Almanaksdagar", definicion: "Allir dagar almanaksins, án þess að nokkrum sé sleppt." },
      { termino: "Virkir dagar", definicion: "Í þessari reiknivél mánudagur til föstudagur." },
    ],
  };
};
