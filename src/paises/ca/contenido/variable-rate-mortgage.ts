import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.variable-rate-mortgage",
  h1: "Variable rate mortgage calculator (prime rate)",
  title: "Variable rate mortgage calculator with today's prime",
  description: "See your monthly payment on a variable rate mortgage at today's prime rate, and how it changes if rates move by a quarter point.",
  intro: [
    "Enter your mortgage amount, amortization and your discount or premium to prime to see the monthly payment at today's rates.",
    "Prime comes from the Bank of Canada's weekly series of the chartered bank prime rate, next to the Bank of Canada's policy rate.",
  ],
  comoSeCalcula: [
    "Your rate is prime plus your spread. A spread of minus 0.5 means prime minus half a point.",
    "The monthly payment is a standard fixed payment over the full amortization at that rate, with the rate divided by 12 each month.",
    "The quarter point lines show how the payment would change if your rate went up or down by 0.25 points.",
  ],
  ejemplo: [
    "With prime at 4.45%, a $500,000 mortgage at prime minus 0.5 (3.95%) over 25 years costs $2,625.40 a month. A 0.25 point rise adds $69.31.",
  ],
  faq: [
    {
      pregunta: "What is the prime rate?",
      respuesta: "The rate chartered banks use as a base for variable rate loans and lines of credit. This calculator uses the Bank of Canada's weekly prime rate series.",
    },
    {
      pregunta: "What is the Bank of Canada policy rate?",
      respuesta: "The target for the overnight rate set by the Bank of Canada. It is shown next to prime so you can compare them.",
    },
    {
      pregunta: "Is my real payment the same?",
      respuesta: "It can differ. Your lender sets its own prime and payment rules, so check your mortgage agreement.",
    },
  ],
  glosario: [
    { termino: "Amortization", definicion: "The total number of years it would take to pay off the mortgage at the current payment." },
    { termino: "Spread to prime", definicion: "The discount or premium your lender applies to its prime rate." },
  ],
});
