import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "et.employer-cost-calculator",
  h1: "Employer cost calculator Ethiopia",
  title: "Employer cost of a salary in Ethiopia {{anio}}",
  description:
    "Work out what an employee really costs: gross salary plus the {{et.pension-employer}} employer pension contribution, with the tax and pension you withhold.",
  intro: [
    "Hiring in Ethiopia costs more than the gross salary. On top of it the employer pays its share of the private sector pension. Enter the salary to see the monthly and yearly cost, and what you have to withhold and pay over.",
  ],
  comoSeCalcula: [
    "Employer pension: {{et.pension-employer}} of the gross salary, paid on top of it.",
    "From the gross salary you withhold employment income tax and the employee pension of {{et.pension-employee}}, and pay the rest to the employee.",
    "Monthly cost is the gross salary plus the employer pension. The yearly figure multiplies it by 12 and by the number of employees.",
  ],
  ejemplo: [
    "An employee on ETB 10,000 costs ETB 11,100 a month. You withhold ETB 1,650 in tax and ETB 700 in pension and pay ETB 7,650 to the employee.",
  ],
  faq: [
    {
      pregunta: "Is the employer pension part of the salary?",
      respuesta: "No. It is paid on top of the gross salary and does not reduce what the employee receives.",
    },
    {
      pregunta: "When do I pay the pension contributions?",
      respuesta: "POESSA asks employers to pay both shares within 30 days after the end of the month in which salaries are paid.",
    },
    {
      pregunta: "Does the cost include overtime or bonuses?",
      respuesta: "No. Enter them as part of the gross salary for the month if you want them in the cost.",
    },
  ],
  glosario: [
    { termino: "Employer cost", definicion: "Gross salary plus the contributions the employer pays on top." },
    { termino: "Withholding", definicion: "Tax and pension the employer takes from pay and passes on." },
  ],
});
