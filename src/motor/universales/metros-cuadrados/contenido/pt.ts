import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const pt = ctx.locale === "pt-PT";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: "Calculadora de metros quadrados",
    title: tituloQueEntre(`Calculadora de metros quadrados (${ctx.nombrePais})`, `Metros quadrados (${ctx.nombrePais})`, "Calculadora de metros quadrados"),
    description: pt
      ? "Calcule a área de uma divisão, de um piso ou de um terreno: retângulos, triângulos e círculos, somando até cinco formas."
      : "Calcule a área de um cômodo, de um piso ou de um terreno: retângulos, triângulos e círculos, somando até cinco formatos.",
    intro: [
      "Escolha um formato e coloque as medidas. Se o espaço não for um retângulo simples, divida em partes e a calculadora soma tudo.",
      imperial ? "Também mostra o resultado em metros quadrados." : "Também mostra o resultado em pés quadrados.",
    ],
    comoSeCalcula: [
      "Retângulo: comprimento × largura.",
      "Triângulo: base × altura ÷ 2.",
      `Círculo: π × raio × raio, e o raio é a metade do diâmetro. 1 m² equivale a ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `Uma sala em L pode ser dividida num retângulo de 16 × 12 ft e outro de 10 × 6 ft. São ${n(enL, 0)} ft² no total.`
        : `Uma sala em L pode ser dividida num retângulo de 5 × 4 m e outro de 3 × 2 m. São ${n(enL, 0)} m² no total.`,
      `Uma mesa redonda de 2 ${u} de diâmetro ocupa ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: pt ? "Como calcular os metros quadrados de uma divisão?" : "Como calcular os metros quadrados de um cômodo?",
        respuesta: "Meça o comprimento e a largura em metros e multiplique um pelo outro. Um quarto de 4 × 3 m tem 12 m².",
      },
      {
        pregunta: "E se as medidas estiverem em centímetros?",
        respuesta: `Passe para metros primeiro: divida os centímetros por 100. 350 cm são ${n(3.5, 1)} m.`,
      },
      {
        pregunta: "Quantos metros quadrados tem um hectare?",
        respuesta: `Um hectare tem ${formatearNumero(ctx, 10000)} m², que é um quadrado de 100 m de cada lado.`,
      },
    ],
    glosario: [
      { termino: "Metro quadrado (m²)", definicion: "A área de um quadrado de 1 metro de cada lado." },
      { termino: "Pé quadrado (ft²)", definicion: "A área de um quadrado de 1 pé de cada lado." },
    ],
  };
};
