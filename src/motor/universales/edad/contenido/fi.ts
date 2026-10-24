import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionFi } from "../../dias-entre-fechas/textos/fi";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Ikälaskuri",
    title: tituloQueEntre(
      `Ikälaskuri: tarkka ikä vuosina, kuukausina ja päivinä | ${ctx.nombrePais}`,
      `Ikälaskuri: laske tarkka ikä | ${ctx.nombrePais}`,
      `Ikälaskuri | ${ctx.nombrePais}`,
      "Ikälaskuri",
    ),
    description: "Laske tarkka ikäsi vuosina, kuukausina ja päivinä, montako päivää olet elänyt ja kauanko seuraavaan syntymäpäivään on aikaa.",
    intro: [
      "Syötä syntymäaikasi, niin näet tarkan ikäsi tänään myös kuukausina, viikkoina ja päivinä.",
      "Vaihda toinen päivämäärä, niin näet, minkä ikäinen joku oli tiettynä päivänä tai minkä ikäinen hän tulee olemaan.",
    ],
    comoSeCalcula: [
      "Syntymästä valittuun päivään lasketaan täydet kuukaudet. Jokainen 12 kuukautta on yksi vuosi.",
      "Viimeisen täyden kuukauden jälkeen jäävät päivät ovat iän päivät.",
      "Karkausvuodet lasketaan 366 päivän mittaisina.",
    ],
    ejemplo: [
      `Henkilö, jonka syntymäaika on ${fechaLarga(ctx.locale, nac)}, oli päivänä ${fechaLarga(ctx.locale, ref)} iältään ${duracionFi(Math.floor(meses / 12), meses % 12, dias)}.`,
      `Se on ${formatearNumero(ctx, total)} päivää.`,
    ],
    faq: [
      {
        pregunta: "Miten tarkka ikä lasketaan?",
        respuesta: "Ensin lasketaan täydet vuodet, sitten täydet kuukaudet edellisestä syntymäpäivästä ja lopuksi jäljelle jäävät päivät.",
      },
      {
        pregunta: "Entä jos syntymäpäivä on 29. helmikuuta?",
        respuesta: "Muina kuin karkausvuosina tämä laskuri pitää syntymäpäivänä 28. helmikuuta. Joissakin laeissa käytetään sen sijaan 1. maaliskuuta.",
      },
      {
        pregunta: "Montako päivää olen elänyt?",
        respuesta: "Katso riviä «Päivinä». Siinä lasketaan jokainen päivä syntymästäsi valittuun päivään, viimeistä päivää lukuun ottamatta.",
      },
    ],
    glosario: [
      { termino: "Ikä", definicion: "Täysien vuosien määrä syntymästä." },
      { termino: "Karkausvuosi", definicion: "Vuosi, jossa on 366 päivää ja 29. helmikuuta. Se toistuu joka neljäs vuosi, mutta osa tasavuosisadoista ei ole karkausvuosia." },
    ],
  };
};
