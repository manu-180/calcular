import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hk.employer-cost-calculator",
  h1: "Employer cost calculator Hong Kong",
  title: "Cost of an employee in Hong Kong: salary plus MPF",
  description:
    "Work out what an employee costs a Hong Kong employer in a year: salary, double pay, the {{hk.mpf-rate}} employer MPF contribution and other costs.",
  intro: [
    "Hiring in Hong Kong costs more than the salary. The employer pays its own MPF contribution and usually insurance and other benefits.",
    "Enter the monthly salary and how many months of pay the contract gives to see the yearly cost.",
  ],
  comoSeCalcula: [
    "Salary for the year is the monthly salary times the months of pay, including any double pay.",
    "The employer's MPF is {{hk.mpf-rate}} of relevant income each month, worked out on at most {{hk.mpf-max-relevant-income}}. It is paid even when the employee earns less than {{hk.mpf-min-relevant-income}}.",
    "Add any other yearly costs you pay, such as insurance or benefits.",
  ],
  ejemplo: ["A $25,000 salary with double pay costs $325,000 in salary plus $15,250 of employer MPF, so $340,250 a year."],
  faq: [
    {
      pregunta: "How much MPF does an employer pay?",
      respuesta: "{{hk.mpf-rate}} of the employee's relevant income each month, up to a maximum of {{hk.mpf-rate}} of {{hk.mpf-max-relevant-income}}.",
    },
    {
      pregunta: "Does the employer pay MPF on a low salary?",
      respuesta: "Yes. Below {{hk.mpf-min-relevant-income}} a month the employee is exempt, but the employer still contributes.",
    },
    {
      pregunta: "Is double pay part of the MPF calculation?",
      respuesta: "Yes. Double pay is relevant income, so it is added to the pay of the month it's paid, within the monthly cap.",
    },
  ],
  glosario: [
    { termino: "Double pay", definicion: "A 13th month of salary that some employment contracts provide." },
    { termino: "Employer's mandatory contribution", definicion: "The MPF contribution the employer pays from its own money." },
  ],
});
