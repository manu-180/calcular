import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ls.annual-leave",
  h1: "Annual leave calculator for Lesotho",
  title: "Annual leave calculator Lesotho: days and leave pay",
  description:
    "Count the paid leave you have earned in Lesotho, {{ls.leave-days-per-month}} for each month of work and at least {{ls.leave-minimum-days}} a year, and what it is worth.",
  intro: [
    "Enter your monthly wage, how many months you have worked this year and the leave you have taken. You get the days still due and their value at full pay.",
    "The rules are in section 188 of the Labour Act, 2024.",
  ],
  comoSeCalcula: [
    "You earn {{ls.leave-days-per-month}} of annual leave on full pay for each month of continuous employment with the same employer, with a minimum of {{ls.leave-minimum-days}} a year.",
    "A day's full pay here is your monthly wage divided by {{ls.hours-divisor[monthly]}}, times the hours of a normal working day: {{ls.daily-hours[five-day]}} on a five-day week or {{ls.daily-hours[six-day]}} on a six-day week.",
    "If your job ends after at least {{ls.leave-pay-minimum-months}} of continuous work, you are paid one day's full pay for each day of leave earned and not taken.",
  ],
  ejemplo: ["On M6 000 a month and a five-day week, a day's pay is M276.92. With 8 days still due at the end of the year, they are worth M2 215.36."],
  faq: [
    {
      pregunta: "Do public holidays count as annual leave?",
      respuesta: "No. Public holidays, weekly rest days and days off sick with a medical certificate are not counted as leave days.",
    },
    {
      pregunta: "Can I sell my leave for cash?",
      respuesta: "Only up to six days of the statutory leave, if you and your employer agree. The payment is made at the end of the calendar year the leave is due.",
    },
    {
      pregunta: "Can I carry leave over to next year?",
      respuesta: "Leave above the legal minimum that your contract gives you can be carried over, up to 18 days in all.",
    },
    {
      pregunta: "What does full pay include?",
      respuesta: "Your normal pay, including any cost-of-living allowance and the cash value of benefits in kind in your contract. Bonuses are left out.",
    },
  ],
  glosario: [
    { termino: "Continuous employment", definicion: "Work for the same employer without a break in the contract." },
    { termino: "Full pay", definicion: "Normal remuneration with cost-of-living allowance and benefits in kind, without bonuses." },
  ],
});
