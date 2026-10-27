import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ls.final-pay",
  h1: "Final pay calculator for Lesotho",
  title: "Final pay calculator Lesotho: notice, severance, leave",
  description: "Add up what you are owed when a job ends in Lesotho: pay in lieu of notice, severance pay of {{ls.severance-weeks}} a year and untaken leave.",
  intro: [
    "When your job ends, several payments can be due at once. Enter your wage, length of service and untaken leave to see the total before tax.",
    "Each part follows the Labour Act, 2024: notice in section 130, severance in section 136 and leave pay in section 188.",
  ],
  comoSeCalcula: [
    "Pay in lieu of notice: {{ls.notice-weeks[under-6-months]}} under six months, {{ls.notice-weeks[6-to-12-months]}} up to a year, {{ls.notice-months}} after that. Only if the notice is not worked.",
    "Severance pay: {{ls.severance-weeks}} of wages for each completed year, once you have more than a year, unless you were fairly dismissed for misconduct.",
    "Untaken leave: one day's full pay for each day earned and not taken, if you worked at least {{ls.leave-pay-minimum-months}}.",
    "Add any wages still owed for days you worked.",
  ],
  ejemplo: [
    "After 40 months on M6 000 a month, with notice paid and 5 leave days untaken: M6 000 notice, M8 307.72 severance and M1 384.60 leave pay, M15 692.32 in total.",
  ],
  faq: [
    {
      pregunta: "Is final pay taxed?",
      respuesta: "Yes. Leave pay and severance pay are employment income under section 18(1) of the Income Tax Act, so PAYE is deducted.",
    },
    {
      pregunta: "Can I ask for a certificate of service?",
      respuesta: "Yes, if you worked for the employer for more than a month. It shows the parties, the period of service and the type of work.",
    },
    {
      pregunta: "What happens to these payments if the worker dies?",
      respuesta: "The employer pays the wages and other amounts due to the Labour Commissioner, who distributes them under the Act.",
    },
  ],
  glosario: [
    { termino: "Final pay", definicion: "Everything the employer owes when the contract ends." },
    { termino: "Accrued rights", definicion: "Amounts already earned at the date the contract ends. Ending the contract does not cancel them." },
  ],
});
