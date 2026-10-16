import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ng.pension-calculator",
  h1: "Pension contribution calculator",
  title: "Pension calculator Nigeria: 8% employee and 10% employer",
  description:
    "Work out your monthly pension contributions under the Pension Reform Act 2014: {{ng.pension-employee}} from you and {{ng.pension-employer}} from your employer.",
  intro: [
    "Under the Contributory Pension Scheme, you and your employer pay into your Retirement Savings Account (RSA) every month. Enter your pay to see both shares.",
  ],
  comoSeCalcula: [
    "Contributions are a share of your monthly emoluments, which can be no less than basic salary plus housing and transport allowances.",
    "You pay at least {{ng.pension-employee}} and your employer at least {{ng.pension-employer}}, so at least 18% goes into your RSA.",
  ],
  ejemplo: ["With ₦250,000 basic, ₦125,000 housing and ₦75,000 transport, ₦36,000 comes from you and ₦45,000 from your employer: ₦81,000 a month."],
  faq: [
    {
      pregunta: "Can my employer pay all of it?",
      respuesta: "Yes. An employer can take on the whole contribution, as long as the total is not less than 18% of your monthly emoluments.",
    },
    {
      pregunta: "Can I contribute more than 8%?",
      respuesta: "Yes, as a voluntary contribution, provided your total contributions and other deductions stay within one third of your monthly emoluments.",
    },
    {
      pregunta: "Is my pension contribution taxed?",
      respuesta: "No. Your contributions under the Pension Reform Act are a deduction when your income tax is worked out.",
    },
  ],
  glosario: [
    { termino: "RSA", definicion: "Retirement Savings Account, the personal account your contributions go into." },
    { termino: "PFA", definicion: "Pension Fund Administrator, the company that invests your RSA." },
    { termino: "PenCom", definicion: "National Pension Commission, the regulator of the scheme." },
  ],
});
