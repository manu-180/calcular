import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  const pt = ctx.locale === "pt-PT";
  const reforma = pt ? "reforma" : "aposentadoria";
  return {
    h1: pt ? "Calculadora de poupança para a reforma" : "Calculadora de aposentadoria",
    title: pt
      ? tituloQueEntre(`Poupança para a reforma: calculadora (${ctx.nombrePais})`, "Calculadora de poupança para a reforma", "Poupança para a reforma")
      : tituloQueEntre(`Calculadora de aposentadoria (${ctx.nombrePais})`, "Calculadora de aposentadoria"),
    description: `Veja quanto pode juntar para a ${reforma} com aportes mensais e que renda mensal essa reserva daria, em dinheiro de hoje.`,
    intro: [
      `Muitas vezes a ${reforma} pública não basta para manter o padrão de vida. Uma reserva própria, mesmo pequena, faz muita diferença se começar cedo.`,
      `Coloque a sua idade, quando quer ${pt ? "reformar-se" : "se aposentar"}, o que já tem e quanto pode guardar por mês. Mostramos a reserva que terá e quanto poderia tirar dela por mês.`,
    ],
    comoSeCalcula: [
      "A reserva cresce todo mês pelo rendimento real, que é o rendimento menos a inflação. Assim o resultado fica em dinheiro de hoje.",
      `Na ${reforma}, a reserva é paga em valores mensais iguais durante os anos que você escolher. O que sobra continua rendendo enquanto isso.`,
      `Não entram a ${reforma} pública, os impostos nem as taxas dos investimentos.`,
    ],
    ejemplo: [
      `Com ${m(actual)} guardados aos 30 anos e ${m(aporte)} por mês a um rendimento real de 4%, você chega a ${m(capital30)} aos 65. Isso paga ${m(rentaMensual(capital30, 4, 25))} por mês durante 25 anos.`,
      `Começando aos 40 com os mesmos números, você chega a ${m(capital40)}. Dez anos fazem muita diferença.`,
    ],
    faq: [
      {
        pregunta: "O que é rendimento real?",
        respuesta: "É o que um investimento rende depois da inflação. Se rende 7% e a inflação é de 3%, o rendimento real fica em torno de 4%.",
      },
      {
        pregunta: `Isto substitui a ${reforma} pública?`,
        respuesta: pt
          ? "Não. É a sua poupança própria, além da reforma pública ou de um plano da empresa. Para estimar a pensão pública, consulte a entidade do seu país."
          : "Não. É a sua reserva própria, além da aposentadoria pública ou de uma previdência da empresa. Para estimar o benefício público, consulte o órgão do seu país.",
      },
      {
        pregunta: `Quanto devo guardar para a ${reforma}?`,
        respuesta: "Não existe um número único. Uma regra comum é de 10% a 15% do que você ganha. O mais importante é começar o quanto antes.",
      },
    ],
    glosario: [
      { termino: "Rendimento real", definicion: "O que um investimento rende acima da inflação." },
      { termino: "Dinheiro de hoje", definicion: "Um valor futuro expresso pelo que ele compraria hoje." },
    ],
  };
};
