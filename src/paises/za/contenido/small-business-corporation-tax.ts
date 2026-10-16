import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "za.small-business-corporation-tax",
  h1: "Small business corporation tax calculator",
  title: "SBC tax calculator: small business corporation rates",
  description: "Work out company tax for a small business corporation with the SARS rates for years ending from 1 April 2026 to 31 March 2027: 0%, 7%, 21% and 27%.",
  intro: [
    "A small business corporation (SBC) pays company tax on a sliding scale instead of the normal rate of {{za.company-tax-rate}}. Enter the company's taxable income to see the tax and the saving.",
    "The rates apply to years of assessment ending on any date from 1 April 2026 to 31 March 2027.",
  ],
  comoSeCalcula: [
    "The first R99 000 of taxable income is taxed at 0%.",
    "From R99 000 to R365 000 the rate is 7%, from R365 000 to R550 000 it is 21%, and above that 27%.",
    "Each rate applies only to the part of the income in its band.",
  ],
  ejemplo: ["A small business corporation with R400 000 of taxable income pays R25 970, compared with R108 000 at the normal company rate."],
  faq: [
    {
      pregunta: "What is the normal company tax rate?",
      respuesta: "{{za.company-tax-rate}} of taxable income for years of assessment ending from 1 April 2026 to 31 March 2027.",
    },
    {
      pregunta: "Why does the saving stop growing?",
      respuesta: "Above R550 000 every extra rand is taxed at {{za.company-tax-rate}}, the same as a normal company. The saving comes only from the lower bands.",
    },
    {
      pregunta: "Is this the same as turnover tax?",
      respuesta: "No. SBC tax is worked out on taxable income, after expenses. Turnover tax is worked out on turnover and has its own table.",
    },
  ],
  glosario: [
    { termino: "SBC", definicion: "Small business corporation, a company that qualifies for the lower SARS company tax rates." },
  ],
});
