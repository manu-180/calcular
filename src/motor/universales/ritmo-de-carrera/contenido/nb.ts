import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoNb: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "engelsk mil" : "km";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "Regn ut løpetempoet ditt",
    title: tituloQueEntre(
      `Løpetempo: regn ut tempo, tid og distanse | ${ctx.nombrePais}`,
      `Løpetempo | ${ctx.nombrePais}`,
      "Løpetempo",
    ),
    description: `Regn ut tempoet ditt per ${u}, sluttiden eller distansen på 5 km, 10 km, halvmaraton eller maraton.`,
    intro: [
      "Med to av de tre verdiene (distanse, tid og tempo) får du den tredje. Bruk det til å planlegge et løp eller følge opp en treningstur.",
      "Distansene 5 km, 10 km, halvmaraton og maraton ligger klare til å velge.",
    ],
    comoSeCalcula: [
      `Tempo = tid ÷ distanse, i minutter og sekunder per ${u}.`,
      "Tid = tempo × distanse.",
      "Distanse = tid ÷ tempo. Snittfarten er distansen delt på antall timer.",
    ],
    ejemplo: imperial
      ? [
          `3 engelske mil på 27 minutter er et tempo på ${ritmoTexto(27 * 20)} per mil, ${formatearNumero(ctx, 20 / 3, 2)} mph.`,
          `Et halvmaraton (${formatearNumero(ctx, media, 2)} mi) i tempoet ${ritmoTexto(ritmoMedia)} per mil tar ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          `10 km på 50 minutter er et tempo på ${ritmoTexto(50 * 6)} per km, ${formatearNumero(ctx, 10 / (50 / 60), 0)} km/t.`,
          `Et halvmaraton (${formatearNumero(ctx, media, 1)} ${corto}) i tempoet ${ritmoTexto(ritmoMedia)} per km tar ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Hvordan regner jeg ut tempoet mitt per ${u}?`,
        respuesta: imperial
          ? `Gjør om tiden til minutter, og del på antall engelske mil. 3 mil på 28 minutter og 30 sekunder er ${formatearNumero(ctx, 28.5 / 3, 1)} minutter per mil, altså ${ritmoTexto((28.5 * 60) / 3)}.`
          : `Gjør om tiden til minutter, og del på antall kilometer. 10 km på 55 minutter er ${formatearNumero(ctx, 55 / 10, 1)} minutter per km, altså ${ritmoTexto((55 * 60) / 10)}.`,
      },
      {
        pregunta: "Hvilket tempo er bra for en nybegynner?",
        respuesta: "Et tempo der du fortsatt klarer å snakke mens du løper. Det blir raskere etter hvert som formen blir bedre.",
      },
      {
        pregunta: "Hvor langt er et maraton?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} engelske mil). Et halvmaraton er halvparten så langt.`,
      },
    ],
    glosario: [
      { termino: "Tempo", definicion: "Hvor lang tid det tar å løpe én kilometer eller én engelsk mil." },
      { termino: "Snittfart", definicion: "Hvor langt du kommer på én time." },
    ],
  };
};
