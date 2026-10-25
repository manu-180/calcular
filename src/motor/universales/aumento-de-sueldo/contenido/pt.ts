import { esPortuguesEuropeo } from "../../comun/locales";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const sueldo = montoEjemplo(ctx, 4000);
  const pt = esPortuguesEuropeo(ctx.locale);
  return {
    h1: "Calculadora de aumento salarial",
    title: tituloQueEntre(`Calculadora de aumento salarial (${ctx.nombrePais})`, `Aumento salarial (${ctx.nombrePais})`, "Calculadora de aumento salarial"),
    description: "Calcule o novo salário depois de um aumento, a diferença por mês e por ano e se você ganhou da inflação com o aumento real.",
    intro: [
      pt
        ? "Ofereceram-lhe um aumento, ou está prestes a pedir um. Coloque o seu salário e o aumento, em percentagem ou em valor, e veja quanto muda por mês e por ano."
        : "Você recebeu uma proposta de aumento, ou está para pedir um. Coloque o seu salário e o aumento, em porcentagem ou em valor, e veja quanto muda por mês e por ano.",
      "Some a inflação do período e mostramos se você ganha poder de compra de verdade ou só recupera o que perdeu.",
    ],
    comoSeCalcula: [
      "Novo salário = salário atual × (1 + aumento ÷ 100).",
      "Diferença por ano = diferença por mês × salários por ano.",
      "Aumento real = (1 + aumento) ÷ (1 + inflação) − 1.",
    ],
    ejemplo: [
      `Um salário de ${m(sueldo)} por mês com 5% de aumento passa a ${m(sueldo * 1.05)}: ${m(sueldo * 0.05)} a mais por mês e ${m(sueldo * 0.05 * 12)} a mais por ano.`,
      `Se a inflação do período foi de 3%, o aumento real é de ${p(aumentoReal(5, 3))}. Com 6% de inflação, é de ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "O que é aumento real?",
        respuesta: "É o aumento descontada a inflação. Mostra se o novo salário compra mais ou menos que antes.",
      },
      {
        pregunta: "Por que não basta tirar a inflação do aumento?",
        respuesta: `Porque as duas porcentagens se multiplicam, não se somam. Com 5% de aumento e 3% de inflação, o aumento real é de ${p(aumentoReal(5, 3))}, não 2%. Com inflação alta, a diferença fica bem maior.`,
      },
      {
        pregunta: "Quanto de aumento devo pedir?",
        respuesta: "Pelo menos a inflação desde o último aumento, para não ficar para trás. Além disso, pese quanto outras empresas pagam por um cargo como o seu e o quanto o seu trabalho cresceu.",
      },
    ],
    glosario: [
      { termino: "Aumento nominal", definicion: pt ? "O aumento tal como aparece no recibo de vencimento, antes da inflação." : "O aumento como aparece no holerite, antes da inflação." },
      { termino: "Poder de compra", definicion: "O que o seu salário consegue comprar." },
    ],
  };
};
