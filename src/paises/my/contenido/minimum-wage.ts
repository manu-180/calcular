import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "my.minimum-wage",
  h1: "Minimum wage Malaysia 2026",
  title: "Minimum wage Malaysia: monthly, daily and hourly rates",
  description: "Check your pay against the minimum wage of {{my.minimum-wage-monthly}} a month, {{my.minimum-wage-hourly}} an hour and the daily rates in the Minimum Wages Order 2024.",
  intro: [
    "Enter how you are paid and your basic pay to see whether it meets the national minimum wage, and by how much it falls short if it does not.",
    "Since {{my.minimum-wage-monthly#desde}} the minimum wage is {{my.minimum-wage-monthly}} a month for every employer, whatever the number of employees.",
  ],
  comoSeCalcula: [
    "Monthly-paid employees: at least {{my.minimum-wage-monthly}} a month.",
    "Hourly-paid employees: at least {{my.minimum-wage-hourly}} an hour.",
    "Daily-paid employees: {{my.minimum-wage-daily[6]}} a day on a 6-day week, {{my.minimum-wage-daily[5]}} on a 5-day week and {{my.minimum-wage-daily[4]}} on a 4-day week.",
    "Your basic pay is compared with the rate for your pay period.",
  ],
  ejemplo: ["On RM1,500 a month you are RM200 short of the minimum wage."],
  faq: [
    {
      pregunta: "Who does the minimum wage not cover?",
      respuesta: "Domestic servants as defined in the Employment Act 1955 and the Sabah and Sarawak Labour Ordinances. It does apply to everyone else in the private sector covered by the Order.",
    },
    {
      pregunta: "I am paid only by commission or piece rate. Does it apply to me?",
      respuesta: "Yes. If you have no basic wage and are paid only by piece rate, tonnage, task, trip or commission, your monthly pay cannot be less than {{my.minimum-wage-monthly}}.",
    },
    {
      pregunta: "Which law sets the minimum wage?",
      respuesta: "The Minimum Wages Order 2024 (P.U. (A) 376), made under the National Wages Consultative Council Act 2011. It replaced the 2022 Order.",
    },
  ],
  glosario: [
    { termino: "Basic wages", definicion: "Your pay for normal work, before overtime and allowances." },
    { termino: "MASCO", definicion: "The Malaysia Standard Classification of Occupations, used by the Order to identify professional activities." },
  ],
});
