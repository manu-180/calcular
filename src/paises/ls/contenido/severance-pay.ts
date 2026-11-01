import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ls.severance-pay",
  h1: "Severance pay calculator for Lesotho",
  title: "Severance pay calculator Lesotho: two weeks per year",
  description: "Work out your severance pay under the Labour Act 2024: {{ls.severance-weeks}} of wages for each completed year of continuous service with the same employer.",
  intro: [
    "Enter your monthly wage when the job ends and your completed years of service. You get the minimum severance payment the law gives you.",
    "The rule is in section 136 of the Labour Act, 2024.",
  ],
  comoSeCalcula: [
    "You need more than one year of continuous service with the same employer.",
    "For each completed year you get {{ls.severance-weeks}} of wages, at the rate paid when your job ends.",
    "The Act does not say how to turn a monthly wage into a week's wage. This calculator uses the Act's own hourly rule: monthly wage divided by {{ls.hours-divisor[monthly]}}, times {{ls.hours-divisor[weekly]}}.",
  ],
  ejemplo: ["After five years on M6 000 a month, a week's wage is M1 384.62 and severance pay is M13 846.20."],
  faq: [
    {
      pregunta: "Do I get severance pay if I am dismissed for misconduct?",
      respuesta: "No. A worker fairly dismissed for misconduct is not entitled to severance pay.",
    },
    {
      pregunta: "What if my employer has its own separation scheme?",
      respuesta: "If the scheme pays more than statutory severance, the employer must pay the better benefit. You cannot claim both unless the employer agrees.",
    },
    {
      pregunta: "What happens if the employer does not pay?",
      respuesta: "Failing to pay severance under section 136 is an offence under section 137, punishable by a fine or imprisonment.",
    },
    {
      pregunta: "Is severance pay taxed?",
      respuesta: "Yes. Severance pay is employment income under section 18(1) of the Income Tax Act, so PAYE applies.",
    },
  ],
  glosario: [
    { termino: "Severance payment", definicion: "A lump sum paid when the employment ends, based on years of service." },
    { termino: "Continuous service", definicion: "Unbroken employment with the same employer." },
  ],
});
