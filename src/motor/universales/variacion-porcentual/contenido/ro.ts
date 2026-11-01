import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Calculator variație procentuală",
    title: tituloQueEntre(`Calculator variație procentuală: ${ctx.nombrePais}`, "Calculator variație procentuală", "Variație procentuală"),
    description: "Calculați cu cât a crescut sau a scăzut o valoare, în procente: prețuri, salarii, vânzări sau orice număr care s-a schimbat în timp.",
    intro: [
      "Introduceți valoarea veche și valoarea nouă. Vedeți creșterea sau scăderea în procente și diferența dintre ele.",
      "Calculatorul arată și cât ar trebui să se schimbe valoarea ca să revină la început, iar procentul aproape niciodată nu este același.",
    ],
    comoSeCalcula: [
      "Variația procentuală = (valoarea nouă − valoarea veche) ÷ valoarea veche × 100.",
      "Un rezultat pozitiv înseamnă creștere. Unul negativ înseamnă scădere.",
      "Dacă valoarea veche este negativă, se împarte la valoarea ei absolută, ca semnul să arate în continuare dacă s-a îmbunătățit.",
    ],
    ejemplo: [
      `Ceva care costa ${m(antes)} și acum costă ${m(despues)} s-a scumpit cu 25%.`,
      "Ca să revină la prețul vechi, ar trebui să scadă cu 20%, nu cu 25%.",
    ],
    faq: [
      {
        pregunta: "Cum se calculează creșterea procentuală?",
        respuesta: "Scădeți valoarea veche din cea nouă, împărțiți la valoarea veche și înmulțiți cu 100. De la 80 la 100: 20 ÷ 80 × 100 = 25%.",
      },
      {
        pregunta: "Cum se calculează scăderea procentuală?",
        respuesta: "Calculul este același. De la 100 la 80: −20 ÷ 100 × 100 = −20%, deci a scăzut cu 20%.",
      },
      {
        pregunta: "De ce o creștere de 25% și o scădere de 25% nu se anulează?",
        respuesta: "Fiecare procent se calculează dintr-o bază diferită. 80 plus 25% înseamnă 100, dar 100 minus 25% înseamnă 75.",
      },
      {
        pregunta: "Care este diferența dintre procente și puncte procentuale?",
        respuesta: "Dacă o dobândă trece de la 10% la 12%, a crescut cu 2 puncte procentuale. Ca variație procentuală, a crescut cu 20%.",
      },
    ],
    glosario: [
      { termino: "Variație procentuală", definicion: "Cât s-a schimbat o valoare, ca procent din valoarea de pornire." },
      { termino: "Punct procentual", definicion: "Diferența simplă dintre două procente." },
    ],
  };
};
