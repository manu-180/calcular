import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Laske päivät kahden päivämäärän välillä",
    title: tituloQueEntre(
      `Päivälaskuri: laske päivät päivämäärien välillä | ${ctx.nombrePais}`,
      `Päivälaskuri | ${ctx.nombrePais}`,
      "Päivälaskuri",
    ),
    description: "Laske, montako päivää on kahden päivämäärän välillä. Näet kalenteripäivät, viikot, kuukaudet ja arkipäivät maanantaista perjantaihin.",
    intro: [
      "Valitse alkupäivä ja loppupäivä. Näet kalenteripäivät, saman ajan viikkoina ja kuukausina sekä arkipäivien määrän.",
      "Käytä laskuria määräaikoihin, eräpäiviin, lomiin, raskauteen tai lähtölaskentaan.",
    ],
    comoSeCalcula: [
      "Kalenteripäivät ovat kaikki päivät kahden päivämäärän välillä. Alkupäivä lasketaan mukaan, loppupäivä vain, jos valitset sen.",
      "Arkipäivät ovat saman jakson päivät maanantaista perjantaihin. Juhlapyhiä ei vähennetä.",
      "Karkausvuoden 29. helmikuuta lasketaan mukaan.",
    ],
    ejemplo: [
      `Kun alkupäivä on ${f(desde)} ja loppupäivä ${f(hasta)}, väliin jää ${n(dias)} kalenteripäivää.`,
      `Niistä ${n(habiles)} on arkipäiviä maanantaista perjantaihin.`,
    ],
    faq: [
      {
        pregunta: "Lasketaanko ensimmäinen vai viimeinen päivä?",
        respuesta: "Oletuksena ensimmäinen päivä lasketaan ja viimeinen ei, samoin kuin kun vähennät päivämäärän toisesta. Jos tarvitset molemmat, valitse «Laske myös loppupäivä mukaan».",
      },
      {
        pregunta: "Vähennetäänkö juhlapyhät arkipäivistä?",
        respuesta: "Ei. Arkipäivät lasketaan maanantaista perjantaihin. Juhlapyhät vaihtelevat maittain, alueittain ja vuosittain, joten vähennä ne erikseen.",
      },
      {
        pregunta: "Montako päivää vuodessa on?",
        respuesta: "Vuodessa on 365 päivää, karkausvuonna 366. Siksi samojen päivämäärien välinen ero voi olla eri vuosina eri suuri.",
      },
    ],
    glosario: [
      { termino: "Kalenteripäivät", definicion: "Kaikki kalenterin päivät viikonloput ja juhlapyhät mukaan lukien." },
      { termino: "Arkipäivät", definicion: "Tässä laskurissa päivät maanantaista perjantaihin." },
    ],
  };
};
