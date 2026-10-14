import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const pt = ctx.locale === "pt-PT";
  return {
    h1: "Conversor de taxa nominal e efetiva",
    title: tituloQueEntre(`Taxa nominal e efetiva: conversor (${ctx.nombrePais})`, "Conversor de taxa nominal e efetiva", "Taxa nominal e efetiva"),
    description: "Converta uma taxa nominal anual em taxa efetiva anual e o contrário, com capitalização mensal, trimestral, semestral ou diária.",
    intro: [
      "Duas propostas com a mesma taxa podem custar valores diferentes. A diferença está em quantas vezes os juros são cobrados ou pagos.",
      pt
        ? "A taxa efetiva anual põe tudo na mesma base: é o que realmente paga ou ganha num ano. Escolha a taxa que tem e veja a outra."
        : "A taxa efetiva anual coloca tudo na mesma base: é o que você realmente paga ou ganha em um ano. Escolha a taxa que você tem e veja a outra.",
    ],
    comoSeCalcula: [
      "Efetiva = (1 + nominal ÷ m) elevado a m, menos 1. Aqui m é o número de capitalizações por ano: 12 se for mensal, 4 se for trimestral.",
      "Nominal = m × ((1 + efetiva) elevado a 1 ÷ m, menos 1).",
      "A taxa por período é a nominal dividida por m.",
    ],
    ejemplo: [
      `Uma taxa nominal de 12% ao ano com capitalização mensal equivale a uma efetiva de ${p(aEfectiva(12, 12))} ao ano.`,
      `Uma taxa efetiva de 10% ao ano equivale a uma nominal de ${p(aNominal(10, 12))} quando os juros capitalizam todo mês.`,
    ],
    faq: [
      {
        pregunta: "Qual a diferença entre taxa nominal e taxa efetiva?",
        respuesta: "A nominal é a taxa anual antes da capitalização. A efetiva inclui o efeito dos juros sobre juros. Por isso a efetiva é sempre igual ou maior que a nominal.",
      },
      {
        pregunta: "Qual delas uso para comparar propostas?",
        respuesta: pt
          ? "A efetiva para poupanças e aplicações, porque mostra o que realmente ganha. No crédito, compare a efetiva e também a TAEG, que soma os encargos."
          : "A efetiva para investimentos, porque mostra o que você realmente ganha. Em empréstimos, compare a efetiva e também o custo efetivo total (CET), com as tarifas incluídas.",
      },
      {
        pregunta: "Por que capitalizar mais vezes aumenta a taxa efetiva?",
        respuesta: "Os juros entram no saldo mais cedo e começam a render juros também. Com capitalização anual, a nominal e a efetiva são iguais.",
      },
    ],
    glosario: [
      { termino: "Taxa nominal", definicion: "A taxa anual informada, antes da capitalização." },
      { termino: "Taxa efetiva", definicion: "A taxa anual real, com a capitalização incluída." },
      { termino: "Capitalização", definicion: "O momento em que os juros são somados ao saldo." },
    ],
  };
};
