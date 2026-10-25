import { esPortuguesEuropeo } from "../../comun/locales";
import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  const pt = esPortuguesEuropeo(ctx.locale);
  return {
    h1: "Somar dias a uma data",
    title: tituloQueEntre(`Somar dias a uma data: calculadora (${ctx.nombrePais})`, `Somar dias a uma data (${ctx.nombrePais})`, "Somar dias a uma data"),
    description: "Some ou subtraia dias corridos ou dias úteis de uma data e veja em que dia cai. Útil para prazos e vencimentos.",
    intro: [
      "Escolha uma data, uma quantidade de dias e se quer somar ou subtrair. Você vê a data final e o dia da semana.",
      "Com dias úteis, a conta pula sábados e domingos.",
    ],
    comoSeCalcula: [
      "Com dias corridos, a data avança um dia no calendário para cada dia que você colocar.",
      "Com dias úteis, só contam as segundas a sextas. A própria data inicial não conta.",
      "Os feriados não são descontados, porque mudam conforme o país e a região.",
    ],
    ejemplo: [`${f(inicio)} mais 90 dias corridos cai em ${f(mas90)}.`, `${f(inicio)} mais 15 dias úteis cai em ${f(aFecha(habil))}.`],
    faq: [
      {
        pregunta: "A data inicial conta como o primeiro dia?",
        respuesta: pt
          ? "Não. Somar 1 dia a uma segunda-feira dá terça-feira. É assim que se contam a maioria dos prazos."
          : "Não. Somar 1 dia a uma segunda-feira dá terça-feira. É assim que se conta a maioria dos prazos.",
      },
      {
        pregunta: "E se eu somar dias úteis a partir de um sábado?",
        respuesta: "O primeiro dia útil é a segunda-feira seguinte. Somar 1 dia útil a um sábado dá segunda-feira.",
      },
      {
        pregunta: "A calculadora considera os anos bissextos?",
        respuesta: "Sim. Se o período passa por um 29 de fevereiro, ele conta como um dia a mais.",
      },
    ],
    glosario: [
      { termino: "Dias corridos", definicion: "Todos os dias do calendário, sem pular nenhum." },
      { termino: "Dias úteis", definicion: "Nesta calculadora, de segunda a sexta." },
    ],
  };
};
