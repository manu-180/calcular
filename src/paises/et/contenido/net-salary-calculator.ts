import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "et.net-salary-calculator",
  h1: "Net salary calculator Ethiopia",
  title: "Net salary calculator Ethiopia 2026: take-home pay",
  description:
    "Work out your take-home pay after employment income tax and the {{et.pension-employee}} pension contribution. Uses the tax bands of Proclamation 1395/2025.",
  intro: [
    "Enter your gross monthly salary and see what reaches your bank account. Income tax and your pension contribution are shown line by line, the way they appear on a payslip.",
    "The calculator uses the employment income tax bands that apply to salaries earned from 8 July 2025 and the private sector pension rate set by POESSA.",
  ],
  comoSeCalcula: [
    "Income tax: the first {{et.employment-income-tax[1].desde}} of the month is tax free. Each further slice of salary pays the rate of its band, from {{et.employment-income-tax[1].tasa}} up to {{et.employment-income-tax[-1].tasa}} on the part above {{et.employment-income-tax[-1].desde}}.",
    "Pension: {{et.pension-employee}} of your gross salary goes to the private sector pension fund. Your employer adds its own share on top.",
    "Net salary is gross salary less income tax, your pension contribution and any other deduction you enter.",
  ],
  ejemplo: [
    "A gross salary of ETB 10,000 pays ETB 1,650 in income tax and ETB 700 in pension, which leaves ETB 7,650 a month.",
  ],
  faq: [
    {
      pregunta: "Why does my payslip show a different figure?",
      respuesta: "Your employer may deduct loans, savings association payments or union dues. Allowances that are tax free, or that do not count for pension, also change the figures.",
    },
    {
      pregunta: "Is pension worked out before income tax?",
      respuesta: "No. The tax bands apply to your gross employment income, and the pension contribution is taken from the same gross salary. One does not reduce the other in this calculator.",
    },
    {
      pregunta: "Since when do these tax bands apply?",
      respuesta: "Proclamation 1395/2025 changed the bands for employment income earned from 8 July 2025. The tax free part went up to {{et.employment-income-tax[1].desde}} a month.",
    },
    {
      pregunta: "Who pays the pension contribution?",
      respuesta: "Both sides. You pay {{et.pension-employee}} of your salary and your employer pays its own share, which this calculator does not take from your pay.",
    },
  ],
  glosario: [
    { termino: "Gross salary", definicion: "Your pay before tax and pension, taxable allowances included." },
    { termino: "Net salary", definicion: "What you receive after income tax, pension and other deductions." },
    { termino: "POESSA", definicion: "Private Organizations Employees Social Security Administration, which runs the private sector pension fund." },
  ],
});
