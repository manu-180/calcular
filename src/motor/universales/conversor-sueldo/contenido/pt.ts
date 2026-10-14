import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const pt = ctx.locale === "pt-PT";
  const horasSemana = pt ? 40 : 44;
  const horasAnio = horasSemana * 52;
  const anual = montoEjemplo(ctx, 50000);
  const hora = montoEjemplo(ctx, 20);
  return {
    h1: "Conversor de salário por hora, mês e ano",
    title: tituloQueEntre(`Calcular salário por hora (${ctx.nombrePais})`, "Conversor de salário por hora, mês e ano", "Calcular salário por hora"),
    description: "Converta o seu salário entre hora, dia, semana, quinzena, mês e ano, com as suas horas reais e as semanas pagas.",
    intro: [
      "Quanto vale a sua hora de trabalho? Quanto dá por ano uma proposta paga por hora? Coloque um valor, escolha o período e veja todos os outros.",
      "Serve para comparar propostas de emprego, calcular horas extras ou saber quanto vale o seu tempo.",
    ],
    comoSeCalcula: [
      "Primeiro tudo é convertido num valor anual.",
      "Por hora = anual ÷ (horas por semana × semanas pagas).",
      "Por dia = anual ÷ (dias por semana × semanas pagas). Por semana = anual ÷ semanas pagas.",
      "Por mês = anual ÷ 12. Por quinzena = anual ÷ 24.",
    ],
    ejemplo: [
      `Um salário de ${m(anual)} por ano, com ${horasSemana} horas por semana, dá ${m(anual / horasAnio)} por hora e ${m(anual / 12)} por mês.`,
      `Uma proposta de ${m(hora)} por hora em tempo integral dá ${m(hora * horasAnio)} por ano.`,
    ],
    faq: [
      {
        pregunta: "Quantas horas de trabalho tem um ano?",
        respuesta: `Com ${horasSemana} horas por semana e 52 semanas pagas, ${formatearNumero(ctx, horasAnio)} horas. Com 40 horas por semana, ${formatearNumero(ctx, 2080)}.`,
      },
      {
        pregunta: "Por que o salário semanal vezes 4 não dá o mensal?",
        respuesta: `Porque um mês tem em média ${formatearNumero(ctx, 52 / 12, 2)} semanas, não 4. Para passar de semanal para mensal, multiplique por 52 e divida por 12.`,
      },
      {
        pregunta: pt ? "Inclui os subsídios de férias e de Natal?" : "Inclui o 13º salário ou os impostos?",
        respuesta: pt
          ? "Não. A conta converte o mesmo valor entre períodos. Se recebe subsídios ou prémios, some-os à parte quando comparar propostas."
          : "Não. A conta converte o mesmo valor entre períodos. Se você recebe 13º, PLR ou bônus, some à parte quando comparar propostas.",
      },
    ],
    glosario: [
      { termino: "Salário bruto", definicion: "O salário antes de impostos e descontos." },
      { termino: "Quinzena", definicion: "Pagamento duas vezes por mês, 24 vezes por ano." },
    ],
  };
};
