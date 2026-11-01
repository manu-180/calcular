import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator ndryshimi në përqindje",
    title: tituloQueEntre(`Kalkulator ndryshimi në përqindje: ${ctx.nombrePais}`, "Kalkulator ndryshimi në përqindje", "Ndryshimi në përqindje"),
    description: "Llogaritni me sa përqind u rrit ose u ul një vlerë: çmime, paga, shitje ose çdo numër që ka ndryshuar me kohën.",
    intro: [
      "Vendosni vlerën e vjetër dhe vlerën e re. Shikoni rritjen ose uljen në përqindje dhe diferencën midis tyre.",
      "Kalkulatori tregon edhe sa duhet të ndryshojë vlera që të kthehet në fillim, dhe përqindja pothuajse kurrë nuk është e njëjtë.",
    ],
    comoSeCalcula: [
      "Ndryshimi në përqindje = (vlera e re − vlera e vjetër) ÷ vlera e vjetër × 100.",
      "Një rezultat pozitiv do të thotë rritje. Një rezultat negativ do të thotë ulje.",
      "Nëse vlera e vjetër është negative, pjesëtohet me vlerën e saj absolute, që shenja të tregojë sërish nëse është përmirësuar.",
    ],
    ejemplo: [
      `Diçka që kushtonte ${m(antes)} dhe tani kushton ${m(despues)} është shtrenjtuar me 25%.`,
      "Për t'u kthyer te çmimi i vjetër, duhet të ulet me 20%, jo me 25%.",
    ],
    faq: [
      {
        pregunta: "Si llogaritet rritja në përqindje?",
        respuesta: "Zbritni vlerën e vjetër nga e reja, pjesëtoni me vlerën e vjetër dhe shumëzoni me 100. Nga 80 në 100: 20 ÷ 80 × 100 = 25%.",
      },
      {
        pregunta: "Si llogaritet ulja në përqindje?",
        respuesta: "Llogaritja është e njëjtë. Nga 100 në 80: −20 ÷ 100 × 100 = −20%, pra u ul me 20%.",
      },
      {
        pregunta: "Pse një rritje prej 25% dhe një ulje prej 25% nuk anulojnë njëra-tjetrën?",
        respuesta: "Secila përqindje llogaritet nga një bazë e ndryshme. 80 plus 25% është 100, por 100 minus 25% është 75.",
      },
      {
        pregunta: "Cili është ndryshimi midis përqindjeve dhe pikëve të përqindjes?",
        respuesta: "Nëse një normë interesi kalon nga 10% në 12%, është rritur me 2 pikë përqindjeje. Si ndryshim në përqindje, është rritur me 20%.",
      },
    ],
    glosario: [
      { termino: "Ndryshim në përqindje", definicion: "Sa ka ndryshuar një vlerë, si përqindje e vlerës fillestare." },
      { termino: "Pikë përqindjeje", definicion: "Diferenca e thjeshtë midis dy përqindjeve." },
    ],
  };
};
