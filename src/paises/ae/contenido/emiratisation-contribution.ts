import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ae.emiratisation-contribution",
  h1: "Emiratisation contribution calculator",
  title: "Emiratisation penalty calculator UAE {{anio}}",
  description:
    "Work out the Emiratisation contribution for missing your target: {{ae.emiratisation-contribution}} for each Emirati not hired, charged from {{ae.emiratisation-contribution#desde}}.",
  intro: [
    "Private companies covered by the Emiratisation targets must employ a share of UAE nationals. Those that fall short pay a financial contribution.",
    "Enter your target and how many Emiratis you employ to see the contribution.",
  ],
  comoSeCalcula: [
    "Count the Emiratis missing against your target.",
    "Multiply by the yearly contribution for each one: {{ae.emiratisation-contribution}}.",
  ],
  ejemplo: ["A company that should have employed two Emiratis in 2025 and hired none paid AED 216,000 in January 2026."],
  faq: [
    {
      pregunta: "Which companies have Emiratisation targets?",
      respuesta: "Companies with 50 or more employees, for skilled jobs, and companies with 20 to 49 employees in selected economic activities.",
    },
    {
      pregunta: "How has the contribution changed?",
      respuesta: "It started at AED 6,000 a month for each missing Emirati in 2023 and rose by AED 1,000 a year until 2026. It was AED 96,000 a year in January 2025 and AED 108,000 in January 2026.",
    },
    {
      pregunta: "Is fake Emiratisation penalised?",
      respuesta: "Yes. Fake hiring and other ways to dodge the targets lead to separate administrative penalties.",
    },
  ],
  glosario: [
    { termino: "Emiratisation", definicion: "The employment of UAE citizens in the private sector." },
    { termino: "Nafis", definicion: "The Emirati Talent Competitiveness Council, which runs the national Emiratisation programmes." },
  ],
});
