import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mu.csg-income-allowance-calculator",
  h1: "CSG income allowance calculator",
  title: "CSG income allowance 2026-27: how much you get",
  description:
    "Check the CSG income allowance MRA pays each month on incomes up to {{mu.csg-income-allowance-register[3].hasta}}, for people on the Social Register and for everyone else.",
  intro: [
    "The CSG income allowance is a monthly payment from MRA to employees and self-employed people on lower incomes.",
    "Enter your total monthly income and whether you are on the Social Register of Mauritius.",
  ],
  comoSeCalcula: [
    "The amount depends on your total income for the month, in four bands up to {{mu.csg-income-allowance-register[3].hasta}}.",
    "On the Social Register you get {{mu.csg-income-allowance-register[0].cuotaFija}} a month on an income up to {{mu.csg-income-allowance-register[0].hasta}}, down to {{mu.csg-income-allowance-register[3].cuotaFija}} in the top band.",
    "Off the Register, the amounts for July 2026 to June 2027 go from {{mu.csg-income-allowance-other[0].cuotaFija}} to {{mu.csg-income-allowance-other[3].cuotaFija}}.",
  ],
  ejemplo: ["On an income of Rs 22,000, someone off the Register gets Rs 833 a month in 2026-27. On the Register, Rs 2,500."],
  faq: [
    {
      pregunta: "Until when is it paid?",
      respuesta: "For people on the Social Register it continues. For everyone else it is paid for the months of July 2025 to June 2027 only.",
    },
    {
      pregunta: "What does MRA need from me?",
      respuesta: "Your bank details, given through the MRA system. For a given month they have to reach MRA within 12 months from the end of that month.",
    },
    {
      pregunta: "How does MRA know my income?",
      respuesta: "From the returns your employer submits, and from your own returns if you are self-employed, for the second month before the one paid.",
    },
  ],
  glosario: [{ termino: "CSG", definicion: "Contribution Sociale Généralisée, the social contribution collected by MRA." }],
});
