import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lk.minimum-wage",
  h1: "Minimum wage in Sri Lanka",
  title: "Minimum wage Sri Lanka {{anio}}: monthly and daily rates",
  description:
    "The national minimum wage is {{lk.minimum-wage-monthly}} a month and {{lk.minimum-wage-daily}} a day. Check whether your wage meets it.",
  intro: [
    "The National Minimum Wage of Workers Act sets the lowest wage any employer can pay, in any industry or service.",
    "Choose whether you are paid by the month or by the day and enter your wage to compare it with the national minimum.",
  ],
  comoSeCalcula: [
    "Monthly paid workers: at least {{lk.minimum-wage-monthly}} a month since {{lk.minimum-wage-monthly#desde}}.",
    "Daily paid workers: at least {{lk.minimum-wage-daily}} a day since {{lk.minimum-wage-daily#desde}}.",
    "The calculator shows how far your wage is above or below that figure.",
  ],
  ejemplo: ["A worker paid Rs. 28,000 a month is Rs. 2,000 short of the national minimum monthly wage."],
  faq: [
    {
      pregunta: "Does the budgetary relief allowance count towards the minimum?",
      respuesta: "Yes. The 2025 amendment made the budgetary relief allowance part of the wage itself. The Department of Labour says no other allowance received as at 31 March 2025 can be used to reach the minimum.",
    },
    {
      pregunta: "Is EPF worked out on the new wage?",
      respuesta: "Yes. The Department of Labour says this wage applies to all statutory payments, such as EPF, ETF, overtime, gratuity, maternity benefit and holiday pay.",
    },
    {
      pregunta: "My salary was already above the minimum. Does it change?",
      respuesta: "The budgetary relief allowance you had on 31 March 2025 becomes part of your basic salary. In the Department of Labour example, a salary of Rs. 40,000 with a Rs. 2,500 allowance becomes a basic salary of Rs. 42,500.",
    },
  ],
  glosario: [
    { termino: "National minimum wage", definicion: "The lowest monthly or daily wage the law allows for any worker in any industry or service." },
    { termino: "Budgetary relief allowance", definicion: "An allowance paid on top of wages under earlier Acts and now part of the wage." },
  ],
});
