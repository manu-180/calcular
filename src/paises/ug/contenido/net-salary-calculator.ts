import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ug.net-salary-calculator",
  h1: "Net salary calculator Uganda",
  title: "Net salary calculator Uganda: PAYE and NSSF 2026",
  description: "See your take-home pay in Uganda after PAYE and your NSSF contribution of {{ug.nssf-employee}}, with the URA rates in force from {{ug.paye-bands#desde}}.",
  intro: [
    "Your take-home pay is what reaches your account after PAYE and NSSF.",
    "Enter your monthly gross pay to see each deduction and what your employer adds to your NSSF savings.",
  ],
  comoSeCalcula: [
    "PAYE is worked out on your total monthly pay with the URA rates. The first {{ug.paye-bands[0].hasta}} is tax free for residents.",
    "NSSF takes {{ug.nssf-employee}} of your gross pay. Your employer adds {{ug.nssf-employer}} on top, which does not come out of your salary.",
    "Take-home pay is gross pay minus PAYE and your NSSF share.",
  ],
  ejemplo: [
    "On Ushs 1,500,000 a month you pay Ushs 338,250 in PAYE and Ushs 75,000 to NSSF, so you take home Ushs 1,086,750.",
  ],
  faq: [
    {
      pregunta: "Why is my payslip lower in July to October?",
      respuesta: "Most employers deduct local service tax in four equal instalments in the first four months of the financial year. Use our local service tax calculator to see your amount.",
    },
    {
      pregunta: "Is NSSF worked out on basic pay or gross pay?",
      respuesta: "On your total gross monthly wage, according to NSSF.",
    },
    {
      pregunta: "Do I pay PAYE on a salary of Ushs 335,000?",
      respuesta: "No. Residents pay no PAYE on monthly pay up to {{ug.paye-bands[0].hasta}}. NSSF still applies.",
    },
    {
      pregunta: "Does the employer's 10% reduce my pay?",
      respuesta: "No. It is paid on top of your salary and goes to your NSSF savings.",
    },
  ],
  glosario: [
    { termino: "Take-home pay", definicion: "Gross pay minus PAYE and the employee's NSSF contribution." },
    { termino: "NSSF", definicion: "National Social Security Fund, the retirement savings fund for private sector workers." },
  ],
});
