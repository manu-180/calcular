import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Korkolaskuri",
    title: tituloQueEntre(
      `Korkolaskuri: laske korko summalle | ${ctx.nombrePais}`,
      `Korkolaskuri | ${ctx.nombrePais}`,
      "Korkolaskuri",
    ),
    description: "Laske yksinkertainen korko summalle vuosikorolla päivien, kuukausien tai vuosien ajalta. Valitse 365 tai 360 päivän vuosi ja näe loppusumma.",
    intro: [
      "Yksinkertainen korko lasketaan aina alkuperäisestä summasta. Korkoa ei lisätä saldoon ajanjakson aikana.",
      "Sitä käytetään lyhyissä talletuksissa, yksityishenkilöiden välisissä lainoissa ja monissa koulutehtävissä.",
    ],
    comoSeCalcula: [
      "Korko = pääoma × vuosikorko × aika vuosina.",
      "Kuukausina annettu aika jaetaan 12:lla. Päivinä annettu aika jaetaan 365:llä tai 360:llä sen mukaan, kumpaa vuotta pankki käyttää.",
      "Loppusumma = pääoma + korko.",
    ],
    ejemplo: [
      `Pääoma ${m(capital)} 10 prosentin vuosikorolla tuottaa kuudessa kuukaudessa korkoa ${m(capital * 0.1 * 0.5)}.`,
      `Sama summa tuottaa 90 päivässä korkoa ${m((capital * 0.1 * 90) / 365)}, kun vuodessa on 365 päivää, ja ${m((capital * 0.1 * 90) / 360)}, kun vuodessa on 360 päivää.`,
    ],
    faq: [
      {
        pregunta: "Miten summalle lasketaan korko?",
        respuesta: `Korko = K × r × t. K on pääoma, r on vuosikorko desimaalilukuna (10 % on ${formatearNumero(ctx, 0.1, 2)}) ja t on aika vuosina.`,
      },
      {
        pregunta: "Mitä eroa on korkoa korolle -laskentaan?",
        respuesta: "Yksinkertainen korko lasketaan aina samasta summasta. Korkoa korolle -laskennassa korko lisätään saldoon ja alkaa itse kasvattaa korkoa.",
      },
      {
        pregunta: "Miksi osa pankeista laskee 360 päivällä?",
        respuesta: "Se on pankkimaailman käytäntö, joka helpottaa laskemista. 360 päivän vuodella korko on hieman suurempi. Tarkista, mitä pankkisi käyttää.",
      },
    ],
    glosario: [
      { termino: "Pääoma", definicion: "Raha, joka lainataan tai sijoitetaan." },
      { termino: "Pankkivuosi", definicion: "Vuosi, joka lasketaan 360 päivän pituiseksi ja jossa jokaisessa kuukaudessa on 30 päivää." },
    ],
  };
};
