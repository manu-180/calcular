import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sc.sick-leave-calculator",
  h1: "Seychelles sick leave calculator {{anio}}",
  title: "Seychelles sick leave {{anio}}: {{sc.sick-paid-days}} paid days",
  description: "A worker in Seychelles has {{sc.sick-paid-days}} days of paid sick leave in 12 months, then {{sc.sick-unpaid-days}} unpaid days. See how your days are covered.",
  intro: [
    "The Conditions of Employment Regulations give a worker on a regular contract {{sc.sick-paid-days}} days of paid sick leave in any period of 12 months. After those days run out, up to {{sc.sick-unpaid-days}} days of unpaid sick leave follow.",
    "Parents can also take up to {{sc.sick-child-days}} days to care for a sick child under 12, on top of their own allowance.",
  ],
  comoSeCalcula: [
    "Enter the days you need and the paid days you already used in the last 12 months.",
    "If the reason is a sick child, the first {{sc.sick-child-days}} days come from the child allowance.",
    "Remaining days are paid until the {{sc.sick-paid-days}} day allowance is used up, then unpaid up to {{sc.sick-unpaid-days}} days. The calculator shows what is left uncovered.",
  ],
  ejemplo: [
    "You have used 10 paid days and need 15 more. Eleven days are still paid. The other 4 days are unpaid sick leave. Nothing is left in your paid allowance afterwards.",
  ],
  faq: [
    {
      pregunta: "What proof does my employer need?",
      respuesta: "A medical certificate of unfitness for work. For a sick child the doctor or an official authorised by the Minister of Health must recommend that you attend the child.",
    },
    {
      pregunta: "Does everyone get the same sick leave?",
      respuesta: "No. The rule covers workers other than casual or part-time workers. A part-time worker gets paid sick days in proportion to the days worked in a week against 5 days.",
    },
    {
      pregunta: "What happens if I stay ill after the unpaid days?",
      respuesta: "If a doctor certifies that you will not recover and be fit for work, the contract is deemed frustrated. The same applies if you fail to report after the full period of unpaid sick leave for reasons of sickness.",
    },
  ],
  glosario: [
    { termino: "Paid sick leave", definicion: "Days off for illness for which your employer keeps paying your wage." },
    { termino: "Unpaid sick leave", definicion: "Days off for illness after the paid days run out, for which no wage is due." },
    { termino: "Frustrated contract", definicion: "A contract that ends because the worker can no longer do the job through illness." },
  ],
});
