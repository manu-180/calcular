import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "Palkankorotuslaskuri",
    title: tituloQueEntre(
      `Palkankorotus: laske uusi palkka ja reaalikorotus | ${ctx.nombrePais}`,
      `Palkankorotus | ${ctx.nombrePais}`,
      "Palkankorotus",
    ),
    description: "Laske uusi palkkasi korotuksen jälkeen, ero kuukaudessa ja vuodessa sekä se, voittaako korotus inflaation eli mikä on reaalinen korotus.",
    intro: [
      "Sait palkkatarjouksen tai olet menossa palkkakeskusteluun. Syötä palkka ja korotus prosentteina tai summana, niin näet, paljonko muuttuu kuukaudessa ja vuodessa.",
      "Lisää jakson inflaatio, niin näet, kasvaako ostovoimasi oikeasti vai pysytkö vain ennallaan.",
    ],
    comoSeCalcula: [
      "Uusi palkka = nykyinen palkka × (1 + korotus ÷ 100).",
      "Ero vuodessa = ero kuukaudessa × palkkojen määrä vuodessa.",
      "Reaalinen korotus = (1 + korotus) ÷ (1 + inflaatio) − 1.",
    ],
    ejemplo: [
      `Kun kuukausipalkka on ${m(sueldo)} ja korotus 5 %, uusi palkka on ${m(sueldo * 1.05)}. Se on ${m(sueldo * 0.05)} enemmän kuukaudessa ja ${m(sueldo * 0.05 * 12)} enemmän vuodessa.`,
      `Jos inflaatio oli jakson aikana 3 %, reaalinen korotus on ${p(aumentoReal(5, 3))}. Kuuden prosentin inflaatiolla se on ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Mitä reaalinen palkankorotus tarkoittaa?",
        respuesta: "Se on palkankorotus inflaation jälkeen. Se kertoo, saako uudella palkallasi enemmän vai vähemmän kuin ennen.",
      },
      {
        pregunta: "Miksi inflaatiota ei voi vain vähentää korotuksesta?",
        respuesta: `Koska prosentit kerrotaan keskenään eikä niitä lasketa yhteen. Viiden prosentin korotuksella ja kolmen prosentin inflaatiolla reaalinen korotus on ${p(aumentoReal(5, 3))}, ei ${formatearCifra(ctx, 5 - 3)} %. Kun inflaatio on korkea, ero kasvaa paljon suuremmaksi.`,
      },
      {
        pregunta: "Kuinka suurta korotusta kannattaa pyytää?",
        respuesta: "Vähintään edellisen korotuksesi jälkeisen inflaation verran, jotta et jää jälkeen. Sen lisäksi voit perustella pyyntöä sillä, mitä muut työnantajat maksavat vastaavasta työstä ja miten tehtäväsi ovat kasvaneet.",
      },
    ],
    glosario: [
      { termino: "Nimellinen korotus", definicion: "Korotus sellaisena kuin se näkyy palkkalaskelmassa, ennen inflaatiota." },
      { termino: "Ostovoima", definicion: "Mitä palkallasi saa." },
    ],
  };
};
