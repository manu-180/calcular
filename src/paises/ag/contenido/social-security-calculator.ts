import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ag.social-security-calculator",
  h1: "Social Security calculator Antigua and Barbuda {{anio}}",
  title: "Social Security calculator {{anio}}: your deduction",
  description: "Work out your Antigua and Barbuda Social Security contribution with the current rates and the monthly ceiling of {{ag.ss-ceiling-monthly}}.",
  intro: [
    "Enter your gross monthly pay and your sector to see what comes off your pay for Social Security and what your employer adds on top.",
    "Since {{ag.ss-employee-rate#desde}} an employee in the private sector pays {{ag.ss-employee-rate[private]}} and the employer pays {{ag.ss-employer-rate[private]}}. In the public sector the employee pays {{ag.ss-employee-rate[public]}} and the employer {{ag.ss-employer-rate[public]}}.",
  ],
  comoSeCalcula: [
    "Contributions are worked out on insurable earnings, which are your pay up to a ceiling of {{ag.ss-ceiling-monthly}} a month.",
    "Multiply the insurable earnings by your share and by your employer's share. Your employer deducts your share from your pay and pays both to the Social Security Board.",
    "Overtime, vacation pay, bonuses, commissions and housing allowances count as earnings, according to the Board's contributions FAQ.",
  ],
  ejemplo: [
    "On EC$4,000 a month in the private sector, the employee pays EC$280 and the employer pays EC$360, so EC$640 goes into the fund. On EC$9,000 the contribution is still worked out on EC$6,500: EC$455 from the employee and EC$585 from the employer.",
  ],
  faq: [
    {
      pregunta: "What are the contribution rates for 2025 onwards?",
      respuesta: "The Social Security Board's media release of 31 December 2024 sets the totals at 16% for the private sector and 15% for the public sector. Employees pay 7% and 6%, and employers pay 9% in both.",
    },
    {
      pregunta: "What is the most I can pay each month?",
      respuesta: "The Board's FAQ gives maximum insurable earnings of {{ag.ss-ceiling-monthly}} a month. At the private sector rate that is a deduction of EC$455 for the employee and EC$585 for the employer.",
    },
    {
      pregunta: "When must an employer pay the contributions?",
      respuesta: "Within 14 days after the end of the month, according to the Board's FAQ. A late payment carries a surcharge of 10% of the contributions due.",
    },
  ],
  glosario: [
    { termino: "Insurable earnings", definicion: "The pay that contributions are worked out on, up to the monthly ceiling." },
    { termino: "Ceiling", definicion: "The highest monthly pay counted for contributions." },
    { termino: "Private sector rate", definicion: "The combined 16% share of employee and employer for workers outside government." },
  ],
});
