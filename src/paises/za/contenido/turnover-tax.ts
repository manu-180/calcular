import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "za.turnover-tax",
  h1: "Turnover tax calculator for micro businesses",
  title: "Turnover tax calculator 2026/27: micro businesses",
  description: "Work out SARS turnover tax for a micro business in 2026/27. No tax on the first R600 000 of turnover, then 1%, 2% and 3%.",
  intro: [
    "Turnover tax is a simple tax for micro businesses, worked out on turnover instead of profit. Enter your taxable turnover for the year to see what you pay.",
    "These rates apply to individuals from 1 March 2026 to 28 February 2027, and to companies with years of assessment ending from 1 April 2026 to 31 March 2027.",
  ],
  comoSeCalcula: [
    "The first R600 000 of taxable turnover is taxed at 0%.",
    "From R600 000 to R950 000 the rate is 1%, from R950 000 to R1 400 000 it is 2%, and above that 3%.",
    "Each rate applies only to the part of the turnover in its band.",
  ],
  ejemplo: ["A business with R800 000 of taxable turnover pays R2 000 for the year."],
  faq: [
    {
      pregunta: "Is turnover tax worked out on profit?",
      respuesta: "No. It is worked out on taxable turnover, so you do not need to work out your expenses for it.",
    },
    {
      pregunta: "Can a company use turnover tax?",
      respuesta: "Yes, if it qualifies as a micro business. The table applies to companies with years of assessment ending from 1 April 2026 to 31 March 2027.",
    },
    {
      pregunta: "Where do the rates come from?",
      respuesta: "From the SARS Budget 2026 tax guide, which sets the turnover tax table for 2026/27.",
    },
  ],
  glosario: [
    { termino: "Micro business", definicion: "A small business that qualifies for turnover tax." },
    { termino: "Taxable turnover", definicion: "The business income that turnover tax is worked out on." },
  ],
});
