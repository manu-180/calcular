import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ug.severance-pay-calculator",
  h1: "Severance pay calculator Uganda",
  title: "Severance pay calculator Uganda: 1 month per year",
  description: "Work out your severance allowance in Uganda: {{ug.severance-months-per-year}} of salary for each year worked, under the Employment (Amendment) Act, 2026.",
  intro: [
    "Since {{ug.severance-months-per-year#desde}}, the Employment Act sets severance allowance at one month's salary for each year worked.",
    "Enter your service, salary and the reason the job ended to see what you are owed.",
  ],
  comoSeCalcula: [
    "You need at least {{ug.severance-min-months}} of continuous service with the employer.",
    "The job must end in one of the situations in the Act: unfair dismissal, death in service, physical incapacity (whether you or the employer end the contract), or redundancy.",
    "The allowance is {{ug.severance-months-per-year}} of salary for each year worked.",
  ],
  ejemplo: ["After five years on Ushs 1,000,000 a month, an unfairly dismissed employee is owed Ushs 5,000,000."],
  faq: [
    {
      pregunta: "What changed in 2026?",
      respuesta: "The Employment (Amendment) Act, 2026 replaced section 88 with a fixed rule of one month's salary per year worked. It also added the cases where the employer ends the contract for physical incapacity or redundancy, and removed the death or insolvency of the employer from the list. It applies from {{ug.severance-months-per-year#desde}}.",
    },
    {
      pregunta: "Is severance paid after summary dismissal?",
      respuesta: "No. The Act rules out severance allowance where the employee is summarily dismissed.",
    },
    {
      pregunta: "Is severance the same as compensation for unfair dismissal?",
      respuesta: "No. A labour officer can also order extra compensation for unfair dismissal, between one and three months' wages, on top of other payments.",
    },
  ],
  glosario: [{ termino: "Severance allowance", definicion: "A payment owed when a job ends in the situations the Employment Act lists." }],
});
