import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.notice-period-calculator",
  h1: "Notice period calculator Rwanda",
  title: "Notice period in Rwanda: how many days you must give",
  description: "Minimum notice under the Rwandan labour law: {{rw.notice-days-short}} under one year of service and {{rw.notice-days-long}} after one year, with the salary it covers.",
  intro: [
    "Ending an employment contract of indefinite duration needs notice. Enter how long you have worked and see the legal minimum and the salary it covers.",
  ],
  comoSeCalcula: [
    "Less than one year with the employer: at least {{rw.notice-days-short}}.",
    "More than one year: at least {{rw.notice-days-long}}.",
    "When the employer gives notice, the employee may take one day off a week to look for a new job.",
    "The salary for the notice period is shown as monthly salary divided by 30, times the days of notice.",
  ],
  ejemplo: ["After two years on RWF 300,000 a month, the employer must give at least 30 days' notice. You may take four days off in that time to look for work."],
  faq: [
    {
      pregunta: "What if the notice is not given?",
      respuesta: "The side that ends the contract without notice, or without the full notice, must pay the other side compensation for it.",
    },
    {
      pregunta: "Can I be given notice while on leave?",
      respuesta: "No. The employer cannot terminate the contract while you are on leave or while your contract is suspended.",
    },
    {
      pregunta: "Is there notice during probation?",
      respuesta: "No. The law does not allow notice to be given during the probation period.",
    },
    {
      pregunta: "What about gross misconduct?",
      respuesta: "The employer can end the contract without notice for gross misconduct, but must tell you in writing within 48 hours, with the reasons.",
    },
  ],
  glosario: [
    { termino: "Notice period", definicion: "The time between saying the contract will end and the last day of work." },
    { termino: "Probation", definicion: "The trial period at the start of a job." },
  ],
});
