import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  return {
    h1: "Muunna nimelliskorko efektiiviseksi vuosikoroksi",
    title: tituloQueEntre(
      `Todellinen vuosikorko: nimelliskorosta efektiiviseksi | ${ctx.nombrePais}`,
      `Todellinen vuosikorko | ${ctx.nombrePais}`,
      "Todellinen vuosikorko",
    ),
    description: "Muunna nimellinen vuosikorko efektiiviseksi vuosikoroksi ja takaisin, kun korko lasketaan kuukausittain, neljännesvuosittain, puolivuosittain tai päivittäin.",
    intro: [
      "Kaksi tarjousta samalla korolla voi maksaa eri verran. Ero syntyy siitä, kuinka usein korko lasketaan.",
      "Efektiivinen vuosikorko tekee tarjouksista vertailukelpoisia. Se näyttää, paljonko oikeasti maksat tai saat vuodessa. Valitse, mikä korko sinulla on, niin laskuri laskee toisen.",
    ],
    comoSeCalcula: [
      "Efektiivinen korko = (1 + nimelliskorko ÷ m) potenssiin m, miinus 1. Tässä m on korkojaksojen määrä vuodessa, kuukausittain 12 ja neljännesvuosittain 4.",
      "Nimelliskorko = m × ((1 + efektiivinen korko) potenssiin 1 ÷ m, miinus 1).",
      "Korko jaksoa kohden on nimelliskorko jaettuna m:llä.",
    ],
    ejemplo: [
      `Nimelliskorko 12 %, kun korko lasketaan kuukausittain, vastaa efektiivistä korkoa ${p(aEfectiva(12, 12))}.`,
      `Efektiivinen korko 10 % vastaa nimelliskorkoa ${p(aNominal(10, 12))}, kun korko lasketaan kuukausittain.`,
    ],
    faq: [
      {
        pregunta: "Mitä eroa on nimelliskorolla ja efektiivisellä korolla?",
        respuesta:
          "Nimelliskorko on vuosikorko ennen kuin korkoa korolle otetaan huomioon. Efektiivisessä korossa on mukana se, että korko kasvattaa myös korkoa. Siksi efektiivinen korko on aina yhtä suuri tai suurempi kuin nimelliskorko.",
      },
      {
        pregunta: "Millä korolla lainoja kannattaa vertailla?",
        respuesta:
          "Todellisella vuosikorolla. Lainatarjousten todelliseen vuosikorkoon lasketaan yleensä myös avausmaksut ja tilinhoitomaksut, joten se voi olla suurempi kuin tässä laskettu luku. Vertaa myös lainan kokonaiskuluja.",
      },
      {
        pregunta: "Miksi efektiivinen korko nousee, kun korko lasketaan useammin?",
        respuesta:
          "Korko lisätään aiemmin, ja se alkaa itse kasvattaa korkoa. Jos korko lasketaan vain kerran vuodessa, nimelliskorko ja efektiivinen korko ovat yhtä suuret.",
      },
    ],
    glosario: [
      { termino: "Nimelliskorko", definicion: "Vuosikorko ilman korkoa korolle vaikutusta." },
      { termino: "Efektiivinen korko", definicion: "Vuosikorko, kun korkoa korolle on otettu huomioon." },
      { termino: "Todellinen vuosikorko", definicion: "Lainan vuosikorko, johon on laskettu mukaan myös lainan kulut." },
      { termino: "Korkojakso", definicion: "Kuinka usein korko lisätään velkaan tai saldoon." },
    ],
  };
};
