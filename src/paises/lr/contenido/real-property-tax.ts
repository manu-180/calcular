import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lr.real-property-tax",
  h1: "Real property tax calculator Liberia",
  title: "Liberia real property tax calculator",
  description: "Work out the yearly real property tax on a house, shop, warehouse or farm in Liberia from its market value and the LRA rates.",
  intro: [
    "Enter the market value of your land and buildings and the type of property to see the real property tax you owe each year.",
    "A home pays {{lr.real-property-rates[residential]}} of its value a year. A building used for business pays {{lr.real-property-rates[commercial]}}.",
  ],
  comoSeCalcula: [
    "Real property tax: declared market value × the rate for the type of property.",
    "Owner-occupied homes not rented for income: {{lr.real-property-rates[residential]}}.",
    "Offices, shops, warehouses and other commercial or industrial buildings: {{lr.real-property-rates[commercial]}}.",
    "Farmland within urban areas: {{lr.real-property-rates[farm-urban]}}. Farms outside urban areas: {{lr.real-property-rates[farm-rural]}}.",
    "Buildings on public land: {{lr.real-property-rates[public-commercial]}} if commercial, {{lr.real-property-rates[public-residential]}} if residential.",
  ],
  ejemplo: ["A home worth US$10,000 pays US$25 a year. Paying two years at once costs US$50."],
  faq: [
    {
      pregunta: "When is real property tax due?",
      respuesta: "Between 1 January and 1 July of the year it is levied. After that the LRA adds penalty and interest under Section 2002 of the Revenue Code.",
    },
    {
      pregunta: "I rent my home. Do I pay real property tax?",
      respuesta: "No. The owner pays it. As a tenant, the tax on rent is a withholding on rental income.",
    },
    {
      pregunta: "How do I value my property?",
      respuesta: "Use a value from an LRA-approved assessor or make your own estimate of market value, valuing land and buildings separately. High-end commercial properties over 2,000 square feet need a valuation by an approved architectural or engineering firm.",
    },
    {
      pregunta: "Is vacant land included?",
      respuesta: "Vacant land has its own rates, and the LRA page gives two different figures for city lots, so this calculator leaves it out. Check the rate with the LRA.",
    },
  ],
  glosario: [
    { termino: "Real property", definicion: "Land and buildings and other fixed improvements to the land." },
    { termino: "TIN", definicion: "Taxpayer Identification Number, needed to pay the tax." },
  ],
});
