import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.employer-payroll-cost",
  h1: "Employer payroll cost calculator 2026",
  title: "Employer cost of an employee in Canada 2026",
  description: "See what a salary really costs an employer in 2026 with employer CPP or QPP, EI at {{ca.ei-rates[employer]}} and QPIP in Quebec. Uses CRA payroll figures.",
  intro: [
    "Enter a yearly salary to see the employer's share of CPP or QPP, EI premiums and, in Quebec, QPIP premiums, and the total cost of the job.",
    "It is a starting point for budgeting a hire. Benefits, provincial employer health taxes and workers' compensation premiums vary by employer and are not included.",
  ],
  comoSeCalcula: [
    "The employer matches the employee's CPP: {{ca.cpp-rates[base]}} plus {{ca.cpp-rates[first]}} on earnings between {{ca.cpp[exemption]}} and {{ca.cpp[ympe]}}, and {{ca.cpp-rates[second]}} between {{ca.cpp[ympe]}} and {{ca.cpp[yampe]}}.",
    "Employer EI is {{ca.ei-rates[employer]}} of insurable earnings up to {{ca.ei-maximum}}, or {{ca.ei-rates[employer-qc]}} in Quebec.",
    "In Quebec the employer also pays QPIP at {{ca.qpip-rates[employer]}} on earnings up to {{ca.qpip-maximum}}.",
  ],
  ejemplo: ["A $60,000 salary outside Quebec costs $3,361.75 of employer CPP and $1,369.20 of employer EI, so the total cost is $64,730.95 a year."],
  faq: [
    {
      pregunta: "Does the employer pay CPP2?",
      respuesta: "Yes. The employer matches the employee's second additional contribution on earnings between {{ca.cpp[ympe]}} and {{ca.cpp[yampe]}}.",
    },
    {
      pregunta: "Why is employer EI higher than the employee's?",
      respuesta: "The employer rate is {{ca.ei-rates[employer]}} against {{ca.ei-rates[employee]}} for the employee, so the employer pays 1.4 times as much.",
    },
    {
      pregunta: "Is vacation pay included?",
      respuesta: "No. Vacation pay is part of the employee's pay. Add it to the salary if you want to include it.",
    },
  ],
  glosario: [
    { termino: "Employer contributions", definicion: "Amounts the employer pays on top of the salary, separate from what is deducted from the employee." },
    { termino: "QPIP", definicion: "Quebec Parental Insurance Plan, paid by employees and employers in Quebec." },
  ],
});
