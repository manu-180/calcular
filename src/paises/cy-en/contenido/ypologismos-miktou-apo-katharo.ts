import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cy-en.ypologismos-miktou-apo-katharo",
  h1: "Net to gross salary in Cyprus",
  title: "Net to gross salary calculator for Cyprus {{anio}}",
  description: "Find the gross salary that gives you the net pay you want, with Social Insurance, GeSY and the {{anio}} income tax bands.",
  intro: [
    "Know what you want in your account each month and need the gross figure for a job offer? Enter the net salary and see the gross.",
    "It runs the net salary calculation backwards.",
  ],
  comoSeCalcula: [
    "Gross pay loses {{cy.eisfora-ka-misthotou}} to Social Insurance (up to {{cy.anotato-orio-ka}} a month) and {{cy.eisfores-gesy[misthotos]}} to GeSY.",
    "Tax is worked out on yearly taxable income with the 2026 bands, starting with a {{cy.klimaka-forou[0].hasta}} tax-free band, and spread over the year's salaries.",
    "We look for the lowest gross salary that gives at least the net you asked for, to the cent.",
  ],
  ejemplo: [
    "For €2,000 net a month, with 12 salaries and no children, you need a gross salary of €2,305.67.",
  ],
  faq: [
    { pregunta: "Why does gross rise faster than net?", respuesta: "Above the tax-free band, every extra euro pays tax at its band rate on top of contributions. So the gap grows as pay goes up." },
    { pregunta: "Does the 13th salary count?", respuesta: "Yes, if you choose it. With 13 salaries the year's tax is spread over 13 payments, so the gross needed for the same net changes a little." },
    { pregunta: "Are employer contributions included?", respuesta: "No. The gross salary is what the contract says. For the cost to the business, use the employer cost calculator." },
  ],
  glosario: [
    { termino: "Net salary", definicion: "What reaches your bank account each month." },
  ],
});
