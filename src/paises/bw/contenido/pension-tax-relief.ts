import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bw.pension-tax-relief",
  h1: "Pension contribution tax relief calculator",
  title: "Pension tax relief calculator Botswana: what you save",
  description: "See how much PAYE you save by paying into an approved pension, provident or retirement annuity fund in Botswana, and what the contribution really costs you.",
  intro: [
    "Contributions to an approved retirement fund come off your taxable income, so part of every pula you save comes back as lower PAYE.",
    "Enter your salary and your monthly contribution to see the tax you save and the real cost of saving for retirement.",
  ],
  comoSeCalcula: [
    "Your yearly PAYE is worked out with and without the contribution.",
    "The deduction is capped at {{bw.pension-deduction-cap}} of your taxable income, which is your pay after the contribution.",
    "The difference in PAYE is your tax saving. The contribution less the saving is what it really costs you.",
  ],
  ejemplo: [
    "On P20 000 a month, paying P1 500 into a pension fund lowers your PAYE by P375 a month. The contribution really costs you P1 125.",
  ],
  faq: [
    {
      pregunta: "How much of my pension contribution is tax deductible?",
      respuesta: "Up to {{bw.pension-deduction-cap}} of your taxable income for the year, under section 28 of the Income Tax Act, 2026. The fund must be approved by BURS and paid from income earned in Botswana.",
    },
    {
      pregunta: "Can non-residents claim it?",
      respuesta: "No. The deduction in section 28 is for resident individuals only.",
    },
    {
      pregunta: "What about what my employer pays in?",
      respuesta: "Your employer deducts its own contributions from its taxable income, up to 20% of your employment income. Its contribution does not reduce your PAYE.",
    },
  ],
  glosario: [
    { termino: "Approved retirement fund", definicion: "A pension, provident, retirement annuity or superannuation fund approved by BURS." },
    { termino: "Tax relief", definicion: "The tax you no longer pay because part of your income goes to the fund." },
  ],
});
