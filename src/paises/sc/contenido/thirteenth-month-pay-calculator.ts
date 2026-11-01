import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sc.thirteenth-month-pay-calculator",
  h1: "Seychelles 13th month pay calculator {{anio}}",
  title: "Seychelles 13th month pay {{anio}}: who gets it",
  description: "Seychellois workers with a basic salary up to {{sc.thirteenth-limit}} a month get a thirteenth month of pay. Work out your amount and the due date.",
  intro: [
    "Section 46C of the Employment Act makes every employer pay a thirteenth month on top of the monthly salary. It falls due on 31 December and must be paid on or before 31 January.",
    "It is not for everyone. Workers whose basic salary is above {{sc.thirteenth-limit}} a month and non-Seychellois workers are excluded.",
  ],
  comoSeCalcula: [
    "The amount is one month of basic salary, leaving out allowances and other money benefits.",
    "A worker who joined during the year, and is not on probation on 31 December, is paid in proportion to the months of service, probation included.",
    "The limit of {{sc.thirteenth-limit}} was set by S.I. 3 of 2017 and has applied since {{sc.thirteenth-limit#desde}}.",
  ],
  ejemplo: [
    "A Seychellois worker with a basic salary of SCR 25,000 who served all year receives SCR 25,000. A colleague who served six months of the year receives SCR 12,500.",
  ],
  faq: [
    {
      pregunta: "Was the thirteenth month linked to performance?",
      respuesta: "For 2022, and then 2023, 2024 and 2025, section 46D let employers pay half and tie the rest to a performance appraisal. This calculator shows the full month of section 46C, so check the Gazette for the year you are paying.",
    },
    {
      pregunta: "Is the payment taxed?",
      respuesta: "The Act treats the thirteenth month as an exempt emolument under the Income and Non-Monetary Benefits Tax Act, except that where a worker above the prescribed salary is paid one, the part above the prescribed salary is not exempt. Check with the SRC for your case.",
    },
    {
      pregunta: "Does it replace my bonus?",
      respuesta: "No. The entitlement is independent of any bonus. If your contract obliges the employer to pay a bonus larger than the thirteenth month, the employer may deduct the thirteenth month from it and pay the balance.",
    },
  ],
  glosario: [
    { termino: "Basic salary", definicion: "Your monthly pay without allowances or other money benefits." },
    { termino: "Pro rata", definicion: "A share of the full amount in proportion to the time worked." },
    { termino: "Prescribed salary", definicion: "The basic salary limit the Minister fixes for eligibility." },
  ],
});
