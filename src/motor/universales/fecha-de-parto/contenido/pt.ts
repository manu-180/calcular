import { esPortuguesEuropeo } from "../../comun/locales";
import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  const pt = esPortuguesEuropeo(ctx.locale);
  const eco = pt ? "a ecografia" : "o ultrassom";
  return {
    h1: "Calculadora da data provável do parto",
    title: tituloQueEntre(`Data provável do parto: calculadora (${ctx.nombrePais})`, "Calculadora da data provável do parto", "Data provável do parto"),
    description: "Calcule a data provável do parto pela última menstruação ou pela data da concepção, e de quantas semanas você está hoje.",
    intro: [
      "Coloque o primeiro dia da sua última menstruação (ou a data da concepção, se souber). Você vê a data provável do parto, a idade gestacional e o trimestre.",
      `É uma estimativa. As consultas com um profissional de saúde e ${eco} dão a data mais precisa.`,
    ],
    comoSeCalcula: [
      "Usa a regra de Naegele: a data provável do parto é a última menstruação mais 280 dias (40 semanas).",
      "Se o seu ciclo é mais longo ou mais curto que 28 dias, a data se move nessa diferença.",
      "A partir da concepção, soma 266 dias (38 semanas).",
      "As semanas de gravidez contam desde a última menstruação, não desde a concepção.",
    ],
    ejemplo: [
      `Com a última menstruação em ${f(fum)} e ciclo de 28 dias, a data provável do parto é ${f(fpp)}.`,
      `Com ciclo de 32 dias, ela avança 4 dias, para ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "Como se calcula a data provável do parto?",
        respuesta: "Somam-se 280 dias ao primeiro dia da última menstruação. Uma regra rápida que dá quase a mesma data: some 7 dias, tire 3 meses e some um ano.",
      },
      {
        pregunta: "Por que as semanas contam desde a última menstruação?",
        respuesta: "Porque é uma data que quase todas as pessoas sabem. Por isso, na semana 2, a concepção ainda não aconteceu.",
      },
      {
        pregunta: "Quantos bebês nascem na data prevista?",
        respuesta: "Poucos. A maioria nasce entre a semana 37 e a 42, então a data serve de referência, não de dia exato.",
      },
    ],
    glosario: [
      { termino: "DUM", definicion: "Data da última menstruação: o primeiro dia do último sangramento." },
      { termino: "Regra de Naegele", definicion: "Uma forma de estimar a data do parto somando 280 dias à DUM." },
    ],
  };
};
