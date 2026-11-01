import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us.hsa-contribution",
  h1: "HSA contribution calculator",
  title: "HSA Contribution Limit Calculator {{anio}}",
  description:
    "Find your {{anio}} health savings account limit: {{us.hsa-self-only}} for self-only coverage, {{us.hsa-family}} for family coverage, plus the catch-up at 55. Prorated by month.",
  intro: [
    "A health savings account lets you set aside pre-tax money for medical costs if you have a high deductible health plan.",
    "Enter your coverage, age and months of eligibility to see how much you can still put in this year.",
  ],
  comoSeCalcula: [
    "The 2026 limit is {{us.hsa-self-only}} with self-only coverage and {{us.hsa-family}} with family coverage.",
    "If you are 55 or older at the end of the year, you can add {{us.hsa-catch-up}}.",
    "If you weren't eligible all year, the limit is prorated by the months you had HDHP coverage on the first day of the month.",
    "Employer contributions count toward the same limit, so they are subtracted from what you can add.",
  ],
  ejemplo: ["With family coverage all year, age 56 and $1,000 from your employer, your limit is $9,750 and you can contribute $8,750 more."],
  faq: [
    {
      pregunta: "What are the HSA limits for 2026?",
      respuesta: "{{us.hsa-self-only}} for self-only coverage and {{us.hsa-family}} for family coverage. People 55 or older can add {{us.hsa-catch-up}}.",
    },
    {
      pregunta: "Can my spouse and I both make catch-up contributions?",
      respuesta: "Yes, if both of you are 55 or older, but each catch-up has to go into the account of the spouse who qualifies.",
    },
    {
      pregunta: "Can I keep contributing once I enroll in Medicare?",
      respuesta: "No. From the first month you are enrolled in Medicare, you can no longer contribute, though you can keep using the money in the account.",
    },
  ],
  glosario: [
    { termino: "HDHP", definicion: "A high deductible health plan that meets IRS minimum deductible and out-of-pocket rules." },
    { termino: "Last-month rule", definicion: "If you are eligible on December 1, you are treated as eligible for the whole year, with a testing period that follows." },
  ],
});
