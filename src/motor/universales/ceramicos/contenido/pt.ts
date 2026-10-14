import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const pt = ctx.locale === "pt-PT";
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `Para 150 ft² com peças de 12 × 12 in (1 ft² cada) e 10% de perda, você precisa de ${piezas} peças.`,
          `Se cada caixa traz 10 peças, são ${Math.ceil(piezas / 10)} caixas.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `Para 20 m² com peças de 60 × 60 cm (${n(pieza)} m² cada) e 10% de perda, você precisa de ${piezas} peças.`,
          `Se cada caixa traz 4 peças, são ${Math.ceil(piezas / 4)} caixas.`,
        ];
      })();
  return {
    h1: pt ? "Calculadora de mosaico e azulejo" : "Calculadora de piso e revestimento",
    title: pt
      ? tituloQueEntre(`Calculadora de mosaico e azulejo (${ctx.nombrePais})`, "Calculadora de mosaico e azulejo")
      : tituloQueEntre(`Calculadora de piso e revestimento (${ctx.nombrePais})`, "Calculadora de piso e revestimento", "Calculadora de piso"),
    description: pt
      ? "Calcule quantos mosaicos ou azulejos precisa para um chão ou uma parede, com margem de perda, e quantas caixas comprar."
      : "Calcule quantas peças de piso ou revestimento você precisa para um chão ou uma parede, com margem de perda, e quantas caixas comprar.",
    intro: [
      "Coloque a área, o tamanho de cada peça e quantas vêm por caixa. Você vê quantas peças e caixas precisa comprar.",
      "A margem de perda cobre os cortes nas bordas e alguma peça que quebre.",
    ],
    comoSeCalcula: [
      `Área de uma peça = comprimento × largura, em ${imperial ? "pés quadrados" : "metros quadrados"}.`,
      "Peças = área × (1 + perda ÷ 100) ÷ área de uma peça, arredondado para cima.",
      "Caixas = peças ÷ peças por caixa, arredondado para cima.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Quanto devo calcular de perda?",
        respuesta: "10% para assentamento reto. Para diagonal, espinha de peixe ou ambientes com muitos recortes, de 15% a 20%.",
      },
      {
        pregunta: pt ? "É preciso contar as juntas?" : "Preciso contar o rejunte?",
        respuesta: pt
          ? "Não. As juntas têm poucos milímetros e a margem de perda já cobre essa diferença."
          : "Não. As juntas têm poucos milímetros e a margem de perda já cobre essa diferença.",
      },
      {
        pregunta: "Vale a pena comprar a mais?",
        respuesta: "Sim, algumas peças do mesmo lote. Se uma quebrar depois, pode ser difícil achar a mesma tonalidade.",
      },
    ],
    glosario: [
      { termino: "Margem de perda", definicion: "A porcentagem a mais que se compra para cortes e quebras." },
      { termino: "Lote", definicion: "A produção de onde vem a peça. Lotes diferentes podem ter uma tonalidade um pouco diferente." },
    ],
  };
};
