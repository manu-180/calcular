import { aDia, aFecha, fechaLarga } from "../../dias-entre-fechas/fechas";
import type { ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Due date calculator",
    title: `Due date calculator for ${ctx.nombrePais}`,
    description: "Work out your estimated due date from your last period or the conception date, and how many weeks pregnant you are today.",
    intro: [
      "Enter the first day of your last period (or the conception date, if you know it). You see your estimated due date, how far along you are and the trimester.",
      "It is an estimate. Check-ups with a health professional and a scan give the most accurate date.",
    ],
    comoSeCalcula: [
      "It uses Naegele's rule: the due date is your last period plus 280 days (40 weeks).",
      "If your cycle is longer or shorter than 28 days, the date moves by that difference.",
      "From conception, it adds 266 days (38 weeks).",
      "Pregnancy weeks count from your last period, not from conception.",
    ],
    ejemplo: [
      `With a last period on ${f(fum)} and a 28-day cycle, the estimated due date is ${f(fpp)}.`,
      `With a 32-day cycle, it moves 4 days to ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "How is the due date worked out?",
        respuesta: "It adds 280 days to the first day of your last period. A quick rule that gives almost the same date: add 7 days, take off 3 months and add a year.",
      },
      {
        pregunta: "Why do weeks count from my last period?",
        respuesta: "Because it is a date almost everyone knows. That is why, in week 2, conception hasn't happened yet.",
      },
      {
        pregunta: "How many babies arrive on their due date?",
        respuesta: "Few. Most are born between weeks 37 and 42, so the date is a guide rather than an exact day.",
      },
    ],
    glosario: [
      { termino: "LMP", definicion: "Last menstrual period: the first day of your last bleed." },
      { termino: "Naegele's rule", definicion: "A way to estimate the due date by adding 280 days to the LMP." },
    ],
  };
};
