import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lk.gratuity-tax-calculator",
  h1: "Gratuity tax calculator",
  title: "Gratuity tax calculator Sri Lanka: tax on terminal benefits",
  description:
    "Check the tax on a retiring gratuity, commuted pension, ETF at retirement or loss of office pay. No tax on the first {{lk.terminal-benefits-bands[0].hasta}} in a year.",
  intro: [
    "When you retire or lose your job, some lump sums are taxed apart from your salary at their own lower rates. This calculator applies those rates.",
    "Add up what you received in the same year of assessment: retiring gratuity, commuted pension, ETF paid at or after retirement, and compensation for loss of employment paid under a scheme that applies to all staff.",
  ],
  comoSeCalcula: [
    "The amounts are added together for the year.",
    "Up to {{lk.terminal-benefits-bands[0].hasta}} the rate is {{lk.terminal-benefits-bands[0].tasa}}.",
    "From {{lk.terminal-benefits-bands[1].desde}} to {{lk.terminal-benefits-bands[1].hasta}} the slice above the first limit is taxed at {{lk.terminal-benefits-bands[1].tasa}}.",
    "Above {{lk.terminal-benefits-bands[-1].desde}} you pay {{lk.terminal-benefits-bands[-1].cuotaFija}} plus {{lk.terminal-benefits-bands[-1].tasa}} of the excess.",
  ],
  ejemplo: [
    "A gratuity of Rs. 12,000,000 and an ETF payment of Rs. 3,000,000 add up to Rs. 15,000,000. The tax is 6% of Rs. 5,000,000, so Rs. 300,000.",
  ],
  faq: [
    {
      pregunta: "Is my EPF withdrawal included?",
      respuesta: "The list in the Inland Revenue Act covers commuted pension, retiring gratuity, compensation for loss of office and ETF at retirement. EPF is not in that list, so this calculator leaves it out.",
    },
    {
      pregunta: "Which compensation counts?",
      respuesta: "Only compensation for loss of office or employment paid under a scheme that the Commissioner General considers to apply uniformly to all employees of that employer.",
    },
    {
      pregunta: "Is this added to my salary for the tax bands?",
      respuesta: "No. The Act taxes these payments at their own rates, and only the rest of your taxable income goes through the normal income tax bands.",
    },
  ],
  glosario: [
    { termino: "Retiring gratuity", definicion: "The lump sum an employer pays when you leave after years of service." },
    { termino: "Commuted pension", definicion: "Part of a pension taken as one payment instead of monthly." },
  ],
});
