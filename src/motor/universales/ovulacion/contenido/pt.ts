import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Calculadora de período fértil",
    title: tituloQueEntre(`Calculadora de período fértil e ovulação (${ctx.nombrePais})`, `Período fértil (${ctx.nombrePais})`, "Calculadora de período fértil"),
    description: "Calcule o dia da ovulação, o seu período fértil e quando vem a próxima menstruação, com os três ciclos seguintes.",
    intro: [
      "Coloque o primeiro dia da última menstruação e a duração do seu ciclo. Você vê a ovulação estimada, os seus dias férteis e a próxima menstruação.",
      "É uma estimativa para ciclos regulares. Não é um método contraceptivo e não substitui a consulta com um profissional de saúde.",
    ],
    comoSeCalcula: [
      `A ovulação costuma acontecer ${FASE_LUTEA} dias antes da próxima menstruação: primeiro dia da última menstruação + duração do ciclo − ${FASE_LUTEA}.`,
      "O período fértil vai de 5 dias antes da ovulação até o dia seguinte, porque os espermatozoides podem viver até 5 dias.",
      "A próxima menstruação vem um ciclo depois da última.",
    ],
    ejemplo: [
      `Com a última menstruação em ${f(fum)} e ciclo de 28 dias, a ovulação estimada é em ${f(aFecha(v.ovulacion))}.`,
      `O período fértil vai de ${f(aFecha(v.desde))} a ${f(aFecha(v.hasta))}, e a próxima menstruação deve vir em ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "Quais são os dias mais férteis?",
        respuesta: "Os dois ou três dias antes da ovulação e o próprio dia da ovulação. O período fértil inteiro dura cerca de 6 dias.",
      },
      {
        pregunta: "Funciona se o meu ciclo é irregular?",
        respuesta: "Dá uma ideia, mas menos precisa. Com ciclos irregulares, a ovulação pode mudar vários dias de um mês para outro.",
      },
      {
        pregunta: "Posso usar isto para evitar a gravidez?",
        respuesta: "Não. A estimativa é aproximada e a ovulação pode vir antes ou depois. Para evitar a gravidez, use um método contraceptivo.",
      },
    ],
    glosario: [
      { termino: "Ovulação", definicion: "O momento em que um ovário libera um óvulo." },
      { termino: "Período fértil", definicion: "Os dias do ciclo em que a gravidez é possível." },
    ],
  };
};
