import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "qa.minimum-wage",
  h1: "Minimum wage checker for Qatar",
  title: "Minimum wage in Qatar: basic, housing and food",
  description:
    "Check your pay against Qatar's minimum wage: {{qa.minimum-wage[basic]}} basic, plus {{qa.minimum-wage[housing]}} for housing and {{qa.minimum-wage[food]}} for food if not provided.",
  intro: [
    "Qatar's minimum wage has three parts: the basic wage, food and suitable housing.",
    "If your employer doesn't provide housing or food, it has to pay a minimum allowance for each. Enter your pay to check it.",
  ],
  comoSeCalcula: [
    "The minimum basic wage is {{qa.minimum-wage[basic]}} a month.",
    "Without suitable housing, the employer adds at least {{qa.minimum-wage[housing]}} a month. Without food, at least {{qa.minimum-wage[food]}}.",
    "Each part is checked on its own, so a higher allowance doesn't make up for a basic wage under the minimum.",
  ],
  ejemplo: ["A worker with no housing or food provided must get at least QAR 1,800 a month: QAR 1,000 basic, QAR 500 for housing and QAR 300 for food."],
  faq: [
    {
      pregunta: "Who does the minimum wage cover?",
      respuesta: "Workers under the Labour Law and domestic workers. It's worked out on normal working hours.",
    },
    {
      pregunta: "Since when does the minimum wage apply?",
      respuesta: "Since {{qa.minimum-wage#desde}}, six months after the ministerial decision was published.",
    },
    {
      pregunta: "Can my contract pay less if I agreed to it?",
      respuesta: "No. Employers had to raise any pay below the minimum, and an agreement for higher pay always stands.",
    },
  ],
  glosario: [{ termino: "Basic wage", definicion: "The fixed monthly pay before any allowance." }],
});
