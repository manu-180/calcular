import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "om-en.pension-calculator",
  h1: "Oman pension calculator",
  title: "Estimate your pension under Oman's Social Protection Law",
  description:
    "Estimate your monthly pension from the Social Protection Fund: {{om.pension-accrual}} of average wage for each year of service, with early retirement reduction and the wage cap.",
  intro: [
    "The Social Protection Law works out the old age pension as a fixed share of average wage for each year of service.",
    "Enter your average wage, years of service and the age you want to retire to see the estimated pension and any early retirement reduction.",
  ],
  comoSeCalcula: [
    "Pension = {{om.pension-accrual}} × average wage × years of service, with the wage capped at {{om.spf-cap}}.",
    "Old age is {{om.old-age}}. Women can retire without reduction {{om.women-early-years}} earlier.",
    "Retiring before the no-reduction age cuts the pension by {{om.early-reduction[first5]}} for each of the first five years and {{om.early-reduction[beyond]}} for each year after that.",
  ],
  ejemplo: [
    "A man with an average wage of OMR 900 who served 30 years and retires at 60 gets an estimated OMR 540, which is 60% of his average wage.",
  ],
  faq: [
    {
      pregunta: "What is the retirement age in Oman?",
      respuesta: "Old age is {{om.old-age}}. Women can ask for early retirement without reduction {{om.women-early-years}} before that age.",
    },
    {
      pregunta: "When can I retire early?",
      respuesta: "Up to five years before the no-reduction age with at least 20 years of actual service, or after 30 years of actual service at any age, with the reduction applied.",
    },
    {
      pregunta: "Why might my real pension differ from the estimate?",
      respuesta: "Because the law revalues wages every year by average wage growth, works out service before 2024 on the revalued last salary, and may guarantee a cash minimum for people with service in the old scheme.",
    },
  ],
  glosario: [
    { termino: "Old age", definicion: "The age at which an insured person is entitled to the old age pension." },
    { termino: "Average future value of wages", definicion: "Average monthly wages after revaluing them by the wage growth factor up to the date of entitlement." },
  ],
});
