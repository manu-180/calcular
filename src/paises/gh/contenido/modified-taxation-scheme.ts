import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gh.modified-taxation-scheme",
  h1: "Modified Taxation Scheme calculator",
  title: "Modified Taxation Scheme Ghana: {{gh.mts-rate}} of turnover",
  description: "Small businesses in Ghana with yearly turnover above {{gh.mts-lower}} and up to {{gh.mts-upper}} pay a presumptive tax of {{gh.mts-rate}} of turnover.",
  intro: [
    "The Modified Taxation Scheme taxes small businesses on their turnover instead of their profit.",
    "Since 1 September 2026 it covers individuals with yearly business turnover above {{gh.mts-lower}} and up to {{gh.mts-upper}}.",
  ],
  comoSeCalcula: ["Presumptive tax: {{gh.mts-rate}} of your yearly business turnover, if it falls within the scheme's range."],
  ejemplo: ["With a yearly turnover of GH₵300,000, the tax is GH₵9,000."],
  faq: [
    {
      pregunta: "Who is in the Modified Taxation Scheme?",
      respuesta: "Individuals whose annual business turnover is more than {{gh.mts-lower}} but does not exceed {{gh.mts-upper}}.",
    },
    {
      pregunta: "When did the threshold change?",
      respuesta: "The Income Tax (Amendment) Act, 2026 (Act 1178) raised it, effective 1 September 2026.",
    },
    {
      pregunta: "Is it based on profit?",
      respuesta: "No. It is a presumptive tax on turnover, so expenses do not reduce it.",
    },
  ],
  glosario: [{ termino: "Presumptive tax", definicion: "A tax worked out on turnover rather than on actual profit." }],
});
