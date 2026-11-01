import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sc.severance-pay-calculator",
  h1: "Seychelles severance pay calculator {{anio}}",
  title: "Seychelles severance pay {{anio}}: compensation for service",
  description: "The Employment Act pays {{sc.compensation-days-per-month}} of a day's wage for each completed month when a job ends through no fault of yours. Work out your compensation.",
  intro: [
    "In the Employment Act the payment is called compensation, and it is due when a worker is made redundant or the contract ends for a reason that is not the worker's fault.",
    "Workers who resign or retire after at least {{sc.resignation-compensation-years}} years of continuous service are paid on the same scale.",
  ],
  comoSeCalcula: [
    "Work out one day's wage, which is the monthly wage divided by the number of paid days in a month.",
    "Multiply it by {{sc.compensation-days-per-month}} for each completed month of service.",
    "On a fixed-term contract the rate is doubled (multiplier {{sc.compensation-fixed-term-multiplier}}). The wage includes any responsibility allowance or duty allowance.",
  ],
  ejemplo: [
    "A worker earning SCR 22,000 a month is made redundant after 60 completed months. One day's wage is SCR 1,000 using 22 paid days. Compensation is 1,000 × 5/6 × 60, which is SCR 50,000, the same as 50 days of wages.",
  ],
  faq: [
    {
      pregunta: "Who decides the amount?",
      respuesta: "The competent officer decides after the negotiation procedure. If the cause is partly or wholly attributable to the worker, the officer may award a lower rate or none.",
    },
    {
      pregunta: "Does service with a previous employer count?",
      respuesta: "It does when the new employer continues the service without a termination by the previous employer (section 47(3)).",
    },
    {
      pregunta: "Is interest due if the payment is late?",
      respuesta: "Yes. Section 63A says interest at the rate the Minister prescribes runs from the day the compensation becomes payable until it is paid.",
    },
  ],
  glosario: [
    { termino: "Redundancy", definicion: "A job that ends because the employer closes, restructures, or brings in new technology." },
    { termino: "Negotiation procedure", definicion: "The step an employer must start with the competent officer before ending a contract." },
    { termino: "Compensation", definicion: "The payment for length of service set by section 47(2) of the Employment Act." },
  ],
});
