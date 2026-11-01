import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gm.sshfc-late-penalty",
  h1: "SSHFC late payment penalty calculator",
  title: "SSHFC late contribution penalty calculator",
  description: "Work out the SSHFC penalty for paying pension contributions late in The Gambia: {{gm.npf-late-penalty-rate}} of the unpaid amount for each month or part of a month.",
  intro: [
    "Employers must pay SSHFC contributions by the 15th day of the month after the salary was paid. Enter the amount and the dates to see the penalty for paying late.",
    "The SSHFC charges {{gm.npf-late-penalty-rate}} of the unpaid amount for each month or part of a month it stays unpaid.",
  ],
  comoSeCalcula: [
    "Months late: every started month after the due date counts as a full month.",
    "Penalty: unpaid contributions × {{gm.npf-late-penalty-rate}} × months late.",
  ],
  ejemplo: ["D15,000 of contributions due on 15 September 2026 and paid on 27 October 2026 are two months or part months late, so the penalty is D750."],
  faq: [
    {
      pregunta: "Does the penalty apply to the FPS too?",
      respuesta: "Yes. The SSHFC applies the same penalty to late contributions to the National Provident Fund and to the Federated Pension Scheme.",
    },
    {
      pregunta: "Is one day late already a month?",
      respuesta: "Yes. The penalty is for each month or part of a month, so paying one day late costs one month of penalty.",
    },
    {
      pregunta: "What has to go with the payment?",
      respuesta: "The NPF3 remittance schedule, with each employee's name, salary, social security number and contribution.",
    },
  ],
  glosario: [
    { termino: "Remittance", definicion: "The monthly payment of contributions by the employer to the SSHFC." },
    { termino: "NPF3 form", definicion: "The remittance schedule that lists the contributions paid for each employee." },
  ],
});
