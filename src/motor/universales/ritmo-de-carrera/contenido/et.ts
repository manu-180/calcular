import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const uhe = imperial ? "ühe miili" : "ühe kilomeetri";
  const kohta = imperial ? "miili kohta" : "kilomeetri kohta";
  const luhike = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "Arvuta oma jooksutempo",
    title: tituloQueEntre(
      `Jooksutempo: arvuta tempo, aeg ja distants | ${ctx.nombrePais}`,
      `Jooksutempo kalkulaator | ${ctx.nombrePais}`,
      "Jooksutempo kalkulaator",
    ),
    description: `Arvuta oma jooksutempo ${kohta}, lõpuaeg või distants. Valmis valikud on 5 km, 10 km, poolmaraton ja maraton.`,
    intro: [
      "Kui tead kolmest väärtusest kahte (distants, aeg ja tempo), annab kalkulaator kolmanda. Kasuta seda võistluse planeerimiseks või treeningu jälgimiseks.",
      "Valmis valikud on 5 km, 10 km, poolmaraton ja maraton.",
    ],
    comoSeCalcula: [
      `Tempo = aeg ÷ distants, minutites ja sekundites ${kohta}.`,
      "Aeg = tempo × distants.",
      "Distants = aeg ÷ tempo. Keskmine kiirus on distants jagatud tundide arvuga.",
    ],
    ejemplo: imperial
      ? [
          `Kui jooksed 3 miili 27 minutiga, on sinu tempo ${ritmoTexto(27 * 20)} miili kohta ehk ${formatearNumero(ctx, 20 / 3, 2)} mph.`,
          `Poolmaraton (${formatearNumero(ctx, media, 2)} ${luhike}) tempoga ${ritmoTexto(ritmoMedia)} miili kohta võtab aega ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          `Kui jooksed 10 km 50 minutiga, on sinu tempo ${ritmoTexto(50 * 6)} kilomeetri kohta ehk ${formatearNumero(ctx, 10 / (50 / 60), 0)} km/h.`,
          `Poolmaraton (${formatearNumero(ctx, media, 1)} ${luhike}) tempoga ${ritmoTexto(ritmoMedia)} kilomeetri kohta võtab aega ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Kuidas arvutada oma tempot ${kohta}?`,
        respuesta: imperial
          ? `Teisenda aeg minutiteks ja jaga miilide arvuga. 3 miili ajaga 28 minutit 30 sekundit annab ${formatearNumero(ctx, 28.5 / 3, 1)} minutit miili kohta ehk ${ritmoTexto((28.5 * 60) / 3)}.`
          : `Teisenda aeg minutiteks ja jaga kilomeetrite arvuga. 10 km ajaga 55 minutit annab ${formatearNumero(ctx, 55 / 10, 1)} minutit kilomeetri kohta ehk ${ritmoTexto((55 * 60) / 10)}.`,
      },
      {
        pregunta: "Milline tempo on algajale hea?",
        respuesta: "Selline, mille juures suudad joostes veel rääkida. Tempo paraneb koos vormiga.",
      },
      {
        pregunta: "Kui pikk on maraton?",
        respuesta: `Maraton on ${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} miili). Poolmaraton on sellest pool.`,
      },
    ],
    glosario: [
      { termino: "Tempo", definicion: `Aeg, mis kulub ${uhe} läbimiseks.` },
      { termino: "Keskmine kiirus", definicion: "Distants, mille läbid ühe tunniga." },
    ],
  };
};
