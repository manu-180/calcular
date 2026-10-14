import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Ovulation calculator",
    title: tituloQueEntre(`Ovulation calculator for ${ctx.nombrePais}`, "Ovulation calculator"),
    description: "Work out your ovulation day, your fertile window and when your next period is due, with the next three cycles.",
    intro: [
      "Enter the first day of your last period and how long your cycle is. You see the estimated ovulation, your fertile days and your next period.",
      "It is an estimate for regular cycles. It is not a method of contraception and not a substitute for advice from a health professional.",
    ],
    comoSeCalcula: [
      `Ovulation usually happens ${FASE_LUTEA} days before the next period: first day of your last period + cycle length − ${FASE_LUTEA}.`,
      "The fertile window runs from 5 days before ovulation to the day after, because sperm can live up to 5 days.",
      "Your next period is due one cycle after the last one.",
    ],
    ejemplo: [
      `With a last period on ${f(fum)} and a 28-day cycle, estimated ovulation is ${f(aFecha(v.ovulacion))}.`,
      `The fertile window runs from ${f(aFecha(v.desde))} to ${f(aFecha(v.hasta))}, and the next period is due on ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "Which are the most fertile days?",
        respuesta: "The two or three days before ovulation and the day of ovulation. The whole window lasts about 6 days.",
      },
      {
        pregunta: "Does it work if my cycle is irregular?",
        respuesta: "It gives you an idea, but a less precise one. With irregular cycles, ovulation can move by several days from month to month.",
      },
      {
        pregunta: "Can I use this to avoid pregnancy?",
        respuesta: "No. The estimate is approximate and ovulation can come early or late. To prevent pregnancy, use a method of contraception.",
      },
    ],
    glosario: [
      { termino: "Ovulation", definicion: "When an ovary releases an egg." },
      { termino: "Fertile window", definicion: "The days in the cycle when pregnancy is possible." },
    ],
  };
};
