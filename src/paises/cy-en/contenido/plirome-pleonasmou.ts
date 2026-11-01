import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cy-en.plirome-pleonasmou",
  h1: "Redundancy pay calculator for Cyprus",
  title: "Cyprus redundancy payment {{anio}}: what you're owed",
  description: "Work out your payment from the Redundancy Fund based on years of service and your weekly wage, within the legal ceiling.",
  intro: [
    "When your job is abolished for economic or organisational reasons, you're entitled to a redundancy payment from the Redundancy Fund.",
    "Enter your start and end dates and your last salary.",
  ],
  comoSeCalcula: [
    "You need at least {{cy.pleonasmos-elachisti}} of continuous employment with the same employer.",
    "Each year of service pays weeks of wages: {{cy.pleonasmos-evdomades[4]}} for the first 4 years, {{cy.pleonasmos-evdomades[10]}} for years 5 to 10, {{cy.pleonasmos-evdomades[15]}} for years 11 to 15, {{cy.pleonasmos-evdomades[20]}} for years 16 to 20 and {{cy.pleonasmos-evdomades[25]}} for years 21 to 25.",
    "A remainder of 26 weeks or more counts as a full year.",
    "The weekly wage counts up to four times the basic insurable earnings ({{cy.vasikes-asfalistees-evdomada}} a week). We convert a monthly salary to weekly with × 12 / 52.",
    "From age 64 the payment drops by 1/12 for each full month.",
  ],
  ejemplo: [
    "With 10 years of service and a weekly wage of €500, you get 8 weeks for the first 4 years and 15 for the next 6. That's 23 weeks, or €11,500.",
  ],
  faq: [
    { pregunta: "Who pays redundancy money?", respuesta: "All redundancy payments come from the Redundancy Fund, which is funded by employer contributions." },
    { pregunta: "What about unfair dismissal?", respuesta: "The Labour Disputes Court decides the compensation. It can't be less than the redundancy payment or more than two years' wages." },
    { pregunta: "What if my employer pays its own compensation too?", respuesta: "You get the full Fund payment. Your employer pays the difference if its own payment is higher." },
  ],
  glosario: [
    { termino: "Redundancy", definicion: "Ending a job because the position is no longer needed, for economic, technical or organisational reasons." },
  ],
});
