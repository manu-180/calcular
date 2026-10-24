import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gh.bonus-tax",
  h1: "Bonus tax calculator Ghana",
  title: "Bonus tax Ghana: {{gh.bonus-rate}} up to {{gh.bonus-limit}} of basic",
  description: "Work out the tax on your bonus in Ghana: {{gh.bonus-rate}} on bonuses up to {{gh.bonus-limit}} of annual basic salary, the excess at graduated rates.",
  intro: [
    "Bonuses get a lower rate than salary, up to a limit. Above the limit, the extra is taxed like the rest of your income.",
  ],
  comoSeCalcula: [
    "Total bonuses in the year up to {{gh.bonus-limit}} of your annual basic salary are taxed at {{gh.bonus-rate}}.",
    "The excess is added to your employment income and taxed at the graduated rates.",
  ],
  ejemplo: ["With a basic salary of GH₵60,000 and a bonus of GH₵12,000, GH₵9,000 pays 5% and the other GH₵3,000 pays 25%: GH₵1,200 in total."],
  faq: [
    {
      pregunta: "How is a bonus taxed in Ghana?",
      respuesta: "Total bonus payments in a year are taxed at {{gh.bonus-rate}} up to {{gh.bonus-limit}} of the employee's annual basic salary. The excess is added to employment income and taxed at the graduated rates.",
    },
    {
      pregunta: "Is it different for non-residents?",
      respuesta: "Yes. For a non-resident employee, tax on bonus or overtime is 20%.",
    },
    {
      pregunta: "Is overtime treated like a bonus?",
      respuesta: "No. Overtime has its own rates and, unlike a bonus, is not added to basic salary.",
    },
  ],
  glosario: [{ termino: "Basic salary", definicion: "Salary before allowances and benefits." }],
});
