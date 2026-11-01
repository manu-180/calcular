import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  const hundrede = montoEjemplo(ctx, 100);
  return {
    h1: "Opsparingsberegner til dit sparemål",
    title: tituloQueEntre(
      `Opsparingsberegner: hvor meget skal jeg spare op om måneden | ${ctx.nombrePais}`,
      `Opsparingsberegner: hvor meget skal jeg spare op | ${ctx.nombrePais}`,
      `Opsparingsberegner | ${ctx.nombrePais}`,
      "Opsparingsberegner",
    ),
    description: "Beregn, hvor meget du skal spare op hver måned for at nå dit sparemål i tide, med det, du allerede har, og det, opsparingen giver i renter.",
    intro: [
      "En rejse, en bil, udbetalingen til en bolig eller en buffer til uventede udgifter. Et mål med beløb og dato er meget nemmere at nå.",
      "Skriv, hvor meget du vil spare op, og over hvor mange måneder. Du ser, hvor meget du skal lægge til side hver måned og hver uge.",
    ],
    comoSeCalcula: [
      "Først regnes der ud, hvor meget det, du allerede har sparet op, når at vokse til periodens udgang.",
      "Det, der mangler, deles op i lige store indbetalinger hver måned.",
      "Giver opsparingen renter, vokser hver indbetaling også, så du skal sætte lidt mindre ind.",
    ],
    ejemplo: [
      `For at spare ${m(meta)} op på 24 måneder uden renter skal du spare ${m(meta / 24)} op om måneden.`,
      `Har du allerede ${m(actual)} og får 5 % i afkast om året, er det nok med ${m(aporteNecesario(meta, actual, 24, 5))} om måneden.`,
    ],
    faq: [
      {
        pregunta: "Hvordan holder jeg fast i sparemålet?",
        respuesta: "Flyt pengene, så snart lønnen kommer, før du når at bruge dem. Lav gerne en fast overførsel til en separat opsparingskonto.",
      },
      {
        pregunta: "Hvad gør jeg, hvis det månedlige beløb bliver for højt?",
        respuesta: "Giv dig selv mere tid, eller sænk målet. Du kan også starte med det, du har råd til, og hæve beløbet, når indkomsten stiger.",
      },
      {
        pregunta: "Skal jeg regne med inflationen?",
        respuesta: `Ligger målet flere år ude i fremtiden, så læg den inflation til, du regner med. Det, der koster ${m(hundrede)} i dag, kan koste en del mere, når du når frem.`,
      },
    ],
    glosario: [
      { termino: "Indbetaling", definicion: "De penge, du lægger til side hver måned til målet." },
      { termino: "Afkast", definicion: "Det, din opsparing giver på en konto eller i en investering." },
    ],
  };
};
