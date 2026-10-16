import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hk.hibor-mortgage-calculator",
  h1: "HIBOR mortgage calculator",
  title: "HIBOR mortgage calculator Hong Kong (H plan)",
  description:
    "Work out the monthly repayment on a HIBOR-based mortgage in Hong Kong with the latest one-month HIBOR fixing from the HKMA, your margin and your cap rate.",
  intro: [
    "With a HIBOR-based mortgage (often called an H plan), the rate is one-month HIBOR plus a margin, and the offer may set a cap rate.",
    "Enter your loan, term, margin and cap to see the rate you'd pay today and the monthly repayment.",
  ],
  comoSeCalcula: [
    "Take the latest one-month HIBOR fixing published by the HKMA: {{hk.hibor-1m}} on {{hk.hibor-1m#desde}}.",
    "Add your margin. If the result is above your cap rate, the cap applies instead.",
    "The monthly repayment comes from the standard formula for a loan repaid in equal monthly instalments.",
  ],
  ejemplo: ["A $4 million loan over 30 years with a 1.3% margin and a 3.5% cap: when HIBOR plus the margin is above 3.5%, you pay 3.5%, about $17,962 a month."],
  faq: [
    {
      pregunta: "What is one-month HIBOR today?",
      respuesta: "The latest fixing in this calculator is {{hk.hibor-1m}}, for {{hk.hibor-1m#desde}}, from the HKMA's daily monetary statistics.",
    },
    {
      pregunta: "Why does my payment change?",
      respuesta: "Because HIBOR moves every business day. When HIBOR plus your margin is below the cap, your rate follows it.",
    },
    {
      pregunta: "Where do I find my margin and cap?",
      respuesta: "In your mortgage offer from the bank.",
    },
  ],
  glosario: [
    { termino: "HIBOR", definicion: "Hong Kong Interbank Offered Rate, the rate at which banks lend to each other in Hong Kong dollars." },
    { termino: "Cap rate", definicion: "The highest rate your HIBOR mortgage can charge, set in your loan offer." },
  ],
});
