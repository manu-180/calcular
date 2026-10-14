import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Calculadora de ROI e rentabilidade anual",
    title: tituloQueEntre(`Calculadora de ROI e CAGR (${ctx.nombrePais})`, "Calculadora de ROI e rentabilidade anual", "Calculadora de ROI e CAGR"),
    description: "Calcule o retorno total (ROI) e a rentabilidade anual (CAGR) de um investimento com o que você aplicou, quanto vale hoje e quantos anos passaram.",
    intro: [
      "Um ganho de 50% parece ótimo, mas não é a mesma coisa em 2 anos e em 10. Para comparar investimentos, você precisa da rentabilidade por ano.",
      "Coloque quanto investiu, quanto vale hoje e quantos anos passaram. Mostramos o retorno total e a rentabilidade anual composta.",
    ],
    comoSeCalcula: [
      "ROI = (valor final + rendimentos recebidos − valor investido) ÷ valor investido × 100.",
      "CAGR = ((valor final + rendimentos recebidos) ÷ valor investido) elevado a (1 ÷ anos), menos 1.",
      "O CAGR é a taxa anual composta: a que dá o mesmo resultado se se repetir todo ano.",
    ],
    ejemplo: [
      `Investir ${m(inicial)} e terminar com ${m(final)} dá um ganho de ${m(final - inicial)}: um ROI de ${p(roi(inicial, final))}.`,
      `Se levou 5 anos, a rentabilidade anual é de ${p(cagr(inicial, final, 5))}. Se levou 2 anos, de ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "Qual a diferença entre ROI e CAGR?",
        respuesta: "O ROI é o ganho total sobre o que você investiu, sem olhar o tempo. O CAGR distribui esse ganho por ano, para comparar investimentos de prazos diferentes.",
      },
      {
        pregunta: "Por que a rentabilidade anual não é o total dividido pelos anos?",
        respuesta: `Porque os ganhos de cada ano entram no saldo e também rendem. Um ganho de 50% em 5 anos equivale a ${p(cagr(1, 1.5, 5))} ao ano composto, não a 10%.`,
      },
      {
        pregunta: "Como contar os dividendos ou juros que recebi?",
        respuesta: "Coloque em rendimentos recebidos se você os tirou. Se reinvestiu, eles já estão no valor final.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Retorno sobre o investimento: o ganho total em porcentagem do que você aplicou." },
      { termino: "CAGR", definicion: "Taxa de crescimento anual composta: a rentabilidade média por ano, com juros compostos." },
    ],
  };
};
