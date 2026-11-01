import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.wrongful-dismissal-compensation-calculator",
  h1: "Wrongful dismissal compensation calculator Bhutan",
  title: "Wrongful dismissal compensation in Bhutan: months of pay",
  description: "See the most a Bhutanese court may order for wrongful dismissal: {{bt.wrongful-dismissal-months-per-year}} of pay per year, capped at {{bt.wrongful-dismissal-max-months}}.",
  intro: [
    "If a court finds that you were dismissed in a way or for a reason the law does not allow, it can order the employer to pay you compensation. The ceiling is {{bt.wrongful-dismissal-max-months}} of pay.",
    "Bhutanese law has no automatic severance table. This page shows the court remedy in section 94(b) of the Labour and Employment Act of Bhutan 2007, which is the nearest thing to a set sum for a dismissal that breaks the Act.",
  ],
  comoSeCalcula: [
    "Count your complete years of continuous employment with the same employer.",
    "Multiply them by {{bt.wrongful-dismissal-months-per-year}} of pay for each year.",
    "Cap the result at {{bt.wrongful-dismissal-max-months}} of pay.",
    "Multiply the months by your monthly pay. The court may also order reinstatement, with your consent and the employer's, and it may order costs.",
  ],
  ejemplo: [
    "You worked 8 complete years and earned Nu. 25,000 a month. Eight years would give 8 months, but the cap is 6, so the most a court may order is 6 × 25,000, or Nu. 150,000.",
  ],
  faq: [
    {
      pregunta: "Who decides wrongful dismissal compensation in Bhutan?",
      respuesta: "A court. Section 93 lets the employee start the dispute resolution procedure in Chapter XII, and section 94 lists what the court may order if proceedings reach it under sections 204 and 205.",
    },
    {
      pregunta: "What is the maximum compensation?",
      respuesta: "Section 94(b) allows one month of pay for each year of continuous employment, up to {{bt.wrongful-dismissal-max-months}} of pay.",
    },
    {
      pregunta: "Who must prove the dismissal was valid?",
      respuesta: "The employer. Section 95 puts the burden of proving a valid reason for the termination on the employer.",
    },
    {
      pregunta: "When must unpaid wages be settled?",
      respuesta: "Within {{bt.final-pay-days}} of the contract ending (section 127). A late payment is fined at the Daily Minimum National Wage Rate for up to 90 days.",
    },
  ],
  glosario: [
    { termino: "Wrongful dismissal", definicion: "An ending of the contract that breaks section 92, for instance a dismissal for an unlawful reason listed in section 85." },
    { termino: "Reinstatement", definicion: "A court order that gives the employee the same or an equivalent job back." },
  ],
});
