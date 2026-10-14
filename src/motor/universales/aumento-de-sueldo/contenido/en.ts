import { formatearMonto, formatearNumero, montoEjemplo, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "Pay raise calculator",
    title: `Pay raise calculator for ${ctx.nombrePais}`,
    description: "Work out your new pay after a raise, the difference per month and per year, and whether you beat inflation with your real raise.",
    intro: [
      "You have been offered a raise, or you are about to ask for one. Enter your pay and the raise, as a percentage or an amount, and see how much changes each month and year.",
      "Add inflation for the period and we tell you whether you really gain buying power or just catch up.",
    ],
    comoSeCalcula: [
      "New pay = current pay × (1 + raise ÷ 100).",
      "Difference per year = difference per month × paychecks per year.",
      "Real raise = (1 + raise) ÷ (1 + inflation) − 1.",
    ],
    ejemplo: [
      `Pay of ${m(sueldo)} a month with a 5% raise becomes ${m(sueldo * 1.05)}: ${m(sueldo * 0.05)} more a month and ${m(sueldo * 0.05 * 12)} more a year.`,
      `If inflation over the period was 3%, the real raise is ${p(aumentoReal(5, 3))}. With 6% inflation, it is ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "What is a real raise?",
        respuesta: "It is your raise after inflation. It shows whether your new pay buys more or less than before.",
      },
      {
        pregunta: "Why not just subtract inflation from the raise?",
        respuesta: `Because the two percentages multiply, they don't add. With a 5% raise and 3% inflation, the real raise is ${p(aumentoReal(5, 3))}, not 2%. With high inflation the gap gets much bigger.`,
      },
      {
        pregunta: "How much of a raise should I ask for?",
        respuesta: "At least inflation since your last raise, so you don't fall behind. Beyond that, what other employers pay for a role like yours and how your job has grown.",
      },
    ],
    glosario: [
      { termino: "Nominal raise", definicion: "The raise as it appears on your payslip, before inflation." },
      { termino: "Buying power", definicion: "What your pay can buy." },
    ],
  };
};
