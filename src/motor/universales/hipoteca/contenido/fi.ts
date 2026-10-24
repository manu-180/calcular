import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota30 = cuotaFrancesa(prestado, 7, 360);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  return {
    h1: "Asuntolainalaskuri",
    title: tituloQueEntre(
      `Asuntolainalaskuri: laske asuntolainan kuukausierä | ${ctx.nombrePais}`,
      `Asuntolainalaskuri | ${ctx.nombrePais}`,
      "Asuntolainalaskuri",
    ),
    description: "Laske asuntolainasi kuukausierä hinnan, omarahoitusosuuden, koron ja laina-ajan perusteella. Näet korot yhteensä ja velan kehityksen vuosittain.",
    intro: [
      "Asuntolaina on useimmille kotitalouksille suurin velka, jonka ne koskaan ottavat. Koko laskelma kannattaa nähdä ennen kuin menet pankkiin.",
      "Syötä hinta, omarahoitusosuus, korko ja laina-aika. Jos maksat hoitovastiketta tai muita asumiskuluja, lisää nekin, niin näet todelliset asumiskulusi kuukaudessa.",
    ],
    comoSeCalcula: [
      "Lainan määrä = asunnon hinta − omarahoitusosuus.",
      "Kuukausierä lasketaan annuiteettilainana: vuosikorko jaetaan 12:lla ja laina-aika muutetaan kuukausiksi.",
      "Joka vuodelta lasketaan yhteen maksetut korot ja lyhennykset, ja näet, paljonko velkaa on vielä jäljellä.",
    ],
    ejemplo: [
      `Asunto maksaa ${m(precio)} ja omarahoitusosuus on 20 %, joten lainaa tarvitaan ${m(prestado)}. Kun korko on 7 % ja laina-aika 30 vuotta, kuukausierä on ${m(cuota30)}.`,
      `Korkoja kertyy 30 vuodessa ${m(interesesTotales(prestado, 7, 360))}. Jos laina-aika on 15 vuotta, kuukausierä nousee ja on ${m(cuota15)}, mutta korkoja maksat enää ${m(interesesTotales(prestado, 7, 180))}.`,
    ],
    faq: [
      {
        pregunta: "Kuinka suuri omarahoitusosuus tarvitaan?",
        respuesta:
          "Se riippuu pankista ja säännöistä siellä, missä ostat. Mitä suurempi omarahoitusosuus, sitä vähemmän lainaat, sitä pienempi on kuukausierä ja sitä vähemmän maksat korkoja. Säästä myös kaupan kuluihin.",
      },
      {
        pregunta: "Miksi velka pienenee ensimmäisinä vuosina niin vähän?",
        respuesta:
          "Korko lasketaan siitä, mitä olet velkaa. Alussa velka on suuri, joten suurin osa jokaisesta maksusta on korkoa. Ajan myötä lyhennyksen osuus kasvaa.",
      },
      {
        pregunta: "Onko lyhyempi laina-aika parempi?",
        respuesta:
          "Jos pystyt maksamaan suuremman kuukausierän, on. Maksat korkoja selvästi vähemmän. Muuten pidempi laina-aika ja ylimääräiset lyhennykset silloin, kun sinulla on varaa, toimivat hyvin.",
      },
      {
        pregunta: "Laskeeko pankki samalla tavalla?",
        respuesta:
          "Ei aina. Pankit tarjoavat myös tasalyhennystä, jossa lyhennät joka kuukausi saman summan ja korkojen osuus pienenee ajan myötä. Tämä laskuri käyttää annuiteettia ja samaa korkoa koko laina-ajan. Vaihtuvalla korolla kuukausierä voi muuttua.",
      },
    ],
    glosario: [
      { termino: "Omarahoitusosuus", definicion: "Se osa hinnasta, jonka maksat omilla rahoillasi." },
      { termino: "Lyhennys", definicion: "Se osa maksusta, joka pienentää velkaa." },
      { termino: "Annuiteetti", definicion: "Laina, jossa jokainen kuukausierä on yhtä suuri ja sisältää sekä koron että lyhennyksen." },
    ],
  };
};
