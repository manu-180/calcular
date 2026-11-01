import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ag.employer-cost-calculator",
  h1: "Employer cost calculator Antigua and Barbuda {{anio}}",
  title: "Employer cost calculator {{anio}}: what a salary costs",
  description: "Add the employer Social Security share of {{ag.ss-employer-rate[private]}} and Medical Benefits of {{ag.mbs-employer-rate}} to a monthly salary.",
  intro: [
    "A salary is not the whole cost of an employee. Enter the gross monthly pay to see the contributions an employer in Antigua and Barbuda pays on top.",
    "There is no payroll income tax to add, because the law no longer sets personal income tax allowances after income year 2016. The employer cost is the pay plus two contributions.",
  ],
  comoSeCalcula: [
    "Employer Social Security is {{ag.ss-employer-rate[private]}} of pay up to the ceiling of {{ag.ss-ceiling-monthly}} a month. The rate is the same in the private and public sectors.",
    "Employer Medical Benefits is {{ag.mbs-employer-rate}} of the wages of employees under 60, with no ceiling in regulation 17 of the Medical Benefits Regulations, 2011.",
    "Add both to the gross pay for the monthly cost, then multiply by 12 for the year. Vacation pay, severance and other benefits are not included.",
  ],
  ejemplo: [
    "For an employee on EC$4,000 a month, the employer pays EC$360 to Social Security and EC$140 to Medical Benefits. The monthly cost is EC$4,500 and the yearly cost is EC$54,000.",
  ],
  faq: [
    {
      pregunta: "What does an employer pay on top of salary?",
      respuesta: "Social Security at {{ag.ss-employer-rate[private]}} up to {{ag.ss-ceiling-monthly}} of monthly pay, and Medical Benefits at {{ag.mbs-employer-rate}} for employees under 60.",
    },
    {
      pregunta: "Does the employer pay income tax for employees?",
      respuesta: "There is no payroll income tax to withhold. The Personal Income Tax (Amendment) Act, 2016 sets allowances only up to income year 2016, and the 2026 budget estimates list no personal income tax among direct tax revenue.",
    },
    {
      pregunta: "When are the contributions due?",
      respuesta: "Employers pay Social Security and Medical Benefits contributions by the 14th day of the month that follows, with a 10% surcharge on late payments.",
    },
  ],
  glosario: [
    { termino: "Gross pay", definicion: "Pay before any deduction." },
    { termino: "Employer on-costs", definicion: "Contributions the employer pays that do not come out of the employee's pay." },
    { termino: "Ceiling", definicion: "The highest monthly pay on which Social Security is charged." },
  ],
});
