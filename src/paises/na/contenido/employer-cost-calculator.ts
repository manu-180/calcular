import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "na.employer-cost-calculator",
  h1: "Employer cost calculator Namibia",
  title: "Employer cost calculator Namibia: cost of an employee",
  description:
    "See what an employee really costs: salary plus Social Security at {{na.ssc-employer-rate}} and the VET levy at {{na.vet-levy-rate}} of payroll.",
  intro: [
    "Hiring someone costs more than the salary on the contract. Enter the pay package and see the monthly and yearly cost to your business.",
    "The calculator adds the employer's Social Security contribution and, if your payroll is large enough, the Vocational Education and Training levy.",
  ],
  comoSeCalcula: [
    "Employer Social Security: {{na.ssc-employer-rate}} of the basic salary, counting at most {{na.ssc-ceiling}} a month.",
    "VET levy: {{na.vet-levy-rate}} of salary and allowances, if your yearly payroll is {{na.vet-levy-threshold}} or more.",
    "Add any pension or medical aid contribution you pay as employer.",
  ],
  ejemplo: ["A basic salary of N$15,000 costs N$112.50 in employer Social Security and N$150 in VET levy, so N$15,262.50 a month in total."],
  faq: [
    {
      pregunta: "Who has to pay the VET levy?",
      respuesta: "The Namibia Training Authority says employers with a yearly payroll of {{na.vet-levy-threshold}} or more pay {{na.vet-levy-rate}} of payroll each month, unless they are exempt organisations.",
    },
    {
      pregunta: "When is the VET levy due?",
      respuesta: "It is paid monthly in arrears, on or before the 20th of the following month.",
    },
    {
      pregunta: "Is the Employees' Compensation Fund included?",
      respuesta: "No. The Employees' Compensation Fund assessment is billed to each employer separately, so add your own assessment on top.",
    },
  ],
  glosario: [
    { termino: "VET levy", definicion: "Vocational Education and Training levy, paid to the National Training Fund run by the Namibia Training Authority." },
    { termino: "ECF", definicion: "Employees' Compensation Fund, which covers injuries and diseases at work." },
  ],
});
