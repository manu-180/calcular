import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "qa.domestic-worker-gratuity",
  h1: "Domestic worker gratuity calculator for Qatar",
  title: "Domestic worker gratuity in Qatar: end of service pay",
  description:
    "Work out the end-of-service gratuity for a housemaid, driver or nanny in Qatar: at least {{qa.domestic-worker[gratuity-weeks]}} of wage per year of service.",
  intro: [
    "Drivers, nannies, cooks, gardeners and other domestic workers in Qatar have their own law, separate from the Labour Law.",
    "It gives them an end-of-service gratuity after a year of work. Enter the wage and the years to see the minimum amount.",
  ],
  comoSeCalcula: [
    "The gratuity is at least {{qa.domestic-worker[gratuity-weeks]}} of wage for each year of service. Part of a year counts in proportion.",
    "It's due after one full year of service, counted from the date the domestic workers law came into force.",
    "The law doesn't say how to turn a monthly wage into a weekly one, so choose the method agreed with the employer.",
  ],
  ejemplo: ["A domestic worker paid QAR 1,800 a month for 4 years is owed at least 12 weeks of wage: QAR 5,040 with the ÷ 30 × 7 method."],
  faq: [
    {
      pregunta: "How much annual leave do domestic workers get?",
      respuesta: "{{qa.domestic-worker[leave-weeks]}} of paid leave for each calendar year, which they can split and plan unless agreed otherwise.",
    },
    {
      pregunta: "How many hours can a domestic worker work?",
      respuesta: "Up to {{qa.domestic-worker-hours}} a day unless agreed otherwise, with breaks for worship, rest and meals that don't count as working time.",
    },
    {
      pregunta: "Is there a weekly day off?",
      respuesta: "Yes. At least 24 hours in a row of paid weekly rest, on a day agreed in the contract.",
    },
    {
      pregunta: "Does the minimum wage apply to domestic workers?",
      respuesta: "Yes. The minimum basic wage is {{qa.minimum-wage[basic]}} a month, plus housing and food or allowances for them.",
    },
  ],
  glosario: [{ termino: "Domestic worker", definicion: "Someone who does household work under the employer's direction, such as a driver, nanny, cook or gardener." }],
});
