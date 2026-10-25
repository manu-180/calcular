import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Jos painat 160 paunaa ja pituutesi on 5 jalkaa 9 tuumaa, painoindeksisi on ${n((160 * KG_POR_LB) / (m * m))} eli normaali paino.`,
        `Tällä pituudella normaali paino on ${n((18.5 * m * m) / KG_POR_LB)} ja ${n((24.9 * m * m) / KG_POR_LB)} paunan välillä.`,
      ]
    : [
        `Jos painat 70 kiloa ja pituutesi on ${n(1.75, 2)} metriä, painoindeksisi on ${n(70 / (1.75 * 1.75))} eli normaali paino.`,
        `Tällä pituudella normaali paino on ${n(18.5 * 1.75 * 1.75)} ja ${n(24.9 * 1.75 * 1.75)} kilon välillä.`,
      ];
  return {
    h1: "BMI-laskuri",
    title: tituloQueEntre(
      `BMI-laskuri: laske painoindeksisi | ${ctx.nombrePais}`,
      `BMI-laskuri | ${ctx.nombrePais}`,
      "BMI-laskuri",
    ),
    description: "Laske painoindeksisi painon ja pituuden perusteella. Näet luokkasi WHO:n rajojen mukaan ja pituudellesi sopivan normaalin painon.",
    intro: [
      "Syötä paino ja pituus. Näet painoindeksisi, luokan Maailman terveysjärjestön (WHO) rajojen mukaan ja normaalin painon vaihteluvälin pituudellesi.",
      "Tulos on suuntaa antava ja tarkoitettu aikuisille. Se ei korvaa lääkärin tai terveydenhoitajan arviota.",
    ],
    comoSeCalcula: [
      imperial ? "Painoindeksi = paino paunoina × 703 ÷ (pituus tuumina × pituus tuumina)." : "Painoindeksi = paino kiloina ÷ (pituus metreinä × pituus metreinä).",
      `Alle ${n(18.5)} on alipainoa. Kun arvo on ${n(18.5)} ja ${n(24.9)} välillä, paino on normaali. Väli 25 ja ${n(29.9)} tarkoittaa lievää ylipainoa, ja arvo 30 tai yli lihavuutta.`,
      `Normaali paino on se painoväli, jolla painoindeksi on pituudellasi ${n(18.5)} ja ${n(24.9)} välillä.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Mikä on normaali painoindeksi?",
        respuesta: `WHO:n mukaan aikuisen normaali painoindeksi on ${n(18.5)} ja ${n(24.9)} välillä. Rajat ovat samat naisille ja miehille.`,
      },
      {
        pregunta: "Sopiiko painoindeksi kaikille?",
        respuesta: "Ei. Se ei erottele lihasta ja rasvaa, joten paljon treenaavalla arvo voi olla korkea. Raskauden aikana sekä lapsilla ja nuorilla käytetään muita mittareita.",
      },
      {
        pregunta: "Miten painoindeksi lasketaan?",
        respuesta: imperial
          ? "Kerro paino paunoina luvulla 703 ja jaa pituuden tuumamäärän neliöllä. Pituudella 5 jalkaa 9 tuumaa se on 69 × 69."
          : `Jaa paino kiloina pituuden neliöllä metreinä. Jos olet ${n(1.75, 2)} metriä pitkä, jaat luvulla ${n(1.75 * 1.75, 4)}.`,
      },
    ],
    glosario: [
      { termino: "Painoindeksi (BMI)", definicion: "Body mass index eli mittari, joka suhteuttaa painon pituuteen." },
      { termino: "WHO", definicion: "Maailman terveysjärjestö, joka on määrittänyt aikuisten painoindeksiluokat." },
    ],
  };
};
