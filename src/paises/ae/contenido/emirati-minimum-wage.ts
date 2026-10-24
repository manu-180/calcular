import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ae.emirati-minimum-wage",
  h1: "Minimum wage for Emiratis in the private sector",
  title: "Emirati minimum wage UAE 2026: {{ae.emirati-minimum-wage}}",
  description:
    "MoHRE set the minimum monthly wage for Emiratis in the private sector at {{ae.emirati-minimum-wage}} from {{ae.emirati-minimum-wage#desde}}. Check a wage against it.",
  intro: [
    "From {{ae.emirati-minimum-wage#desde}}, Emiratis working in the UAE private sector must earn at least {{ae.emirati-minimum-wage}} a month.",
    "Enter the monthly wage to see whether it meets the minimum.",
  ],
  comoSeCalcula: ["Compare the monthly wage with {{ae.emirati-minimum-wage}}. Any difference is the monthly shortfall."],
  ejemplo: ["A wage of AED 5,500 is AED 500 a month below the minimum."],
  faq: [
    {
      pregunta: "Does this minimum apply to all workers?",
      respuesta: "This minimum was set for Emiratis working in the private sector.",
    },
    {
      pregunta: "How must the wage be paid?",
      respuesta: "Through the Wages Protection System, and the employer must register the Emirati with the pension system within a month of the work permit.",
    },
    {
      pregunta: "When did the minimum start?",
      respuesta: "On {{ae.emirati-minimum-wage#desde}}.",
    },
  ],
  glosario: [
    { termino: "MoHRE", definicion: "Ministry of Human Resources and Emiratisation." },
    { termino: "Wages Protection System", definicion: "The electronic system for paying private sector wages." },
  ],
});
