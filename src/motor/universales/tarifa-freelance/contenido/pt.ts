import { esPortuguesEuropeo } from "../../comun/locales";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  const pt = esPortuguesEuropeo(ctx.locale);
  return {
    h1: "Quanto cobrar por hora como freelancer",
    title: tituloQueEntre(`Calculadora de valor da hora freelancer (${ctx.nombrePais})`, "Calculadora de valor da hora freelancer", "Valor da hora freelancer"),
    description: "Calcule o valor da sua hora e da sua diária como freelancer pelo que quer ganhar, os seus gastos, impostos, folgas e horas faturáveis.",
    intro: [
      "O erro mais comum de quem começa como freelancer é pegar o salário que teria como empregado e dividir por 160 horas. Ficam de fora os impostos, os gastos, as férias e todas as horas que não dá para cobrar.",
      "Esta calculadora parte do que você quer ganhar líquido e mostra quanto cobrar para chegar lá.",
    ],
    comoSeCalcula: [
      "Faturamento necessário = renda líquida desejada ÷ (1 − impostos) + gastos do trabalho.",
      "Dias de trabalho = 52 semanas × dias por semana − dias de folga.",
      "Horas faturáveis por ano = dias de trabalho × horas faturáveis por dia.",
      "Valor da hora = faturamento necessário ÷ horas faturáveis por ano.",
    ],
    ejemplo: [
      `Para ganhar ${m(ingreso)} líquidos por ano, com ${m(gastos)} de gastos e 25% de impostos, você precisa faturar ${m(r.facturado)}.`,
      `Com 30 dias de folga e 25 horas faturáveis por semana, são ${Math.round(r.horas)} horas por ano: um valor de ${m(r.hora)} por hora ou ${m(r.dia)} por dia.`,
    ],
    faq: [
      {
        pregunta: "Quantas horas por semana consigo faturar?",
        respuesta: "Menos do que você trabalha. Buscar clientes, responder e-mails, emitir notas e estudar levam um tempo que ninguém paga. O comum é de 20 a 30 horas faturáveis em 40.",
      },
      {
        pregunta: "Cobro por hora ou por projeto?",
        respuesta: "Os dois funcionam. Mesmo cobrando por projeto, estime as horas e multiplique por este valor para não ficar no prejuízo.",
      },
      {
        pregunta: "Que porcentagem de impostos devo usar?",
        respuesta: pt
          ? "Depende do país e de como está registado como trabalhador independente. Some o imposto sobre o rendimento e as contribuições sociais. Se tiver dúvidas, fale com um contabilista."
          : "Depende do país e de como você está registrado. Some o imposto de renda e as contribuições para a previdência. Se tiver dúvidas, consulte um contador.",
      },
    ],
    glosario: [
      { termino: "Horas faturáveis", definicion: "As horas de trabalho que você cobra de um cliente." },
      { termino: "Renda líquida", definicion: "O que sobra depois dos impostos e dos gastos do trabalho." },
    ],
  };
};
