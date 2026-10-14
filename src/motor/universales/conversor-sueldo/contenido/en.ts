import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const anual = montoEjemplo(ctx, 50000);
  const hora = montoEjemplo(ctx, 20);
  return {
    h1: "Hourly to salary calculator",
    title: tituloQueEntre(`Hourly to salary calculator for ${ctx.nombrePais}`, `Hourly to salary in ${ctx.nombrePais}`, "Hourly to salary calculator"),
    description: "Convert your pay between hourly, daily, weekly, semimonthly, monthly and yearly, using your real hours and paid weeks.",
    intro: [
      "How much is your salary per hour? What does an hourly offer come to per year? Enter an amount, pick the period and we show all the others.",
      "Use it to compare job offers, price overtime or see what your time is worth.",
    ],
    comoSeCalcula: [
      "First everything is turned into a yearly amount.",
      "Hourly = yearly ÷ (hours per week × paid weeks).",
      "Daily = yearly ÷ (days per week × paid weeks). Weekly = yearly ÷ paid weeks.",
      "Monthly = yearly ÷ 12. Semimonthly = yearly ÷ 24.",
    ],
    ejemplo: [
      `A salary of ${m(anual)} a year at 40 hours a week is ${m(anual / 2080)} an hour and ${m(anual / 12)} a month.`,
      `An offer of ${m(hora)} an hour full time comes to ${m(hora * 2080)} a year.`,
    ],
    faq: [
      {
        pregunta: "How many working hours are in a year?",
        respuesta: `At 40 hours a week and 52 paid weeks, ${formatearNumero(ctx, 2080)} hours. That is why a quick rule is to multiply the hourly rate by about ${formatearNumero(ctx, 2000)}.`,
      },
      {
        pregunta: "Why doesn't weekly pay times 4 give the monthly amount?",
        respuesta: `Because an average month has ${formatearNumero(ctx, 52 / 12, 2)} weeks, not 4. To go from weekly to monthly, multiply by 52 and divide by 12.`,
      },
      {
        pregunta: "Does it include bonuses or taxes?",
        respuesta: "No. It converts the same figure between periods. If you get bonuses, add them separately when you compare offers.",
      },
    ],
    glosario: [
      { termino: "Gross pay", definicion: "Pay before taxes and deductions." },
      { termino: "Semimonthly", definicion: "Paid twice a month, 24 times a year." },
    ],
  };
};
