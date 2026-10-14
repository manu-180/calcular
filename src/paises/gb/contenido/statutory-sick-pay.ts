import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gb.statutory-sick-pay",
  h1: "Statutory Sick Pay calculator 2026/27",
  title: "Statutory Sick Pay calculator 2026/27: SSP from day one",
  description:
    "Work out your Statutory Sick Pay: {{gb.ssp-weekly-rate}} a week or {{gb.ssp-earnings-percent}} of your earnings if lower, paid from the first day off sick for up to {{gb.ssp-max-weeks}} weeks.",
  intro: [
    "Statutory Sick Pay (SSP) is the minimum your employer pays when you are too ill to work. Since 6 April 2026 it is paid from your first full day off sick, and there is no longer a minimum earnings level.",
    "Enter your average weekly earnings, the days you normally work and how many working days you are off to see what you get.",
  ],
  comoSeCalcula: [
    "Your weekly SSP is {{gb.ssp-weekly-rate}} or {{gb.ssp-earnings-percent}} of your average weekly earnings, whichever is lower.",
    "It is split across your qualifying days, which are the days you normally work. With 5 qualifying days, each day is one fifth of the weekly rate.",
    "It is paid for up to {{gb.ssp-max-weeks}} weeks for the same period of sickness.",
  ],
  ejemplo: ["If you earn £500 a week and are off for 2 working weeks, you get £246.50. On 7 qualifying days the daily rate is £17.61."],
  faq: [
    {
      pregunta: "Are there still waiting days?",
      respuesta: "No. From 6 April 2026 SSP is paid from the first full day you are off sick. Before that date, the first 3 days were unpaid.",
    },
    {
      pregunta: "Do I need to earn a minimum to get SSP?",
      respuesta:
        "Not any more. The Lower Earnings Limit was removed on 6 April 2026. Lower earners now get {{gb.ssp-earnings-percent}} of their average weekly earnings instead of the flat rate.",
    },
    {
      pregunta: "Is SSP taxed?",
      respuesta: "Yes. It is paid through payroll, so Income Tax and National Insurance come off like normal pay.",
    },
    {
      pregunta: "Can my employer pay more than SSP?",
      respuesta: "Yes. Many employers have a company sick pay scheme. It cannot be less than SSP.",
    },
  ],
  glosario: [
    { termino: "Qualifying days", definicion: "The days you normally work. SSP is only paid for these days." },
    { termino: "Average weekly earnings", definicion: "Your average gross pay per week, usually over the 8 weeks before you went off sick." },
  ],
});
