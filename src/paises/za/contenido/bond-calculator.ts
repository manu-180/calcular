import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "za.bond-calculator",
  h1: "Bond calculator",
  title: "Bond calculator: home loan repayments at prime",
  description: "Work out your monthly home loan repayment at today's prime lending rate, plus the transfer duty on the price.",
  intro: [
    "Enter the price, your deposit and the term of the bond. You get the monthly repayment at prime, or at the rate your bank offers you above or below prime.",
    "The prime lending rate comes from the South African Reserve Bank and updates on its own when it changes.",
  ],
  comoSeCalcula: [
    "The bond amount is the price less your deposit.",
    "Your rate is prime plus or minus the margin your bank gives you.",
    "The repayment is the fixed monthly amount that pays off the bond and its interest over the term, if the rate does not change.",
    "Transfer duty is worked out on the full price with the SARS table.",
  ],
  ejemplo: ["On a R1 800 000 home with a 10% deposit, a 20-year bond at a prime rate of 10.75% costs about R16 447 a month."],
  faq: [
    {
      pregunta: "What is the prime lending rate?",
      respuesta: "It is the benchmark rate at which private banks lend to the public.",
    },
    {
      pregunta: "How does a repo rate change affect my bond?",
      respuesta: "Prime has moved on the same day and by the same amount as the repo rate: in 2026 both rose by 0.25 points in May and again in September. The results show what a 0.25-point rise in prime adds to your repayment.",
    },
    {
      pregunta: "Does this include bond costs and insurance?",
      respuesta: "No. It shows the repayment on the loan and the transfer duty. Bank fees, legal fees and insurance are extra.",
    },
  ],
  glosario: [
    { termino: "Bond", definicion: "The South African name for a home loan secured by the property." },
    { termino: "Prime", definicion: "The benchmark lending rate of the banks. The calculator shows today's rate in the results." },
  ],
});
