import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tt.minimum-wage-calculator",
  h1: "Minimum wage calculator Trinidad and Tobago",
  title: "Minimum wage in Trinidad and Tobago {{anio}}: {{tt.minimum-wage-hourly}} an hour",
  description: "The national minimum wage is {{tt.minimum-wage-hourly}} an hour. See it by the day, week and month, and check your own pay against it.",
  intro: [
    "Trinidad and Tobago has one national minimum wage for all workers. It has been {{tt.minimum-wage-hourly}} an hour since {{tt.minimum-wage-hourly#desde}}.",
    "Enter the hours you work to see the least you should earn, and add your hourly rate to check it.",
  ],
  comoSeCalcula: [
    "An 8-hour day at the minimum is {{tt.minimum-wage-daily}}.",
    "A 40-hour week is {{tt.minimum-wage-weekly}}.",
    "A month is {{tt.minimum-wage-monthly}}: 40 hours times 52 weeks, divided by 12 months.",
    "For a shorter week, the hourly minimum is multiplied by your hours.",
  ],
  ejemplo: ["Working 25 hours a week, the minimum is TT$512.50 a week. If you are paid TT$18 an hour, you are short TT$62.50 each week."],
  faq: [
    {
      pregunta: "What is the minimum wage in Trinidad in 2026?",
      respuesta: "{{tt.minimum-wage-hourly}} an hour, {{tt.minimum-wage-weekly}} for a 40-hour week or {{tt.minimum-wage-monthly}} a month.",
    },
    {
      pregunta: "Since when has it applied?",
      respuesta: "Since {{tt.minimum-wage-hourly#desde}}, under the Minimum Wages (Amendment) Order, 2023 (Legal Notice No. 390 of 2023).",
    },
    {
      pregunta: "Does it apply to every sector?",
      respuesta: "Yes. The Order sets the same minimum for all workers, whether they are paid by the day, the week or the month.",
    },
  ],
  glosario: [{ termino: "Minimum Wages Order", definicion: "The legal notice made under the Minimum Wages Act that sets the national minimum wage." }],
});
