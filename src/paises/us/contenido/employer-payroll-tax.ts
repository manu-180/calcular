import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us.employer-payroll-tax",
  h1: "Employer payroll tax calculator",
  title: "Employer Payroll Tax Calculator 2026: cost of an employee",
  description:
    "Figure what an employee really costs in 2026: wages plus the employer's Social Security, Medicare, FUTA and state unemployment tax. For small business owners.",
  intro: [
    "Hiring someone costs more than the salary. As the employer you pay your own share of Social Security and Medicare, plus federal and state unemployment taxes.",
    "Enter the yearly wages to see each tax and the full cost per employee.",
  ],
  comoSeCalcula: [
    "Social Security: {{us.social-security-rate}} of wages up to {{us.social-security-wage-base}}.",
    "Medicare: {{us.medicare-rate}} of all wages. Unlike employees, employers never pay the Additional Medicare Tax.",
    "FUTA: {{us.futa-rate}} of the first {{us.futa-wage-base}} of each employee's wages, minus a credit of up to {{us.futa-credit}} for paying state unemployment tax. Most employers pay a net 0.6%.",
    "SUTA: the rate your state assigns you, on wages up to your state's wage base.",
  ],
  ejemplo: ["An employee paid $50,000 a year costs $53,867: $3,100 of Social Security, $725 of Medicare and $42 of FUTA, before state unemployment tax."],
  faq: [
    {
      pregunta: "How much does an employee cost on top of salary?",
      respuesta: "Federal payroll taxes add about 7.7% for most salaries. State unemployment tax, benefits and workers' compensation usually push the total higher.",
    },
    {
      pregunta: "What is my SUTA rate?",
      respuesta: "Each state sets it every year based on your industry and how many former employees claimed unemployment. New employers get a standard starting rate from the state.",
    },
    {
      pregunta: "Do I pay these taxes for contractors?",
      respuesta: "No. Independent contractors who get a 1099 pay their own self-employment tax. Classify workers carefully, because the IRS and the Department of Labor look at how the work is controlled, not at the contract's title.",
    },
  ],
  glosario: [
    { termino: "FUTA", definicion: "The Federal Unemployment Tax Act tax, paid only by employers." },
    { termino: "SUTA", definicion: "State unemployment tax. The rate and wage base change by state and by employer." },
  ],
});
