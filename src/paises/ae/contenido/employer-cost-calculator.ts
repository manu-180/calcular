import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ae.employer-cost-calculator",
  h1: "UAE employer cost calculator",
  title: "Cost of an employee in the UAE: salary and extras",
  description:
    "Work out what an employee costs in the UAE: salary, the {{ae.gpssa[employer]}} GPSSA contribution for Emiratis or the gratuity provision for expatriates, and other costs.",
  intro: [
    "Hiring in the UAE costs more than the salary. For Emiratis, the employer pays a pension contribution. For expatriates, it builds up an end-of-service gratuity.",
    "Enter the salary and the employee's details to see the yearly cost.",
  ],
  comoSeCalcula: [
    "Salary for the year is the monthly salary times 12.",
    "For an Emirati, add the employer's GPSSA contribution of {{ae.gpssa[employer]}} of the salary.",
    "For an expatriate, add the gratuity earned in the year: {{ae.gratuity[first-5-years]}} of basic salary in the first five years and {{ae.gratuity[after-5-years]}} after.",
    "Add any other yearly costs such as visas, insurance or flights.",
  ],
  ejemplo: ["An expatriate on AED 15,000 a month with AED 9,000 basic costs AED 180,000 in salary plus AED 6,300 of gratuity a year in the first five years."],
  faq: [
    {
      pregunta: "Does an employer pay pension for expatriates?",
      respuesta: "The GPSSA contribution described by MoHRE is for Emiratis. For foreign full-time workers, the Labour Law sets an end-of-service gratuity instead.",
    },
    {
      pregunta: "Is gratuity worked out on the full salary?",
      respuesta: "No, on the basic wage, without allowances.",
    },
    {
      pregunta: "Is there an alternative to the gratuity?",
      respuesta: "Yes. Under the voluntary Savings Scheme, an employer pays a monthly contribution to an approved investment fund instead.",
    },
  ],
  glosario: [
    { termino: "Gratuity provision", definicion: "The part of the end-of-service gratuity the employee earns in a year." },
    { termino: "Basic salary", definicion: "The salary before allowances such as housing or transport." },
  ],
});
