import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.sick-leave-calculator",
  h1: "Sick leave calculator Rwanda",
  title: "Sick leave in Rwanda: paid and unpaid months",
  description: "Paid sick leave under the labour law: up to {{rw.sick-short-days}} short-term, then up to {{rw.sick-long-months}} with {{rw.sick-full-pay-months}} on full salary.",
  intro: [
    "The labour law has two kinds of sick leave. Short-term leave covers up to {{rw.sick-short-days}}; anything longer needs a medical committee. See how many months are paid.",
  ],
  comoSeCalcula: [
    "Short-term sick leave: up to {{rw.sick-short-days}}, paid, with a certificate from a recognised doctor.",
    "Long-term sick leave: up to {{rw.sick-long-months}} when a committee of three recognised doctors confirms it.",
    "The first {{rw.sick-full-pay-months}} are on full salary. The next three months are an unpaid suspension of the contract.",
  ],
  ejemplo: ["Four months off on RWF 300,000 a month: three months on full salary (RWF 900,000) and one month unpaid."],
  faq: [
    {
      pregunta: "What happens after six months?",
      respuesta: "If you are still sick three months after the unpaid suspension, the employer can end the contract under the labour law.",
    },
    {
      pregunta: "Do I get terminal benefits then?",
      respuesta: "Yes. A contract ended after six months because you cannot resume work gives the right to terminal benefits.",
    },
    {
      pregunta: "Does sick leave cut my annual leave?",
      respuesta: "No. When annual leave coincides with another leave, the annual leave is suspended and resumes afterwards.",
    },
  ],
  glosario: [
    { termino: "Medical committee", definicion: "Three recognised doctors who confirm a sickness longer than 15 days." },
    { termino: "Suspension", definicion: "A pause in the contract: no work and no salary, but the job is kept." },
  ],
});
