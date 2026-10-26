import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Korkoa korolle -laskuri",
    title: tituloQueEntre(
      `Korkoa korolle: laske, miten säästösi kasvavat | ${ctx.nombrePais}`,
      `Korkoa korolle -laskuri | ${ctx.nombrePais}`,
      "Korkoa korolle -laskuri",
    ),
    description: "Katso, miten rahasi kasvavat korkoa korolle ja kuukausisäästöillä. Näet loppusumman, tuoton osuuden ja taulukon vuosi vuodelta.",
    intro: [
      "Kun korkoa kertyy korolle, korko lisätään saldoon ja se alkaa itse kasvattaa korkoa. Siksi säästöt kasvavat sitä nopeammin, mitä pidempään ne saavat kasvaa.",
      "Syötä, paljonko sinulla on nyt, paljonko pystyt säästämään kuukaudessa, korko ja vuosien määrä. Näet loppusumman ja sen, kuinka suuri osa siitä on tuottoa.",
    ],
    comoSeCalcula: [
      "Loppusumma = alkupääoma × (1 + i) potenssiin n + kuukausisäästö × ((1 + i) potenssiin n − 1) ÷ i.",
      "Tässä i on kuukausikorko, joka vastaa valitsemaasi koron laskentatapaa, ja n on kuukausien määrä.",
      "Kuukausisäästö talletetaan kunkin kuukauden lopussa.",
    ],
    ejemplo: [
      `Jos alkupääomasi on ${m(capital)} ja säästät ${m(aporte)} kuukaudessa 7 prosentin vuosituotolla, sinulla on 10 vuoden jälkeen ${m(a10)}.`,
      `Jos jatkat vielä 10 vuotta, saldo on jo ${m(a20)}. Toinen vuosikymmen tuottaa selvästi enemmän kuin ensimmäinen.`,
    ],
    faq: [
      {
        pregunta: "Mitä eroa on yksinkertaisella korolla ja korkoa korolle -laskennalla?",
        respuesta:
          "Yksinkertainen korko lasketaan aina alkuperäisestä summasta. Korkoa korolle lasketaan summasta, johon on lisätty jo saadut korot.",
      },
      {
        pregunta: "Mikä on 72:n sääntö?",
        respuesta: `Nopea tapa arvioida, kuinka kauan rahojen tuplaantuminen kestää. Jaa 72 vuosikorolla. Kuuden prosentin korolla rahat tuplaantuvat noin ${formatearCifra(ctx, 72 / 6, 0)} vuodessa.`,
      },
      {
        pregunta: "Millä korolla kannattaa laskea?",
        respuesta:
          "Sellaisella, joka on realistinen sille, mitä aiot rahoilla tehdä. Jos haluat nähdä tuloksen tämän päivän rahassa, käytä korkoa, josta on vähennetty odottamasi inflaatio.",
      },
    ],
    glosario: [
      { termino: "Koron laskeminen", definicion: "Kuinka usein korko lisätään saldoon." },
      { termino: "Korkoa korolle", definicion: "Korko, joka lasketaan saldosta ja siihen jo lisätyistä koroista." },
    ],
  };
};
