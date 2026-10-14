import { aDia, aFecha, esHabil, fechaLarga } from "../../dias-entre-fechas/fechas";
import type { ContenidoUniversal } from "../../tipos";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Add days to a date",
    title: `Add days to a date calculator for ${ctx.nombrePais}`,
    description: "Add or subtract calendar days or business days from a date and see which day it lands on. Handy for deadlines and due dates.",
    intro: [
      "Pick a date, a number of days and whether to add or subtract. You see the resulting date and the day of the week.",
      "With business days, it skips Saturdays and Sundays.",
    ],
    comoSeCalcula: [
      "With calendar days, it moves one day on the calendar for each day you enter.",
      "With business days, only Monday to Friday count. The start date itself doesn't count.",
      "Public holidays are not taken off, because they vary by country and region.",
    ],
    ejemplo: [`${f(inicio)} plus 90 calendar days is ${f(mas90)}.`, `${f(inicio)} plus 15 business days is ${f(aFecha(habil))}.`],
    faq: [
      {
        pregunta: "Does the start date count as day one?",
        respuesta: "No. Adding 1 day to a Monday gives Tuesday. That is how most deadlines are counted.",
      },
      {
        pregunta: "What if I add business days from a Saturday?",
        respuesta: "The first business day is the next Monday. Adding 1 business day to a Saturday gives Monday.",
      },
      {
        pregunta: "Does it handle leap years?",
        respuesta: "Yes. If the span goes through 29 February, that counts as one more day.",
      },
    ],
    glosario: [
      { termino: "Calendar days", definicion: "Every day on the calendar, none skipped." },
      { termino: "Business days", definicion: "In this calculator, Monday to Friday." },
    ],
  };
};
