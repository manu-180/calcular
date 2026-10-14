import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  const pt = ctx.locale === "pt-PT";
  return {
    h1: pt ? "Calculadora de objetivo de poupança" : "Calculadora de meta financeira",
    title: pt
      ? tituloQueEntre(`Calculadora de objetivo de poupança (${ctx.nombrePais})`, "Calculadora de objetivo de poupança", "Objetivo de poupança")
      : tituloQueEntre(`Calculadora de meta financeira (${ctx.nombrePais})`, "Calculadora de meta financeira"),
    description: "Descubra quanto guardar por mês para juntar o valor que precisa no prazo que quer, contando o que já tem e o que o dinheiro rende.",
    intro: [
      pt
        ? "Uma viagem, um carro, a entrada de uma casa ou uma reserva para imprevistos. Com um valor e uma data, o objetivo fica muito mais fácil de cumprir."
        : "Uma viagem, um carro, a entrada de um imóvel ou uma reserva para imprevistos. Com um valor e uma data, a meta fica muito mais fácil de bater.",
      "Coloque quanto quer juntar e em quantos meses. Mostramos quanto separar por mês e por semana.",
    ],
    comoSeCalcula: [
      "Primeiro calcula quanto o que você já tem guardado vai crescer até o fim do prazo.",
      "O que ainda falta é dividido em depósitos mensais iguais.",
      "Se o dinheiro rende juros, cada depósito também rende, então você precisa guardar um pouco menos.",
    ],
    ejemplo: [
      `Para juntar ${m(meta)} em 24 meses sem rendimento, você precisa guardar ${m(meta / 24)} por mês.`,
      `Com ${m(actual)} já guardados e rendimento de 5% ao ano, bastam ${m(aporteNecesario(meta, actual, 24, 5))} por mês.`,
    ],
    faq: [
      {
        pregunta: pt ? "Como cumprir o objetivo?" : "Como não desistir da meta?",
        respuesta: "Separe o dinheiro assim que receber o salário, antes de gastar com qualquer outra coisa. Se puder, programe uma transferência automática para uma conta separada.",
      },
      {
        pregunta: "E se o valor por mês ficar alto demais?",
        respuesta: "Dê mais prazo para você ou diminua a meta. Também pode começar com o que cabe no bolso e aumentar quando a sua renda subir.",
      },
      {
        pregunta: "Devo contar a inflação?",
        respuesta: "Se a meta está a vários anos de distância, some a inflação esperada ao valor. O que hoje custa 100 pode custar bem mais quando você chegar lá.",
      },
    ],
    glosario: [
      { termino: "Depósito mensal", definicion: "O dinheiro que você separa todo mês para a meta." },
      { termino: "Rendimento", definicion: "O que o seu dinheiro ganha numa conta ou num investimento." },
    ],
  };
};
