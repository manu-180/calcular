import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "mile" : "km";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "Beregn dit løbetempo",
    title: tituloQueEntre(
      `Løbetempo: beregn tempo, tid og distance | ${ctx.nombrePais}`,
      `Løbetempo | ${ctx.nombrePais}`,
      "Løbetempo",
    ),
    description: `Beregn dit tempo pr. ${u}, din sluttid eller din distance på 5 km, 10 km, halvmaraton eller maraton.`,
    intro: [
      "Med to af de tre værdier (distance, tid og tempo) får du den tredje. Brug det til at planlægge et løb eller følge op på en træningstur.",
      "Distancerne 5 km, 10 km, halvmaraton og maraton ligger klar til at vælge.",
    ],
    comoSeCalcula: [
      `Tempo = tid ÷ distance, i minutter og sekunder pr. ${u}.`,
      "Tid = tempo × distance.",
      "Distance = tid ÷ tempo. Gennemsnitsfarten er distancen delt med antallet af timer.",
    ],
    ejemplo: imperial
      ? [
          `3 miles på 27 minutter er et tempo på ${ritmoTexto(27 * 20)} pr. mile, ${formatearNumero(ctx, 20 / 3, 2)} mph.`,
          `Et halvmaraton (${formatearNumero(ctx, media, 2)} mi) i tempoet ${ritmoTexto(ritmoMedia)} pr. mile tager ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          `10 km på 50 minutter er et tempo på ${ritmoTexto(50 * 6)} pr. km, ${formatearNumero(ctx, 10 / (50 / 60), 0)} km/t.`,
          `Et halvmaraton (${formatearNumero(ctx, media, 1)} ${corto}) i tempoet ${ritmoTexto(ritmoMedia)} pr. km tager ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Hvordan beregner jeg mit tempo pr. ${u}?`,
        respuesta: imperial
          ? `Regn tiden om til minutter, og del med antallet af miles. 3 miles på 28 minutter og 30 sekunder er ${formatearNumero(ctx, 28.5 / 3, 1)} minutter pr. mile, altså ${ritmoTexto((28.5 * 60) / 3)}.`
          : `Regn tiden om til minutter, og del med antallet af kilometer. 10 km på 55 minutter er ${formatearNumero(ctx, 55 / 10, 1)} minutter pr. km, altså ${ritmoTexto((55 * 60) / 10)}.`,
      },
      {
        pregunta: "Hvilket tempo er godt for en nybegynder?",
        respuesta: "Et tempo, hvor du stadig kan snakke, mens du løber. Det bliver hurtigere, efterhånden som du får bedre kondition.",
      },
      {
        pregunta: "Hvor langt er et maraton?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} miles). Et halvmaraton er halvt så langt.`,
      },
    ],
    glosario: [
      { termino: "Tempo", definicion: "Hvor lang tid det tager at løbe en kilometer eller en mile." },
      { termino: "Gennemsnitsfart", definicion: "Hvor langt du når på en time." },
    ],
  };
};
