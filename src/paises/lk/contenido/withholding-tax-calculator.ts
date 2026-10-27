import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lk.withholding-tax-calculator",
  h1: "Withholding tax calculator Sri Lanka",
  title: "Withholding tax Sri Lanka: interest, dividends and rent",
  description:
    "See the advance income tax withheld on interest ({{lk.wht-interest}}), dividends ({{lk.wht-dividend}}) and monthly rent above {{lk.wht-rent-limit}} ({{lk.wht-rent}}).",
  intro: [
    "Banks, companies and tenants have to withhold advance income tax from some payments and send it to the Inland Revenue Department. You get the rest.",
    "Choose the type of payment and enter the gross amount.",
  ],
  comoSeCalcula: [
    "Interest or discount: {{lk.wht-interest}} of the payment.",
    "Dividends: {{lk.wht-dividend}}.",
    "Rent paid to a resident: nothing if the monthly rent is up to {{lk.wht-rent-limit}}. Above that, {{lk.wht-rent}} of the full amount, not just the part over the limit.",
  ],
  ejemplo: ["A tenant paying Rs. 150,000 a month withholds Rs. 15,000 and pays the landlord Rs. 135,000."],
  faq: [
    {
      pregunta: "Is withholding tax the final tax?",
      respuesta: "No. It is advance income tax: a payment towards your income tax for the year of assessment, not a separate tax.",
    },
    {
      pregunta: "When did the rate on interest go up?",
      respuesta: "The Inland Revenue (Amendment) Act, No. 2 of 2025 raised it from 5% to {{lk.wht-interest}} from {{lk.wht-interest#desde}}.",
    },
    {
      pregunta: "Are senior citizens treated differently?",
      respuesta: "Yes. For interest paid to a senior citizen, the Act says tax is withheld at the rate and in the manner set by regulations, not at the general rate.",
    },
  ],
  glosario: [
    { termino: "Advance income tax", definicion: "Tax withheld at source on payments to residents, credited against their income tax." },
    { termino: "Withholdee", definicion: "The person who receives a payment from which tax is withheld." },
  ],
});
