import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gb.dividend-tax",
  h1: "Dividend tax calculator 2026/27",
  title: "Dividend tax calculator 2026/27: rates and allowance",
  description:
    "Work out the tax on your dividends for 2026/27: {{gb.dividend-allowance}} allowance, then {{gb.dividend-rates[basic]}}, {{gb.dividend-rates[higher]}} or {{gb.dividend-rates[additional]}} depending on your band.",
  intro: [
    "If you own shares or run your own limited company, dividends are taxed separately from your salary, at their own rates. These are the rates for the tax year from 6 April 2026 to 5 April 2027.",
    "Enter your dividends and your other taxable income for the year to see how much dividend tax you owe.",
  ],
  comoSeCalcula: [
    "Your Personal Allowance of {{gb.personal-allowance}} is used by your other income first. Any part left over covers dividends.",
    "The first {{gb.dividend-allowance}} of dividends is tax free. This is the Dividend Allowance, and it still uses up part of your band.",
    "The rest is taxed at {{gb.dividend-rates[basic]}} in the basic rate band, {{gb.dividend-rates[higher]}} in the higher rate band and {{gb.dividend-rates[additional]}} above {{gb.additional-rate-threshold}} of taxable income.",
    "Dividends are added on top of your other income, so they are taxed at the highest band they reach.",
  ],
  ejemplo: [
    "HMRC's example: with £29,570 of wages and £3,000 of dividends, {{gb.dividend-allowance}} is covered by the allowance and £2,500 is taxed at {{gb.dividend-rates[basic]}}. The dividend tax is £268.75.",
  ],
  faq: [
    {
      pregunta: "Do I need to tell HMRC about my dividends?",
      respuesta: "Not if they are covered by your unused Personal Allowance and the Dividend Allowance. Above that you need to report them to HMRC, either through your tax code or a Self Assessment tax return.",
    },
    {
      pregunta: "Are dividends in an ISA taxed?",
      respuesta: "No. Dividends from shares held in an ISA are tax free and do not use your Dividend Allowance.",
    },
    {
      pregunta: "Do Scottish taxpayers pay different dividend tax?",
      respuesta: "No. Dividend tax rates and bands are the same across the UK, even if your salary is taxed at Scottish rates.",
    },
  ],
  glosario: [
    { termino: "Dividend", definicion: "A payment a company makes to its shareholders out of its profits." },
    { termino: "Dividend Allowance", definicion: "The amount of dividends you can receive each year without paying tax." },
  ],
});
