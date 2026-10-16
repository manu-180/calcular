import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sg.hdb-loan",
  h1: "HDB loan calculator",
  title: "HDB loan calculator: monthly instalment at {{sg.hdb-tasa-concesional}}",
  description: "Work out the monthly instalment and total interest on an HDB housing loan at the concessionary rate of {{sg.hdb-tasa-concesional}} a year.",
  intro: [
    "An HDB housing loan charges the HDB concessionary interest rate, which is set at 0.1% above the CPF Ordinary Account rate.",
    "Enter the loan amount and tenure to see your monthly instalment, the interest you pay over the loan and the total repaid.",
  ],
  comoSeCalcula: [
    "The rate used is the HDB concessionary rate of {{sg.hdb-tasa-concesional}} a year, set for the quarter that started on {{sg.hdb-tasa-concesional#desde}}.",
    "The yearly rate is divided by 12 and applied to the balance every month.",
    "The instalment is the same each month and repays the loan by the end of the tenure.",
  ],
  ejemplo: ["A $400,000 HDB loan over 25 years at 2.6% costs $1,814.68 a month, with $144,404 of interest over the loan."],
  faq: [
    {
      pregunta: "How is the HDB loan rate set?",
      respuesta: "It is pegged at 0.1% above the CPF Ordinary Account interest rate, which is reviewed every quarter.",
    },
    {
      pregunta: "What is the HDB loan rate now?",
      respuesta: "It is {{sg.hdb-tasa-concesional}} a year, while the CPF Ordinary Account rate stays at its 2.5% floor.",
    },
    {
      pregunta: "How does this compare with a bank loan?",
      respuesta: "Bank loans use their own rates, often pegged to SORA, and must pass the MAS debt servicing limits. Try the TDSR calculator to see how much a bank could lend you.",
    },
  ],
  glosario: [
    { termino: "Concessionary interest rate", definicion: "The interest rate HDB charges on its housing loans." },
    { termino: "Tenure", definicion: "How many years you take to repay the loan." },
  ],
});
