import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sc.presumptive-tax-calculator",
  h1: "Seychelles presumptive tax calculator {{anio}}",
  title: "Seychelles presumptive tax {{anio}}: {{sc.presumptive-tax-rate}} of turnover",
  description: "Small business tax in Seychelles: a flat {{sc.presumptive-tax-rate}} of turnover for businesses under {{sc.presumptive-tax-limit}} a year. Work out your yearly bill.",
  intro: [
    "Presumptive tax is the simple option for small businesses. You pay a flat percentage of your turnover and you do not deduct expenses.",
    "The SRC introduced it in January 2013 under the Tenth Schedule of the Business Tax Act. It applies when annual turnover is below {{sc.presumptive-tax-limit}}.",
  ],
  comoSeCalcula: [
    "Take your turnover for the year, which is the income you received.",
    "Multiply it by {{sc.presumptive-tax-rate}}. That is the tax for the year.",
    "You file a one page return by 31 March and pay the tax with it. If your turnover reaches {{sc.presumptive-tax-limit}}, you move to the ordinary business tax regime.",
  ],
  ejemplo: [
    "A market stall with turnover of SCR 600,000 in the year owes 1.5 % of that amount, which is SCR 9,000. Spread over twelve months this is SCR 750.",
  ],
  faq: [
    {
      pregunta: "Can I pay as I earn?",
      respuesta: "Yes. Since 2022 the SRC lets businesses under the regime prepay 1.5 % of the income they receive each month and the amount is credited to the business account.",
    },
    {
      pregunta: "Which year's turnover counts?",
      respuesta: "The SRC example says the tax due in 2022 depends on the turnover of 2021, the year in which the revenue was earned.",
    },
    {
      pregunta: "Should I keep records of expenses?",
      respuesta: "Yes. No expenses are allowed under this regime, but the SRC asks for records for at least 7 years in case turnover later passes the limit.",
    },
  ],
  glosario: [
    { termino: "Turnover", definicion: "The income a business receives from its sales and services before any expense." },
    { termino: "Presumptive tax", definicion: "A flat tax on turnover that replaces the calculation of profit." },
    { termino: "Return", definicion: "The form a taxpayer files with the SRC to declare income and tax." },
  ],
});
