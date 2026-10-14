import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ie.rent-tax-credit",
  h1: "Rent Tax Credit calculator",
  title: "Rent Tax Credit calculator: up to {{ie.rent-tax-credit[single]}} a year",
  description: "See how much Rent Tax Credit you can claim: {{ie.rent-tax-credit-rate}} of the rent you pay, up to {{ie.rent-tax-credit[single]}}, or {{ie.rent-tax-credit[couple]}} for a jointly assessed couple.",
  intro: [
    "If you rent your home, you may be able to claim the Rent Tax Credit from Revenue. It reduces the Income Tax you pay.",
    "Enter the rent you paid in the year to see your credit. Add your Income Tax if you want to check whether it limits the credit.",
  ],
  comoSeCalcula: [
    "Take {{ie.rent-tax-credit-rate}} of the rent you paid in the tax year.",
    "The credit is capped at {{ie.rent-tax-credit[single]}} for a single person, or {{ie.rent-tax-credit[couple]}} for a jointly assessed couple.",
    "It can never be more than the Income Tax you pay for the year, after your other credits.",
  ],
  ejemplo: ["Jane paid €1,500 a month in rent, €18,000 in the year. 20% is €3,600, so she gets the maximum of €1,000."],
  faq: [
    {
      pregunta: "Which years can I claim for?",
      respuesta: "The current amounts apply from 2024 to 2028. For 2022 and 2023 the maximum was €500, or €1,000 for a jointly assessed couple.",
    },
    {
      pregunta: "Does it reduce USC or PRSI?",
      respuesta: "No. It only reduces Income Tax. If your Income Tax is lower than the credit, you cannot use all of it.",
    },
    {
      pregunta: "What counts as rent?",
      respuesta: "The rent itself. Amounts you pay for extra services such as utilities, board or laundry do not count.",
    },
  ],
  glosario: [
    { termino: "Jointly assessed couple", definicion: "A married couple or civil partners taxed together under joint assessment." },
    { termino: "Tax credit", definicion: "An amount taken off the tax you owe, not off your income." },
  ],
});
