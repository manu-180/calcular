import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lr.nasscorp-pension",
  h1: "NASSCORP pension calculator",
  title: "NASSCORP pension calculator: your retirement pension",
  description: "Estimate your NASSCORP retirement pension in Liberia from your best five years of earnings and the number of monthly contributions you have paid.",
  intro: [
    "Enter your earnings in your best five years and the monthly contributions you have paid to estimate your NASSCORP retirement pension.",
    "You qualify for a pension at {{lr.pension-age}} with at least {{lr.pension-min-months[before-1980]}} monthly contributions if you were born before 1980, or {{lr.pension-min-months[from-1980]}} if you were born in 1980 or later.",
  ],
  comoSeCalcula: [
    "Average monthly earnings: the total of your best five years divided by 60 months.",
    "Pension rate: {{lr.pension-base-rate}} for the minimum number of contributions, plus {{lr.pension-increment}} for every 10 more months.",
    "Monthly pension: average monthly earnings × pension rate.",
  ],
  ejemplo: ["In NASSCORP's own example, best five years of 875,000 give an average of 14,583.33 a month. With 132 contributions the rate is 28%, so the pension is 4,083.33 a month."],
  faq: [
    {
      pregunta: "What if I have not paid enough contributions?",
      respuesta: "With {{lr.pension-grant-months}} or more monthly contributions but fewer than the minimum, NASSCORP pays a retirement grant instead of a monthly pension.",
    },
    {
      pregunta: "What happens to my contributions if I die before 60?",
      respuesta: "They are paid as benefits to your dependants.",
    },
    {
      pregunta: "Which years count for the average?",
      respuesta: "Your best five years of earnings before retirement, which do not have to be consecutive.",
    },
  ],
  glosario: [
    { termino: "Retirement grant", definicion: "A one-off payment for insured persons who reach retirement without enough contributions for a pension." },
    { termino: "Monthly contribution", definicion: "One month in which you and your employer paid into the National Pension Scheme." },
  ],
});
