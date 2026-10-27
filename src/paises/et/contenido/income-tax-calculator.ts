import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "et.income-tax-calculator",
  h1: "Employment income tax calculator Ethiopia",
  title: "Ethiopia income tax calculator {{anio}}: salary tax bands",
  description:
    "Find the monthly income tax on your salary with the six bands of Proclamation 1395/2025, from 0% up to {{et.employment-income-tax[-1].tasa}}. See your band and its deduction.",
  intro: [
    "Employment income tax (Schedule A) is withheld by your employer every month. Enter your taxable income and see how much tax comes off, which band you are in and the deduction that goes with it.",
    "The bands are the ones set by the Income Tax (Amendment) Proclamation No. 1395/2025 for income earned from 8 July 2025.",
  ],
  comoSeCalcula: [
    "Income up to {{et.employment-income-tax[1].desde}} a month pays nothing.",
    "From {{et.employment-income-tax[1].desde}} to {{et.employment-income-tax[2].desde}} the rate is {{et.employment-income-tax[1].tasa}}, then {{et.employment-income-tax[2].tasa}} up to {{et.employment-income-tax[3].desde}}, {{et.employment-income-tax[3].tasa}} up to {{et.employment-income-tax[4].desde}} and {{et.employment-income-tax[4].tasa}} up to {{et.employment-income-tax[5].desde}}.",
    "Everything above {{et.employment-income-tax[-1].desde}} pays {{et.employment-income-tax[-1].tasa}}.",
    "Each rate applies only to the slice of income inside its band. Payroll staff often use the short form: income times the rate of your band, less the deduction shown in the result.",
  ],
  ejemplo: [
    "On ETB 10,000 a month the tax is ETB 1,650: nothing on the first 2,000, then 300, 600 and 750 on the next three slices. The short form gives the same: 10,000 × 25% less 850.",
  ],
  faq: [
    {
      pregunta: "Does the whole salary pay the top rate?",
      respuesta: "No. Only the part of your income inside each band pays that band's rate. Moving into a higher band never lowers your take-home pay.",
    },
    {
      pregunta: "What counts as taxable employment income?",
      respuesta: "Your salary and the allowances and benefits the law does not exempt. Your employer works out the taxable figure and withholds the tax.",
    },
    {
      pregunta: "What changed in July 2025?",
      respuesta: "Proclamation 1395/2025 raised the tax free part to {{et.employment-income-tax[1].desde}} a month and redrew the bands. The top rate stays at {{et.employment-income-tax[-1].tasa}}.",
    },
  ],
  glosario: [
    { termino: "Schedule A", definicion: "The part of the income tax law that covers employment income." },
    { termino: "Band", definicion: "A range of monthly income taxed at one rate." },
    { termino: "Effective rate", definicion: "Total tax divided by total income." },
  ],
});
