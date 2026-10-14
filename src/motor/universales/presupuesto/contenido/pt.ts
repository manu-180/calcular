import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  const pt = ctx.locale === "pt-PT";
  return {
    h1: "Calculadora da regra 50/30/20",
    title: tituloQueEntre(`Regra 50/30/20: calculadora de orçamento (${ctx.nombrePais})`, "Regra 50/30/20: calculadora de orçamento", "Calculadora da regra 50/30/20"),
    description: "Divida a sua renda líquida pela regra 50/30/20: quanto vai para necessidades, para desejos e para poupar. Ajuste as porcentagens se precisar.",
    intro: [
      "A regra 50/30/20 é um jeito simples de organizar o mês. Metade vai para o essencial, 30% para o que você gosta e 20% para poupar.",
      pt
        ? "Coloque o seu salário líquido e mostramos quanto vai para cada parte. Se a sua situação for outra, por exemplo uma renda de casa alta, ajuste as percentagens."
        : "Coloque a sua renda líquida e mostramos quanto vai para cada parte. Se a sua situação for outra, por exemplo um aluguel alto, ajuste as porcentagens.",
    ],
    comoSeCalcula: ["Necessidades = renda × 50%.", "Desejos = renda × 30%.", "Poupança = renda × 20%. As três porcentagens precisam somar 100%."],
    ejemplo: [
      `Com ${m(ingreso)} por mês: ${m(ingreso * 0.5)} para necessidades, ${m(ingreso * 0.3)} para desejos e ${m(ingreso * 0.2)} para poupar.`,
      `Em um ano, esses 20% somam ${m(ingreso * 0.2 * 12)} guardados.`,
    ],
    faq: [
      {
        pregunta: "O que é necessidade e o que é desejo?",
        respuesta: "Necessidades são as contas que você precisa pagar: moradia, mercado básico, contas da casa, transporte, saúde e parcelas mínimas. Desejos são o que você poderia cortar se precisasse.",
      },
      {
        pregunta: "E se as minhas necessidades passam de 50%?",
        respuesta: `É comum, principalmente com ${pt ? "uma renda de casa" : "um aluguel"} alto. Teste 60/20/20 ou 70/20/10 e evite zerar a poupança.`,
      },
      {
        pregunta: "Pagar dívidas conta como poupança?",
        respuesta: "As parcelas mínimas entram em necessidades. O que você paga a mais para quitar uma dívida antes conta como poupança, porque melhora o seu patrimônio igual a guardar dinheiro.",
      },
    ],
    glosario: [
      { termino: "Renda líquida", definicion: "O que você recebe depois dos impostos e descontos." },
      { termino: "Regra 50/30/20", definicion: "Uma forma de dividir a renda entre necessidades, desejos e poupança." },
    ],
  };
};
