import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "et.pension-contribution-calculator",
  h1: "Pension contribution calculator Ethiopia",
  title: "Pension contribution calculator Ethiopia: 7% and 11%",
  description:
    "See what goes into the private sector pension fund each month: {{et.pension-employee}} from the employee and {{et.pension-employer}} from the employer, as set out by POESSA.",
  intro: [
    "Every private sector employee in Ethiopia contributes to the pension fund run by POESSA, and the employer adds its own share. Enter a gross monthly salary to see both parts and the total.",
  ],
  comoSeCalcula: [
    "Employee share: {{et.pension-employee}} of the gross monthly salary, deducted from pay.",
    "Employer share: {{et.pension-employer}} of the same salary, paid on top.",
    "The employer sends both shares to the pension fund within 30 days after the end of the month in which the salary is paid.",
  ],
  ejemplo: [
    "On a salary of ETB 10,000 the employee pays ETB 700 and the employer ETB 1,100, so ETB 1,800 goes into the fund.",
  ],
  faq: [
    {
      pregunta: "What happens if the employer pays late?",
      respuesta: "POESSA charges interest at the bank deposit rate from the first day of the following month plus a penalty of 5% a month on the unpaid contribution.",
    },
    {
      pregunta: "Can the employer skip the deduction?",
      respuesta: "No. An employer that fails to deduct the employee share has to pay it itself.",
    },
    {
      pregunta: "What does the pension fund pay back?",
      respuesta: "After at least {{et.pension-min-years}} years of service you can receive a monthly service pension. Our pension calculator estimates the amount.",
    },
  ],
  glosario: [
    { termino: "POESSA", definicion: "Private Organizations Employees Social Security Administration." },
    { termino: "Pension contribution", definicion: "The share of salary paid into the pension fund each month." },
  ],
});
