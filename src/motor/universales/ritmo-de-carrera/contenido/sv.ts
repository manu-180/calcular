import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "mile" : "km";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "Räkna ut ditt löptempo",
    title: tituloQueEntre(
      `Löptempo: räkna ut tempo, tid och distans | ${ctx.nombrePais}`,
      `Löptempo | ${ctx.nombrePais}`,
      "Löptempo",
    ),
    description: `Räkna ut ditt tempo per ${u}, din sluttid eller din distans på 5 km, 10 km, halvmaraton eller maraton.`,
    intro: [
      "Med två av de tre värdena (distans, tid och tempo) får du det tredje. Använd det för att planera ett lopp eller följa upp ett träningspass.",
      "Distanserna 5 km, 10 km, halvmaraton och maraton finns färdiga att välja.",
    ],
    comoSeCalcula: [
      `Tempo = tid ÷ distans, i minuter och sekunder per ${u}.`,
      "Tid = tempo × distans.",
      "Distans = tid ÷ tempo. Medelhastigheten är distansen delad med antalet timmar.",
    ],
    ejemplo: imperial
      ? [
          `3 miles på 27 minuter är ett tempo på ${ritmoTexto(27 * 20)} per mile, ${formatearNumero(ctx, 20 / 3, 2)} mph.`,
          `Ett halvmaraton (${formatearNumero(ctx, media, 2)} mi) i tempot ${ritmoTexto(ritmoMedia)} per mile går på ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          `10 km på 50 minuter är ett tempo på ${ritmoTexto(50 * 6)} per km, ${formatearNumero(ctx, 10 / (50 / 60), 0)} km/h.`,
          `Ett halvmaraton (${formatearNumero(ctx, media, 1)} ${corto}) i tempot ${ritmoTexto(ritmoMedia)} per km går på ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Hur räknar jag ut mitt tempo per ${u}?`,
        respuesta: imperial
          ? `Gör om tiden till minuter och dela med antalet miles. 3 miles på 28 minuter och 30 sekunder är ${formatearNumero(ctx, 28.5 / 3, 1)} minuter per mile, alltså ${ritmoTexto((28.5 * 60) / 3)}.`
          : `Gör om tiden till minuter och dela med antalet kilometer. 10 km på 55 minuter är ${formatearNumero(ctx, 55 / 10, 1)} minuter per km, alltså ${ritmoTexto((55 * 60) / 10)}.`,
      },
      {
        pregunta: "Vilket tempo är bra för en nybörjare?",
        respuesta: "Ett tempo där du fortfarande kan prata medan du springer. Det blir snabbare i takt med att konditionen byggs upp.",
      },
      {
        pregunta: "Hur långt är ett maraton?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} miles). Ett halvmaraton är hälften så långt.`,
      },
    ],
    glosario: [
      { termino: "Tempo", definicion: "Hur lång tid det tar att springa en kilometer eller en mile." },
      { termino: "Medelhastighet", definicion: "Hur lång sträcka du hinner på en timme." },
    ],
  };
};
