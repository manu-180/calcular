import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const pt = ctx.locale === "pt-PT";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Uma pessoa de 160 lb e 5 ft 9 in de altura tem IMC de ${n((160 * KG_POR_LB) / (m * m))}: peso normal.`,
        `Com essa altura, o peso saudável vai de ${n((18.5 * m * m) / KG_POR_LB)} a ${n((24.9 * m * m) / KG_POR_LB)} lb.`,
      ]
    : [
        `Uma pessoa de 70 kg e ${n(1.75, 2)} m de altura tem IMC de ${n(70 / (1.75 * 1.75))}: peso normal.`,
        `Com essa altura, o peso saudável vai de ${n(18.5 * 1.75 * 1.75)} a ${n(24.9 * 1.75 * 1.75)} kg.`,
      ];
  return {
    h1: "Calculadora de IMC",
    title: tituloQueEntre(`Calculadora de IMC (${ctx.nombrePais})`, "Calculadora de IMC"),
    description: "Calcule o seu índice de massa corporal com o peso e a altura, veja a classificação da OMS e a faixa de peso saudável para você.",
    intro: [
      "Coloque o seu peso e a sua altura. Você vê o seu IMC, a classificação da Organização Mundial da Saúde e a faixa de peso saudável para a sua altura.",
      "É uma referência geral para adultos. Não substitui a consulta com um profissional de saúde.",
    ],
    comoSeCalcula: [
      imperial ? "IMC = peso em libras × 703 ÷ (altura em polegadas × altura em polegadas)." : "IMC = peso em quilos ÷ (altura em metros × altura em metros).",
      `Abaixo de ${n(18.5)} é abaixo do peso. De ${n(18.5)} a ${n(24.9)} é peso normal. De 25 a ${n(29.9)} é ${pt ? "excesso de peso" : "sobrepeso"}. A partir de 30 é obesidade.`,
      `A faixa de peso saudável é a que dá um IMC entre ${n(18.5)} e ${n(24.9)} para a sua altura.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Qual é o IMC normal?",
        respuesta: `Para a OMS, um IMC entre ${n(18.5)} e ${n(24.9)} em adultos. A faixa é a mesma para mulheres e homens.`,
      },
      {
        pregunta: "O IMC serve para todo mundo?",
        respuesta: "Não. Ele não distingue músculo de gordura, então pessoas muito musculosas podem dar um valor alto. Também se usa de outra forma na gravidez e em crianças e adolescentes.",
      },
      {
        pregunta: "Como calcular o IMC à mão?",
        respuesta: `Multiplique a altura por ela mesma e divida o peso por esse resultado. Com ${n(1.75, 2)} m, a conta é ${n(1.75, 2)} × ${n(1.75, 2)} = ${n(1.75 * 1.75, 4)}.`,
      },
    ],
    glosario: [
      { termino: "IMC", definicion: "Índice de massa corporal: a relação entre o seu peso e a sua altura." },
      { termino: "OMS", definicion: "Organização Mundial da Saúde, que define as faixas de IMC para adultos." },
    ],
  };
};
