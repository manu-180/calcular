import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Betala av kreditkortet",
    title: tituloQueEntre(
      `Betala av kreditkort: räkna ut tid och ränta | ${ctx.nombrePais}`,
      `Betala av kreditkort | ${ctx.nombrePais}`,
      "Betala av kreditkort",
    ),
    description: "Räkna ut hur många månader det tar att betala av kreditkortet och hur mycket ränta du betalar, med ett fast belopp eller lägsta belopp.",
    intro: [
      "Kreditkortet är oftast den dyraste skulden du har. Betalar du bara lägsta belopp drar det ut i flera år och räntan växer.",
      "Fyll i skulden, årsräntan och hur mycket du kan betala varje månad. Du ser när du är klar, hur mycket ränta du betalar och planen månad för månad.",
    ],
    comoSeCalcula: [
      "Varje månad läggs räntan till: skuld × årsränta ÷ 12.",
      "Sedan dras betalningen av. Med lägsta belopp är betalningen en procentsats av det du är skyldig, med en nedre gräns.",
      "Det upprepas tills skulden är noll. Är betalningen inte större än räntan minskar skulden aldrig.",
    ],
    ejemplo: [
      `En skuld på ${m(saldo)} med 22 % årsränta, där du betalar ${m(fijo)} i månaden, är betald efter ${formatearCifra(ctx, conFijo.meses, 0)} månader och kostar ${m(conFijo.intereses)} i ränta.`,
      `Betalar du bara ett lägsta belopp på 3 % tar det ${formatearCifra(ctx, conMinimo.meses, 0)} månader och räntan stiger till ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "Vad händer om jag bara betalar lägsta belopp?",
        respuesta:
          "Lägsta belopp minskar när skulden minskar, så du betalar mindre varje månad och skulden dröjer kvar i åratal. Betala hellre ett högre fast belopp om du kan, även om det bara är lite mer.",
      },
      {
        pregunta: "Ska jag flytta skulden till ett privatlån?",
        respuesta: "Är räntan på lånet klart lägre än kortets ränta lönar det sig oftast. Jämför den totala räntan för båda alternativen, avgifter inräknade.",
      },
      {
        pregunta: "Vilket kort ska jag betala av först?",
        respuesta: "Betala lägsta belopp på alla och lägg resten på kortet med högst ränta. Då betalar du minst ränta totalt.",
      },
    ],
    glosario: [
      { termino: "Lägsta belopp", definicion: "Det minsta du kan betala en månad utan förseningsavgift. Det betalar inte av skulden." },
      { termino: "Nominell årsränta", definicion: "Räntan per år som kortet tar ut på skulden du har kvar." },
    ],
  };
};
