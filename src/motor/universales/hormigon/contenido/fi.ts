import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `Terassilaattaan, jonka koko on 10 × 10 ft ja paksuus 4 in, tarvitaan ${n(ft3)} ft³ betonia eli ${n(ft3 / 27)} kuutiojaardia.`,
          `Viitesekoituksella sementtiä tarvitaan noin ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `Laattaan, jonka koko on 4 × 3 m ja paksuus 10 cm, tarvitaan ${n(volumen, 1)} m³ betonia.`,
          `Viitesekoituksella tarvitaan noin ${n(MEZCLA.cementoKg * volumen, 0)} kg sementtiä, ${n(MEZCLA.arenaM3 * volumen)} m³ hiekkaa ja ${n(MEZCLA.piedraM3 * volumen)} m³ soraa.`,
        ];
      })();
  return {
    h1: "Betonilaskuri: paljonko betonia tarvitsen?",
    title: tituloQueEntre(
      `Betonilaskuri: paljonko betonia tarvitsen | ${ctx.nombrePais}`,
      `Betonilaskuri | ${ctx.nombrePais}`,
      "Betonilaskuri",
    ),
    description: `Laske, paljonko betonia tarvitset valuun ${imperial ? "kuutiojaardeina" : "kuutiometreinä"}, ja suunnilleen paljonko sementtiä, hiekkaa ja soraa ostat.`,
    intro: [
      "Syötä pituus, leveys ja paksuus. Näet betonin tilavuuden ja suunnilleen sen, paljonko materiaalia sekoitukseen kuluu.",
      "Materiaalimäärät riippuvat reseptistä. Laskuri käyttää yleistä sekoitussuhdetta 1:2:3.",
    ],
    comoSeCalcula: [
      imperial
        ? "Tilavuus = pituus × leveys × paksuus, kun paksuus on jalkoina. Jaa kuutiojalat 27:llä, niin saat kuutiojaardit."
        : "Tilavuus = pituus × leveys × paksuus, kun paksuus on metreinä.",
      "Sen jälkeen lisätään varaus epätasaista alustaa ja hukkaa varten.",
      `Kuutiometriä kohden: noin ${n(MEZCLA.cementoKg, 0)} kg sementtiä, ${n(MEZCLA.arenaM3)} m³ hiekkaa, ${n(MEZCLA.piedraM3, 1)} m³ soraa ja ${n(MEZCLA.aguaL, 0)} litraa vettä.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Miten lasken tarvittavan betonin määrän?",
        respuesta: `Kerro pituus, leveys ja paksuus metreinä keskenään. Laatta, jonka koko on 4 × 3 m ja paksuus 10 cm, vaatii ${n(4 * 3 * 0.1, 1)} m³.`,
      },
      {
        pregunta: "Paljonko sementtiä kuluu betonikuutioon?",
        respuesta: `Sekoitussuhteella 1:2:3 noin ${n(MEZCLA.cementoKg, 0)} kg. Lujempi betoni vaatii enemmän sementtiä.`,
      },
      {
        pregunta: "Kannattaako tilata valmisbetonia?",
        respuesta: "Suurissa valuissa valmisbetoni on yleensä tasalaatuisempaa ja nopeampaa. Pienissä töissä betoni sekoitetaan usein itse näillä määrillä.",
      },
    ],
    glosario: [
      { termino: "Sekoitussuhde", definicion: "Sementin, hiekan, soran ja veden välinen suhde seoksessa." },
      { termino: "Valu", definicion: "Vaihe, jossa betoni kaadetaan muottiin ja annetaan kovettua." },
    ],
  };
};
