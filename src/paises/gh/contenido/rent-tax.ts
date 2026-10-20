import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gh.rent-tax",
  h1: "Rent tax calculator Ghana",
  title: "Rent tax calculator Ghana: {{gh.rent-tax[residential]}} residential",
  description: "Work out rent income tax in Ghana: {{gh.rent-tax[residential]}} on residential premises and {{gh.rent-tax[commercial]}} on commercial and non-residential premises.",
  intro: [
    "If you let or lease a property, the rent you receive is taxed. The rate depends on whether the premises are residential or commercial.",
    "The tax must be paid within 30 days after the rent is received.",
  ],
  comoSeCalcula: [
    "Residential premises: {{gh.rent-tax[residential]}} of the rent received.",
    "Commercial and non-residential premises: {{gh.rent-tax[commercial]}} of the rent received.",
  ],
  ejemplo: ["On GH₵2,000 of residential rent, the tax is GH₵160."],
  faq: [
    {
      pregunta: "Who pays rent income tax?",
      respuesta: "Anybody who receives income from letting or leasing a property, and agents who qualify to withhold the tax.",
    },
    {
      pregunta: "When is rent tax due?",
      respuesta: "Within 30 days after the rent income is received.",
    },
    {
      pregunta: "What if I pay late?",
      respuesta: "Late payment attracts interest of 125% of the statutory rate, compounded monthly.",
    },
  ],
  glosario: [{ termino: "Rent income", definicion: "The amount received from letting or leasing a property to another person." }],
});
