import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gm.notice-period",
  h1: "Notice period calculator for The Gambia",
  title: "Notice period calculator Gambia: Labour Act 2023",
  description: "Find the minimum notice to end a job in The Gambia under the Labour Act, 2023, the end date and pay in lieu, including {{gm.redundancy-notice-months}} for redundancy.",
  intro: [
    "Enter who is ending the contract, how wages are paid and the years of service to see the minimum written notice under section 91 of the Labour Act, 2023.",
    "Monthly paid workers get {{gm.notice-periods[monthly-months]}} month. After six years of continuous service the notice is {{gm.notice-periods[six-years-months]}} months, and a redundancy dismissal needs {{gm.redundancy-notice-months}}.",
  ],
  comoSeCalcula: [
    "Monthly wages: {{gm.notice-periods[monthly-months]}} month.",
    "Wages every two weeks: {{gm.notice-periods[biweekly-short-weeks]}} weeks. Weekly wages: {{gm.notice-periods[weekly-short-weeks]}} week under two years, {{gm.notice-periods[weekly-mid-weeks]}} weeks from two years.",
    "Daily or hourly wages: {{gm.notice-periods[daily-short-days]}} day under six months, {{gm.notice-periods[daily-mid-weeks]}} week up to two years, {{gm.notice-periods[daily-long-weeks]}} weeks from two years.",
    "Six years or more of continuous service: {{gm.notice-periods[six-years-months]}} months from the employer. The employee gives at least {{gm.notice-periods[employee-six-years-months]}} month.",
    "Fixed-term contracts: {{gm.notice-periods[fixed-term-days]}} days. Redundancy: {{gm.redundancy-notice-months}}.",
  ],
  ejemplo: ["A monthly paid worker with eight years of service who is dismissed on 1 November 2026 gets two months' notice, to 1 January 2027, or two months' pay instead."],
  faq: [
    {
      pregunta: "Can the employer pay instead of giving notice?",
      respuesta: "Yes. The employer can pay the remuneration the worker would have earned during the notice and give all other benefits due up to the end of that period.",
    },
    {
      pregunta: "What if the employee leaves without notice?",
      respuesta: "Unless the employer waives it, the employee owes the employer a sum equal to the pay for the notice period, and is still paid what was earned up to the last day.",
    },
    {
      pregunta: "Can a contract set a shorter notice?",
      respuesta: "No. A longer notice can be agreed, but an agreement for less than the Act requires is null and void.",
    },
  ],
  glosario: [
    { termino: "Pay in lieu of notice", definicion: "Money paid instead of working the notice period." },
    { termino: "Redundancy", definicion: "Dismissal for economic, organisational, technical or similar reasons, or a move of the workplace more than 40 km away." },
  ],
});
