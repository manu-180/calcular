import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "na.vet-levy-calculator",
  h1: "VET levy calculator Namibia",
  title: "VET levy calculator Namibia: NTA training levy",
  description:
    "Employers with a yearly payroll of {{na.vet-levy-threshold}} or more pay a VET levy of {{na.vet-levy-rate}} of payroll to the Namibia Training Authority. See your amount.",
  intro: [
    "The Vocational Education and Training levy funds training in priority skills through the National Training Fund.",
    "Enter your payroll for the financial year to see if you pay the levy and how much it comes to each month.",
  ],
  comoSeCalcula: [
    "If your yearly payroll is {{na.vet-levy-threshold}} or more, the levy is {{na.vet-levy-rate}} of payroll.",
    "The NTA works it out on the payroll you project for the year and you pay it in monthly amounts.",
  ],
  ejemplo: ["A payroll of N$2,400,000 a year pays N$24,000 in VET levy, N$2,000 a month."],
  faq: [
    {
      pregunta: "Do I have to register with the NTA?",
      respuesta: "Yes. Unless your organisation is exempt, you register with the NTA if your estimated payroll for the financial year is {{na.vet-levy-threshold}} or more.",
    },
    {
      pregunta: "When is the levy paid?",
      respuesta: "Monthly in arrears, on or before the 20th of the month after the one it is due for.",
    },
    {
      pregunta: "Since when does the levy apply?",
      respuesta: "It was imposed by a notice in the Government Gazette on 27 January 2014, from the 2014 to 2015 financial year.",
    },
  ],
  glosario: [
    { termino: "NTA", definicion: "Namibia Training Authority, which collects the levy and runs the National Training Fund." },
    { termino: "Payroll", definicion: "The total remuneration you pay your employees, as defined in the Labour Act." },
  ],
});
