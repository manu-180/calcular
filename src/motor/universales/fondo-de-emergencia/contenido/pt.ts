import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  const pt = ctx.locale === "pt-PT";
  const fondo = pt ? "fundo de emergência" : "reserva de emergência";
  return {
    h1: pt ? "Calculadora de fundo de emergência" : "Calculadora de reserva de emergência",
    title: tituloQueEntre(`Calculadora de ${fondo} (${ctx.nombrePais})`, `Calculadora de ${fondo}`),
    description: `Calcule de quanto deve ser o seu ${fondo} pelos gastos essenciais, e em quantos meses você completa com o que consegue guardar.`,
    intro: [
      `${pt ? "O fundo" : "A reserva"} de emergência é o dinheiro separado para o que não dá para planejar: perder o emprego, um problema de saúde ou um conserto urgente em casa.`,
      "Com ela, você não precisa recorrer ao cartão de crédito justo quando as coisas estão mais difíceis. Coloque os seus gastos essenciais e quantos meses quer cobrir.",
    ],
    comoSeCalcula: [
      `${pt ? "Fundo recomendado" : "Reserva recomendada"} = gastos essenciais por mês × meses a cobrir.`,
      `Ainda falta = ${pt ? "fundo recomendado" : "reserva recomendada"} − o que você já tem.`,
      "Meses para completar = o que falta ÷ quanto você guarda por mês, arredondado para cima.",
    ],
    ejemplo: [
      `Com ${m(gastos)} de gastos essenciais por mês, ${pt ? "um fundo" : "uma reserva"} de 6 meses é de ${m(gastos * 6)}.`,
      `Guardando ${m(aporte)} por mês, você completa em ${Math.ceil((gastos * 6) / aporte)} meses.`,
    ],
    faq: [
      {
        pregunta: `Quantos meses ${pt ? "o fundo" : "a reserva"} de emergência deve cobrir?`,
        respuesta: "A orientação comum é de 3 a 6 meses de gastos essenciais. Se a sua renda varia, se você é autônomo ou se a casa vive de uma renda só, mire em 6 a 12 meses.",
      },
      {
        pregunta: `Onde deixar ${pt ? "o fundo" : "a reserva"} de emergência?`,
        respuesta: "Num lugar seguro, que você possa sacar no mesmo dia, separado da conta do dia a dia. Não é para investimentos de risco: a função dela é estar lá quando você precisar.",
      },
      {
        pregunta: "Primeiro monto a reserva ou pago as dívidas?",
        respuesta: "Um caminho comum é guardar primeiro um mês de gastos, depois quitar as dívidas caras, como o cartão de crédito, e então completar a reserva.",
      },
    ],
    glosario: [
      { termino: "Gastos essenciais", definicion: "As contas que você precisa pagar mesmo se a renda parar: moradia, comida, contas da casa, saúde." },
      { termino: "Liquidez", definicion: "A rapidez com que o dinheiro pode ser usado sem perder valor." },
    ],
  };
};
