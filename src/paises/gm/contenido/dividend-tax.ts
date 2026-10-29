import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gm.dividend-tax",
  h1: "Dividend tax calculator for The Gambia",
  title: "Dividend tax calculator Gambia: net dividend after tax",
  description: "See how much of a dividend you receive in The Gambia after the {{gm.dividend-tax-rate}} dividend income tax the company withholds for the GRA.",
  intro: [
    "Companies and partnerships in The Gambia withhold dividend income tax before paying shareholders or partners. Enter the gross dividend to see the tax and what reaches you.",
    "The rate is {{gm.dividend-tax-rate}} of the gross dividend, with no deductions, and it is a final tax.",
  ],
  comoSeCalcula: [
    "Dividend income tax: gross dividend × {{gm.dividend-tax-rate}}.",
    "Dividend received: gross dividend minus the tax withheld.",
  ],
  ejemplo: ["On a dividend of D50,000 the company withholds D7,500 and pays you D42,500, the example in the GRA brochure."],
  faq: [
    {
      pregunta: "Do I have to declare dividends in a tax return?",
      respuesta: "Not if you have no other taxable income. The tax withheld is final and the net dividend is not taxed again. Attach the withholding certificate if you do file a return.",
    },
    {
      pregunta: "When does the company pay the tax to the GRA?",
      respuesta: "By the 15th of the month after the dividend is paid. The annual withholding statement is due two months after the end of the tax year.",
    },
    {
      pregunta: "Can a loss reduce the dividend tax?",
      respuesta: "No. No deductions are allowed and the dividend cannot be reduced by any loss.",
    },
  ],
  glosario: [
    { termino: "Gross dividend", definicion: "The dividend declared before any tax is withheld." },
    { termino: "Withholding certificate", definicion: "The document the company gives you showing the dividend tax it withheld." },
  ],
});
