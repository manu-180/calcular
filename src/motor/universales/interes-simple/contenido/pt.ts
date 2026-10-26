import { esPortuguesEuropeo } from "../../comun/locales";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const pt = esPortuguesEuropeo(ctx.locale);
  return {
    h1: "Calculadora de juros simples",
    title: tituloQueEntre(`Calculadora de juros simples (${ctx.nombrePais})`, `Juros simples (${ctx.nombrePais})`, "Calculadora de juros simples"),
    description: "Calcule os juros simples de um capital a uma taxa anual em dias, meses ou anos. Escolha ano de 365 ou 360 dias e veja o montante.",
    intro: [
      "Os juros simples são sempre calculados sobre o capital inicial: durante o prazo, os juros não entram no saldo.",
      pt
        ? "Usam-se em depósitos curtos, empréstimos entre pessoas e em muitos exercícios da escola."
        : "São usados em aplicações curtas, empréstimos entre pessoas e em muitos exercícios de matemática financeira.",
    ],
    comoSeCalcula: [
      "Juros = capital × taxa anual × prazo em anos.",
      "Para meses, divida por 12. Para dias, divida por 365 ou 360, conforme o ano que o banco usa.",
      "Montante = capital + juros.",
    ],
    ejemplo: [
      `${m(capital)} a 10% ao ano durante 6 meses rendem ${m(capital * 0.1 * 0.5)} de juros.`,
      `O mesmo capital em 90 dias rende ${m((capital * 0.1 * 90) / 365)} com ano de 365 dias e ${m((capital * 0.1 * 90) / 360)} com ano de 360 dias.`,
    ],
    faq: [
      {
        pregunta: "Qual é a fórmula dos juros simples?",
        respuesta: `J = C × i × t. C é o capital, i a taxa anual em decimal (10% é ${formatearNumero(ctx, 0.1, 2)}) e t o prazo em anos.`,
      },
      {
        pregunta: "Qual a diferença para os juros compostos?",
        respuesta: "Os juros simples são sempre calculados sobre o mesmo capital. Nos compostos, os juros entram no saldo e também rendem juros.",
      },
      {
        pregunta: "Por que alguns bancos usam um ano de 360 dias?",
        respuesta: "É uma convenção bancária que facilita as contas. Com 360 dias, os juros saem um pouco maiores. Confira qual o seu banco usa.",
      },
    ],
    glosario: [
      { termino: "Capital", definicion: "O dinheiro que se empresta ou se investe." },
      { termino: "Ano comercial", definicion: "Um ano contado com 360 dias, com meses de 30 dias." },
    ],
  };
};
