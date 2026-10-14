import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "za.uif-calculator",
  h1: "UIF calculator",
  title: "UIF calculator: how much UIF you and your employer pay",
  description: "Work out the UIF contribution on your salary: {{za.uif-employee-rate}} from you and {{za.uif-employer-rate}} from your employer, up to the {{za.uif-ceiling-monthly}} ceiling.",
  intro: [
    "Enter your gross monthly pay to see the UIF that comes off your payslip and the part your employer adds.",
    "Both of you pay the same share, on pay up to {{za.uif-ceiling-monthly}} a month.",
  ],
  comoSeCalcula: [
    "Take your gross pay for the month. If it is above {{za.uif-ceiling-monthly}}, use {{za.uif-ceiling-monthly}}.",
    "Your contribution is {{za.uif-employee-rate}} of that amount and your employer's is another {{za.uif-employer-rate}}.",
    "Your employer pays both parts to SARS, or to the Unemployment Insurance Commissioner if it is not registered for PAYE or SDL.",
  ],
  ejemplo: ["On R15 000 a month you pay R150 and your employer pays R150, so R300 goes to the UIF each month."],
  faq: [
    {
      pregunta: "Who does not pay UIF?",
      respuesta:
        "Employees who work less than 24 hours a month for an employer, national and provincial government employees, and people in senior political office such as ministers, members of municipal councils and traditional leaders.",
    },
    {
      pregunta: "What is the most I can pay?",
      respuesta: "Pay above {{za.uif-ceiling-monthly}} a month does not count. At that ceiling you pay 1% of it, and so does your employer.",
    },
    {
      pregunta: "How many days of benefits do my contributions buy?",
      respuesta:
        "You build up one day of benefits for every five completed days you work as a contributor, up to 365 days in the four years before your job ends.",
    },
  ],
  glosario: [
    { termino: "UIF", definicion: "Unemployment Insurance Fund. It pays benefits if you lose your job and during some kinds of leave, such as maternity leave." },
    { termino: "Ceiling", definicion: "The highest monthly pay that UIF contributions are worked out on." },
  ],
});
