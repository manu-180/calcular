import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lr.rental-income-tax",
  h1: "Rental income tax calculator Liberia",
  title: "Liberia rental income tax: withholding on rent",
  description: "See the withholding tax on rent in Liberia: {{lr.withholding-rates[rent-resident]}} for resident landlords and {{lr.withholding-rates[rent-non-resident]}} for non-residents, on monthly or yearly rent.",
  intro: [
    "Enter the rent and say whether the landlord lives in Liberia to see the tax withheld on each payment.",
    "The tenant withholds {{lr.withholding-rates[rent-resident]}} of the rent paid to a resident landlord and {{lr.withholding-rates[rent-non-resident]}} for a non-resident landlord.",
  ],
  comoSeCalcula: [
    "Tax withheld: rent × {{lr.withholding-rates[rent-resident]}} for a resident landlord, or × {{lr.withholding-rates[rent-non-resident]}} for a non-resident.",
    "The landlord receives the rent minus the tax withheld.",
  ],
  ejemplo: ["On US$500 a month paid to a resident landlord, US$50 is withheld each month, US$600 a year."],
  faq: [
    {
      pregunta: "Who pays the tax to the LRA?",
      respuesta: "The tenant withholds it from the rent and pays it to the LRA by the 10th day of the following month.",
    },
    {
      pregunta: "Does a tenant pay real property tax?",
      respuesta: "No. The owner pays real property tax. A tenant only deals with the withholding on rental income.",
    },
    {
      pregunta: "Can I calculate the rent in Liberian dollars?",
      respuesta: "Yes. The rate is the same whatever the currency, so enter the amount and read the result in the same currency.",
    },
  ],
  glosario: [
    { termino: "Withholding on rental income", definicion: "Tax the tenant deducts from rent and pays to the LRA for the landlord." },
  ],
});
