import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lk.epf-etf-calculator",
  h1: "EPF and ETF calculator",
  title: "EPF and ETF calculator Sri Lanka: monthly contributions",
  description:
    "See what goes into your EPF and ETF each month: {{lk.epf-employee}} from you, {{lk.epf-employer}} from your employer and {{lk.etf-employer}} ETF on your total earnings.",
  intro: [
    "Every month two funds receive money for you. EPF gets a share from your salary and a larger share from your employer. ETF is paid only by your employer.",
    "Enter your total earnings for the month to see each contribution, and how much builds up over the months you choose.",
  ],
  comoSeCalcula: [
    "EPF from you: {{lk.epf-employee}} of your monthly gross earnings, taken from your salary.",
    "EPF from your employer: {{lk.epf-employer}} of the same earnings, paid on top.",
    "ETF: {{lk.etf-employer}} of your total monthly earnings, paid by your employer and never taken from your pay.",
    "The totals over several months do not include the interest each fund declares at the end of the year.",
  ],
  ejemplo: [
    "On Rs. 100,000 a month, Rs. 8,000 comes out of your salary for EPF, your employer adds Rs. 12,000 to EPF and Rs. 3,000 to ETF. That is Rs. 23,000 a month in all.",
  ],
  faq: [
    {
      pregunta: "Are 8% and 12% the most that can be paid?",
      respuesta: "No. The Central Bank says these are the minimum rates. Some employers pay a higher share.",
    },
    {
      pregunta: "Can my employer deduct ETF from my salary?",
      respuesta: "No. ETF is paid only by the employer on behalf of each employee.",
    },
    {
      pregunta: "Who keeps my EPF balance?",
      respuesta: "The Central Bank of Sri Lanka keeps the member accounts and invests the fund. An interest rate is credited to your account each year.",
    },
  ],
  glosario: [
    { termino: "EPF", definicion: "Employees' Provident Fund, a retirement fund for private sector employees." },
    { termino: "ETF", definicion: "Employees' Trust Fund, a separate fund paid for by employers." },
    { termino: "Total earnings", definicion: "Salary or wages with cost of living and similar allowances, holiday pay and the cash value of food provided." },
  ],
});
