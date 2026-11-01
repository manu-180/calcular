import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "et.notice-period-calculator",
  h1: "Notice period calculator Ethiopia",
  title: "Notice period in Ethiopia: how much notice is due",
  description:
    "Find the notice an employer must give under Article 35 of the Labour Proclamation: from {{et.notice-first-year}} up to {{et.notice-over-nine}} depending on service.",
  intro: [
    "An employer who ends a contract of indefinite duration has to give written notice. How long depends on the worker's years of service. Enter the service to see the notice due.",
  ],
  comoSeCalcula: [
    "Service of up to one year, after probation: {{et.notice-first-year}}.",
    "More than one and up to nine years: {{et.notice-up-to-nine}}. More than nine years: {{et.notice-over-nine}}.",
    "A reduction of workforce always needs {{et.notice-redundancy}}.",
    "Probation can last up to {{et.probation-days}}, counted in working days. During probation the employer can end the contract without notice if the worker proves unfit, and the worker can leave without notice.",
  ],
  ejemplo: [
    "A worker with three years of service is owed two months of notice.",
  ],
  faq: [
    {
      pregunta: "When does the notice period start?",
      respuesta: "From the first working day after the day notice is properly given.",
    },
    {
      pregunta: "Do I keep working during the notice period?",
      respuesta: "Yes. The rights and duties of both sides under the contract stay in force until the notice ends.",
    },
    {
      pregunta: "Does this apply to fixed term contracts?",
      respuesta: "No. For a contract for a definite period or piece work, the notice is the one the parties agreed.",
    },
  ],
  glosario: [
    { termino: "Notice", definicion: "Written warning, given in advance, that the contract will end." },
    { termino: "Probation", definicion: "A trial period agreed in writing at the start of employment." },
  ],
});
