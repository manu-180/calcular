import type { ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../fechas";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  return {
    h1: "Days between dates calculator",
    title: `Days between dates calculator for ${ctx.nombrePais}`,
    description: "Count the days between two dates: calendar days, weeks, months and business days from Monday to Friday.",
    intro: [
      "Pick a start date and an end date. You see the calendar days, the same span in weeks and months, and the business days.",
      "Use it for deadlines, due dates, holidays, pregnancies or a countdown.",
    ],
    comoSeCalcula: [
      "Calendar days are every day between the two dates. The start date counts and the end date doesn't, unless you tick the option.",
      "Business days are the Mondays to Fridays in that same span. Public holidays are not taken off.",
      "Leap years count with their 29 February.",
    ],
    ejemplo: [`From ${f(desde)} to ${f(hasta)} there are ${dias} calendar days.`, `Of those, ${habiles} fall on Monday to Friday.`],
    faq: [
      {
        pregunta: "Does it count the first day or the last?",
        respuesta: "By default it counts the first and not the last, as when you subtract two dates. If you need both, tick “Include the end date”.",
      },
      {
        pregunta: "Do business days leave out public holidays?",
        respuesta: "No. They count Monday to Friday. Holidays change by country, region and year, so take them off separately.",
      },
      {
        pregunta: "How many days are in a year?",
        respuesta: "365, or 366 in leap years. That is why the same two dates in different years can be a different number of days apart.",
      },
    ],
    glosario: [
      { termino: "Calendar days", definicion: "Every day on the calendar, weekends and holidays included." },
      { termino: "Business days", definicion: "In this calculator, Monday to Friday." },
    ],
  };
};
