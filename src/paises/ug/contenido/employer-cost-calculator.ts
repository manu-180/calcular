import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ug.employer-cost-calculator",
  h1: "Employer cost calculator Uganda",
  title: "Cost of an employee in Uganda: salary plus NSSF",
  description: "Work out what an employee costs you in Uganda: gross pay plus the employer's NSSF contribution of {{ug.nssf-employer}}, and the PAYE and NSSF you remit each month.",
  intro: [
    "Hiring someone costs more than the salary on the contract. On top of gross pay you add {{ug.nssf-employer}} for NSSF.",
    "Enter the monthly gross pay to see the full cost and the amounts you hand over to URA and NSSF.",
  ],
  comoSeCalcula: [
    "Employer NSSF is {{ug.nssf-employer}} of the employee's total gross monthly wage.",
    "You also deduct {{ug.nssf-employee}} from the employee and remit both shares to NSSF by the 15th of the following month.",
    "PAYE is deducted from the employee's pay with the URA rates and paid to URA. It is not an extra cost for you.",
  ],
  ejemplo: ["An employee on Ushs 1,500,000 costs Ushs 1,650,000 a month. You remit Ushs 338,250 PAYE to URA and Ushs 225,000 to NSSF."],
  faq: [
    {
      pregunta: "Which employers must pay NSSF?",
      respuesta: "NSSF covers all employers, whatever the number of employees, for staff aged 16 to 55, except those under the Government Pensions scheme.",
    },
    {
      pregunta: "When is NSSF due?",
      respuesta: "By the 15th day of the month after the wages were paid.",
    },
    {
      pregunta: "Is local service tax a cost for the employer?",
      respuesta: "No. It is a tax on the employee that you deduct and pay to the local government. The amount depends on the employee's monthly pay.",
    },
  ],
  glosario: [{ termino: "Remit", definicion: "Pay over to URA or NSSF the amounts deducted from salaries." }],
});
