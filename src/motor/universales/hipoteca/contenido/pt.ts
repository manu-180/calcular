import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota30 = cuotaFrancesa(prestado, 7, 360);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  const pt = ctx.locale === "pt-PT";
  const parcela = pt ? "prestação" : "parcela";
  return {
    h1: pt ? "Simulador de crédito habitação" : "Simulador de financiamento imobiliário",
    title: pt
      ? tituloQueEntre(`Simulador de crédito habitação (${ctx.nombrePais})`, "Simulador de crédito habitação")
      : tituloQueEntre(`Simulador de financiamento imobiliário (${ctx.nombrePais})`, "Simulador de financiamento imobiliário", "Financiamento imobiliário"),
    description: `Calcule a ${parcela} mensal com o valor do imóvel, a entrada, a taxa e o prazo. Veja o total de juros e quanto a dívida cai a cada ano.`,
    intro: [
      pt
        ? "O crédito para comprar casa é a maior dívida que a maioria das famílias assume. Vale a pena ver os números completos antes de falar com o banco."
        : "O financiamento da casa própria é a maior dívida que a maioria das famílias assume. Vale a pena ver os números completos antes de falar com o banco.",
      `Coloque o valor do imóvel, a entrada, a taxa e o prazo. Se paga impostos do imóvel, seguro ou condomínio junto, some para ver a ${parcela} real.`,
    ],
    comoSeCalcula: [
      `Valor financiado = valor do imóvel − entrada.`,
      pt
        ? "Prestação mensal fixa (sistema francês), com a taxa anual dividida por 12 e o prazo em meses."
        : "Parcela mensal fixa (tabela Price), com a taxa anual dividida por 12 e o prazo em meses. Muitos financiamentos usam o sistema SAC, em que a parcela começa mais alta e vai caindo.",
      "Para cada ano, soma os juros e a amortização pagos e mostra quanto ainda falta.",
    ],
    ejemplo: [
      `Um imóvel de ${m(precio)} com 20% de entrada deixa ${m(prestado)} para financiar. A 7% ao ano em 30 anos, a ${parcela} fica em ${m(cuota30)}.`,
      `Em 30 anos você paga ${m(interesesTotales(prestado, 7, 360))} de juros. Em 15 anos a ${parcela} sobe para ${m(cuota15)}, mas os juros caem para ${m(interesesTotales(prestado, 7, 180))}.`,
    ],
    faq: [
      {
        pregunta: "Quanto devo dar de entrada?",
        respuesta: "Depende do banco e do país. Quanto maior a entrada, menos você financia, menor a parcela e menos juros paga. Guarde também dinheiro para os custos de compra.",
      },
      {
        pregunta: "Por que a dívida quase não cai nos primeiros anos?",
        respuesta: "Os juros são cobrados sobre o que você deve. No começo o saldo é grande, então a maior parte de cada parcela é juros. Com o tempo isso se inverte.",
      },
      {
        pregunta: "Um prazo mais curto é melhor?",
        respuesta: "Se a parcela maior cabe no seu orçamento, sim: você paga muito menos juros. Se não cabe, um prazo maior com amortizações extras quando puder também funciona.",
      },
      {
        pregunta: `A ${parcela} pode mudar?`,
        respuesta: pt
          ? "Com taxa fixa, a prestação fica igual. Com taxa variável, ela muda com o indexante. Esta calculadora supõe a mesma taxa durante todo o prazo."
          : "Com taxa fixa e sem correção, a parcela fica igual. Com taxa variável ou correção monetária, ela muda. Esta calculadora supõe a mesma taxa durante todo o prazo.",
      },
    ],
    glosario: [
      { termino: "Entrada", definicion: "A parte do valor que você paga com as suas economias." },
      { termino: "Valor financiado", definicion: "O que você pegou emprestado e ainda tem que devolver." },
      { termino: "Saldo devedor", definicion: "O que você ainda deve do financiamento." },
    ],
  };
};
