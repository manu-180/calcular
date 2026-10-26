import { esPortuguesEuropeo } from "../../comun/locales";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  const pt = esPortuguesEuropeo(ctx.locale);
  const pct = pt ? "percentagem" : "porcentagem";
  return {
    h1: `Calculadora de ${pct}`,
    title: tituloQueEntre(`Calculadora de ${pct} (${ctx.nombrePais})`, `Calculadora de ${pct}`),
    description: `Calcule a ${pct} de um número, quantos por cento um valor representa de outro e o resultado de somar ou tirar uma ${pct}.`,
    intro: [
      "Escolha o que quer saber, coloque os dois números e a resposta aparece na hora.",
      `Servem aqui as quatro contas de ${pct} do dia a dia: uma parte, uma proporção, um aumento e um desconto.`,
    ],
    comoSeCalcula: [
      "X% de Y = X × Y ÷ 100.",
      "X em relação a Y, em por cento = X ÷ Y × 100.",
      "Y mais X% = Y × (1 + X ÷ 100). Y menos X% = Y × (1 − X ÷ 100).",
    ],
    ejemplo: ["15% de 200 é 30.", "30 é 25% de 120.", `Um preço de ${m(precio)} com aumento de 10% passa a ${m(precio * 1.1)}.`],
    faq: [
      {
        pregunta: `Como calcular a ${pct} de um número?`,
        respuesta: `Multiplique o número pela ${pct} e divida por 100. 20% de 350 é 350 × 20 ÷ 100 = 70.`,
      },
      {
        pregunta: "Como saber quantos por cento um número é de outro?",
        respuesta: "Divida a parte pelo total e multiplique por 100. Se acertou 45 de 60 questões, são 45 ÷ 60 × 100 = 75%.",
      },
      {
        pregunta: `Como somar uma ${pct} a um preço?`,
        respuesta: `Multiplique o preço por 1 mais a ${pct} em decimal. Para somar 10%, multiplique por ${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "Se subir 10% e depois cair 10%, volto ao valor inicial?",
        respuesta: "Não. 100 mais 10% é 110, e 110 menos 10% é 99. A queda vale sobre um número maior.",
      },
    ],
    glosario: [
      { termino: pt ? "Percentagem" : "Porcentagem", definicion: "Uma quantidade escrita como partes de 100." },
      { termino: "Base", definicion: `O número sobre o qual se calcula a ${pct} (Y nesta calculadora).` },
    ],
  };
};
