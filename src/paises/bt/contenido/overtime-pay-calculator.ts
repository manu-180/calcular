import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.overtime-pay-calculator",
  h1: "Overtime pay calculator Bhutan",
  title: "Overtime pay in Bhutan: what the Act guarantees",
  description: "Estimate overtime pay in Bhutan from your basic pay and hours. The Act sets a floor of {{bt.overtime-min-factor}} the normal rate. Add your own rate if you get more.",
  intro: [
    "In Bhutan an employee below supervisory level who works outside the normal hours must be paid overtime of at least the normal rate of pay. The Act sets that floor at {{bt.overtime-min-factor}} of the normal rate.",
    "The law does not give a standard overtime multiple above that floor, so this calculator lets you enter the multiple your contract or company rules use. Night duty and public holiday work have their own extra pay, covered on separate pages.",
  ],
  comoSeCalcula: [
    "Take your basic monthly pay. The Act's normal rate of pay leaves out allowances, bonuses, overtime and other benefits.",
    "Divide it by the normal working hours in your month to get the hourly rate. The Ministry fixes working hours by executive order (section 104), so use the hours in your contract.",
    "Multiply the hourly rate by your overtime multiple. It cannot be lower than {{bt.overtime-min-factor}}.",
    "Multiply by the overtime hours. If the work was night duty, add {{bt.night-duty-premium}} of the normal rate. If it was a public holiday, add {{bt.public-holiday-premium}}.",
  ],
  ejemplo: [
    "Your basic pay is Nu. 25,000 a month and your contract counts 208 working hours. The hourly rate is 25,000 ÷ 208, or Nu. 120.19. You work 10 overtime hours at the floor rate of 1, so you earn Nu. 1,201.92. At 1.5 times the rate the same hours earn Nu. 1,802.88.",
  ],
  faq: [
    {
      pregunta: "What is the minimum overtime rate in Bhutan?",
      respuesta: "Section 124 of the Labour and Employment Act of Bhutan 2007 requires overtime of a minimum of the employee's normal rate of pay, which is {{bt.overtime-min-factor}} of that rate.",
    },
    {
      pregunta: "Does overtime apply to managers?",
      respuesta: "Section 124 covers an employee below supervisory level. The Act defines a worker as an employee who is not a managerial or supervisory employee.",
    },
    {
      pregunta: "Is night duty paid extra?",
      respuesta: "Yes. Section 125 adds {{bt.night-duty-premium}} of the normal rate of pay for each hour of night duty an employee below supervisory level works outside the normal time.",
    },
    {
      pregunta: "What if I work on a public holiday?",
      respuesta: "Section 110 adds {{bt.public-holiday-premium}} of your normal rate of pay when the employer requires you to work on a public holiday.",
    },
  ],
  glosario: [
    { termino: "Normal rate of pay", definicion: "The rate for a unit of work or time. It leaves out allowances, bonuses, overtime and other benefits." },
    { termino: "Executive order", definicion: "The order in which the Ministry of Labour fixes the working hours (section 104)." },
  ],
});
