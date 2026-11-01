import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cy-en.ypologismos-forou-eisodimatos",
  h1: "Cyprus income tax calculator {{anio}}",
  title: "Cyprus income tax {{anio}}: new bands and deductions",
  description: "Work out your income tax with the {{anio}} bands: {{cy.klimaka-forou[0].hasta}} tax-free, plus deductions for children, rent and energy upgrades.",
  intro: [
    "Enter your gross income for the year and your deductions. You'll see the tax, your average rate and what's left after tax.",
    "The tax reform applies from tax year 2026. The 2026 return is due by 31 July 2027.",
  ],
  comoSeCalcula: [
    "Social Insurance, GeSY, provident fund contributions and life insurance premiums come off income, up to {{cy.orio-ekptosis-eisforon}} of it in total.",
    "Within the income limits you also deduct children ({{cy.ekptosi-teknou[1]}}, {{cy.ekptosi-teknou[2]}} and {{cy.ekptosi-teknou[3]}}), rent or mortgage interest up to {{cy.ekptosi-stegasis}} and energy upgrades up to {{cy.ekptosi-energeias}}.",
    "Home insurance against natural disasters is deductible up to {{cy.ekptosi-asfalisis-katoikias}}, with no income test.",
    "The bands are {{cy.klimaka-forou[0].tasa}} up to {{cy.klimaka-forou[0].hasta}}, {{cy.klimaka-forou[1].tasa}} up to {{cy.klimaka-forou[1].hasta}}, {{cy.klimaka-forou[2].tasa}} up to {{cy.klimaka-forou[2].hasta}}, {{cy.klimaka-forou[3].tasa}} up to {{cy.klimaka-forou[3].hasta}} and {{cy.klimaka-forou[4].tasa}} above.",
  ],
  ejemplo: [
    "On taxable income of €40,000, the first €22,000 is tax-free. The next €10,000 pays 20% (€2,000) and the last €8,000 pays 25% (€2,000). The tax is €4,000.",
  ],
  faq: [
    { pregunta: "What are the income limits?", respuesta: "Gross income must not exceed {{cy.eisodimatika-kritiria[monires]}} for a single person, {{cy.eisodimatika-kritiria[tekna-0-2]}} for a family with up to two children, {{cy.eisodimatika-kritiria[tekna-3-4]}} with three or four and {{cy.eisodimatika-kritiria[tekna-5]}} with five or more." },
    { pregunta: "Who has to file a return from 2026?", respuesta: "Anyone with gross income, and every tax resident aged 25 to 70 even without income, according to the Tax Department's guide to the reform." },
    { pregunta: "Are interest and dividends taxed on the bands?", respuesta: "No. The income tax law exempts an individual's interest and dividends. They pay the Special Defence Contribution and GeSY instead." },
  ],
  glosario: [
    { termino: "Average rate", definicion: "Tax as a share of gross income." },
    { termino: "Marginal rate", definicion: "The rate your last euro of taxable income pays." },
  ],
});
