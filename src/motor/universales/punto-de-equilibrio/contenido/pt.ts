import { esPortuguesEuropeo } from "../../comun/locales";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  const pt = esPortuguesEuropeo(ctx.locale);
  return {
    h1: "Calculadora de ponto de equilíbrio",
    title: tituloQueEntre(`Calculadora de ponto de equilíbrio (${ctx.nombrePais})`, `Ponto de equilíbrio (${ctx.nombrePais})`, "Calculadora de ponto de equilíbrio"),
    description: pt
      ? "Descubra quantas unidades precisa de vender e quanto faturar por mês para cobrir os custos e para chegar ao lucro que quer."
      : "Descubra quantas unidades você precisa vender e quanto faturar por mês para cobrir os custos e para chegar ao lucro que quer.",
    intro: [
      "O ponto de equilíbrio é o nível de vendas em que um negócio não ganha nem perde dinheiro. Abaixo dele há prejuízo, acima começa o lucro.",
      "Coloque os custos fixos, o preço e o custo de cada unidade. Mostramos quanto vender para cobrir os custos e para bater a sua meta.",
    ],
    comoSeCalcula: [
      "Margem de contribuição = preço − custo variável por unidade.",
      "Unidades para empatar = custos fixos ÷ margem de contribuição, arredondado para cima.",
      "Faturamento para empatar = custos fixos ÷ (margem de contribuição ÷ preço).",
      "Para um lucro desejado, some esse lucro aos custos fixos e faça a mesma conta.",
    ],
    ejemplo: [
      `Com ${m(fijos)} de custos fixos, preço de ${m(precio)} e custo variável de ${m(variable)}, cada venda deixa ${m(precio - variable)}.`,
      `Você precisa vender ${formatearNumero(ctx, base.unidades)} unidades (${m(base.facturacion)}) para cobrir os custos, e ${formatearNumero(ctx, meta.unidades)} para lucrar ${m(objetivo)} por mês.`,
    ],
    faq: [
      {
        pregunta: "O que são custos fixos e variáveis?",
        respuesta: pt
          ? "Os fixos são os mesmos mesmo sem vendas: renda do espaço, salários fixos, contas. Os variáveis crescem com cada venda: mercadoria, material, comissões, portes."
          : "Os fixos são os mesmos mesmo sem vendas: aluguel, salários fixos, contas. Os variáveis crescem com cada venda: mercadoria, material, comissões, frete.",
      },
      {
        pregunta: "Como baixar o ponto de equilíbrio?",
        respuesta: "Há três caminhos: subir o preço, cortar o custo variável por unidade ou enxugar os custos fixos. Em geral, o preço é o que mais muda o resultado.",
      },
      {
        pregunta: "Serve para quem vende serviços?",
        respuesta: "Sim. Uma unidade pode ser uma hora, uma sessão ou um cliente por mês. Use como custo variável o que custa para você entregar cada uma.",
      },
    ],
    glosario: [
      { termino: "Ponto de equilíbrio", definicion: "O nível de vendas em que o faturamento é igual aos custos." },
      { termino: "Margem de contribuição", definicion: "O que cada venda deixa para pagar os custos fixos." },
    ],
  };
};
