import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gm.sshfc-contribution",
  h1: "SSHFC contribution calculator",
  title: "SSHFC contribution calculator: NPF, FPS and IICF",
  description: "Work out monthly SSHFC contributions in The Gambia: the National Provident Fund, the Federated Pension Scheme and the Industrial Injuries Compensation Fund.",
  intro: [
    "Enter the basic salary and fixed allowances to see what goes to the Social Security and Housing Finance Corporation each month.",
    "In the NPF the total is {{gm.npf-employee-rate}} from the employee and {{gm.npf-employer-rate}} from the employer, both on basic salary. In the FPS the employer pays {{gm.fps-rate}} of gross salary on its own.",
  ],
  comoSeCalcula: [
    "NPF: {{gm.npf-employee-rate}} of basic salary deducted from the employee, plus {{gm.npf-employer-rate}} of basic salary from the employer.",
    "FPS: {{gm.fps-rate}} of basic salary plus fixed allowances, all paid by the employer.",
    "Industrial Injuries Compensation Fund: {{gm.iicf-rate}} of basic salary plus fixed allowances, paid by the employer, up to {{gm.iicf-cap}} a month.",
  ],
  ejemplo: ["For a worker in the NPF on D10,000 basic and D2,000 allowances, the employee pays D500, the employer D1,000 and the injuries fund D15. The employer remits D1,515."],
  faq: [
    {
      pregunta: "When must contributions be paid?",
      respuesta: "The employer remits all contributions by the 15th day of the month after the salary was paid, with the NPF3 remittance schedule.",
    },
    {
      pregunta: "What happens if the employer pays late?",
      respuesta: "The SSHFC charges a penalty of 2.5% of the unpaid amount for each month or part of a month it remains unpaid.",
    },
    {
      pregunta: "Who is in the FPS and who is in the NPF?",
      respuesta: "The FPS covers public and quasi-government institutions, and private employers willing to pay the full contribution. Other private employers register their staff in the NPF. Civil servants have a separate government pension.",
    },
    {
      pregunta: "Who is not covered by the injuries fund?",
      respuesta: "The SSHFC lists casual workers on piece-meal contracts, domestic workers, family members living in the employer's house, out workers and the military.",
    },
  ],
  glosario: [
    { termino: "NPF", definicion: "National Provident Fund: a savings scheme where contributions build up in your own account with interest until you retire at 60." },
    { termino: "FPS", definicion: "Federated Pension Scheme: a pension based on your final salary and years of service." },
    { termino: "IICF", definicion: "Industrial Injuries Compensation Fund, which pays workers injured at work." },
  ],
});
