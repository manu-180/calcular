import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bw.gratuity-tax-calculator",
  h1: "Gratuity and severance tax calculator",
  title: "Gratuity tax calculator Botswana: severance and retrenchment",
  description: "Work out the tax on a gratuity, severance pay or retrenchment package in Botswana: half is tax-free and the rest is taxed on the basis that costs you less.",
  intro: [
    "Gratuities, severance pay and retrenchment packages get special treatment. Half is tax-free, and the taxable half is taxed all in one year or spread over up to three years, whichever gives you the lower tax.",
    "Enter the payment, your other income this tax year and, if the contract ran for more than a year, your income in the years before.",
  ],
  comoSeCalcula: [
    "{{bw.gratuity-exempt-share}} of the payment is tax-free.",
    "First basis: the taxable half is added to this year's income and taxed at your marginal rates.",
    "Second basis: the taxable half is split into equal parts over the contract term, up to three years, and each part is taxed with the income and rates of its year.",
    "The law applies the basis that gives the lower tax. Years up to 2025/26 use the rates from before the Income Tax Act, 2026.",
  ],
  ejemplo: [
    "BURS gives this example: severance of P36 000 with income of P120 000 this year, P72 000 last year and P48 000 the year before. The taxable half is P18 000. Taxed in one year it costs P3 375. Spread at P6 000 a year it costs P300 + P300 + P1 125 = P1 725, so the tax is P1 725.",
  ],
  faq: [
    {
      pregunta: "Is severance pay taxable in Botswana?",
      respuesta: "Half of it is. Section 17 of the Income Tax Act, 2026 makes {{bw.gratuity-exempt-share}} of a gratuity, severance or retrenchment payment non-taxable and taxes the balance as employment income.",
    },
    {
      pregunta: "Who decides whether the payment is spread?",
      respuesta: "The Act says the balance is taxed on whichever basis gives the lower tax. Your employer works it out when it withholds the tax.",
    },
    {
      pregunta: "Does this apply to pension fund payouts?",
      respuesta: "No. Lump sums and pensions from an approved retirement fund follow section 19 of the Act instead.",
    },
  ],
  glosario: [
    { termino: "Gratuity", definicion: "A lump sum paid at the end of a fixed-term contract or during it." },
    { termino: "Retrenchment", definicion: "When the employer ends your contract to reduce the size of its workforce." },
  ],
});
