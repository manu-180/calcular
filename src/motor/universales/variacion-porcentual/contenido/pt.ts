import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  const pt = ctx.locale === "pt-PT";
  return {
    h1: "Calculadora de variação percentual",
    title: tituloQueEntre(`Calculadora de variação percentual (${ctx.nombrePais})`, `Variação percentual (${ctx.nombrePais})`, "Calculadora de variação percentual"),
    description: pt
      ? "Calcule quanto um valor subiu ou desceu em percentagem: preços, salário, vendas ou qualquer número que tenha mudado."
      : "Calcule quanto um valor subiu ou caiu em porcentagem: preços, salário, vendas ou qualquer número que mudou com o tempo.",
    intro: [
      "Coloque o valor antigo e o novo. Você vê o aumento ou a queda em por cento e a diferença.",
      "Também mostra quanto teria que mudar para voltar ao início, que quase nunca é a mesma porcentagem.",
    ],
    comoSeCalcula: [
      "Variação percentual = (valor novo − valor antigo) ÷ valor antigo × 100.",
      "Um resultado positivo quer dizer que subiu. Um negativo, que caiu.",
      "Se o valor antigo for negativo, a conta divide pelo seu valor absoluto, para o sinal continuar mostrando se melhorou.",
    ],
    ejemplo: [
      `Algo que custava ${m(antes)} e agora custa ${m(despues)} subiu 25%.`,
      "Para voltar ao preço antigo, teria que cair 20%, não 25%.",
    ],
    faq: [
      {
        pregunta: pt ? "Como calcular um aumento em percentagem?" : "Como calcular o aumento percentual?",
        respuesta: "Tire o valor antigo do novo, divida pelo antigo e multiplique por 100. De 80 para 100: 20 ÷ 80 × 100 = 25%.",
      },
      {
        pregunta: pt ? "Como calcular uma descida em percentagem?" : "Como calcular a queda percentual?",
        respuesta: "A conta é a mesma. De 100 para 80: −20 ÷ 100 × 100 = −20%, ou seja, caiu 20%.",
      },
      {
        pregunta: "Por que uma alta de 25% e uma queda de 25% não se anulam?",
        respuesta: "Cada porcentagem é calculada sobre uma base diferente. 80 mais 25% é 100, mas 100 menos 25% é 75.",
      },
      {
        pregunta: "Qual a diferença entre por cento e pontos percentuais?",
        respuesta: "Se uma taxa passa de 10% para 12%, ela subiu 2 pontos percentuais. Como variação percentual, subiu 20%.",
      },
    ],
    glosario: [
      { termino: "Variação percentual", definicion: "Quanto um valor mudou, em por cento do valor de partida." },
      { termino: "Ponto percentual", definicion: "A diferença simples entre duas porcentagens." },
    ],
  };
};
