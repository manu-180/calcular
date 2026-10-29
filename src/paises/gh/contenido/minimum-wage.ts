import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gh.minimum-wage",
  h1: "Minimum wage in Ghana {{anio}}",
  title: "Ghana minimum wage {{anio}}: {{gh.minimum-wage}} a day",
  description: "The National Daily Minimum Wage in Ghana is {{gh.minimum-wage}} from 1 January {{anio}}. See what it comes to for the days you work in a month.",
  intro: [
    "The National Daily Minimum Wage for 2026 is {{gh.minimum-wage}}, a 9% increase over 2025, set by the National Tripartite Committee.",
    "Enter the days you work to see the monthly equivalent, or your own daily wage to compare.",
  ],
  comoSeCalcula: ["The monthly figure is the daily minimum wage times the days you work in the month."],
  ejemplo: ["Working 26 days a month at {{gh.minimum-wage}} a day comes to GH₵566.02."],
  faq: [
    {
      pregunta: "What is the minimum wage in Ghana for 2026?",
      respuesta: "{{gh.minimum-wage}} a day from 1 January 2026, agreed by the National Tripartite Committee on 9 November 2025.",
    },
    {
      pregunta: "Who sets the minimum wage?",
      respuesta: "The National Tripartite Committee of government, employers and organised labour, under section 113 of the Labour Act, 2003 (Act 651).",
    },
    {
      pregunta: "What happens if an employer pays less?",
      respuesta: "Establishments paying below the new rate had to adjust from 1 January 2026. Those that flout it can be sanctioned under the law.",
    },
  ],
  glosario: [{ termino: "NTC", definicion: "National Tripartite Committee, with members from government, employers and organised labour." }],
});
