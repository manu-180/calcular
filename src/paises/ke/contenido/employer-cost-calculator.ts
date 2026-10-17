import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.employer-cost-calculator",
  h1: "Employer cost calculator Kenya",
  title: "Employer cost calculator Kenya: salary plus NSSF and levy",
  description: "See what an employee really costs: gross salary plus employer NSSF at {{ke.nssf-rate}} and the Housing Levy at {{ke.housing-levy-rate}}.",
  intro: [
    "Hiring someone costs more than the salary. This calculator adds the statutory contributions that only the employer pays.",
    "Enter the gross monthly salary and the number of employees on that pay.",
  ],
  comoSeCalcula: [
    "Employer NSSF: {{ke.nssf-rate}} of the salary up to {{ke.nssf-uel}}, the same amount the employee pays.",
    "Employer Housing Levy: {{ke.housing-levy-rate}} of gross salary.",
    "Monthly cost is the gross salary plus both contributions. SHIF and PAYE come out of the employee's pay, so they are not added.",
  ],
  ejemplo: ["An employee on KSh 60,000 costs KSh 64,500 a month: KSh 3,600 of employer NSSF and KSh 900 of Housing Levy on top of the salary."],
  faq: [
    {
      pregunta: "Do I pay SHIF as an employer?",
      respuesta: "You deduct SHIF from the employee's salary and send it to SHA. The rate SHA publishes is paid by the employee.",
    },
    {
      pregunta: "When do I pay NSSF?",
      respuesta: "By the 9th day of the following month, both your share and the employee's.",
    },
    {
      pregunta: "Are there other costs?",
      respuesta: "This calculator covers NSSF and the Housing Levy. Leave pay, overtime, medical cover or bonuses add to the cost.",
    },
  ],
  glosario: [{ termino: "Employer contribution", definicion: "An amount the employer pays on top of the salary, not taken from it." }],
});
