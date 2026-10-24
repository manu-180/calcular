import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ae.eibor-mortgage-calculator",
  h1: "EIBOR mortgage calculator",
  title: "EIBOR mortgage calculator UAE: variable rate",
  description:
    "Work out the monthly repayment on a variable-rate mortgage in the UAE with the latest 3-month EIBOR from the Central Bank and your margin.",
  intro: [
    "A variable-rate mortgage can be priced as EIBOR plus a margin. EIBOR is the benchmark rate for lending between banks in dirhams.",
    "Enter your loan, term and margin to see the rate today and the monthly repayment.",
  ],
  comoSeCalcula: [
    "Take the latest 3-month EIBOR published by the Central Bank of the UAE: {{ae.eibor-3m}} on {{ae.eibor-3m#desde}}.",
    "Add your margin to get the mortgage rate.",
    "The repayment comes from the standard formula for a loan repaid in equal monthly instalments.",
  ],
  ejemplo: ["A AED 1.5 million loan over 25 years at EIBOR plus 1.5% costs about AED 9,396 a month when EIBOR is 4.205%."],
  faq: [
    {
      pregunta: "What is EIBOR?",
      respuesta: "The Emirates Interbank Offered Rate, the benchmark rate for lending between banks in the UAE in dirhams. It's also the reference for loans such as mortgages.",
    },
    {
      pregunta: "What is 3-month EIBOR today?",
      respuesta: "The latest fixing loaded here is {{ae.eibor-3m}}, for {{ae.eibor-3m#desde}}.",
    },
    {
      pregunta: "Where do I find my margin?",
      respuesta: "In your mortgage offer from the bank.",
    },
  ],
  glosario: [
    { termino: "EIBOR", definicion: "Emirates Interbank Offered Rate." },
    { termino: "Margin", definicion: "The fixed amount your bank adds to EIBOR." },
  ],
});
