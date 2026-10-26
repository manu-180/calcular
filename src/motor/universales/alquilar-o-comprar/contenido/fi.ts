import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const voittaja = (a: { comprar: number; alquilar: number }, anios: string) =>
    `${anios} vuoden aikana ${a.comprar >= a.alquilar ? "ostaminen kannattaa paremmin" : "vuokralla asuminen kannattaa paremmin"}, ja ero on ${m(Math.abs(a.comprar - a.alquilar))}.`;
  return {
    h1: "Vuokra-asunto vai omistusasunto",
    title: tituloQueEntre(
      `Vuokra vai omistusasunto: laske, kumpi kannattaa | ${ctx.nombrePais}`,
      `Vuokra vai omistusasunto | ${ctx.nombrePais}`,
      "Vuokra vai omistusasunto",
    ),
    description: "Vertaa vuokralla asumista ja asunnon ostamista valitsemiesi vuosien ajalta. Näet, kumpi kannattaa lopulta, mistä vuodesta alkaen ja kuinka paljon.",
    intro: [
      "Lainan kuukausierän vertaaminen vuokraan ei riitä. Ostaja maksaa korkoja, korjauksia ja kuluja, mutta omistaa lopulta asunnon. Vuokralla asuva voi sijoittaa säästönsä ja antaa niiden kasvaa.",
      "Laskuri laskee kaiken tämän yhteen vuosi vuodelta ja näyttää, kumpi vaihtoehto jättää sinulle suuremman varallisuuden.",
    ],
    comoSeCalcula: [
      "Ostaminen: maksat joka kuukausi lainaa ja omistamisen kuluja. Varallisuutesi on asunnon arvo miinus jäljellä oleva laina.",
      "Vuokralla asuminen: omarahoitusosuus ja kaupan kulut sijoitetaan sen sijaan muiden sijoitusten tuotolla, ja vuokra nousee joka vuosi.",
      "Se, jonka menot ovat kuukaudessa pienemmät, sijoittaa erotuksen. Näin kummallakin vaihtoehdolla on sama budjetti.",
      "Parempi vaihtoehto on se, joka antaa lopussa suuremman varallisuuden.",
    ],
    ejemplo: [
      `Asunto maksaa ${m(precio)}, omarahoitusosuus on 20 % ja asuntolainan korko 7 % 25 vuoden laina-ajalla. Vertailukohtana on vuokra ${m(alquiler)} kuukaudessa.`,
      `${voittaja(a10, "10")} ${voittaja(a3, "3")}`,
    ],
    faq: [
      {
        pregunta: "Onko vuokralla asuminen rahan heittämistä hukkaan?",
        respuesta:
          "Ei oikeastaan. Myös ostajalla on kuluja, jotka eivät koskaan palaa takaisin, kuten korot, kaupan kulut ja korjaukset. Ratkaisevaa on, paljonko omistat lopussa kummassakin tapauksessa.",
      },
      {
        pregunta: "Miksi vastaus muuttuu vuosien mukaan?",
        respuesta:
          "Ostamisessa on alussa suuria kuluja (kaupan kulut ja ensimmäisten vuosien suuret korot), joiden kuittaaminen vie aikaa. Jos aiot muuttaa pian, vuokralla asuminen kannattaa yleensä paremmin.",
      },
      {
        pregunta: "Mikä tieto vaikuttaa eniten?",
        respuesta:
          "Hinnan ja vuokran suhde, asuntolainan korko ja se, kuinka nopeasti asuntojen hinnat nousevat. Kokeile muuttaa arvonnousua ja tuottoa, niin näet, kuinka paljon vastaus muuttuu.",
      },
    ],
    glosario: [
      { termino: "Varallisuus", definicion: "Se, mitä omistat, miinus se, mitä olet velkaa." },
      { termino: "Arvonnousu", definicion: "Kuinka paljon asunnon arvo nousee vuodessa." },
      { termino: "Vaihtoehtoiskustannus", definicion: "Se, minkä omarahoitusosuus olisi tuottanut, jos olisit sijoittanut sen." },
    ],
  };
};
