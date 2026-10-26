import { esPortuguesEuropeo } from "../../comun/locales";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhMes = (1000 * 4 * 30) / 1000;
  const pt = esPortuguesEuropeo(ctx.locale);
  const conta = pt ? "fatura da luz" : "conta de luz";
  return {
    h1: "Calculadora de consumo de energia",
    title: tituloQueEntre(`Calculadora de consumo de energia (${ctx.nombrePais})`, `Consumo de energia (${ctx.nombrePais})`, "Calculadora de consumo de energia"),
    description: "Calcule quanto um aparelho gasta de energia e quanto custa por dia, mês e ano, com a potência, as horas de uso e o preço do kWh.",
    intro: [
      `Coloque a potência do aparelho, quantas horas você usa e o preço do kWh da sua ${conta}. Você vê o consumo e o custo.`,
      pt
        ? "Serve para descobrir o que mais pesa na fatura: o ar condicionado, um aquecedor, o frigorífico ou o computador."
        : "Serve para descobrir o que mais pesa na conta: o chuveiro elétrico, o ar-condicionado, a geladeira ou o computador.",
    ],
    comoSeCalcula: [
      "kWh por dia = watts × horas de uso ÷ 1000.",
      "kWh por mês = kWh por dia × dias de uso. Para o ano, o mês vezes 12.",
      "Custo = kWh × preço do kWh.",
    ],
    ejemplo: [
      `Um aparelho de 1000 W usado 4 horas por dia consome 4 kWh por dia e ${formatearNumero(ctx, kwhMes)} kWh por mês.`,
      `A ${m(precio)} o kWh, custa ${m(kwhMes * precio)} por mês.`,
    ],
    faq: [
      {
        pregunta: "O que é um kWh?",
        respuesta: `Um quilowatt-hora é a energia que um aparelho de 1000 W gasta ligado durante uma hora. É a unidade que aparece na ${conta}.`,
      },
      {
        pregunta: pt ? "O frigorífico funciona no máximo o dia todo?" : "A geladeira funciona no máximo o dia todo?",
        respuesta: "Não. O motor liga e desliga sozinho. Para aparelhos assim, use de 8 a 10 horas por dia em vez de 24.",
      },
      {
        pregunta: "Por que a conta não bate exatamente?",
        respuesta: `A ${conta} soma taxas fixas, impostos e às vezes preços por faixa de consumo. Aqui você vê só o que o aparelho gasta.`,
      },
    ],
    glosario: [
      { termino: "Watt (W)", definicion: "Uma unidade de potência: quanta energia um aparelho usa a cada segundo." },
      { termino: "Quilowatt-hora (kWh)", definicion: `1000 W durante uma hora. É o que você paga na ${conta}.` },
    ],
  };
};
