import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us.capital-gains-tax",
  h1: "Capital gains tax calculator",
  title: "Capital Gains Tax Calculator 2026: 0%, 15% and 20% rates",
  description:
    "Estimate the federal tax on selling stocks, funds or property in 2026: long-term rates of 0%, 15% and 20%, short-term gains and the 3.8% investment tax.",
  intro: [
    "When you sell an investment for more than you paid, the profit is a capital gain. How it's taxed depends on how long you held it and on the rest of your income.",
    "Enter the gain, your other taxable income and your filing status to see the federal tax.",
  ],
  comoSeCalcula: [
    "Assets held more than a year get long-term rates. The gain stacks on top of your other taxable income.",
    "The part that fits under {{us.cg-zero-max[single]}} of total taxable income ({{us.cg-zero-max[mfj]}} on a joint return, {{us.cg-zero-max[hoh]}} for heads of household) pays 0%.",
    "The part up to {{us.cg-15-max[single]}} ({{us.cg-15-max[mfj]}} jointly, {{us.cg-15-max[hoh]}} for heads of household, {{us.cg-15-max[mfs]}} filing separately) pays 15%. The rest pays 20%.",
    "Short-term gains are taxed at your ordinary rates: the calculator figures the tax on your income with and without the gain.",
    "If your modified AGI is above {{us.niit-threshold[single]}} ({{us.niit-threshold[mfj]}} jointly), the net investment income tax adds {{us.niit-rate}} on the gain or on the excess income, whichever is smaller.",
  ],
  ejemplo: [
    "A single filer with $40,000 of other taxable income sells stock held for three years with a $20,000 gain. $9,450 falls in the 0% band and $10,550 pays 15%. The tax is $1,582.50.",
  ],
  faq: [
    {
      pregunta: "What are the capital gains tax rates for 2026?",
      respuesta: "0%, 15% or 20% for long-term gains, depending on your taxable income. Short-term gains pay your regular rates from 10% to 37%.",
    },
    {
      pregunta: "Do I pay capital gains tax when I sell my house?",
      respuesta:
        "Often not. If you owned and lived in the home for two of the last five years, up to $250,000 of gain is excluded, or $500,000 for married couples filing jointly. Only the gain above that is taxed.",
    },
    {
      pregunta: "Can losses lower my capital gains tax?",
      respuesta: "Yes. Capital losses offset gains first. If losses are larger, up to $3,000 a year ($1,500 if married filing separately) can offset other income and the rest carries forward.",
    },
  ],
  glosario: [
    { termino: "Cost basis", definicion: "What you paid for an investment, plus fees and improvements. Your gain is the sale price minus this." },
    { termino: "Holding period", definicion: "How long you owned the asset. More than one year makes the gain long term." },
  ],
});
