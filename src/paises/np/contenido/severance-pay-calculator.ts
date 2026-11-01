import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "np.severance-pay-calculator",
  h1: "Severance pay calculator Nepal {{anio}}",
  title: "Severance pay calculator Nepal {{anio}}: retrenchment pay",
  description: "Calculate the compensation owed when an employer reduces staff under the Labour Act, 2074: {{np.retrenchment-months-per-year}} of basic pay for each year of service.",
  intro: [
    "Nepal has no general severance formula for every dismissal. The Labour Act, 2074 sets compensation for one case: when an employer cuts the number of workers.",
    "Enter your basic pay and months of service to see the amount an employer must pay you in that case.",
  ],
  comoSeCalcula: [
    "Section 145 lets an employer reduce its workforce when the business has economic problems or has too many workers after a merger. It must first notify the union and the labour office.",
    "Each worker who has completed at least one year receives {{np.retrenchment-months-per-year}} of basic pay for every year of service, paid as a lump sum. A worker with less than a year is paid in proportion to the service.",
    "A worker entitled to the unemployment allowance under social security law does not also receive this compensation. The calculator does not include notice pay, gratuity, leave or festival allowance.",
  ],
  ejemplo: ["A worker with five years of service on basic pay of NPR 40,000 receives NPR 200,000. A worker with six months on NPR 30,000 receives NPR 15,000."],
  faq: [
    {
      pregunta: "Is severance pay compulsory when I am dismissed in Nepal?",
      respuesta: "The Labour Act, 2074 sets a lump sum for retrenchment under section 145. Other dismissals depend on the reason and on the notice, gratuity and benefits the Act requires.",
    },
    {
      pregunta: "Which workers are cut first?",
      respuesta: "The Act's order is foreign workers, then those with the heaviest misconduct record, then weaker performers, then the most recently hired in the same kind of work.",
    },
    {
      pregunta: "Do I still get notice and gratuity?",
      respuesta: "Yes. Notice under section 144 and the gratuity built up under section 53 are separate from the retrenchment compensation.",
    },
  ],
  glosario: [
    { termino: "Retrenchment", definicion: "A reduction in the number of workers because of economic problems or overstaffing." },
    { termino: "Basic pay", definicion: "The fixed pay before allowances, on which the compensation is worked out." },
  ],
});
