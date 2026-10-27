import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.ei-benefits-calculator",
  h1: "EI benefits calculator {{anio}}",
  title: "EI calculator {{anio}}: how much EI will I get?",
  description: "Estimate your weekly EI regular benefits in {{anio}}: {{ca.ei-benefit-rate}} of your average weekly insurable earnings, up to {{ca.ei-max-weekly-benefit}} a week.",
  intro: [
    "Enter your average weekly insurable earnings to estimate your Employment Insurance regular benefits before tax.",
    "For most people EI pays {{ca.ei-benefit-rate}} of their average weekly earnings, with a weekly maximum of {{ca.ei-max-weekly-benefit}} in 2026.",
  ],
  comoSeCalcula: [
    "Your weekly benefit is {{ca.ei-benefit-rate}} of your average weekly insurable earnings.",
    "It cannot go over {{ca.ei-max-weekly-benefit}} a week in 2026.",
    "The total is the weekly amount times the number of weeks you enter.",
  ],
  ejemplo: ["If you earned $1,000 a week, your benefit is $550 a week. Over 20 weeks that is $11,000 before tax."],
  faq: [
    {
      pregunta: "What is the maximum EI benefit in 2026?",
      respuesta: "{{ca.ei-max-weekly-benefit}} a week, which you reach with average weekly insurable earnings of about $1,325 or more.",
    },
    {
      pregunta: "Is EI taxable?",
      respuesta: "Yes. EI benefits are taxable income, so tax can come off each payment. This calculator shows the amount before tax.",
    },
    {
      pregunta: "How many weeks of EI can I get?",
      respuesta: "It depends on how many hours you worked and the unemployment rate in your region. Service Canada tells you when your claim is processed.",
    },
  ],
  glosario: [
    { termino: "Average weekly insurable earnings", definicion: "Your gross insurable pay in your best weeks, divided by the number of those weeks." },
    { termino: "Regular benefits", definicion: "EI paid when you lose your job through no fault of your own and are available to work." },
  ],
});
