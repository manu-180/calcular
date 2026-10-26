import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  return {
    h1: `Momsberegner for ${ctx.nombrePais}`,
    title: tituloQueEntre(
      `Momsberegner (${tasa}): beregn moms | ${ctx.nombrePais}`,
      `Momsberegner (${tasa}) | ${ctx.nombrePais}`,
      `Momsberegner (${tasa})`,
    ),
    description: `Læg ${tasa} moms til eller træk den ud af en hvilken som helst pris i ét trin. Du ser prisen uden moms, momsen og prisen med moms.`,
    intro: [
      `Den almindelige momssats, der bruges her for ${ctx.nombrePais}, er ${tasa}.`,
      "Vælg, om du vil lægge moms til en pris uden moms eller trække momsen ud af en pris, hvor den allerede er med. Skriv derefter beløbet.",
    ],
    comoSeCalcula: [
      "Læg moms til: moms = pris uden moms × momssats ÷ 100. Pris med moms = pris uden moms + moms.",
      "Træk moms ud: pris uden moms = pris med moms ÷ (1 + momssats ÷ 100). Momsen er forskellen.",
      "Har varen en anden momssats, kan du skrive den under »Anden momssats«.",
    ],
    ejemplo: [
      `For at lægge moms til ${precio} ganger du beløbet med ${tasa} og lægger resultatet til prisen.`,
      `For at se, hvor meget moms der er i ${precio}, deler du beløbet med 1 plus momssatsen og trækker resultatet fra ${precio}.`,
    ],
    faq: [
      {
        pregunta: "Hvordan trækker jeg momsen ud af en pris?",
        respuesta: "Del prisen med 1 plus momssatsen som decimaltal. Det, der er tilbage, er prisen uden moms, og forskellen er momsen.",
      },
      {
        pregunta: "Hvorfor kan jeg ikke bare trække procentsatsen fra totalen?",
        respuesta: "Fordi momsen blev beregnet af den lavere pris uden moms. Trækker du procentsatsen fra totalen, fjerner du for meget.",
      },
      {
        pregunta: `Gælder ${tasa} i moms på alt?`,
        respuesta: "Ikke altid. Nogle varer og ydelser kan have en lavere sats eller være fritaget for moms, fx visse former for persontransport, sundhed og undervisning. Brug så »Anden momssats«.",
      },
    ],
    glosario: [
      { termino: "Moms", definicion: "Merværdiafgift, en afgift, der lægges på prisen for varer og ydelser." },
      { termino: "Pris uden moms", definicion: "Prisen, før momsen er lagt til." },
    ],
  };
};
