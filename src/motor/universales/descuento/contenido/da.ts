import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  const total = formatearCifra(ctx, (1 - 0.7 * 0.9) * 100);
  return {
    h1: "Rabatberegner",
    title: tituloQueEntre(
      `Rabatberegner: beregn prisen efter rabat | ${ctx.nombrePais}`,
      `Rabatberegner | ${ctx.nombrePais}`,
      "Rabatberegner",
    ),
    description: "Beregn prisen efter rabat, og hvor meget du sparer, også når to rabatter gælder efter hinanden, fx 30 % og derefter 10 % mere.",
    intro: [
      "Skriv pris og rabat, så ser du med det samme, hvad du betaler, og hvor meget du sparer.",
      "Er der en ekstra rabat oven i, så skriv den også. To rabatter efter hinanden giver aldrig bare summen af dem.",
    ],
    comoSeCalcula: [
      "Pris efter rabat = normalpris × (1 − rabat ÷ 100).",
      "En ekstra rabat regnes af den pris, der allerede er sat ned.",
      "Det, du sparer, er normalprisen minus prisen efter rabat.",
    ],
    ejemplo: [
      `En vare til ${m(precio)} koster ${m(precio * 0.75)} med 25 % rabat.`,
      `Med 30 % og derefter 10 % mere koster den ${m(precio * 0.7 * 0.9)}. Det er ${total} % billigere i alt, ikke 40 %.`,
    ],
    faq: [
      {
        pregunta: "Hvordan regner jeg en rabat ud?",
        respuesta: "Gang prisen med procentsatsen, og del med 100. Det er det, du sparer. Træk det fra prisen, så har du det, du skal betale.",
      },
      {
        pregunta: "Er 30 % plus 10 % rabat det samme som 40 %?",
        respuesta: `Nej. Den anden rabat regnes af den allerede nedsatte pris. I alt sparer du derfor ${total} %.`,
      },
      {
        pregunta: "Hvordan finder jeg normalprisen ud fra prisen efter rabat?",
        respuesta: `Del prisen efter rabat med (1 − rabat ÷ 100). Ved 25 % rabat deler du med ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Rabat", definicion: "Den procentsats, der trækkes fra normalprisen." },
      { termino: "Samlet rabat", definicion: "Hvor mange procent du sparer i alt, når der gælder mere end én rabat." },
    ],
  };
};
