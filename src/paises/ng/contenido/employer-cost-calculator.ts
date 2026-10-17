import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ng.employer-cost-calculator",
  h1: "Employer cost calculator",
  title: "Employer cost calculator Nigeria: pension and NSITF",
  description: "See what an employee really costs: gross pay plus the {{ng.pension-employer}} employer pension and the {{ng.nsitf-rate}} Employees' Compensation contribution.",
  intro: [
    "Hiring in Nigeria costs more than the salary. Enter the pay to see the employer's pension and Employees' Compensation Scheme contributions on top.",
  ],
  comoSeCalcula: [
    "Employer pension: at least {{ng.pension-employer}} of monthly emoluments (basic, housing and transport at least).",
    "Employees' Compensation Scheme: {{ng.nsitf-rate}} of total monthly payroll, paid to the Nigeria Social Insurance Trust Fund.",
    "Cost to the employer is gross pay plus both contributions.",
  ],
  ejemplo: ["An employee on ₦500,000 a month, with ₦450,000 pensionable, costs ₦550,000: ₦45,000 of pension and ₦5,000 to NSITF."],
  faq: [
    {
      pregunta: "What does the NSITF contribution cover?",
      respuesta: "It funds compensation for workers injured at work or who fall ill because of their job, without having to prove the employer was at fault.",
    },
    {
      pregunta: "Are there other employer costs?",
      respuesta: "Possibly, depending on your size and sector, such as group life insurance or training levies. This calculator covers pension and NSITF only.",
    },
    {
      pregunta: "Is the employee's own 8% part of this cost?",
      respuesta: "No. The employee's pension share comes out of gross pay. Use the net salary calculator to see it.",
    },
  ],
  glosario: [
    { termino: "NSITF", definicion: "Nigeria Social Insurance Trust Fund, which runs the Employees' Compensation Scheme." },
    { termino: "Payroll", definicion: "The total pay of all employees in a month." },
  ],
});
