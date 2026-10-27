import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "qa.pension-calculator",
  h1: "GRSIA pension calculator for Qataris",
  title: "GRSIA pension calculator: retirement in Qatar",
  description:
    "Estimate your GRSIA retirement pension under the Social Insurance Law: 1/30 of your pension salary for each year, less {{qa.pension-reduction}} a year for early exits.",
  intro: [
    "Qatari employees insured with GRSIA earn a monthly pension based on their salary and years of contributions.",
    "Enter your pension salary, your years and your age when you stop working to estimate the pension.",
  ],
  comoSeCalcula: [
    "The pension is 1/30 of the pension salary for each year of contributions, and it can't go over the pension salary. With {{qa.pension-ages[full-years]}} you reach the full amount.",
    "You need at least {{qa.pension-ages[min-years]}} of contributions, including {{qa.pension-ages[min-actual-years]}} of actual service. Retirement age is at least {{qa.pension-ages[retirement-age]}}.",
    "After resigning, the pension drops {{qa.pension-reduction}} for each year between your age and {{qa.pension-ages[reference-men]}} for men or {{qa.pension-ages[reference-women]}} for women. It isn't paid before {{qa.pension-ages[min-age-resignation]}}.",
  ],
  ejemplo: ["A man who resigns at 52 with 27 years and a pension salary of QAR 30,000 gets QAR 27,000 less 20%, so QAR 21,600 a month."],
  faq: [
    {
      pregunta: "What is the pension salary in the private sector?",
      respuesta: "The average contribution salary of your last three years, capped at 130% of the salary in the first of those years.",
    },
    {
      pregunta: "What if I don't qualify for a pension?",
      respuesta: "You can ask for a lump-sum compensation if you contributed for more than a year. With less than a year, your own contributions are refunded.",
    },
    {
      pregunta: "Is there a bonus for long careers?",
      respuesta: "Yes. If your actual service goes over 30 years, you get a bonus for the extra period under the rules in the regulations.",
    },
  ],
  glosario: [
    { termino: "Pension salary", definicion: "The salary GRSIA uses to work out your pension." },
    { termino: "Lump-sum compensation", definicion: "A one-off payment when you leave without meeting the pension conditions." },
  ],
});
