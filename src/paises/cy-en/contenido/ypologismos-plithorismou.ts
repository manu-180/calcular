import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cy-en.ypologismos-plithorismou",
  h1: "Inflation calculator for Cyprus",
  title: "Cyprus inflation calculator with the CYSTAT CPI",
  description: "See what a past amount is worth today using the Cyprus Statistical Service's Consumer Price Index. Latest index: {{cy.dtk#desde}}.",
  intro: [
    "Enter an amount and the month it refers to. You'll see how much you need in another month for the same buying power.",
    "We use the monthly Consumer Price Index of the Cyprus Statistical Service, with 2015 as the base.",
  ],
  comoSeCalcula: [
    "We divide the index of the final month by the index of the starting month and multiply by the amount.",
    "The latest published index is {{cy.dtk}} ({{cy.dtk#desde}}). If you choose a later month, the calculation stops there.",
  ],
  ejemplo: [
    "€1,000 in January 2015 equals €1,228.96 in September 2026. Prices rose about 22.9% over that time.",
  ],
  faq: [
    { pregunta: "What is this useful for?", respuesta: "Comparing salaries, rents or prices across years. It also helps with capital gains tax, where the purchase cost is adjusted for inflation." },
    { pregunta: "How often is the index updated?", respuesta: "The Statistical Service publishes it every month. The calculator picks up the new month once it's out." },
    { pregunta: "How far back does the data go?", respuesta: "From January 2000 to the latest published month." },
  ],
  glosario: [
    { termino: "Consumer Price Index", definicion: "Measures how prices of the goods and services households buy change over time." },
  ],
});
