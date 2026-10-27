import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "et.gross-salary-calculator",
  h1: "Net to gross salary calculator Ethiopia",
  title: "Net to gross salary calculator Ethiopia 2026",
  description:
    "Agreed a net salary? Find the gross salary that leaves that amount after employment income tax and the {{et.pension-employee}} pension contribution.",
  intro: [
    "Many job offers in Ethiopia are agreed as a net figure. Enter the net salary you want each month and the calculator finds the gross salary your employer has to put on the payroll.",
    "It uses the same tax bands and pension rate as our net salary calculator, so the two always match.",
  ],
  comoSeCalcula: [
    "The calculator searches for the gross salary whose net, after income tax and the {{et.pension-employee}} pension contribution, equals the amount you entered.",
    "Income tax follows the monthly bands of Proclamation 1395/2025, from 0% on the first {{et.employment-income-tax[1].desde}} up to {{et.employment-income-tax[-1].tasa}} above {{et.employment-income-tax[-1].desde}}.",
  ],
  ejemplo: [
    "To receive ETB 7,650 a month you need a gross salary of ETB 10,000. Tax takes ETB 1,650 and pension ETB 700.",
  ],
  faq: [
    {
      pregunta: "Why does the gross rise faster than the net?",
      respuesta: "Each extra birr of gross salary pays the rate of your band plus the pension contribution. In the top band only part of each extra birr reaches you.",
    },
    {
      pregunta: "Does the employer's pension share count here?",
      respuesta: "No. The employer pays its share on top of the gross salary. Our employer cost calculator shows the full cost.",
    },
    {
      pregunta: "Are allowances included?",
      respuesta: "The calculator treats the whole gross salary as taxable and pensionable. Tax free allowances would lower the gross needed.",
    },
  ],
  glosario: [
    { termino: "Gross salary", definicion: "The salary on the payroll before tax and pension." },
    { termino: "Net salary", definicion: "What you receive after income tax and pension." },
  ],
});
