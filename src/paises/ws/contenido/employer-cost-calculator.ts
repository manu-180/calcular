import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ws.employer-cost-calculator",
  h1: "Employer cost calculator Samoa {{anio}}",
  title: "Employer cost calculator Samoa {{anio}}: true cost of staff",
  description: "Add the {{ws.npf-employer-rate}} employer NPF contribution to gross pay and see what each employee costs you a month, a year and an hour.",
  intro: [
    "Hiring someone in Samoa costs more than the wage on the contract. The one statutory add-on we can source to a government publication is the employer share of the National Provident Fund, which is {{ws.npf-employer-rate}} of wages.",
    "Enter gross pay and the number of employees to see the real monthly and yearly cost, plus the cost of one working hour on a {{ws.standard-week-hours}} hour week.",
  ],
  comoSeCalcula: [
    "Employer NPF is {{ws.npf-employer-rate}} of gross wages, and the wages include overtime, allowances and bonuses.",
    "The cost of one employee is gross pay plus that contribution. PAYE and the employee's own NPF share are taken out of the wage and are not an extra cost to you.",
    "The hourly cost divides the monthly cost by the hours in an average month: {{ws.standard-week-hours}} hours a week, 52 weeks, divided by 12.",
  ],
  ejemplo: [
    "An employee paid WS$3,000 a month costs WS$3,300 once the WS$300 employer NPF share is added. Over a year that is WS$39,600, or about WS$19.04 for each working hour.",
  ],
  faq: [
    {
      pregunta: "Does the employer pay PAYE as well?",
      respuesta: "No. PAYE is deducted from the employee's pay and passed to the Ministry for Revenue by the 15th of the next month. It is the employee's tax, not an addition to your cost.",
    },
    {
      pregunta: "When does the NPF payment fall due?",
      respuesta: "By the 7th day after month end. The NPF Employers Guide adds a surcharge of 2% a month if the payment is still outstanding 21 days after the end of the month.",
    },
    {
      pregunta: "Which hours does the Act count as a normal week?",
      respuesta: "Section 47 of the Labour and Employment Relations Act 2013 sets {{ws.standard-week-hours}} hours a week and 8 hours a day as the limit before overtime applies.",
    },
  ],
  glosario: [
    { termino: "Employer on-cost", definicion: "A cost the employer carries on top of the wage, such as the NPF match." },
    { termino: "Gross pay", definicion: "Wages before any deduction." },
  ],
});
