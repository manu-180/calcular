import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionEn } from "../../dias-entre-fechas/textos/en";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Age calculator",
    title: tituloQueEntre(`Age calculator for ${ctx.nombrePais}`, "Age calculator"),
    description: "Work out your exact age in years, months and days, how many days you have lived and how long until your next birthday.",
    intro: [
      "Enter your date of birth and you see your exact age today, also in months, weeks and days.",
      "Change the second date to find someone's age on a given day, or how old they will be.",
    ],
    comoSeCalcula: [
      "It counts the whole months from birth to the chosen date. Every 12 months is one year.",
      "The days left after the last whole month are the days of the age.",
      "Leap years count with their 366 days.",
    ],
    ejemplo: [
      `Someone born on ${fechaLarga(ctx.locale, nac)} was ${duracionEn(Math.floor(meses / 12), meses % 12, dias)} old on ${fechaLarga(ctx.locale, ref)}.`,
      `That is ${formatearNumero(ctx, total)} days.`,
    ],
    faq: [
      {
        pregunta: "How is exact age worked out?",
        respuesta: "It counts the full years, then the whole months since the last birthday, then the days left over.",
      },
      {
        pregunta: "What about people born on 29 February?",
        respuesta: "In years that aren't leap years, this calculator uses 28 February as the birthday. Some laws use 1 March instead.",
      },
      {
        pregunta: "How many days old am I?",
        respuesta: "See the “In days” row. It counts every day from your birth to the chosen date, not counting that last day.",
      },
    ],
    glosario: [
      { termino: "Age", definicion: "The number of full years since birth." },
      { termino: "Leap year", definicion: "A 366-day year with a 29 February. It comes every four years, except some century years." },
    ],
  };
};
