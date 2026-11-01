import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lr.take-home-pay",
  h1: "Take-home pay calculator Liberia",
  title: "Take-home pay Liberia: salary after NASSCORP and PIT",
  description: "See your net salary in Liberia after the NASSCORP pension contribution and personal income tax, for pay in Liberian or US dollars.",
  intro: [
    "Enter your gross monthly salary to see what lands in your account after NASSCORP and income tax.",
    "Your employer takes {{lr.nasscorp-employee}} of your earnings for the NASSCORP pension and withholds PIT on the LRA table.",
  ],
  comoSeCalcula: [
    "If you are paid in US dollars, the salary is converted to Liberian dollars at the rate you enter.",
    "NASSCORP: {{lr.nasscorp-employee}} of your monthly salary.",
    "Taxable income: 12 times your salary, plus non-cash benefits for the year above {{lr.non-cash-exemption}}.",
    "PIT: the LRA bands applied to the year, divided by 12. NASSCORP is not deducted first, because the LRA taxes gross income.",
  ],
  ejemplo: ["On L$40,000 a month, NASSCORP takes L$1,600 and PIT L$4,041.67, so you take home L$34,358.33."],
  faq: [
    {
      pregunta: "Is income tax charged on my gross pay or after NASSCORP?",
      respuesta: "On gross pay. The LRA calculates PIT on your annual gross income, which includes all cash and non-cash benefits.",
    },
    {
      pregunta: "How much of my non-cash benefits is tax-free?",
      respuesta: "The first {{lr.non-cash-exemption}} a year of the total market value of your non-cash benefits, such as housing, a vehicle or gasoline coupons.",
    },
    {
      pregunta: "My salary is in US dollars. Which rate is used?",
      respuesta: "The PIT table is in Liberian dollars, so a US dollar salary is converted first. Enter the rate your employer uses. Our exchange rate calculator shows the Central Bank of Liberia buying and selling rates of the day.",
    },
    {
      pregunta: "Does my employer also pay into NASSCORP?",
      respuesta: "Yes, on top of your salary, so it does not come out of your pay. Our NASSCORP calculator shows both shares.",
    },
  ],
  glosario: [
    { termino: "NASSCORP", definicion: "National Social Security and Welfare Corporation, which runs the National Pension Scheme and the Employment Injury Scheme." },
    { termino: "Non-cash benefits", definicion: "Benefits paid in kind, such as housing, a company vehicle or fuel, valued at market price for tax." },
  ],
});
