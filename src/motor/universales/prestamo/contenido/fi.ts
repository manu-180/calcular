import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Lainalaskuri",
    title: tituloQueEntre(
      `Lainalaskuri: laske kuukausierä ja korot | ${ctx.nombrePais}`,
      `Lainalaskuri | ${ctx.nombrePais}`,
      "Lainalaskuri",
    ),
    description: "Laske lainan kuukausierä, korot yhteensä ja koko maksusuunnitelma. Näet myös, paljonko ylimääräiset lyhennykset säästävät.",
    intro: [
      "Ennen kuin otat lainaa, kaksi lukua kertoo eniten. Paljonko maksat joka kuukausi ja paljonko laina maksaa sinulle korkoina.",
      "Syötä lainan määrä, vuosikorko ja laina-aika. Jos aiot lyhentää joka kuukausi vähän enemmän, lisää sekin, niin näet, kuinka paljon nopeammin laina on maksettu.",
    ],
    comoSeCalcula: [
      "Laskuri käyttää annuiteettia eli samansuuruista maksua joka kuukausi. Se on tavallinen kulutusluotoissa, autolainoissa ja asuntolainoissa.",
      "Kuukausikorko = vuosikorko ÷ 12.",
      "Kuukausierä = lainan määrä × kuukausikorko ÷ (1 − (1 + kuukausikorko) potenssiin miinus maksujen määrä).",
      "Korko lasketaan joka kuukausi jäljellä olevasta velasta. Loput maksusta on lyhennystä, joka pienentää velkaa.",
    ],
    ejemplo: [
      `Laina, jonka määrä on ${m(monto)}, vuosikorko 12 % ja laina-aika 36 kuukautta, maksaa ${m(cuota36)} kuukaudessa. Korkoja maksat yhteensä ${m(interesesTotales(monto, 12, 36))}.`,
      `Jos pidennät laina-ajan 60 kuukauteen, kuukausierä on enää ${m(cuota60)}, mutta korkoja kertyy yhteensä ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "Miten lainan kuukausierä lasketaan?",
        respuesta:
          "Annuiteettikaavalla. Kaikki maksut ovat yhtä suuria, mutta alussa ne ovat enimmäkseen korkoa ja lopussa enimmäkseen lyhennystä. Siksi velka pienenee alussa hitaasti.",
      },
      {
        pregunta: "Kannattaako laina maksaa pois etuajassa?",
        respuesta:
          "Yleensä kannattaa, jos ennenaikaisen takaisinmaksun kulu ei ole suuri. Ylimääräinen raha menee suoraan velkaan, eikä siitä osasta enää makseta korkoa. Mitä aiemmin maksat, sitä enemmän säästät.",
      },
      {
        pregunta: "Onko pidempi laina-aika parempi?",
        respuesta: "Kuukausierä pienenee, mutta maksat korkoja yhteensä selvästi enemmän. Vertaa kumpaakin lukua ennen kuin päätät.",
      },
      {
        pregunta: "Miksi pankin laskema kuukausierä on eri?",
        respuesta:
          "Lainanantaja lisää usein kuluja, vakuutuksia tai veroja tai käyttää eri korkoa kuin mainoksessa. Vertaa tarjouksia todellisen vuosikoron ja kokonaiskulujen perusteella, älä pelkän nimelliskoron.",
      },
    ],
    glosario: [
      { termino: "Velka", definicion: "Se osa lainasta, jota et ole vielä maksanut takaisin." },
      { termino: "Nimelliskorko", definicion: "Vuosikorko, joka jaetaan 12:lla kunkin kuukauden koron saamiseksi." },
      { termino: "Lyhennys", definicion: "Se osa maksusta, joka pienentää velkaa." },
    ],
  };
};
