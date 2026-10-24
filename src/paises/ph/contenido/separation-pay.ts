import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ph.separation-pay",
  h1: "Separation pay calculator Philippines",
  title: "Separation pay calculator: redundancy, retrenchment, closure",
  description:
    "Separation pay under the Labor Code: one month per year for redundancy, half a month for retrenchment or closure, never less than one month.",
  intro: [
    "When your employment ends for an authorized cause, such as redundancy or retrenchment, the Labor Code gives you separation pay.",
    "Pick the reason, enter your monthly pay and your years of service.",
  ],
  comoSeCalcula: [
    "Redundancy or installation of labor-saving devices: {{ph.separation-pay[redundancy]}} of pay for every year of service, or one month of pay, whichever is higher.",
    "Retrenchment to prevent losses, or closure not due to serious business losses: {{ph.separation-pay[retrenchment]}} of pay for every year of service, or one month of pay, whichever is higher.",
    "A fraction of at least 6 months counts as one whole year.",
  ],
  ejemplo: ["After 5 years with ₱25,000 a month, redundancy gives ₱125,000 of separation pay. Retrenchment gives half a month per year, but never less than ₱25,000."],
  faq: [
    {
      pregunta: "How much is separation pay for redundancy?",
      respuesta: "At least one month of pay for every year of service, or one month of pay if that is higher.",
    },
    {
      pregunta: "How much is separation pay for retrenchment or closure?",
      respuesta: "At least half a month of pay for every year of service, or one month of pay if that is higher. Closures due to serious business losses are treated differently.",
    },
    {
      pregunta: "How much notice does the employer have to give?",
      respuesta: "A written notice to the workers and to the labor department at least one month before the intended date of termination.",
    },
  ],
  glosario: [
    { termino: "Authorized causes", definicion: "Reasons for ending employment listed in the Labor Code: labor-saving devices, redundancy, retrenchment to prevent losses and closure." },
    { termino: "Separation pay", definicion: "The amount the employer pays when it ends your employment for an authorized cause." },
  ],
});
