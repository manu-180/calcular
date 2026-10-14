import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gb.employer-ni-calculator",
  h1: "Employer National Insurance calculator 2026/27",
  title: "Employer NI calculator 2026/27: true cost of an employee",
  description:
    "Work out employer National Insurance at {{gb.ni-employer-rate}} above {{gb.ni-secondary-threshold}}, pension and Employment Allowance, and see what a salary really costs your business.",
  intro: [
    "A salary costs a business more than the number on the contract. On top of it you pay employer National Insurance and at least the minimum workplace pension.",
    "Enter the salary to see the total yearly and monthly cost for 2026/27.",
  ],
  comoSeCalcula: [
    "Employer National Insurance is {{gb.ni-employer-rate}} of the salary above the Secondary Threshold of {{gb.ni-secondary-threshold}} a year. There is no upper limit.",
    "Employment Allowance lets eligible employers take up to {{gb.employment-allowance}} a year off their employer National Insurance bill.",
    "The employer pension contribution is the percentage you enter, applied to the full salary.",
  ],
  ejemplo: ["A £30,000 salary costs £3,750 in employer National Insurance and £900 in pension at 3%. The total is £34,650 a year, or £2,887.50 a month."],
  faq: [
    {
      pregunta: "Who can claim Employment Allowance?",
      respuesta:
        "Most businesses and charities that pay employer Class 1 National Insurance. If your company has only one director, they must not be the only employee you pay employer National Insurance for. Groups of connected companies can claim it for only one company.",
    },
    {
      pregunta: "What is the minimum employer pension contribution?",
      respuesta:
        "Under auto-enrolment the employer pays at least 3% of qualifying earnings, which is a band of pay rather than the whole salary. Many employers pay more or use the full salary, so check your scheme.",
    },
    {
      pregunta: "Do employers pay less National Insurance for some employees?",
      respuesta:
        "Yes. Lower employer rates apply to some employees, such as those under 21 and apprentices under 25. This calculator uses the standard rate, so check the National Insurance category on your payroll.",
    },
  ],
  glosario: [
    { termino: "Secondary Threshold", definicion: "The level of pay above which the employer starts paying National Insurance." },
    { termino: "Employment Allowance", definicion: "A yearly reduction of the employer National Insurance bill for eligible businesses." },
  ],
});
