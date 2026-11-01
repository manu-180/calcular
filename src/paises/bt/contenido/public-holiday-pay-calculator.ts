import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.public-holiday-pay-calculator",
  h1: "Public holiday pay calculator Bhutan",
  title: "Public holiday pay in Bhutan: the {{bt.public-holiday-premium}} extra",
  description: "Find out what you are owed for working a public holiday in Bhutan. The Act adds {{bt.public-holiday-premium}} of your normal pay for each day. Enter your pay to see the sum.",
  intro: [
    "If your employer asks you to work on a public holiday in Bhutan, you are owed an additional {{bt.public-holiday-premium}} of your normal rate of pay for that day. The rule sits in section 110 of the Labour and Employment Act of Bhutan 2007.",
    "Every employee is entitled to at least {{bt.public-holidays-min}} paid public holidays a year, including the birth anniversary of His Majesty the King and the National Day.",
  ],
  comoSeCalcula: [
    "Take the normal rate of pay for a month. The Act leaves out allowances, bonuses and overtime.",
    "Divide by the number of days your employer uses for a month. The Act does not fix this number, so use the one on your payslip.",
    "Multiply the daily rate by {{bt.public-holiday-premium}}, then by the number of holidays you worked.",
    "The holiday is paid leave at your normal rate, so the extra comes on top of that day's pay (section 108).",
  ],
  ejemplo: [
    "You earn Nu. 30,000 a month and your employer divides the month into 30 days, so one day is Nu. 1,000. You work two public holidays. The extra is 1,000 × 50 % × 2, which is Nu. 1,000. With the normal pay for those two days, you receive Nu. 3,000.",
  ],
  faq: [
    {
      pregunta: "How many paid public holidays do I get in Bhutan?",
      respuesta: "At least {{bt.public-holidays-min}} each year, including the birth anniversary of His Majesty the King and the National Day (section 108).",
    },
    {
      pregunta: "How much extra do I get for working on a public holiday?",
      respuesta: "An additional {{bt.public-holiday-premium}} of your normal rate of pay (section 110).",
    },
    {
      pregunta: "Can my employer swap a public holiday for another day?",
      respuesta: "Yes, if the employer agrees it with the employees. Section 109 allows a public holiday to be substituted with another public holiday.",
    },
    {
      pregunta: "Is night duty paid the same way?",
      respuesta: "No. Night duty outside the normal shift earns an additional {{bt.night-duty-premium}} of the normal rate for each hour worked (section 125).",
    },
  ],
  glosario: [
    { termino: "Normal rate of pay", definicion: "The rate for a unit of work or time, without allowances, bonuses, overtime or other benefits." },
    { termino: "Public holiday", definicion: "A day taken as leave with pay at the employee's normal rate (section 108)." },
  ],
});
