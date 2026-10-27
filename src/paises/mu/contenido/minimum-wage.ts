import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mu.minimum-wage",
  h1: "Minimum wage in Mauritius {{anio}}",
  title: "Minimum wage Mauritius {{anio}}: {{mu.minimum-wage}} a month",
  description:
    "The national minimum wage in Mauritius is {{mu.minimum-wage}} a month for a full-time worker since {{mu.minimum-wage#desde}}. Check your pay and the hourly rate.",
  intro: [
    "The national minimum wage is {{mu.minimum-wage}} a month for a full-time worker. It applies from {{mu.minimum-wage#desde}}.",
    "Enter your monthly wage to see if it meets the minimum and how much is missing.",
  ],
  comoSeCalcula: [
    "The amount comes from the National Minimum Wage Regulations 2017, as amended in January 2026.",
    "The hourly figure divides the monthly minimum by {{mu.hours-per-month}} hours, the month the Workers' Rights Act uses for a basic hourly rate.",
  ],
  ejemplo: ["A full-time worker paid Rs 17,000 a month is Rs 745 short of the minimum."],
  faq: [
    {
      pregunta: "How much was it before?",
      respuesta: "Rs 17,110 a month during 2025. The 2026 regulations raised it by Rs 635.",
    },
    {
      pregunta: "Does it apply to part-time workers?",
      respuesta: "The monthly amount is for workers other than part-time workers. A part-time worker's minimum is worked out with the formulas in the Schedule to the regulations, so this calculator covers full-time work only.",
    },
    {
      pregunta: "Can my employer cut my wage down to the minimum?",
      respuesta: "No. The regulations say they do not allow an employer to reduce a wage to the national minimum wage, and any agreement to give up the minimum is void.",
    },
  ],
  glosario: [{ termino: "National minimum wage", definicion: "The lowest monthly wage the law allows for a full-time worker in Mauritius." }],
});
