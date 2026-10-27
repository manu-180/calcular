import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mt.probation-period",
  h1: "Probation period calculator Malta",
  title: "Probation period Malta: how long it can last",
  description:
    "Work out the probation period in Malta for an indefinite or fixed-term job: {{mt.probation-months[standard]}} months as a rule, {{mt.probation-months[managerial]}} for senior posts on twice the minimum wage.",
  intro: [
    "Most employment in Malta starts with a probationary period, during which either side can end it without giving a reason.",
    "Pick the type of contract and fill in the details. You get the longest probation the law allows.",
  ],
  comoSeCalcula: [
    "On a contract for an indefinite time, probation is {{mt.probation-months[standard]}} months.",
    "Technical, executive, administrative or managerial posts paid at least twice the national minimum wage can have {{mt.probation-months[managerial]}} months.",
    "On a fixed-term contract, probation is one third of a contract shorter than six months, two months for every six months of a contract from six to fifteen months, and {{mt.probation-months[standard]}} months for a longer contract.",
  ],
  ejemplo: ["A fixed-term contract of twelve months can have a probation of four months."],
  faq: [
    {
      pregunta: "Do I need notice to end the job during probation?",
      respuesta: "After one month of continuous service, a week's notice has to be given by either side.",
    },
    {
      pregunta: "Can I be dismissed while my probation is suspended?",
      respuesta: "No. Probation is suspended during two weeks or more of approved leave and extended by the same time, and dismissal during that suspension is unlawful.",
    },
    {
      pregunta: "Can the probation be shorter?",
      respuesta: "Yes. You and your employer can agree a shorter probation than the law allows.",
    },
  ],
  glosario: [
    { termino: "Probationary period", definicion: "The first part of a job, when either side can end it without giving a reason." },
    { termino: "National minimum wage", definicion: "The lowest weekly wage an employer can pay a whole-time employee aged 18 or over." },
  ],
});
