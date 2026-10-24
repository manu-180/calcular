import { esPortuguesEuropeo } from "../../comun/locales";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const pt = esPortuguesEuropeo(ctx.locale);
  return {
    h1: "Calculadora de média ponderada",
    title: tituloQueEntre(`Calculadora de média ponderada (${ctx.nombrePais})`, `Média ponderada (${ctx.nombrePais})`, "Calculadora de média ponderada"),
    description: "Calcule a sua média de notas, simples ou ponderada, com até 10 valores e o peso de cada um: porcentagens, créditos ou vezes.",
    intro: [
      "Coloque cada nota e quanto ela vale. Você vê a média ponderada e, ao lado, a média simples.",
      pt
        ? "Serve para notas da escola ou da faculdade e para qualquer média em que uns valores contam mais do que outros."
        : "Serve para notas da escola ou da faculdade e para qualquer média em que alguns valores contam mais que outros.",
    ],
    comoSeCalcula: [
      "Média simples = soma dos valores ÷ quantidade de valores.",
      "Média ponderada = soma de (valor × peso) ÷ soma dos pesos.",
      "Os pesos não precisam somar 100: a conta divide pelo total deles.",
    ],
    ejemplo: [
      `Com um 7 de peso 20%, um 8 de peso 30% e um 9 de peso 50%, a média ponderada é ${n(8.3)}.`,
      `A média simples dessas três notas é ${n(8)}: o 9 pesa mais e puxa a ponderada para cima.`,
    ],
    faq: [
      {
        pregunta: "Como calcular a média ponderada?",
        respuesta: "Multiplique cada valor pelo seu peso, some tudo e divida pela soma dos pesos.",
      },
      {
        pregunta: "E se os pesos não somam 100%?",
        respuesta: "Não tem problema. Se uma disciplina tem 6 créditos e outra 4, use 6 e 4. A conta divide pelo peso total.",
      },
      {
        pregunta: "Qual a diferença entre média simples e média ponderada?",
        respuesta: "Na média simples todos os valores contam igual. Na ponderada, cada um conta conforme o seu peso.",
      },
    ],
    glosario: [
      { termino: "Peso", definicion: "Quanto um valor conta na média final." },
      { termino: "Média ponderada", definicion: "Uma média em que cada valor é multiplicado pelo seu peso." },
    ],
  };
};
