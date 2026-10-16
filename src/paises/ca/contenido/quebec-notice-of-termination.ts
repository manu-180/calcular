import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.quebec-notice-of-termination",
  h1: "Quebec notice of termination calculator",
  title: "Quebec notice of termination: weeks by service",
  description: "See the written notice an employer has to give in Quebec before ending a job, based on continuous service, and the pay in lieu of notice.",
  intro: [
    "Enter your months of continuous service and your usual weekly wage to see the minimum notice and what your employer owes if it does not give it.",
    "It follows section 82 of Quebec's Act respecting labour standards. Group terminations and some jobs have other rules.",
  ],
  comoSeCalcula: [
    "From 3 months to less than a year of continuous service the notice is {{ca.qc-notice[3]}}; from 1 to 5 years, {{ca.qc-notice[12]}}; from 5 to 10 years, {{ca.qc-notice[60]}}; from 10 years, {{ca.qc-notice[120]}}.",
    "If the employer does not give the notice, it pays your usual wage for those weeks instead.",
  ],
  faq: [
    {
      pregunta: "How much notice do I get after 10 years?",
      respuesta: "{{ca.qc-notice[120]}}.",
    },
    {
      pregunta: "What if my employer gives no notice?",
      respuesta: "It has to pay your usual wage for the weeks of notice it did not give.",
    },
    {
      pregunta: "Does this cover jobs under the Canada Labour Code?",
      respuesta: "No. It follows Quebec's Act respecting labour standards. For federally regulated jobs, use the termination pay calculator for Canada.",
    },
  ],
  glosario: [
    { termino: "Notice of termination", definicion: "The written warning an employer gives before ending a job." },
    { termino: "Pay in lieu of notice", definicion: "The usual wage for the weeks of notice the employer did not give." },
  ],
});
