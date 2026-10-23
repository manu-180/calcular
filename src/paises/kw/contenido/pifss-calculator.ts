import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kw.pifss-calculator",
  h1: "PIFSS contribution calculator Kuwait",
  title: "PIFSS calculator: social security contributions in Kuwait",
  description: "Work out the PIFSS contributions of a Kuwaiti private sector employee and the employer, fund by fund, with the ceilings in the official Taminat guide.",
  intro: [
    "Enter your monthly salary to see what PIFSS (Taminat) deducts from your pay and what your employer pays on top, split by fund.",
    "It follows the contribution rates and salary ceilings in the Taminat guide published by the Public Institution for Social Security.",
  ],
  comoSeCalcula: [
    "Basic Insurance Fund: {{kw.pifss-basic-employee-rate}} from you and {{kw.pifss-basic-employer-rate}} from the employer, on a salary between {{kw.pifss-basic-min}} and {{kw.pifss-basic-max}}.",
    "Supplementary Insurance Fund: the part of your salary above {{kw.pifss-basic-max}}, up to {{kw.pifss-supplementary-max}} more. You pay {{kw.pifss-supplementary-employee-rate}} and the employer {{kw.pifss-supplementary-employer-rate}}.",
    "Pension Increase Fund: {{kw.pifss-increase-employee-rate}} from you and {{kw.pifss-increase-employer-rate}} from the employer, on up to {{kw.pifss-increase-max}}.",
    "Remuneration Fund: {{kw.pifss-remuneration-rate}} of your basic contribution salary, which stops once you reach {{kw.pifss-remuneration-years}} years of contributions.",
    "Unemployment Insurance Fund: {{kw.pifss-unemployment-rate}} of your basic and supplementary salary.",
  ],
  ejemplo: ["On KD 1,000 a month with 5 years of contributions, you pay KD 105 and your employer KD 110."],
  faq: [
    {
      pregunta: "What is the maximum salary for PIFSS contributions?",
      respuesta: "The basic contribution salary goes up to {{kw.pifss-basic-max}}, and the supplementary salary adds up to {{kw.pifss-supplementary-max}} more. The Pension Increase Fund applies on up to {{kw.pifss-increase-max}}.",
    },
    {
      pregunta: "What if my salary is very low?",
      respuesta: "In the private sector, if the wage is below {{kw.pifss-basic-min}} a month, contributions are worked out on {{kw.pifss-basic-min}}.",
    },
    {
      pregunta: "What is the Unemployment Insurance Fund?",
      respuesta: "A fund for insured people in the private and oil sectors only. It helps cover living costs for up to six months after resignation or termination.",
    },
  ],
  glosario: [
    { termino: "PIFSS / Taminat", definicion: "The Public Institution for Social Security, which runs pensions and social insurance for Kuwaitis." },
    { termino: "Basic contribution salary", definicion: "The salary on which the Basic Insurance Fund contribution is worked out." },
  ],
});
