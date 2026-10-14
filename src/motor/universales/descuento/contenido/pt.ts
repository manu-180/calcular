import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  const pt = ctx.locale === "pt-PT";
  return {
    h1: "Calculadora de desconto",
    title: tituloQueEntre(`Calculadora de desconto (${ctx.nombrePais})`, "Calculadora de desconto"),
    description: pt
      ? "Calcule o preço com desconto e quanto poupa, mesmo com dois descontos seguidos, como 30% mais 10%."
      : "Calcule o preço com desconto e quanto você economiza, mesmo com dois descontos seguidos, como 30% mais 10%.",
    intro: [
      pt
        ? "Coloque o preço e o desconto e veja na hora quanto vai pagar e quanto poupa."
        : "Coloque o preço e o desconto e veja na hora quanto você vai pagar e quanto economiza.",
      "Se a promoção tiver um desconto extra, coloque também: dois descontos seguidos nunca se somam.",
    ],
    comoSeCalcula: [
      "Preço com desconto = preço original × (1 − desconto ÷ 100).",
      "O segundo desconto vale sobre o preço que já tem o primeiro.",
      pt ? "A poupança é o preço original menos o preço com desconto." : "A economia é o preço original menos o preço com desconto.",
    ],
    ejemplo: [
      `Um produto de ${m(precio)} com 25% de desconto sai por ${m(precio * 0.75)}.`,
      `Com 30% e depois mais 10%, sai por ${m(precio * 0.7 * 0.9)}. São 37% de desconto no total, não 40%.`,
    ],
    faq: [
      {
        pregunta: "Como calcular um desconto?",
        respuesta: pt
          ? "Multiplique o preço pela percentagem e divida por 100. Esse é o valor do desconto. Tire-o do preço e tem o que vai pagar."
          : "Multiplique o preço pela porcentagem e divida por 100. Esse é o valor do desconto. Tire do preço e você tem o que vai pagar.",
      },
      {
        pregunta: "30% mais 10% é o mesmo que 40% de desconto?",
        respuesta: "Não. O segundo desconto vale sobre o preço já reduzido, então o total fica em 37%.",
      },
      {
        pregunta: "Como descobrir o preço original a partir do preço com desconto?",
        respuesta: `Divida o preço com desconto por (1 − desconto ÷ 100). Com 25% de desconto, divida por ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Desconto", definicion: pt ? "A percentagem que se tira do preço original." : "A porcentagem que se tira do preço original." },
      { termino: "Desconto efetivo", definicion: pt ? "A percentagem total que poupa quando há mais de um desconto." : "A porcentagem total que você economiza quando há mais de um desconto." },
    ],
  };
};
