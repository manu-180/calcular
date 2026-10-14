import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoPt: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const pt = ctx.locale === "pt-PT";
  return {
    h1: "Calculadora de dias entre datas",
    title: tituloQueEntre(`Calculadora de dias entre datas (${ctx.nombrePais})`, `Dias entre datas (${ctx.nombrePais})`, "Calculadora de dias entre datas"),
    description: "Conte os dias entre duas datas: dias corridos, semanas, meses e dias úteis de segunda a sexta.",
    intro: [
      "Escolha a data inicial e a final. Você vê os dias corridos, o mesmo período em semanas e meses, e os dias úteis.",
      pt
        ? "Serve para prazos, datas de pagamento, férias, a gravidez ou uma contagem decrescente."
        : "Serve para prazos, vencimentos, férias, gravidez ou uma contagem regressiva.",
    ],
    comoSeCalcula: [
      "Os dias corridos são todos os dias entre as duas datas. A data inicial conta e a final não, a menos que você marque a opção.",
      "Os dias úteis são as segundas a sextas desse mesmo período. Os feriados não são descontados.",
      "Os anos bissextos contam com o seu 29 de fevereiro.",
    ],
    ejemplo: [`De ${f(desde)} a ${f(hasta)} são ${dias} dias corridos.`, `Desses, ${habiles} caem de segunda a sexta.`],
    faq: [
      {
        pregunta: "Conta o primeiro dia ou o último?",
        respuesta: "Por padrão conta o primeiro e não o último, como quando se subtraem duas datas. Se precisar dos dois, marque “Contar também a data final”.",
      },
      {
        pregunta: "Os dias úteis descontam os feriados?",
        respuesta: "Não. Contam de segunda a sexta. Os feriados mudam conforme o país, a região e o ano, então desconte à parte.",
      },
      {
        pregunta: "Quantos dias tem um ano?",
        respuesta: "365, ou 366 nos anos bissextos. Por isso as mesmas datas em anos diferentes podem ter um número diferente de dias entre elas.",
      },
    ],
    glosario: [
      { termino: "Dias corridos", definicion: "Todos os dias do calendário, incluindo fins de semana e feriados." },
      { termino: "Dias úteis", definicion: "Nesta calculadora, de segunda a sexta." },
    ],
  };
};
