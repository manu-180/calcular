import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.minimum-wage-calculator",
  h1: "Minimum wage calculator Bhutan {{anio}}",
  title: "Minimum wage Bhutan {{anio}}: {{bt.nmw-daily}} a day, {{bt.nmw-monthly}} a month",
  description: "Bhutan's National Minimum Wage is {{bt.nmw-daily}} a day or {{bt.nmw-monthly}} a month, per the Ministry's circular. Check your pay for the days you worked.",
  intro: [
    "Bhutan's National Minimum Wage is {{bt.nmw-daily}} a day or {{bt.nmw-monthly}} a month, in effect since {{bt.nmw-daily#desde}}. It applies to all workers whatever their age, sex, disability or skills, and it can be paid daily, weekly or monthly.",
    "It is the last rate the Department of Labour lists, and its 2024 guide to workers' compensation still works with {{bt.nmw-monthly}} a month. Fines and legal compensation are also based on it.",
  ],
  comoSeCalcula: [
    "Multiply the days you worked by {{bt.nmw-daily}}. Thirty days give the monthly figure of {{bt.nmw-monthly}}.",
    "The hourly figure divides the daily rate by the standard {{bt.standard-day-hours}}-hour day in section 161 of the Regulation on Working Conditions 2022.",
    "If you enter what you were paid, the difference appears. A negative number means you were paid below the minimum.",
  ],
  ejemplo: ["Sonam worked 20 days and got Nu. 2,000. The minimum for 20 days is 20 times Nu. 125, or Nu. 2,500, so the pay falls Nu. 500 short."],
  faq: [
    {
      pregunta: "What is the minimum wage in Bhutan?",
      respuesta: "{{bt.nmw-daily}} a day or {{bt.nmw-monthly}} a month, under the circular of the Ministry of Labour and Human Resources of 31 October 2013, approved by the Lhengye Zhungtshog, in effect from {{bt.nmw-daily#desde}}.",
    },
    {
      pregunta: "Why do I see Nu. 215 or Nu. 400 elsewhere?",
      respuesta: "Those are National Workforce rates, another scale. The Ministry of Finance raised the unskilled rate from Nu. 215 to {{bt.national-workforce-rates[category-5]}} a day from 1 October 2023, and the top category to {{bt.national-workforce-rates[category-1]}}. The notification says they apply to Bhutanese employed by Government agencies on works executed departmentally, so they are not the general minimum.",
    },
    {
      pregunta: "What if an employer pays less?",
      respuesta: "The circular says the employer commits an offence and can be fined up to 365 times the daily minimum wage. You can raise it with the Department of Labour.",
    },
    {
      pregunta: "Who is not covered?",
      respuesta: "The circular leaves out voluntary workers, apprentices and trainees.",
    },
  ],
  glosario: [
    { termino: "National Minimum Wage", definicion: "The lowest pay a worker can get at national level. Employers may pay more." },
    { termino: "National Workforce", definicion: "People employed by Government agencies on works done departmentally, paid on their own wage scale." },
    { termino: "Lhengye Zhungtshog", definicion: "The Cabinet of Bhutan." },
  ],
});
