import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gm.employer-cost",
  h1: "Employer cost calculator for The Gambia",
  title: "Employer cost calculator Gambia: salary plus SSHFC",
  description: "See what an employee really costs in The Gambia: gross salary plus the employer's SSHFC pension share, the injuries fund and, for expatriates, the payroll tax.",
  intro: [
    "Enter the salary to see the full monthly and yearly cost of an employee for the business.",
    "On top of gross salary the employer pays {{gm.npf-employer-rate}} of basic salary to the NPF (or {{gm.fps-rate}} of gross salary in the FPS) and up to {{gm.iicf-cap}} a month to the injuries fund.",
  ],
  comoSeCalcula: [
    "Gross salary: basic salary plus fixed allowances.",
    "Pension: NPF {{gm.npf-employer-rate}} of basic salary, or FPS {{gm.fps-rate}} of gross salary.",
    "Industrial Injuries Compensation Fund: {{gm.iicf-rate}} of gross salary, up to {{gm.iicf-cap}} a month.",
    "Expatriates: the yearly payroll tax ({{gm.expatriate-payroll-tax[ecowas]}} for ECOWAS citizens, {{gm.expatriate-payroll-tax[other]}} for others) divided by 12.",
  ],
  ejemplo: ["A Gambian employee on D10,000 basic and D2,000 allowances in the NPF costs D12,000 + D1,000 + D15 = D13,015 a month."],
  faq: [
    {
      pregunta: "Is the employee's NPF share part of the employer cost?",
      respuesta: "No. The employee's NPF share is deducted from the gross salary, which is already in the total. Only the employer's own share is added.",
    },
    {
      pregunta: "Does the employer pay any tax on salaries?",
      respuesta: "The employer withholds PAYE from the salary and pays it to the GRA, but that comes out of the employee's pay. Benefits in kind carry fringe benefits tax, paid by the employer.",
    },
    {
      pregunta: "Why does the FPS cost more?",
      respuesta: "In the Federated Pension Scheme the employer pays the whole contribution of {{gm.fps-rate}} of gross salary, while in the NPF the employee pays part of it.",
    },
  ],
  glosario: [
    { termino: "Fixed allowances", definicion: "Regular allowances paid every month, such as transport or housing, that count for the FPS and the injuries fund." },
    { termino: "SSHFC", definicion: "Social Security and Housing Finance Corporation." },
  ],
});
