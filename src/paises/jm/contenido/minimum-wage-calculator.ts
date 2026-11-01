import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jm.minimum-wage-calculator",
  h1: "Minimum wage calculator Jamaica",
  title: "Minimum wage Jamaica {{anio}}: {{jm.minimum-wage-weekly}} a week",
  description:
    "The national minimum wage in Jamaica is {{jm.minimum-wage-weekly}} for a 40-hour week, or {{jm.minimum-wage-hourly}} an hour, since {{jm.minimum-wage-weekly#desde}}. See your weekly, fortnightly and monthly minimum.",
  intro: [
    "The national minimum wage is {{jm.minimum-wage-weekly}} for a 40-hour week, which is {{jm.minimum-wage-hourly}} an hour. It applies from {{jm.minimum-wage-weekly#desde}}.",
    "Enter the hours you work in a week to see the least your employer can pay you, including overtime.",
  ],
  comoSeCalcula: [
    "Each normal hour, up to {{jm.normal-week-hours}} in the week, is paid at least {{jm.minimum-wage-hourly}}.",
    "Work above {{jm.normal-week-hours}} in the week is paid at time and a half.",
    "The monthly figure multiplies the weekly pay by 52 weeks and divides by 12.",
  ],
  ejemplo: ["If you work 45 hours in a week, the minimum is 40 hours at J$425 plus 5 hours at J$637.50. That is J$20,187.50 for the week."],
  faq: [
    {
      pregunta: "What is the minimum wage in Jamaica per hour?",
      respuesta: "{{jm.minimum-wage-hourly}} for each normal hour, since {{jm.minimum-wage-hourly#desde}}. Overtime is paid at time and a half.",
    },
    {
      pregunta: "Do security guards have a different minimum wage?",
      respuesta: "Industrial security guards have their own order. From July 1, 2026 their minimum is also J$17,000 for a 40-hour week, and their allowances stay in place.",
    },
    {
      pregunta: "What was the minimum wage before July 2026?",
      respuesta: "J$16,000 for a 40-hour week, or J$400 an hour, from June 1, 2025 to June 30, 2026.",
    },
    {
      pregunta: "What can I do if I am paid less?",
      respuesta: "Paying below the minimum wage is an offence. You can complain to the Pay and Conditions of Employment Branch of the Ministry of Labour and Social Security.",
    },
  ],
  glosario: [
    { termino: "National minimum wage", definicion: "The lowest pay allowed by the National Minimum Wage Order for most workers." },
    { termino: "Time and a half", definicion: "One and a half times the normal hourly rate." },
  ],
});
