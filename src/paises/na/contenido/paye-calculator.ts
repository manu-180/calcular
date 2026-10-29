import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "na.paye-calculator",
  h1: "PAYE calculator Namibia",
  title: "PAYE calculator Namibia: income tax on your salary",
  description:
    "Work out your PAYE and yearly income tax with the NamRA bands. The first {{na.income-tax-bands[0].hasta}} a year is tax free and the top rate is {{na.income-tax-bands[-1].tasa}}.",
  intro: [
    "Enter your taxable income for a month or a year and see the PAYE your employer should deduct, your yearly tax and your marginal rate.",
    "Contributions to a pension, provident or retirement annuity fund and education policies lower your taxable income, up to {{na.retirement-deduction-cap}} a year in total.",
  ],
  comoSeCalcula: [
    "Monthly amounts are multiplied by 12, because the tax year runs from 1 March to the end of February.",
    "Your deductible contributions, capped at {{na.retirement-deduction-cap}} a year, come off your income.",
    "The bands apply to what is left: nothing up to {{na.income-tax-bands[1].desde}}, then {{na.income-tax-bands[1].tasa}} up to {{na.income-tax-bands[1].hasta}}, rising step by step to {{na.income-tax-bands[-1].tasa}} above {{na.income-tax-bands[-1].desde}}.",
    "Monthly PAYE is the yearly tax divided by 12.",
  ],
  ejemplo: [
    "A taxable income of N$300,000 a year falls in the 25% band. Tax is N$9,000 for the 18% band plus 25% of the N$150,000 above N$150,000, so N$46,500 a year or N$3,875 a month. NamRA's own calculator gives the same figure.",
  ],
  faq: [
    {
      pregunta: "When do I have to register as a taxpayer?",
      respuesta: "NamRA says anyone who earns a salary of more than {{na.income-tax-bands[0].hasta}} a year should register and give proof of registration to the employer.",
    },
    {
      pregunta: "Is my housing allowance taxed?",
      respuesta: "Yes. NamRA exempts one third of it only if your employer runs an approved housing scheme. Otherwise enter the full allowance as taxable income.",
    },
    {
      pregunta: "When is the tax return due?",
      respuesta: "Salaried individuals file their return of income by 30 June each year, for the tax year that ended in February.",
    },
    {
      pregunta: "I earn from two jobs. How is that taxed?",
      respuesta: "The rate is based on your combined income, so add both salaries together before using the calculator.",
    },
  ],
  glosario: [
    { termino: "PAYE", definicion: "Pay As You Earn, the employees' tax your employer deducts from your salary every month and pays to NamRA." },
    { termino: "NamRA", definicion: "Namibia Revenue Agency, which collects income tax, VAT and customs duties." },
    { termino: "Marginal rate", definicion: "The rate that applies to the last dollar you earn." },
  ],
});
