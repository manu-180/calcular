import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mu.salary-compensation-calculator",
  h1: "Salary compensation 2026 calculator",
  title: "Salary compensation 2026 Mauritius: {{mu.salary-compensation}} a month",
  description:
    "Check the 2026 salary compensation in Mauritius: {{mu.salary-compensation}} a month for basic wages up to {{mu.salary-compensation-ceiling}}, and {{mu.salary-compensation-part-time-rate}} for some part-time workers.",
  intro: [
    "Every year the government sets an additional remuneration that employers add to the basic wage from January. People call it the salary compensation.",
    "For 2026 it is {{mu.salary-compensation}} a month for a full-time worker earning up to {{mu.salary-compensation-ceiling}}.",
  ],
  comoSeCalcula: [
    "Full-time worker with a basic wage up to {{mu.salary-compensation-ceiling}}: {{mu.salary-compensation}} a month.",
    "Part-time worker below {{mu.salary-compensation-part-time-threshold}}: {{mu.salary-compensation-part-time-rate}} of the basic wage, rounded up to the next rupee.",
    "Part-time worker from {{mu.salary-compensation-part-time-threshold}} to {{mu.salary-compensation-ceiling}}: {{mu.salary-compensation}} a month.",
  ],
  ejemplo: ["A full-time worker on Rs 25,000 gets Rs 635 more, so the basic wage becomes Rs 25,635."],
  faq: [
    {
      pregunta: "From when is it paid?",
      respuesta: "From 1 January 2026. The regulations were made on 12 January 2026 and apply back to that date.",
    },
    {
      pregunta: "Is it part of my basic wage?",
      respuesta: "Yes. The salary compensation is added to the basic wage, so CSG and NSF are also worked out on it.",
    },
    {
      pregunta: "Who is left out?",
      respuesta: "Public officers and workers of statutory bodies who follow the Pay Research Bureau report, and workers whose basic wage is above {{mu.salary-compensation-ceiling}}.",
    },
  ],
  glosario: [{ termino: "Additional remuneration", definicion: "The legal name of the yearly salary compensation, set under section 33 of the Workers' Rights Act 2019." }],
});
