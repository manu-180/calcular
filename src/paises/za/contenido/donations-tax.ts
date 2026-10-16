import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "za.donations-tax",
  h1: "Donations tax calculator",
  title: "Donations tax calculator South Africa 2026/27",
  description: "Work out donations tax: the first {{za.donations-exemption}} a year is exempt for individuals, then 20% up to R30 million cumulative and 25% above.",
  intro: [
    "Enter what you donated this tax year and your taxable donations from earlier years. You get the donations tax and how much of the exemption you used.",
    "It applies to the value of the property you donate, added up since 1 March 2018.",
  ],
  comoSeCalcula: [
    "The first {{za.donations-exemption}} you donate in a tax year is exempt.",
    "The rest is added to your taxable donations since 1 March 2018.",
    "The tax is 20% while that cumulative total is up to R30 million, and 25% on the part above.",
  ],
  ejemplo: ["A donation of R500 000 uses the {{za.donations-exemption}} exemption and pays 20% on R350 000, so R70 000."],
  faq: [
    {
      pregunta: "Are donations to my spouse taxed?",
      respuesta: "No. Donations between spouses are exempt when the spouse receiving it is a tax resident.",
    },
    {
      pregunta: "Are donations to charities taxed?",
      respuesta: "Donations to certain public benefit organisations are exempt from donations tax, and some of them are also deductible from your income.",
    },
    {
      pregunta: "Does the exemption carry over if I do not use it?",
      respuesta: "The {{za.donations-exemption}} applies per tax year. This calculator uses it against the donations of the current year only.",
    },
  ],
  glosario: [
    { termino: "Donation", definicion: "A gift of money or other property." },
    { termino: "Cumulative donations", definicion: "All your taxable donations added up since 1 March 2018, which decide when the 25% rate starts." },
  ],
});
