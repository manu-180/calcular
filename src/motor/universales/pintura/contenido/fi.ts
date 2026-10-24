import { formatearCifra, formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const margen = formatearCifra(ctx, MARGEN * 100);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `Huoneessa, jossa seinää on 48 ft, huonekorkeus on 8 ft ja ovia ja ikkunoita on 40 ft², maalattavaa pintaa on ${n(neta, 0)} ft².`,
          `Kun maalaat 2 kertaa ja maali riittää 350 neliöjalkaan gallonalla, tarvitset ${n(gal, 2)} gallonaa. Varan kanssa määrä on ${n(gal * (1 + MARGEN), 2)} gallonaa.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `Huoneessa, jossa seinää on 14 metriä, huonekorkeus on ${n(2.6)} metriä ja ovia ja ikkunoita on 4 m², maalattavaa pintaa on ${n(neta)} m².`,
          `Kun maalaat 2 kertaa ja maalin riittoisuus on 10 m² litralla, tarvitset ${n(litros, 2)} litraa. Varan kanssa määrä on ${n(litros * (1 + MARGEN), 2)} litraa.`,
        ];
      })();
  return {
    h1: "Paljonko maalia tarvitsen?",
    title: tituloQueEntre(
      `Maalimenekki: paljonko maalia tarvitsen | ${ctx.nombrePais}`,
      `Maalimenekki | ${ctx.nombrePais}`,
      "Maalimenekki",
    ),
    description: "Laske, paljonko maalia tarvitset seinille mittojen, ovien ja ikkunoiden, maalikerrosten ja maalipurkin riittoisuuden perusteella.",
    intro: [
      "Syötä seinien pituus ja korkeus (tai suoraan pinta-ala), ovien ja ikkunoiden ala ja montako kertaa aiot maalata.",
      `Laskuri lisää ${margen} % varaa, jotta maali ei lopu kesken.`,
    ],
    comoSeCalcula: [
      "Pinta-ala = seinien yhteenlaskettu pituus × korkeus, vähennettynä ovilla ja ikkunoilla.",
      "Maali = pinta-ala × maalikerrokset ÷ riittoisuus.",
      `Lopuksi lisätään ${margen} % varaa.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Kuinka pitkälle litra maalia riittää?",
        respuesta: "Useimmat sisäseinämaalit riittävät vähintään 8 ja enintään 12 neliömetriin litralla yhtä kerrosta kohden. Tarkka luku on merkitty purkkiin.",
      },
      {
        pregunta: "Montako maalikerrosta tarvitaan?",
        respuesta: "Tavallisesti kaksi. Juuri tasoitetut tai voimakkaasti imevät seinät tai suuri sävyn vaihdos voivat vaatia kolmannen kerroksen.",
      },
      {
        pregunta: "Pitääkö ovet ja ikkunat vähentää?",
        respuesta: "Kyllä, jos ne ovat suuria. Pienet aukot kannattaa jättää vähentämättä, koska ylimääräinen maali kuluu reunoihin ja nurkkiin.",
      },
    ],
    glosario: [
      { termino: "Riittoisuus", definicion: "Kuinka suuren pinnan litra tai gallona maalia peittää yhdellä kerroksella." },
      { termino: "Maalikerros", definicion: "Jokainen seinään levitettävä maalikerta." },
    ],
  };
};
