import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: imperial ? "Laske neliöjalat" : "Laske neliömetrit",
    title: tituloQueEntre(
      `Neliölaskuri: laske huoneen ja tontin neliöt | ${ctx.nombrePais}`,
      `Neliölaskuri | ${ctx.nombrePais}`,
      "Neliölaskuri",
    ),
    description: "Laske huoneen, lattian tai tontin pinta-ala: suorakulmiot, kolmiot ja ympyrät, ja jopa viisi muotoa yhteenlaskettuna.",
    intro: [
      "Valitse muoto ja syötä mitat. Jos alue ei ole yksinkertainen suorakulmio, jaa se osiin, niin laskuri laskee ne yhteen.",
      imperial ? "Näet tuloksen myös neliömetreinä." : "Näet tuloksen myös neliöjalkoina.",
    ],
    comoSeCalcula: [
      "Suorakulmio: pituus × leveys.",
      "Kolmio: kanta × korkeus ÷ 2.",
      `Ympyrä: π × säde × säde, kun säde on puolet halkaisijasta. 1 m² on ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `L-muotoisen olohuoneen voi jakaa suorakulmioihin 16 × 12 ft ja 10 × 6 ft. Pinta-ala on yhteensä ${n(enL, 0)} ft².`
        : `L-muotoisen olohuoneen voi jakaa suorakulmioihin 5 × 4 m ja 3 × 2 m. Pinta-ala on yhteensä ${n(enL, 0)} m².`,
      `Pyöreä pöytä, jonka halkaisija on 2 ${u}, vie tilaa ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: "Miten lasken huoneen neliöt?",
        respuesta: imperial
          ? `Mittaa pituus ja leveys jalkoina ja kerro ne keskenään. Huone, jonka mitat ovat 12 × 10 ft, on ${n(area("rectangulo", 12, 10), 0)} ft².`
          : `Mittaa pituus ja leveys metreinä ja kerro ne keskenään. Huone, jonka mitat ovat 4 × 3 m, on ${n(area("rectangulo", 4, 3), 0)} m².`,
      },
      {
        pregunta: "Entä jos mitat ovat senttimetreinä?",
        respuesta: `Muunna ne ensin: jaa senttimetrit sadalla, niin saat metrit, tai tuumat 12:lla, niin saat jalat. 350 cm on ${n(350 / 100, 1)} m.`,
      },
      {
        pregunta: "Miten muutan neliömetrit neliöjaloiksi?",
        respuesta: `Kerro luvulla ${n(FT2_POR_M2)}. 20 m² on ${n(20 * FT2_POR_M2)} ft².`,
      },
    ],
    glosario: [
      { termino: "Neliömetri (m², neliö)", definicion: "Sellaisen neliön pinta-ala, jonka jokainen sivu on 1 metri." },
      { termino: "Neliöjalka (ft²)", definicion: "Sellaisen neliön pinta-ala, jonka jokainen sivu on 1 jalka." },
    ],
  };
};
