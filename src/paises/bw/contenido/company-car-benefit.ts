import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bw.company-car-benefit",
  h1: "Company car benefit tax calculator",
  title: "Company car benefit calculator Botswana: extra PAYE",
  description: "Work out the taxable value of a company car in Botswana and the extra PAYE it adds to your payslip, with the BURS rule of {{bw.car-benefit-rate}} of the cost a year.",
  intro: [
    "If your employer gives you a car you can also use privately, its value is added to your pay and taxed through PAYE. Enter what the car cost and your salary to see the extra tax.",
  ],
  comoSeCalcula: [
    "The yearly benefit is {{bw.car-benefit-rate}} of what the car cost your employer, or of its market value when the lease started if it is leased.",
    "For monthly pay the benefit is divided by 12 and added to your salary.",
    "The extra PAYE is the tax on your salary with the benefit less the tax without it.",
  ],
  ejemplo: [
    "A car that cost P450 000 adds P3 750 a month to your taxable pay. On a salary of P30 000 that means about P948 more PAYE each month.",
  ],
  faq: [
    {
      pregunta: "Does it matter how much I use the car privately?",
      respuesta: "No. Regulation 24 counts the full benefit whenever the car is available for your private use, even on days you do not use it privately.",
    },
    {
      pregunta: "Are fuel and maintenance included?",
      respuesta: "The regulation says the motor vehicle benefit includes maintenance and running costs your employer pays for your private use, so they are not added again.",
    },
    {
      pregunta: "Which vehicles count?",
      respuesta: "A road vehicle designed to carry a load of less than one tonne and fewer than nine seated passengers, including motorcycles and safari vehicles. A car only made available for work is not a benefit.",
    },
  ],
  glosario: [
    { termino: "Non-cash benefit", definicion: "Something of value your employer gives you other than money, such as a car, housing or school fees. It is taxed like salary." },
  ],
});
