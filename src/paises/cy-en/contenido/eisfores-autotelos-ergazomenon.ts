import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cy-en.eisfores-autotelos-ergazomenon",
  h1: "Self-employed contributions in Cyprus",
  title: "Cyprus self-employed contributions {{anio}}: SI and GeSY",
  description: "Work out your contributions as self-employed: Social Insurance {{cy.eisfora-ka-autotelos}} with a minimum per category, and GeSY {{cy.eisfores-gesy[autotelos]}}.",
  intro: [
    "As self-employed you pay Social Insurance and GeSY yourself. Choose your occupational category and enter the year's income.",
    "Amounts come from the Social Insurance Services' 2026 table.",
  ],
  comoSeCalcula: [
    "Social Insurance is {{cy.eisfora-ka-autotelos}} of your insurable earnings.",
    "Each category has a weekly minimum: the basic insurable earnings ({{cy.vasikes-asfalistees-evdomada}}) times the category factor. If you earn less, you pay on the minimum unless you're approved to pay on actual income.",
    "Earnings count up to {{cy.anotato-orio-ka-evdomada}} a week. We take the year as 52 weeks.",
    "GeSY is {{cy.eisfores-gesy[autotelos]}} of income, up to {{cy.anotato-orio-gesy}} a year.",
  ],
  ejemplo: [
    "With €30,000 of income in category 16 (other occupations), you're above the category minimum. You pay €4,980 Social Insurance and €1,200 GeSY a year.",
  ],
  faq: [
    { pregunta: "What if my income is below the minimum?", respuesta: "You can apply with evidence of your income to pay contributions on your actual income." },
    { pregunta: "What if I'm employed and self-employed?", respuesta: "You're insured for both. With two self-employed occupations, you're insured only for the one with the higher insurable earnings." },
    { pregunta: "Will the rate change?", respuesta: "Yes. Under the Insured Person's Guide it becomes 17.6% from 2029 and rises again in 2034 and 2039." },
  ],
  glosario: [
    { termino: "Self-employed", definicion: "Someone who works on their own account rather than as an employee." },
  ],
});
