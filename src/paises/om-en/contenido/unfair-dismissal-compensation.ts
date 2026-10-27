import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "om-en.unfair-dismissal-compensation",
  h1: "Oman unfair dismissal compensation calculator",
  title: "Unfair dismissal compensation under Oman Labour Law",
  description:
    "Work out unfair dismissal compensation in Oman under article 11 of the Labour Law: between {{om.unfair-dismissal[min]}} and {{om.unfair-dismissal[max]}} of the last total wage.",
  intro: [
    "If a court finds that a dismissal was arbitrary or against the law, it orders the worker back to work or orders the employer to pay compensation.",
    "Enter the last total wage and the number of months you expect to see the compensation and its lower and upper limits.",
  ],
  comoSeCalcula: [
    "Compensation is at least {{om.unfair-dismissal[min]}} of wages and at most {{om.unfair-dismissal[max]}}, based on the last total wage.",
    "The court sets the number taking into account the worker's situation and length of service.",
    "The end-of-service gratuity, notice pay and insurance contributions up to the final ruling are added on top.",
  ],
  ejemplo: [
    "For a worker whose last total wage was OMR 600, compensation is between OMR 1,800 and OMR 7,200, and OMR 3,600 if the court sets six months.",
  ],
  faq: [
    {
      pregunta: "When is a dismissal unfair?",
      respuesta: "Article 12 of the Labour Law lists reasons that make a dismissal arbitrary, and the court can find that a dismissal was arbitrary or against the law.",
    },
    {
      pregunta: "How long do I have to complain?",
      respuesta: "A dismissed worker can complain to the competent authority within 30 days of being told of the decision.",
    },
    {
      pregunta: "Is the compensation all I am owed?",
      respuesta: "No. The end-of-service gratuity and other benefits, the total wage for the notice period and insurance contributions from the dismissal to the final ruling are added.",
    },
  ],
  glosario: [
    { termino: "Unfair dismissal", definicion: "An employer ending the contract without a legitimate reason or against the law." },
  ],
});
