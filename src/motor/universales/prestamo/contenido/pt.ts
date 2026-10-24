import { esPortuguesEuropeo } from "../../comun/locales";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  const pt = esPortuguesEuropeo(ctx.locale);
  const parcela = pt ? "prestação" : "parcela";
  return {
    h1: pt ? "Simulador de crédito pessoal" : "Simulador de empréstimo",
    title: pt
      ? tituloQueEntre(`Simulador de crédito pessoal (${ctx.nombrePais})`, "Simulador de crédito pessoal")
      : tituloQueEntre(`Simulador de empréstimo (${ctx.nombrePais})`, "Simulador de empréstimo"),
    description: `Calcule a ${parcela} mensal de um empréstimo, o total de juros e a tabela de amortização completa. Veja quanto economiza pagando a mais.`,
    intro: [
      `Antes de assinar um empréstimo, dois números importam: quanto você paga por mês e quanto ele custa em juros.`,
      "Coloque o valor, a taxa anual e o prazo. Se pensa em pagar um pouco a mais por mês, coloque também e veja quanto antes termina.",
    ],
    comoSeCalcula: [
      pt
        ? "Usa prestações fixas (sistema francês), o método mais comum no crédito pessoal, automóvel e à habitação."
        : "Usa parcelas fixas (tabela Price), o método mais comum em empréstimo pessoal, financiamento de carro e de imóvel.",
      "Taxa mensal = taxa anual ÷ 12.",
      `${pt ? "Prestação" : "Parcela"} = valor × taxa mensal ÷ (1 − (1 + taxa mensal) elevado a menos o número de ${parcela}s).`,
      `A cada mês, os juros são cobrados sobre o que você ainda deve. O resto da ${parcela} abate a dívida.`,
    ],
    ejemplo: [
      `Um empréstimo de ${m(monto)} a 12% ao ano em 36 meses tem ${parcela} de ${m(cuota36)}. No total, você paga ${m(interesesTotales(monto, 12, 36))} de juros.`,
      `Em 60 meses, a ${parcela} cai para ${m(cuota60)}, mas os juros sobem para ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: `Como se calcula a ${parcela} de um empréstimo?`,
        respuesta: `Com a fórmula de ${parcela}s fixas. Todas têm o mesmo valor, mas as primeiras são quase só juros e as últimas quase só amortização. Por isso o saldo devedor cai devagar no começo.`,
      },
      {
        pregunta: pt ? "Compensa amortizar o crédito antes do prazo?" : "Vale a pena quitar o empréstimo antes?",
        respuesta: "Em geral sim, desde que não haja uma multa alta por antecipar. O dinheiro extra vai direto para a dívida e deixa de render juros para quem emprestou. Quanto antes, mais você economiza.",
      },
      {
        pregunta: "Um prazo mais longo é melhor?",
        respuesta: `A ${parcela} fica menor, mas você paga muito mais juros no total. Compare os dois números antes de decidir.`,
      },
      {
        pregunta: `Por que o banco me passou outra ${parcela}?`,
        respuesta: pt
          ? "Os bancos costumam somar seguros, comissões ou impostos, ou usam uma taxa diferente da anunciada. Compare as propostas pela TAEG, não só pela taxa de juros."
          : "Os bancos costumam somar seguros, tarifas ou impostos, ou usam uma taxa diferente da anunciada. Compare as propostas pelo custo efetivo total (CET), não só pela taxa de juros.",
      },
    ],
    glosario: [
      { termino: "Saldo devedor", definicion: "A parte da dívida que você ainda não pagou." },
      { termino: "Taxa nominal anual", definicion: "A taxa ao ano que se divide por 12 para ter os juros de cada mês." },
      { termino: "Amortização", definicion: `A parte de cada ${parcela} que reduz a dívida.` },
    ],
  };
};
