import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gh.employer-cost",
  h1: "Employer cost calculator Ghana",
  title: "Cost of an employee in Ghana: salary plus SSNIT",
  description: "See what a worker costs an employer in Ghana each month: basic salary, allowances and the {{gh.ssnit-employer-rate}} employer SSNIT contribution.",
  intro: [
    "Besides the salary, employers in Ghana add {{gh.ssnit-employer-rate}} of each worker's basic salary to SSNIT every month.",
    "Enter the pay to see the monthly and yearly cost for one worker or a team.",
  ],
  comoSeCalcula: [
    "Employer SSNIT: {{gh.ssnit-employer-rate}} of basic salary.",
    "Monthly cost: basic salary plus allowances plus employer SSNIT.",
  ],
  ejemplo: ["A basic salary of GH₵5,000 with GH₵1,000 of allowances costs the employer GH₵6,650 a month."],
  faq: [
    {
      pregunta: "How much SSNIT does an employer pay?",
      respuesta: "{{gh.ssnit-employer-rate}} of each worker's basic salary, on top of the salary.",
    },
    {
      pregunta: "Is SSNIT charged on allowances?",
      respuesta: "No. The SSNIT rates apply to the basic salary.",
    },
    {
      pregunta: "Who pays the worker's 5.5%?",
      respuesta: "The worker. The employer deducts it from the salary and pays it together with its own contribution.",
    },
  ],
  glosario: [{ termino: "Basic salary", definicion: "The salary before allowances and benefits. SSNIT is computed on it." }],
});
