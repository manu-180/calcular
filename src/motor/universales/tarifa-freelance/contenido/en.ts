import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoEn: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  return {
    h1: "Freelance rate calculator",
    title: tituloQueEntre(`Freelance hourly rate calculator for ${ctx.nombrePais}`, `Freelance rate in ${ctx.nombrePais}`, "Freelance rate calculator"),
    description: "Work out your hourly and day rate as a freelancer from what you want to earn, your expenses, taxes, time off and billable hours.",
    intro: [
      "The most common freelance mistake is taking the salary you would want as an employee and dividing it by 160 hours. That leaves out taxes, expenses, vacation and every hour you can't bill.",
      "This calculator starts from what you want to take home and tells you what to charge to get there.",
    ],
    comoSeCalcula: [
      "Billing needed = take-home income ÷ (1 − tax rate) + business expenses.",
      "Working days = 52 weeks × days per week − days off.",
      "Billable hours per year = working days × billable hours per day.",
      "Hourly rate = billing needed ÷ billable hours per year.",
    ],
    ejemplo: [
      `To take home ${m(ingreso)} a year, with ${m(gastos)} in expenses and 25% tax, you need to bill ${m(r.facturado)}.`,
      `With 30 days off and 25 billable hours a week, that is ${Math.round(r.horas)} hours a year: a rate of ${m(r.hora)} an hour or ${m(r.dia)} a day.`,
    ],
    faq: [
      {
        pregunta: "How many hours a week can I bill?",
        respuesta: "Fewer than you work. Finding clients, email, invoicing and learning take time nobody pays for. 20 to 30 billable hours out of 40 is typical.",
      },
      {
        pregunta: "Should I charge by the hour or by the project?",
        respuesta: "Both work. Even if you price by project, estimate the hours and multiply by this rate so you don't come up short.",
      },
      {
        pregunta: "What tax rate should I use?",
        respuesta: "It depends on your country and how you are registered. Add income tax and social security contributions. If you are not sure, ask an accountant.",
      },
    ],
    glosario: [
      { termino: "Billable hours", definicion: "Working hours you charge a client for." },
      { termino: "Take-home income", definicion: "What is left after taxes and business expenses." },
    ],
  };
};
