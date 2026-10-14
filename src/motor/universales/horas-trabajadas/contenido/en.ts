import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Time card calculator",
    title: tituloQueEntre(`Time card calculator for ${ctx.nombrePais}`, `Time card for ${ctx.nombrePais}`, "Time card calculator"),
    description: "Add up the hours you worked this week from start time, end time and breaks, and work out your pay with overtime included.",
    intro: [
      "Pick the start and end time for each day, your unpaid break and your hourly pay. We show total hours, overtime and your pay for the week.",
      "Use it to check your paycheck, fill in a timesheet or bill hourly work.",
    ],
    comoSeCalcula: [
      "Hours per day = end − start − break. If the end is earlier than the start, the shift ends the next day.",
      "Overtime = weekly total − regular hours, when the total goes above them.",
      "Pay = regular hours × hourly pay + overtime hours × hourly pay × (1 + premium).",
    ],
    ejemplo: [
      `From ${hora("09:00")} to ${hora("17:30")} with a 30 minute break is ${n(jornada)} hours a day. Monday to Friday, ${n(jornada * 5)} hours: at ${m(pago)} an hour, ${m(jornada * 5 * pago)}.`,
      `From ${hora("08:00")} to ${hora("18:00")} with a one hour break is ${n(larga * 5)} hours in the week: ${n(extra)} are overtime. At time and a half, that pays ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "How do I calculate hours worked?",
        respuesta: "Subtract the start time from the end time and take off your break. Then add up every day of the week.",
      },
      {
        pregunta: "How do I turn minutes into decimal hours?",
        respuesta: `Divide the minutes by 60. Half an hour is ${n(0.5, 1)}; 15 minutes, ${n(0.25, 2)}; 45 minutes, ${n(0.75, 2)}. So 7 hours 45 minutes is ${n(7.75, 2)} hours.`,
      },
      {
        pregunta: "How much overtime can I work and how is it paid?",
        respuesta: "That depends on the law where you work and your contract. This calculator uses the premium and regular hours you enter, without applying any specific rule.",
      },
    ],
    glosario: [
      { termino: "Overtime", definicion: "Hours worked beyond your regular hours, paid at a higher rate." },
      { termino: "Time and a half", definicion: "An overtime rate of one and a half times regular pay, a 50% premium." },
    ],
  };
};
