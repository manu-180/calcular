import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bb.unemployment-benefit-calculator",
  h1: "Barbados NIS unemployment benefit calculator {{anio}}",
  title: "Unemployment benefit calculator {{anio}}: NIS pays {{bb.unemployment-benefit-rate}}",
  description:
    "Estimate your NIS unemployment benefit in Barbados: {{bb.unemployment-benefit-rate}} of average insurable weekly earnings for up to {{bb.unemployment-max-weeks}}, earnings capped at {{bb.nis-ceiling-weekly}}.",
  intro: [
    "A worker in Barbados who loses a job and has paid enough NIS contributions can claim unemployment benefit. NISSS pays {{bb.unemployment-benefit-rate}} of average insurable weekly earnings, for a maximum of {{bb.unemployment-max-weeks}} weeks.",
    "Enter your average insurable weekly earnings and how many weeks you expect to be without work. You will see the weekly amount and the total you can expect if the claim is approved.",
  ],
  comoSeCalcula: [
    "Insurable earnings: average weekly earnings, limited to the NIS weekly ceiling of {{bb.nis-ceiling-weekly}}.",
    "Weekly benefit: {{bb.unemployment-benefit-rate}} of those earnings.",
    "Weeks counted: your expected weeks, up to {{bb.unemployment-max-weeks}}.",
    "Total: weekly benefit multiplied by the weeks counted. Contribution and job search conditions are decided by NISSS and are not part of the calculation.",
  ],
  ejemplo: [
    "A hotel waiter averaged Bds$1,000 a week in insurable earnings and expects to be out of work for 20 weeks. His weekly benefit is 60% of Bds$1,000, or Bds$600.00, so the total is Bds$12,000.00. Someone earning Bds$1,500 a week is treated as earning the ceiling of Bds$1,238, so the weekly benefit is Bds$742.80, and 26 weeks pay Bds$19,312.80.",
  ],
  faq: [
    {
      pregunta: "How much is unemployment benefit in Barbados?",
      respuesta: "The NISSS Unemployment Benefit page gives {{bb.unemployment-benefit-rate}} of the insured person's average insurable weekly earnings.",
    },
    {
      pregunta: "How long can I get unemployment benefit?",
      respuesta: "The same page sets a maximum of {{bb.unemployment-max-weeks}} weeks.",
    },
    {
      pregunta: "Who pays for unemployment benefit?",
      respuesta: "It comes out of the NIS contributions you and your employer pay. The employee rate of 11% includes an unemployment element, according to the NISSS contribution table.",
    },
  ],
  glosario: [
    { termino: "Unemployment benefit", definicion: "A weekly NIS payment for an insured worker who has lost a job and is looking for work." },
    { termino: "Insurable earnings", definicion: "Pay up to the NIS ceiling, on which contributions and benefits are based." },
    { termino: "NISSS", definicion: "The National Insurance and Social Security Service, which pays the benefit." },
  ],
});
