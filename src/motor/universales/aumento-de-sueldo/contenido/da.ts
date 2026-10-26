import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "Beregn din lønstigning",
    title: tituloQueEntre(
      `Lønstigning: beregn ny løn og reallønsstigning | ${ctx.nombrePais}`,
      `Lønstigning | ${ctx.nombrePais}`,
      "Lønstigning",
    ),
    description: "Beregn din nye løn efter en lønstigning, forskellen om måneden og om året, og om du slår inflationen med din reallønsstigning.",
    intro: [
      "Du har fået et lønforslag eller skal snart til lønsamtale. Skriv lønnen og lønstigningen, i procent eller som beløb, og se, hvor meget der ændrer sig om måneden og om året.",
      "Læg inflationen for perioden til, så ser du, om du reelt får mere købekraft eller bare følger med.",
    ],
    comoSeCalcula: [
      "Ny løn = nuværende løn × (1 + lønstigning ÷ 100).",
      "Forskel om året = forskel om måneden × antal lønudbetalinger om året.",
      "Reallønsstigning = (1 + lønstigning) ÷ (1 + inflation) − 1.",
    ],
    ejemplo: [
      `En månedsløn på ${m(sueldo)} med 5 % i lønstigning bliver til ${m(sueldo * 1.05)}. Det er ${m(sueldo * 0.05)} mere om måneden og ${m(sueldo * 0.05 * 12)} mere om året.`,
      `Var inflationen 3 % i perioden, er reallønsstigningen ${p(aumentoReal(5, 3))}. Med 6 % inflation er den ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Hvad er en reallønsstigning?",
        respuesta: "Det er lønstigningen efter inflation. Den viser, om din nye løn rækker til mere eller mindre end før.",
      },
      {
        pregunta: "Hvorfor kan jeg ikke bare trække inflationen fra lønstigningen?",
        respuesta: `Fordi procentsatserne ganges, de lægges ikke sammen. Med 5 % i lønstigning og 3 % inflation er reallønsstigningen ${p(aumentoReal(5, 3))}, ikke ${formatearCifra(ctx, 5 - 3)} %. Når inflationen er høj, bliver forskellen meget større.`,
      },
      {
        pregunta: "Hvor stor en lønstigning skal jeg bede om?",
        respuesta: "Mindst inflationen siden din sidste lønstigning, så du ikke sakker bagud. Ud over det kan du tage udgangspunkt i, hvad andre arbejdsgivere betaler for lignende job, og hvordan din rolle er vokset.",
      },
    ],
    glosario: [
      { termino: "Nominel lønstigning", definicion: "Lønstigningen, som den står på lønsedlen, før inflation." },
      { termino: "Købekraft", definicion: "Hvad din løn rækker til." },
    ],
  };
};
