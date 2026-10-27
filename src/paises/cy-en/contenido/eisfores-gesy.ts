import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cy-en.eisfores-gesy",
  h1: "GeSY contribution calculator",
  title: "GeSY contributions 2026: employees, self-employed, pensions",
  description: "Work out your GeSY contribution: {{cy.eisfores-gesy[misthotos]}} on salaries and pensions, {{cy.eisfores-gesy[autotelos]}} for the self-employed, up to {{cy.anotato-orio-gesy}}.",
  intro: [
    "Cyprus's General Healthcare System is funded by contributions on all income. Enter the year's income to see what you pay.",
    "It follows section 19 of the General Healthcare System Law.",
  ],
  comoSeCalcula: [
    "Employees pay {{cy.eisfores-gesy[misthotos]}} of their pay and employers {{cy.eisfores-gesy[ergodotis]}}.",
    "The self-employed pay {{cy.eisfores-gesy[autotelos]}}. Pensioners pay {{cy.eisfores-gesy[syntaxiouchos]}} of their pension. Rent, interest and dividends pay {{cy.eisfores-gesy[eisodimatias]}}.",
    "Contributions stop at total income of {{cy.anotato-orio-gesy}} a year. The ceiling fills with pay first, then pensions, then other income.",
  ],
  ejemplo: [
    "With €30,000 of salary and €5,000 of rent a year, you pay €795 on the salary and €132.50 on the rent. Total €927.50.",
  ],
  faq: [
    { pregunta: "Do I pay GeSY on rent?", respuesta: "Yes, {{cy.eisfores-gesy[eisodimatias]}} of rental income. The same applies to interest and dividends." },
    { pregunta: "What if I pay above the ceiling?", respuesta: "You can claim the excess back. For 2025 onwards, the Tax Commissioner makes the refund." },
    { pregunta: "Is GeSY tax-deductible?", respuesta: "Yes. It comes off taxable income together with Social Insurance, up to one fifth of income in total." },
  ],
  glosario: [
    { termino: "GeSY", definicion: "The General Healthcare System that covers all beneficiaries in Cyprus." },
  ],
});
