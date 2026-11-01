import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gm.expatriate-payroll-tax",
  h1: "Expatriate payroll tax calculator",
  title: "Expatriate quota payroll tax in The Gambia",
  description: "Work out the yearly expatriate quota payroll tax an employer pays in The Gambia: {{gm.expatriate-payroll-tax[ecowas]}} per ECOWAS citizen and {{gm.expatriate-payroll-tax[other]}} for others.",
  intro: [
    "Every employer of an expatriate in The Gambia pays a yearly payroll tax for each one. Enter how many you employ to see the total.",
    "Since {{gm.expatriate-payroll-tax#desde}} the tax is {{gm.expatriate-payroll-tax[ecowas]}} a year for a citizen of an ECOWAS country or a person with special status, and {{gm.expatriate-payroll-tax[other]}} for everyone else.",
  ],
  comoSeCalcula: [
    "ECOWAS citizens and people with special status: number of expatriates × {{gm.expatriate-payroll-tax[ecowas]}}.",
    "Other expatriates: number × {{gm.expatriate-payroll-tax[other]}}.",
    "The monthly figure only spreads the yearly tax over 12 months to help you budget.",
  ],
  ejemplo: ["A company with two Senegalese engineers and one British manager pays 2 × D30,000 plus D100,000, so D160,000 a year."],
  faq: [
    {
      pregunta: "Who pays this tax?",
      respuesta: "The employer. The notice says every employer of an expatriate shall pay the tax, so it does not come out of the expatriate's salary.",
    },
    {
      pregunta: "Where do these amounts come from?",
      respuesta: "From the Expatriate Quota Pay Roll Tax Notice, 2026, issued by the Minister of Finance and Economic Affairs under the Payroll Tax Act and published by the GRA.",
    },
    {
      pregunta: "Which countries are in ECOWAS?",
      respuesta: "The Economic Community of West African States. Its citizens, and people with special status, pay the lower amount.",
    },
  ],
  glosario: [
    { termino: "Expatriate quota", definicion: "The permission to employ foreign nationals, which carries the yearly payroll tax." },
    { termino: "ECOWAS", definicion: "Economic Community of West African States." },
  ],
});
