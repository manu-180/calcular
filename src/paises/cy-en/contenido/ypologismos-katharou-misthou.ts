import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cy-en.ypologismos-katharou-misthou",
  h1: "Net salary calculator for Cyprus",
  title: "Cyprus net salary calculator 2026: gross to net",
  description: "Work out your take-home pay in Cyprus: Social Insurance {{cy.eisfora-ka-misthotou}}, GeSY {{cy.eisfores-gesy[misthotos]}} and income tax with a {{cy.klimaka-forou[0].hasta}} tax-free band.",
  intro: [
    "Enter your gross monthly salary to see what you take home after Social Insurance, the GeSY contribution and income tax.",
    "It uses the new tax bands in force from 2026 and the new child deduction.",
  ],
  comoSeCalcula: [
    "Social Insurance is {{cy.eisfora-ka-misthotou}} of your gross pay, up to the maximum insurable earnings of {{cy.anotato-orio-ka}} a month.",
    "GeSY is {{cy.eisfores-gesy[misthotos]}} of your gross pay, up to total income of {{cy.anotato-orio-gesy}} a year.",
    "Taxable income is your yearly gross pay minus contributions (up to {{cy.orio-ekptosis-eisforon}} of income) and minus the child deduction.",
    "The bands are {{cy.klimaka-forou[0].tasa}} up to {{cy.klimaka-forou[0].hasta}}, {{cy.klimaka-forou[1].tasa}} up to {{cy.klimaka-forou[1].hasta}}, {{cy.klimaka-forou[2].tasa}} up to {{cy.klimaka-forou[2].hasta}}, {{cy.klimaka-forou[3].tasa}} up to {{cy.klimaka-forou[3].hasta}} and {{cy.klimaka-forou[4].tasa}} above that.",
    "The year's tax is spread over the year's salaries, the way your employer withholds it. A 13th salary pays Social Insurance together with that month's pay, only up to the monthly ceiling.",
  ],
  ejemplo: [
    "On a gross salary of €3,000 with 12 salaries, Social Insurance is €264 and GeSY €79.50 a month. Taxable income is €31,878 and the year's tax €1,975.60. Your net salary is €2,491.87.",
  ],
  faq: [
    { pregunta: "How much is €2,000 gross in net pay?", respuesta: "With 12 salaries and no children, €1,771 a month. Taxable income stays inside the tax-free band, so only Social Insurance and GeSY come off." },
    { pregunta: "What is the tax-free band in 2026?", respuesta: "From tax year 2026 the first {{cy.klimaka-forou[0].hasta}} of taxable income is taxed at 0%. Up to 2025 it was €19,500." },
    { pregunta: "How does the child deduction work?", respuesta: "Each parent deducts {{cy.ekptosi-teknou[1]}} for the first dependent child, {{cy.ekptosi-teknou[2]}} for the second and {{cy.ekptosi-teknou[3]}} for each further child. Single parents get double. It only applies if family income is within the legal limits." },
    { pregunta: "Is the 13th salary compulsory?", respuesta: "The law doesn't require it. Many employers pay it under a collective agreement or the employment contract. If you get one, choose 13 salaries." },
  ],
  glosario: [
    { termino: "Gross salary", definicion: "The salary in your contract, before contributions and tax." },
    { termino: "GeSY", definicion: "The General Healthcare System. Its contribution is deducted along with Social Insurance." },
  ],
});
