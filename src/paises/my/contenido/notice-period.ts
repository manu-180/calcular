import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "my.notice-period",
  h1: "Notice period calculator Malaysia",
  title: "Notice period Malaysia: minimum notice and pay in lieu",
  description: "Find the minimum notice of termination under section 12 of the Employment Act (4, 6 or 8 weeks) and estimate the pay in lieu of notice.",
  intro: [
    "When your contract says nothing in writing about notice, the Employment Act sets a minimum that depends on how long you have worked.",
    "The same notice applies to both sides: the employer and the employee.",
  ],
  comoSeCalcula: [
    "Less than 2 years: {{my.notice-weeks[under-2]}} weeks.",
    "2 to less than 5 years: {{my.notice-weeks[2-to-5]}} weeks.",
    "5 years or more: {{my.notice-weeks[5-plus]}} weeks.",
    "Pay in lieu of notice is the wages you would have earned during the notice. Here weekly wages are estimated as monthly wages × 12 ÷ 52.",
  ],
  ejemplo: ["After 3 years on RM2,600 a month, the minimum notice is 6 weeks and the pay in lieu is about RM3,600."],
  faq: [
    {
      pregunta: "Does the notice in my contract apply instead?",
      respuesta: "Yes. If your contract sets a notice period in writing, that period applies. The Act's minimum only applies when there is no written provision.",
    },
    {
      pregunta: "Can I leave without serving notice?",
      respuesta:
        "Yes, by paying the other side an indemnity equal to the wages for the notice period (or what is left of it). Either side can also waive the right to notice.",
    },
    {
      pregunta: "Can either side end the contract without notice?",
      respuesta: "Yes, in the event of a wilful breach of a condition of the contract by the other party.",
    },
  ],
  glosario: [
    { termino: "Pay in lieu of notice", definicion: "Wages paid instead of working out the notice period." },
    { termino: "Indemnity", definicion: "The sum one party pays the other to end the contract without the full notice." },
  ],
});
