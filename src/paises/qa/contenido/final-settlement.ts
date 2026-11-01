import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "qa.final-settlement",
  h1: "Final settlement calculator for Qatar",
  title: "Final settlement in Qatar: gratuity, leave and notice",
  description:
    "Add up your final settlement in Qatar: end-of-service gratuity of {{qa.gratuity-weeks}} per year, unused annual leave and notice pay under the Labour Law.",
  intro: [
    "When a job ends in Qatar, the final settlement brings together everything the employer still owes you.",
    "It usually includes the end-of-service gratuity, pay for leave you didn't take, any salary still due and, if notice wasn't given, pay in lieu of notice.",
  ],
  comoSeCalcula: [
    "The gratuity is at least {{qa.gratuity-weeks}} of the last basic salary for each year of service, from {{qa.gratuity-min-service}} of service.",
    "Unused leave is paid in cash at your basic salary.",
    "Notice is {{qa.notice[first-years]}} in the first two years and {{qa.notice[later-years]}} after that. Whoever skips it pays the other side the basic salary for that period.",
  ],
  ejemplo: [
    "After 4 years on a basic salary of QAR 9,000, with 1.5 weeks of leave left and full notice worked, the settlement is QAR 28,350 with the ÷ 30 × 7 method.",
  ],
  faq: [
    {
      pregunta: "What can make me lose my gratuity?",
      respuesta: "Being dismissed for one of the reasons listed in Article 61, such as fake documents, revealing business secrets or more than seven days of unexcused absence in a row.",
    },
    {
      pregunta: "Who pays my flight home?",
      respuesta: "The employer must return you at its own cost to the place it recruited you from, or to another place you agreed.",
    },
    {
      pregunta: "Can the employer keep part of my settlement?",
      respuesta: "It can deduct amounts you owe it from the gratuity. If you left without notice, it can also claim the basic salary for the notice period.",
    },
  ],
  glosario: [
    { termino: "Final settlement", definicion: "Everything paid to a worker when the employment contract ends." },
  ],
});
