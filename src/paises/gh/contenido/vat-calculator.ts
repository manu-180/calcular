import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gh.vat-calculator",
  h1: "VAT calculator Ghana",
  title: "VAT calculator Ghana {{anio}}: VAT, NHIL and GETFund",
  description: "Add or remove VAT of {{gh.vat-rates[vat]}}, NHIL of {{gh.vat-rates[nhil]}} and GETFund Levy of {{gh.vat-rates[getfund]}}, all on the same value as the GRA rules since {{anio}}.",
  intro: [
    "Since 1 January 2026, VAT, NHIL and the GETFund Levy are all charged on the same value of the supply, and the 1% COVID-19 levy no longer applies.",
    "Enter a price without tax to add them, or a total price to see how much of it is tax.",
  ],
  comoSeCalcula: [
    "VAT: {{gh.vat-rates[vat]}} of the value of the supply.",
    "NHIL: {{gh.vat-rates[nhil]}} of the same value. GETFund Levy: {{gh.vat-rates[getfund]}} of the same value.",
    "To remove them from a total price, divide it by 1.20.",
  ],
  ejemplo: ["On a selling price of GH₵1,000: NHIL GH₵25, GETFund Levy GH₵25 and VAT GH₵150, so GH₵1,200 in total."],
  faq: [
    {
      pregunta: "What is the VAT rate in Ghana?",
      respuesta: "{{gh.vat-rates[vat]}}, plus NHIL of {{gh.vat-rates[nhil]}} and GETFund Levy of {{gh.vat-rates[getfund]}}, all on the same value since 1 January 2026.",
    },
    {
      pregunta: "Is the COVID-19 levy still charged?",
      respuesta: "No. The 1% COVID-19 Health Recovery Levy was abolished by the VAT reforms of the Value Added Tax Act, 2025 (Act 1151).",
    },
    {
      pregunta: "Who has to register for VAT?",
      respuesta: "Businesses dealing in goods register once they reach the threshold of {{gh.vat-threshold-goods}}, raised from GH₵200,000 in the 2026 reforms.",
    },
  ],
  glosario: [
    { termino: "NHIL", definicion: "National Health Insurance Levy." },
    { termino: "GETFund Levy", definicion: "Ghana Education Trust Fund Levy." },
  ],
});
