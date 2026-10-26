import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ug.terminal-benefits-calculator",
  h1: "Terminal benefits calculator Uganda",
  title: "Terminal benefits calculator Uganda: final dues",
  description: "Add up your final dues in Uganda: severance of {{ug.severance-months-per-year}} per year worked, pay in lieu of notice, unused leave and unpaid salary.",
  intro: [
    "When a job ends you may be owed several payments at once. This calculator adds them up.",
    "Enter your service, salary, why the job ended and any leave or salary still owed.",
  ],
  comoSeCalcula: [
    "Severance allowance: {{ug.severance-months-per-year}} of salary for each full year worked, after at least {{ug.severance-min-months}}, in the cases the Employment Act lists.",
    "Pay in lieu of notice, if the employer ended the job without letting you work the notice: from {{ug.notice-weeks-under-1y}} to {{ug.notice-months-10y}} of pay, by length of service.",
    "Leave not taken and days worked but not paid, at your daily rate.",
  ],
  ejemplo: ["After four years on Ushs 1,000,000, a redundant employee with 10 leave days and 5 unpaid days is owed about Ushs 5,692,307."],
  faq: [
    {
      pregunta: "Is NSSF part of my terminal benefits?",
      respuesta: "No. Your NSSF savings stay with the Fund. You claim them as an NSSF benefit, for example the withdrawal benefit at 50 after a year out of work.",
    },
    {
      pregunta: "When is severance not due?",
      respuesta: "After resignation, summary dismissal, retirement or the normal end of a contract, and when you have worked less than {{ug.severance-min-months}}.",
    },
    {
      pregunta: "Can I accept pay instead of working my notice?",
      respuesta: "Yes. The Act does not let a contract exclude notice, but you can accept payment in lieu of notice.",
    },
  ],
  glosario: [{ termino: "Terminal benefits", definicion: "Everything an employer owes when the job ends, also called final dues." }],
});
