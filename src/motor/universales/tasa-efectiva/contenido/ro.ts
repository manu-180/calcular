import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  return {
    h1: "Calculator dobândă efectivă",
    title: tituloQueEntre(`Calculator dobândă efectivă: ${ctx.nombrePais}`, "Calculator dobândă nominală și efectivă", "Calculator dobândă efectivă"),
    description: "Transformați dobânda anuală nominală în dobânda anuală efectivă și invers, cu capitalizare lunară, trimestrială, semestrială sau zilnică.",
    intro: [
      "Două oferte cu aceeași dobândă pot costa diferit. Diferența vine din cât de des se calculează sau se plătește dobânda.",
      "Dobânda anuală efectivă pune totul pe aceeași bază: arată cât plătiți sau câștigați cu adevărat într-un an. Alegeți dobânda pe care o aveți și vedeți-o pe cealaltă.",
    ],
    comoSeCalcula: [
      "Dobânda efectivă = (1 + dobânda nominală ÷ m) la puterea m, minus 1. Aici m este numărul de capitalizări pe an: 12 pentru lunar, 4 pentru trimestrial.",
      "Dobânda nominală = m × ((1 + dobânda efectivă) la puterea 1 ÷ m, minus 1).",
      "Dobânda pe perioadă este dobânda nominală împărțită la m.",
    ],
    ejemplo: [
      `O dobândă nominală de 12% cu capitalizare lunară înseamnă o dobândă efectivă de ${p(aEfectiva(12, 12))}.`,
      `O dobândă efectivă de 10% corespunde unei dobânzi nominale de ${p(aNominal(10, 12))} când dobânda se capitalizează lunar.`,
    ],
    faq: [
      {
        pregunta: "Care este diferența dintre dobânda nominală și dobânda efectivă?",
        respuesta:
          "Dobânda nominală este rata anuală înainte de capitalizare. Dobânda efectivă include efectul dobânzii care produce dobândă. De aceea dobânda efectivă este întotdeauna egală sau mai mare decât cea nominală.",
      },
      {
        pregunta: "Este dobânda efectivă același lucru cu DAE?",
        respuesta:
          "Nu întotdeauna. Dobânda anuală efectivă (DAE) de la un credit include și comisioanele și asigurările obligatorii, nu doar capitalizarea. Calculatorul arată efectul capitalizării; pentru costul total al unui credit, comparați DAE din ofertă.",
      },
      {
        pregunta: "De ce o capitalizare mai deasă mărește dobânda efectivă?",
        respuesta:
          "Dobânda se adaugă mai devreme la sold și începe să producă la rândul ei dobândă. Cu capitalizare anuală, dobânda nominală și cea efectivă sunt egale.",
      },
    ],
    glosario: [
      { termino: "Dobândă nominală", definicion: "Rata anuală înainte de capitalizare." },
      { termino: "Dobândă efectivă", definicion: "Rata anuală cu efectul capitalizării inclus." },
      { termino: "DAE", definicion: "Dobânda anuală efectivă a unui credit: costul total pe an, cu dobândă, comisioane și alte costuri obligatorii." },
      { termino: "Capitalizare", definicion: "Momentul în care dobânda se adaugă la sold." },
    ],
  };
};
