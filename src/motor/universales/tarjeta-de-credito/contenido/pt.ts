import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  const pt = ctx.locale === "pt-PT";
  return {
    h1: "Calculadora para quitar o cartão de crédito",
    title: tituloQueEntre(`Quitar o cartão de crédito: calculadora (${ctx.nombrePais})`, "Calculadora para quitar o cartão de crédito", "Quitar o cartão de crédito"),
    description: "Descubra em quantos meses você quita a dívida do cartão de crédito e quanto paga de juros, com um valor fixo ou com o pagamento mínimo.",
    intro: [
      "O cartão de crédito costuma ser a dívida mais cara que você tem. Pagar só o mínimo estica a dívida por anos e acumula juros.",
      "Coloque o saldo, a taxa anual e quanto pode pagar por mês. Mostramos quando você termina, os juros que paga e o plano mês a mês.",
    ],
    comoSeCalcula: [
      "Todo mês entram os juros: saldo × taxa anual ÷ 12.",
      "Depois se desconta o pagamento. No mínimo, o pagamento é uma porcentagem do que você deve, com um piso.",
      "Isso se repete até o saldo chegar a zero. Se o pagamento não passa dos juros, a dívida nunca diminui.",
    ],
    ejemplo: [
      `Um saldo de ${m(saldo)} a 22% ao ano, pagando ${m(fijo)} por mês, é quitado em ${conFijo.meses} meses com ${m(conFijo.intereses)} de juros.`,
      `Pagando só um mínimo de 3%, leva ${conMinimo.meses} meses e os juros sobem para ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "O que acontece se eu pagar só o mínimo?",
        respuesta: "O mínimo diminui junto com o saldo, então você paga menos a cada mês e a dívida se arrasta por anos. Se puder, pague um valor fixo maior, mesmo que seja um pouco mais.",
      },
      {
        pregunta: pt ? "Compensa passar a dívida para um crédito pessoal?" : "Vale a pena trocar a dívida por um empréstimo pessoal?",
        respuesta: "Se a taxa do empréstimo for bem menor que a do cartão, costuma compensar. Compare os juros totais das duas opções, com as tarifas incluídas.",
      },
      {
        pregunta: "Qual cartão devo quitar primeiro?",
        respuesta: "Pague o mínimo de todos e coloque o resto no que tem a taxa mais alta. Assim você paga menos juros no total.",
      },
    ],
    glosario: [
      { termino: "Pagamento mínimo", definicion: "O menor valor que você pode pagar no mês sem atraso. Não quita a dívida." },
      { termino: "Taxa anual", definicion: "A taxa por ano que o cartão cobra sobre o saldo que fica para o mês seguinte." },
    ],
  };
};
