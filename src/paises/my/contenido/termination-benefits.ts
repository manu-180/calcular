import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "my.termination-benefits",
  h1: "Termination benefits calculator Malaysia",
  title: "Termination benefits calculator: retrenchment pay",
  description: "Work out the minimum termination or lay-off benefit under the Employment (Termination and Lay-Off Benefits) Regulations 1980 with the JTKSM formula.",
  intro: [
    "If your employer ends your contract, for example in a retrenchment, the law sets a minimum termination benefit based on your wages and years of service.",
    "Enter your average monthly wages for the last 12 months and how long you have worked to see the minimum amount.",
  ],
  comoSeCalcula: [
    "Less than 2 years of service: {{my.termination-benefit-days[under-2]}} days' wages for every year.",
    "2 to less than 5 years: {{my.termination-benefit-days[2-to-5]}} days. 5 years or more: {{my.termination-benefit-days[5-plus]}} days.",
    "An incomplete year counts pro rata, to the nearest month.",
    "One day's wages follows the JTKSM formula: your monthly wages × 12 ÷ 365.",
  ],
  ejemplo: ["On RM3,000 a month after 3 years: 36,000 ÷ 365 = RM98.63 a day × 15 days × 3 years = RM4,438.35."],
  faq: [
    {
      pregunta: "When must the termination benefit be paid?",
      respuesta: "According to JTKSM, no later than 7 days after the termination date.",
    },
    {
      pregunta: "Can my contract pay less than this?",
      respuesta: "No. Your contract can set a higher rate, but not one below the minimum in the 1980 Regulations.",
    },
    {
      pregunta: "Is it on top of pay in lieu of notice?",
      respuesta: "Yes. The termination benefit is in addition to any indemnity in lieu of notice under section 13 of the Employment Act.",
    },
  ],
  glosario: [
    { termino: "Retrenchment", definicion: "Termination because the employer has less or no work for the employee." },
    { termino: "Lay-off", definicion: "When the employer does not provide work for a set number of days in a period, as defined in the 1980 Regulations." },
  ],
});
