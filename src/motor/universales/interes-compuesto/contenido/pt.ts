import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  const pt = ctx.locale === "pt-PT";
  return {
    h1: "Calculadora de juros compostos",
    title: tituloQueEntre(`Calculadora de juros compostos (${ctx.nombrePais})`, `Juros compostos (${ctx.nombrePais})`, "Calculadora de juros compostos"),
    description: pt
      ? "Veja como o seu dinheiro cresce com juros compostos e entregas mensais. Saiba o saldo final, os juros ganhos e a evolução ano a ano."
      : "Veja como o seu dinheiro cresce com juros compostos e aportes mensais. Saiba o saldo final, os juros ganhos e a evolução ano a ano.",
    intro: [
      "Com juros compostos, os juros entram no saldo e passam a render juros também. Por isso as economias crescem cada vez mais rápido.",
      pt
        ? "Coloque o que tem hoje, quanto pode juntar por mês, a taxa e o número de anos. Mostramos o saldo final e quanto dele são juros."
        : "Coloque o que você tem hoje, quanto pode aportar por mês, a taxa e o número de anos. Mostramos o saldo final e quanto dele são juros.",
    ],
    comoSeCalcula: [
      "Saldo final = valor inicial × (1 + i) elevado a n + aporte × ((1 + i) elevado a n − 1) ÷ i.",
      "Aqui i é a taxa mensal equivalente à capitalização escolhida, e n é o número de meses.",
      "Os aportes entram no fim de cada mês.",
    ],
    ejemplo: [
      `Começando com ${m(capital)} e aportando ${m(aporte)} por mês a 7% ao ano, você chega a ${m(a10)} em 10 anos.`,
      `Continuando por mais 10 anos, o saldo chega a ${m(a20)}. A segunda década rende muito mais que a primeira.`,
    ],
    faq: [
      {
        pregunta: "Qual a diferença entre juros simples e compostos?",
        respuesta: "Os juros simples são sempre calculados sobre o valor inicial. Os compostos são calculados sobre o valor inicial mais os juros que já entraram.",
      },
      {
        pregunta: "O que é a regra dos 72?",
        respuesta: "Um atalho para saber em quanto tempo o dinheiro dobra: divida 72 pela taxa anual. A 6% ao ano, ele dobra em cerca de 12 anos.",
      },
      {
        pregunta: "Que taxa devo usar?",
        respuesta: "Uma que seja realista para o que vai fazer com o dinheiro. Para ver o resultado em dinheiro de hoje, use a taxa menos a inflação esperada.",
      },
    ],
    glosario: [
      { termino: "Capitalização", definicion: "O momento em que os juros são somados ao saldo." },
      { termino: "Juros compostos", definicion: "Juros calculados sobre o saldo mais os juros que já foram ganhos." },
    ],
  };
};
