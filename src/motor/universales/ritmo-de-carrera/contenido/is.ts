import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "mílu" : "km";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "Reiknaðu hlaupahraðann þinn",
    title: tituloQueEntre(
      `Hlaupahraði: reiknaðu hraða, tíma og vegalengd | ${ctx.nombrePais}`,
      `Hlaupahraði | ${ctx.nombrePais}`,
      "Hlaupahraði",
    ),
    description: `Reiknaðu hlaupahraðann á ${u}, lokatímann eða vegalengdina í 5 km, 10 km, hálfu maraþoni eða maraþoni.`,
    intro: [
      "Ef þú veist tvennt af þrennu (vegalengd, tíma og hlaupahraða) færðu það þriðja. Notaðu reiknivélina til að skipuleggja hlaup eða fylgjast með æfingum.",
      "Vegalengdirnar 5 km, 10 km, hálft maraþon og maraþon eru tilbúnar til að velja.",
    ],
    comoSeCalcula: [
      `Hlaupahraði = tími ÷ vegalengd, í mínútum og sekúndum á ${u}.`,
      "Tími = hlaupahraði × vegalengd.",
      "Vegalengd = tími ÷ hlaupahraði. Meðalhraði er vegalengdin deilt með fjölda klukkustunda.",
    ],
    ejemplo: imperial
      ? [
          `3 mílur á 27 mínútum gera hlaupahraðann ${ritmoTexto(27 * 20)} á mílu, ${formatearNumero(ctx, 20 / 3, 2)} mph.`,
          `Hálft maraþon (${formatearNumero(ctx, media, 2)} mi) á hlaupahraðanum ${ritmoTexto(ritmoMedia)} á mílu tekur ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          `10 km á 50 mínútum gera hlaupahraðann ${ritmoTexto(50 * 6)} á km, ${formatearNumero(ctx, 10 / (50 / 60), 0)} km/klst.`,
          `Hálft maraþon (${formatearNumero(ctx, media, 1)} ${corto}) á hlaupahraðanum ${ritmoTexto(ritmoMedia)} á km tekur ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Hvernig reikna ég hlaupahraðann á ${u}?`,
        respuesta: imperial
          ? `Breyttu tímanum í mínútur og deildu með fjölda mílna. 3 mílur á 28 mínútum og 30 sekúndum eru ${formatearNumero(ctx, 28.5 / 3, 1)} mínútur á mílu, það er ${ritmoTexto((28.5 * 60) / 3)}.`
          : `Breyttu tímanum í mínútur og deildu með fjölda kílómetra. 10 km á 55 mínútum eru ${formatearNumero(ctx, 55 / 10, 1)} mínútur á km, það er ${ritmoTexto((55 * 60) / 10)}.`,
      },
      {
        pregunta: "Hvaða hlaupahraði hentar byrjendum?",
        respuesta: "Hraði þar sem þú getur enn talað á meðan þú hleypur. Hann eykst eftir því sem þolið batnar.",
      },
      {
        pregunta: "Hversu langt er maraþon?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} mílur). Hálft maraþon er helmingi styttra.`,
      },
    ],
    glosario: [
      { termino: "Hlaupahraði", definicion: "Tíminn sem það tekur að hlaupa einn kílómetra eða eina mílu." },
      { termino: "Meðalhraði", definicion: "Vegalengdin sem þú kemst á einni klukkustund." },
    ],
  };
};
