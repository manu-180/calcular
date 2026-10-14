import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.oas-clawback",
  h1: "OAS clawback calculator (OAS recovery tax)",
  title: "OAS clawback calculator 2026: OAS recovery tax",
  description: "See how much Old Age Security you repay when your income is over {{ca.oas-recovery-threshold[2026]}} (2026). You repay {{ca.oas-recovery-rate}} of the income above the threshold.",
  intro: [
    "If your net world income is above the yearly threshold, you repay part or all of your Old Age Security pension through the OAS recovery tax, often called the OAS clawback.",
    "Enter your income year, your net world income and the OAS you received to see the recovery tax.",
  ],
  comoSeCalcula: [
    "Take your net world income for the year and subtract the minimum income recovery threshold: {{ca.oas-recovery-threshold[2024]}} for 2024, {{ca.oas-recovery-threshold[2025]}} for 2025 and {{ca.oas-recovery-threshold[2026]}} for 2026.",
    "The recovery tax is {{ca.oas-recovery-rate}} of the amount above the threshold.",
    "It cannot be more than the OAS pension you received.",
  ],
  ejemplo: [
    "With $110,000 of net world income in 2026 and $8,800 of OAS, you are $14,677 over the threshold. The recovery tax is $2,201.55, so you keep $6,598.45.",
  ],
  faq: [
    {
      pregunta: "When is the clawback taken?",
      respuesta: "It is based on your income for one year and recovered over a later July to June period. For 2026 income, the recovery period is July 2027 to June 2028.",
    },
    {
      pregunta: "At what income do I lose all of my OAS?",
      respuesta: "It depends on your age and on the OAS amounts for the year. For the July 2026 to June 2027 period, based on 2025 income, the full pension is recovered at about $152,062 if you are 65 to 74, and about $157,923 if you are 75 or older.",
    },
    {
      pregunta: "What is the recovery tax rate?",
      respuesta: "{{ca.oas-recovery-rate}} of your net world income above the threshold.",
    },
  ],
  glosario: [
    { termino: "OAS", definicion: "Old Age Security, a monthly pension for people 65 and older." },
    { termino: "Recovery tax", definicion: "The official name of the OAS clawback: part of the pension you repay when your income is high." },
  ],
});
