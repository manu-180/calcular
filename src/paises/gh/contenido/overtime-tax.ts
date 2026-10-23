import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gh.overtime-tax",
  h1: "Overtime tax calculator Ghana",
  title: "Overtime tax Ghana: {{gh.overtime-tax[up-to-half]}} and {{gh.overtime-tax[above-half]}}",
  description: "Work out the tax on overtime for junior staff in Ghana: {{gh.overtime-tax[up-to-half]}} up to half of monthly basic salary and {{gh.overtime-tax[above-half]}} on the rest.",
  intro: [
    "Overtime paid to qualifying junior staff is taxed at special low rates instead of the PAYE bands.",
    "Enter your monthly basic salary and the overtime you were paid.",
  ],
  comoSeCalcula: [
    "Overtime up to {{gh.overtime-half-limit}} of your monthly basic salary: {{gh.overtime-tax[up-to-half]}}.",
    "Overtime above that: {{gh.overtime-tax[above-half]}} on the excess.",
  ],
  ejemplo: ["With a basic salary of GH₵2,000 and GH₵1,500 of overtime, the tax is GH₵100."],
  faq: [
    {
      pregunta: "Who qualifies for the overtime rates?",
      respuesta: "Junior staff whose qualifying employment income, including profits and gains taxed in the year, is not more than {{gh.overtime-income-limit}}.",
    },
    {
      pregunta: "Is overtime added to basic salary?",
      respuesta: "No. Unlike a bonus, overtime is not added to basic salary.",
    },
    {
      pregunta: "What about non-resident employees?",
      respuesta: "For a non-resident employee, tax on bonus or overtime is 20%.",
    },
  ],
  glosario: [{ termino: "Junior staff", definicion: "The staff category entitled to overtime pay under these rules." }],
});
