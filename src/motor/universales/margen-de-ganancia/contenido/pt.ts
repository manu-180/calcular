import { esPortuguesEuropeo } from "../../comun/locales";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  const pt = esPortuguesEuropeo(ctx.locale);
  return {
    h1: "Calculadora de margem de lucro e markup",
    title: tituloQueEntre(`Calculadora de margem de lucro (${ctx.nombrePais})`, "Calculadora de margem de lucro e markup", "Calculadora de margem de lucro"),
    description: "Calcule a margem e o markup pelo custo e o preço, ou o preço de venda que você precisa cobrar para chegar à margem que quer.",
    intro: [
      "Margem e markup se confundem o tempo todo, e a diferença pode custar dinheiro. Os dois medem o mesmo lucro, mas sobre bases diferentes.",
      "Coloque o custo e o preço e mostramos os dois. Ou escolha uma margem e dizemos quanto cobrar.",
    ],
    comoSeCalcula: [
      "Lucro = preço − custo.",
      "Margem = lucro ÷ preço × 100.",
      "Markup = lucro ÷ custo × 100.",
      "Preço para uma margem desejada = custo ÷ (1 − margem ÷ 100).",
    ],
    ejemplo: [
      `Um produto que custa ${m(costo)} e é vendido por ${m(precio)} dá ${m(precio - costo)} de lucro: margem de ${p(((precio - costo) / precio) * 100)} e markup de ${p(((precio - costo) / costo) * 100)}.`,
      `Para ter 50% de margem com esse custo, você precisa vender por ${m(precioConMargen(costo, 50))}. Somar 50% ao custo dá só ${p(100 / 3)} de margem.`,
    ],
    faq: [
      {
        pregunta: "Qual a diferença entre margem e markup?",
        respuesta: "A margem é o lucro sobre o preço de venda. O markup é o lucro sobre o custo. Para o mesmo lucro, o markup é sempre o número maior.",
      },
      {
        pregunta: "Como definir o preço para uma margem desejada?",
        respuesta: `Divida o custo por (1 − margem). Para 30% de margem, divida o custo por ${formatearNumero(ctx, 0.7, 2)}. Não some 30% ao custo: você ganharia menos do que imagina.`,
      },
      {
        pregunta: "O custo deve incluir impostos?",
        respuesta: pt
          ? "Use o custo e o preço sem os impostos que repassa ao cliente, como o IVA. Senão a margem parece maior do que é."
          : "Use o custo e o preço sem os impostos que você repassa ao cliente. Senão a margem parece maior do que é.",
      },
    ],
    glosario: [
      { termino: "Margem de lucro", definicion: "O lucro em porcentagem do preço de venda." },
      { termino: "Markup", definicion: "O lucro em porcentagem do custo." },
    ],
  };
};
