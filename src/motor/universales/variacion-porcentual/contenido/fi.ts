import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  const c = (n: number) => formatearCifra(ctx, n);
  const subida = ((despues - antes) / antes) * 100;
  const vuelta = ((despues - antes) / despues) * 100;
  return {
    h1: "Laske prosenttimuutos",
    title: tituloQueEntre(
      `Prosenttimuutos: laske nousu tai lasku prosentteina | ${ctx.nombrePais}`,
      `Prosenttimuutos | ${ctx.nombrePais}`,
      "Prosenttimuutos",
    ),
    description: "Laske, montako prosenttia arvo on noussut tai laskenut. Sopii hintoihin, palkkaan, myyntiin ja mihin tahansa lukuun, joka on muuttunut.",
    intro: [
      "Syötä alkuperäinen ja uusi arvo. Näet nousun tai laskun prosentteina sekä erotuksen.",
      "Näet myös, paljonko arvon pitää muuttua, jotta se palaa ennalleen. Se ei ole juuri koskaan sama prosentti.",
    ],
    comoSeCalcula: [
      "Prosenttimuutos = (uusi arvo − alkuperäinen arvo) ÷ alkuperäinen arvo × 100.",
      "Positiivinen tulos tarkoittaa nousua ja negatiivinen laskua.",
      "Jos alkuperäinen arvo on negatiivinen, jaetaan sen itseisarvolla. Silloin etumerkki kertoo yhä, parantuiko tilanne.",
    ],
    ejemplo: [
      `Tuote, joka maksoi ${m(antes)} ja maksaa nyt ${m(despues)}, on kallistunut ${c(subida)} %.`,
      `Jotta hinta palaisi entiselleen, sen pitää laskea ${c(vuelta)} %, ei ${c(subida)} %.`,
    ],
    faq: [
      {
        pregunta: "Miten lasken nousun prosentteina?",
        respuesta: `Vähennä alkuperäinen arvo uudesta, jaa erotus alkuperäisellä arvolla ja kerro sadalla. Kun arvo nousee 80:stä 100:aan, muutos on 20 ÷ 80 × 100 = ${c((20 / 80) * 100)} %.`,
      },
      {
        pregunta: "Miten lasken laskun prosentteina?",
        respuesta: `Samalla tavalla. Kun arvo pienenee 100:sta 80:een, muutos on −20 ÷ 100 × 100 = −${c(20)} % eli ${c(20)} prosentin lasku.`,
      },
      {
        pregunta: "Miksi 25 prosentin nousu ja 25 prosentin lasku eivät kumoa toisiaan?",
        respuesta: `Prosentit lasketaan eri perusarvoista. 80 plus 25 % on ${c(80 * 1.25)}, mutta 100 miinus 25 % on ${c(100 * 0.75)}.`,
      },
      {
        pregunta: "Mitä eroa on prosentilla ja prosenttiyksiköllä?",
        respuesta: `Jos korko nousee 10 prosentista 12 prosenttiin, se nousee ${c(12 - 10)} prosenttiyksikköä. Prosentteina muutos on ${c(((12 - 10) / 10) * 100)} %.`,
      },
    ],
    glosario: [
      { termino: "Prosenttimuutos", definicion: "Kuinka paljon arvo on muuttunut prosentteina alkuperäisestä arvosta." },
      { termino: "Prosenttiyksikkö", definicion: "Kahden prosenttiluvun suora erotus." },
    ],
  };
};
