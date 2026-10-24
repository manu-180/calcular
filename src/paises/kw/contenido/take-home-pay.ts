import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kw.take-home-pay",
  h1: "Take-home pay calculator Kuwait",
  title: "Take-home pay Kuwait: net salary after PIFSS",
  description: "See your net monthly salary in Kuwait after PIFSS social security contributions for Kuwaiti nationals in the private sector.",
  intro: [
    "Enter your gross monthly salary to see what reaches your account after PIFSS contributions.",
    "The contributions follow the PIFSS Taminat guide for insured Kuwaitis in the private sector.",
  ],
  comoSeCalcula: [
    "Your share of the PIFSS funds is worked out on your salary: Basic Insurance ({{kw.pifss-basic-employee-rate}}), Supplementary Insurance above {{kw.pifss-basic-max}}, Pension Increase ({{kw.pifss-increase-employee-rate}}), Remuneration ({{kw.pifss-remuneration-rate}}) and Unemployment Insurance ({{kw.pifss-unemployment-rate}}).",
    "Your take-home pay is the gross salary less those contributions.",
    "For non-Kuwaiti employees the calculator does not apply PIFSS contributions.",
  ],
  ejemplo: ["On KD 1,200 a month with 5 years of contributions, PIFSS takes KD 126 and your take-home pay is KD 1,074."],
  faq: [
    {
      pregunta: "Why does my deduction drop after 18 years?",
      respuesta: "The Remuneration Fund contribution of {{kw.pifss-remuneration-rate}} stops once your contribution period reaches {{kw.pifss-remuneration-years}} years.",
    },
    {
      pregunta: "Does my salary above KD 2,750 pay contributions?",
      respuesta: "No. The basic salary counts up to {{kw.pifss-basic-max}} and the supplementary salary up to {{kw.pifss-supplementary-max}} more, so pay above {{kw.pifss-increase-max}} adds nothing.",
    },
    {
      pregunta: "Are other deductions included?",
      respuesta: "No. Loans, absences or other deductions in your contract are not part of this calculation.",
    },
  ],
  glosario: [
    { termino: "Gross salary", definicion: "Your salary before any deduction." },
    { termino: "PIFSS", definicion: "The Public Institution for Social Security (Taminat)." },
  ],
});
