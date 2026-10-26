import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Calculator randamentul investiției (ROI)",
    title: tituloQueEntre(`Calculator ROI și CAGR: ${ctx.nombrePais}`, "Calculator randament investiție (ROI)", "Calculator ROI și CAGR"),
    description: "Calculați randamentul total (ROI) și randamentul anual (CAGR) al unei investiții din suma investită, valoarea de acum și numărul de ani.",
    intro: [
      "Un câștig de 50% sună bine, dar nu este același lucru în 2 ani și în 10 ani. Ca să comparați investiții, aveți nevoie de randamentul pe an.",
      "Introduceți cât ați investit, cât valorează astăzi și câți ani au trecut. Vedeți randamentul total și randamentul anual compus.",
    ],
    comoSeCalcula: [
      "ROI = (valoarea finală + veniturile încasate − suma investită) ÷ suma investită × 100.",
      "CAGR = ((valoarea finală + veniturile încasate) ÷ suma investită) la puterea (1 ÷ ani), minus 1.",
      "CAGR este rata anuală compusă: cea care duce la același rezultat dacă se repetă în fiecare an.",
    ],
    ejemplo: [
      `Dacă investiți ${m(inicial)} și ajungeți la ${m(final)}, câștigul este de ${m(final - inicial)}: un ROI de ${p(roi(inicial, final))}.`,
      `Dacă au trecut 5 ani, randamentul anual este de ${p(cagr(inicial, final, 5))}. Dacă au trecut 2 ani, de ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "Care este diferența dintre ROI și CAGR?",
        respuesta: "ROI este câștigul total raportat la suma investită, indiferent de timp. CAGR îl împarte pe ani, ca să puteți compara investiții de durate diferite.",
      },
      {
        pregunta: "De ce randamentul anual nu este pur și simplu totalul împărțit la numărul de ani?",
        respuesta: `Pentru că în fiecare an câștigurile se adaugă la sold și produc și ele randament. Un câștig de 50% în 5 ani înseamnă ${p(cagr(1, 1.5, 5))} pe an compus, nu 10%.`,
      },
      {
        pregunta: "Cum țin cont de dividendele sau dobânzile încasate?",
        respuesta: "Adăugați-le la veniturile încasate dacă le-ați retras. Dacă le-ați reinvestit, sunt deja incluse în valoarea finală.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Randamentul investiției: câștigul total ca procent din suma investită." },
      { termino: "CAGR", definicion: "Rata anuală compusă de creștere: randamentul mediu pe an, cu efectul dobânzii compuse." },
    ],
  };
};
