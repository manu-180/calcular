import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gm.retirement-age",
  h1: "Retirement age calculator for The Gambia",
  title: "Retirement age calculator Gambia: your retirement date",
  description: "See the date you reach the retirement age of {{gm.retirement-age}} set by the Labour Act, 2023 in The Gambia, and how many years and months you have left.",
  intro: [
    "The Labour Act, 2023 sets the retirement age for employees at {{gm.retirement-age}}. Enter your date of birth to see when you reach it.",
    "It is also the normal retirement age in the National Provident Fund, when your savings are paid out.",
  ],
  comoSeCalcula: [
    "Retirement date: the day you turn {{gm.retirement-age}} old.",
    "Time left: whole years and months from today to that date.",
  ],
  ejemplo: ["Someone born on 15 March 1975 reaches 60 on 15 March 2035."],
  faq: [
    {
      pregunta: "Can I keep working after the retirement age?",
      respuesta: "Yes. The Act says a contract of employment that fixes a retirement age after the employee's sixtieth birthday is valid.",
    },
    {
      pregunta: "When are my NPF savings paid?",
      respuesta: "The SSHFC pays your National Provident Fund savings, with interest, when you reach the normal retirement age of 60. Part of them can be paid earlier in some situations.",
    },
    {
      pregunta: "Does this apply to civil servants?",
      respuesta: "Civil servants have their own pension under the Pensions Act, which may set its own rules. This calculator follows the Labour Act.",
    },
  ],
  glosario: [
    { termino: "Retirement age", definicion: "The age at which an employee is expected to retire, unless the contract says later." },
    { termino: "NPF", definicion: "National Provident Fund, the savings scheme run by the SSHFC." },
  ],
});
