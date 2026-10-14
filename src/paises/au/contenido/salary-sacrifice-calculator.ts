import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "au.salary-sacrifice-calculator",
  h1: "Salary sacrifice calculator",
  title: "Salary sacrifice super calculator 2026-27",
  description: "See how much tax you save by salary sacrificing into super, what it costs your take-home pay and how much room is left under the {{au.tope-concesional}} cap.",
  intro: [
    "Salary sacrifice means part of your salary goes into your super fund instead of your bank account. That lowers your taxable income.",
    "Enter your salary and the amount you want to sacrifice. You see the income tax you save, the {{au.impuesto-aportes}} contributions tax your fund pays and the change in your take-home pay.",
  ],
  comoSeCalcula: [
    "Your income tax and Medicare levy are worked out twice with the 2026-27 rates: on your full salary and on your salary minus the sacrifice.",
    "The difference is what you save in personal tax. Your fund then pays {{au.impuesto-aportes}} contributions tax on the sacrificed amount.",
    "Your employer's super guarantee of {{au.super-guarantee}} plus your sacrifice count towards the concessional contributions cap of {{au.tope-concesional}}.",
  ],
  ejemplo: [
    "On a $100,000 salary, sacrificing $10,000 saves $3,200 of income tax and Medicare levy. The fund pays $1,500 contributions tax, so you are $1,700 better off overall. Your take-home pay falls by $6,800.",
  ],
  faq: [
    {
      pregunta: "What is the concessional contributions cap?",
      respuesta: "From 1 July 2026 it is {{au.tope-concesional}} a year. It covers your employer's contributions, salary sacrifice and personal contributions you claim as a tax deduction.",
    },
    {
      pregunta: "What happens if I go over the cap?",
      respuesta: "Excess concessional contributions are included in your taxable income and taxed at your marginal tax rate.",
    },
    {
      pregunta: "Does salary sacrifice reduce my employer's super?",
      respuesta: "No. The ATO says salary sacrifice contributions do not reduce the amount your employer works out your super guarantee on.",
    },
    {
      pregunta: "What is Division 293 tax?",
      respuesta: "It is extra tax on concessional contributions when your combined income and concessional contributions are more than {{au.div293-umbral}}.",
    },
  ],
  glosario: [
    { termino: "Salary sacrifice", definicion: "An agreement with your employer to pay part of your salary into super before tax." },
    { termino: "Concessional contributions", definicion: "Before-tax contributions to super, taxed in the fund at {{au.impuesto-aportes}}." },
    { termino: "Marginal tax rate", definicion: "The rate of tax on the last dollar you earn." },
  ],
});
