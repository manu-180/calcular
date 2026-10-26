import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Lisää päiviä päivämäärään",
    title: tituloQueEntre(
      `Lisää päiviä päivämäärään: laske uusi päivämäärä | ${ctx.nombrePais}`,
      `Lisää päiviä päivämäärään | ${ctx.nombrePais}`,
      "Lisää päiviä päivämäärään",
    ),
    description: "Lisää tai vähennä kalenteripäiviä tai arkipäiviä päivämäärästä ja katso, mikä päivä siitä tulee. Kätevä määräaikoihin ja eräpäiviin.",
    intro: [
      "Valitse päivämäärä, päivien määrä ja se, lisäätkö vai vähennätkö. Näet uuden päivämäärän ja viikonpäivän.",
      "Arkipäivillä laskuri ohittaa lauantait ja sunnuntait.",
    ],
    comoSeCalcula: [
      "Kalenteripäivillä päivämäärä siirtyy kalenterissa yhden päivän jokaista syötettyä päivää kohden.",
      "Arkipäivillä lasketaan vain maanantaista perjantaihin. Itse alkupäivää ei lasketa.",
      "Juhlapyhiä ei vähennetä, koska ne vaihtelevat maittain ja alueittain.",
    ],
    ejemplo: [
      `Kun päivämäärään ${f(inicio)} lisätään 90 kalenteripäivää, tulos on ${f(mas90)}.`,
      `Kun samaan päivämäärään lisätään 15 arkipäivää, tulos on ${f(aFecha(habil))}.`,
    ],
    faq: [
      {
        pregunta: "Lasketaanko alkupäivä ensimmäiseksi päiväksi?",
        respuesta: "Ei. Kun lisäät maanantaihin yhden päivän, tulos on tiistai. Näin lasketaan useimmat määräajat.",
      },
      {
        pregunta: "Mitä tapahtuu, jos lisään arkipäiviä lauantaista alkaen?",
        respuesta: "Ensimmäinen arkipäivä on seuraava maanantai. Kun lisäät lauantaihin yhden arkipäivän, tulos on maanantai.",
      },
      {
        pregunta: "Ottaako laskuri karkausvuodet huomioon?",
        respuesta: "Ottaa. Jos jaksoon osuu 29. helmikuuta, se lasketaan mukaan yhtenä päivänä.",
      },
    ],
    glosario: [
      { termino: "Kalenteripäivät", definicion: "Kaikki kalenterin päivät, mitään ei ohiteta." },
      { termino: "Arkipäivät", definicion: "Tässä laskurissa päivät maanantaista perjantaihin." },
    ],
  };
};
