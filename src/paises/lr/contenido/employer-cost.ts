import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lr.employer-cost",
  h1: "Employer cost calculator Liberia",
  title: "Employer cost of an employee in Liberia",
  description: "Find the full monthly and yearly cost of a salary in Liberia for the employer, with the NASSCORP pension and employment injury contributions on top.",
  intro: [
    "Enter a gross salary to see what the employee really costs the business each month and each year.",
    "On top of the salary, the employer pays NASSCORP {{lr.nasscorp-employer}} for the pension and {{lr.nasscorp-injury}} for the Employment Injury Scheme.",
  ],
  comoSeCalcula: [
    "Employer pension contribution: {{lr.nasscorp-employer}} of gross salary.",
    "Employment Injury Scheme: {{lr.nasscorp-injury}} of gross salary.",
    "Monthly cost: salary plus both contributions. Yearly cost: 12 times that.",
  ],
  ejemplo: ["A salary of L$40,000 costs the employer L$42,400 a month, or L$508,800 a year."],
  faq: [
    {
      pregunta: "Is the employee's NASSCORP contribution a cost for the employer?",
      respuesta: "No. The employee's share is deducted from the salary. The employer only withholds it and pays it to NASSCORP with its own share.",
    },
    {
      pregunta: "Is income tax an extra cost?",
      respuesta: "No. PIT is withheld from the employee's salary and paid to the LRA by the 10th day of the following month.",
    },
    {
      pregunta: "What else can a salary cost?",
      respuesta: "Benefits in kind such as housing or a vehicle, and anything a contract or collective agreement adds. This calculator counts only the salary and the legal NASSCORP contributions.",
    },
  ],
  glosario: [
    { termino: "Wage bill", definicion: "The total gross pay of all employees, on which NASSCORP contributions are charged." },
  ],
});
