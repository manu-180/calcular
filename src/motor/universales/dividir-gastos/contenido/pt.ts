import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  const pt = ctx.locale === "pt-PT";
  return {
    h1: "Calculadora para dividir contas",
    title: tituloQueEntre(`Dividir contas entre amigos (${ctx.nombrePais})`, "Calculadora para dividir contas"),
    description: "Divida um gasto em grupo entre até 8 pessoas: a parte de cada um e quem paga para quem, com o mínimo de transferências.",
    intro: [
      pt
        ? "Serve para uma viagem, um jantar, uma festa ou uma casa de férias em que cada um pagou um valor diferente."
        : "Serve para uma viagem, um churrasco, uma festa ou um aluguel de temporada em que cada um pagou um valor diferente.",
      "Coloque quanto cada pessoa pagou. Você vê a parte de cada um e os pagamentos que deixam todo mundo quite.",
    ],
    comoSeCalcula: [
      "Parte de cada um = total gasto ÷ número de pessoas.",
      "Quem pagou menos que a sua parte deve a diferença. Quem pagou mais recebe de volta.",
      "Os pagamentos vão da maior dívida para o maior crédito, para ninguém fazer transferências a mais.",
    ],
    ejemplo: [
      `Ana pagou ${m(a)}, Bruno pagou ${m(b)} e Carla não pagou nada. O total é ${m(a + b)}, então a parte de cada um é ${m(cuota)}.`,
      `Carla paga ${m(cuota)} para a Ana e Bruno paga ${m(cuota - b)} para a Ana.`,
    ],
    faq: [
      {
        pregunta: "Como dividir uma conta quando cada um pagou um valor diferente?",
        respuesta: "Some tudo, divida pelo número de pessoas e compare com o que cada um pagou. A diferença é o que cada um deve ou tem a receber.",
      },
      {
        pregunta: "E se alguém não pagou nada?",
        respuesta: "Coloque 0 para essa pessoa, assim ela entra na divisão. Se deixar o campo em branco, ela fica de fora.",
      },
      {
        pregunta: "Por que há menos pagamentos do que pessoas?",
        respuesta: "As dívidas se agrupam: quem deve mais paga para quem pagou mais, e assim por diante. Nunca são precisos mais pagamentos do que o número de pessoas menos um.",
      },
    ],
    glosario: [
      { termino: "Parte", definicion: "O que cada pessoa deveria pagar do total." },
      { termino: "Saldo", definicion: "A diferença entre o que alguém pagou e a parte que lhe cabe." },
    ],
  };
};
