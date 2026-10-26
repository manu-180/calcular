import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cy-en.etisia-adeia",
  h1: "Annual leave calculator for Cyprus",
  title: "Cyprus annual leave: how many days you're entitled to",
  description: "Work out your annual leave: {{cy.imeres-adeias[5]}} on a five-day week, {{cy.imeres-adeias[6]}} on a six-day week, or in proportion to the weeks you worked.",
  intro: [
    "The Annual Paid Leave Law gives every employee four working weeks of leave a year. If you worked less, your leave is reduced in proportion.",
    "Enter how many days you work a week and how many weeks you worked in the leave year.",
  ],
  comoSeCalcula: [
    "With {{cy.evdomades-adeias}} weeks of work or more, leave is {{cy.imeres-adeias[5]}} on a five-day week and {{cy.imeres-adeias[6]}} on a six-day week.",
    "With fewer weeks, leave is reduced in proportion: full leave × weeks worked / {{cy.evdomades-adeias}}.",
    "The value of the leave is a guide: monthly pay becomes a daily rate (salary × 12 / 52 / days per week) times the days.",
  ],
  ejemplo: [
    "On a five-day week with 24 weeks worked, you're entitled to 10 working days of leave, half the full amount.",
  ],
  faq: [
    { pregunta: "Do public holidays count as leave days?", respuesta: "No. Public holidays, maternity, paternity or parental leave, sick days and the notice period don't count as annual leave." },
    { pregunta: "Who pays my leave?", respuesta: "Either your employer directly, if exempt, or the Central Holiday Fund, to which the employer contributes {{cy.eisfores-tameion-ergodoti[adeies]}} for 20 days of leave." },
    { pregunta: "Can I get more days?", respuesta: "Yes, if a law, collective agreement, custom or agreement gives you more. The law protects the longer leave while that rule applies." },
  ],
  glosario: [
    { termino: "Central Holiday Fund", definicion: "The fund that pays annual leave when the employer doesn't pay it directly." },
  ],
});
