import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nz.ietc-calculator",
  h1: "Independent earner tax credit calculator",
  title: "IETC calculator NZ: independent earner tax credit",
  description:
    "Check if you get the independent earner tax credit (IETC) in New Zealand: {{nz.ietc-annual}} a year between {{nz.ietc-lower-threshold}} and {{nz.ietc-abatement-threshold}}, reducing up to {{nz.ietc-upper-threshold}}.",
  intro: [
    "The independent earner tax credit is up to {{nz.ietc-annual}} a year, or $10 a week, for New Zealand tax residents on middle incomes.",
    "You get the full amount on income between {{nz.ietc-lower-threshold}} and {{nz.ietc-abatement-threshold}}. Above that it shrinks until it's gone at {{nz.ietc-upper-threshold}}.",
  ],
  comoSeCalcula: [
    "Under {{nz.ietc-lower-threshold}} there's no credit.",
    "From {{nz.ietc-lower-threshold}} to {{nz.ietc-abatement-threshold}} you get {{nz.ietc-annual}}.",
    "Above {{nz.ietc-abatement-threshold}} the credit drops by {{nz.ietc-abatement-rate}} of each dollar over, reaching zero at {{nz.ietc-upper-threshold}}.",
  ],
  ejemplo: ["On $68,000 you're $2,000 over the abatement threshold. 13% of $2,000 is $260, so your credit is $260 a year."],
  faq: [
    {
      pregunta: "Who can't get the IETC?",
      respuesta: "You can't get it if you or your partner get Working for Families, if you get an income-tested benefit, or if you get NZ Super. A month with any of those payments rules out that whole month.",
    },
    {
      pregunta: "How do I get it?",
      respuesta: "Use the ME tax code (ME SL with a student loan) and your employer takes less PAYE each pay.",
    },
    {
      pregunta: "Do I need to be a New Zealand tax resident?",
      respuesta: "Yes. Inland Revenue describes the IETC as a tax credit for New Zealand tax resident employees with yearly income between {{nz.ietc-lower-threshold}} and {{nz.ietc-upper-threshold}}.",
    },
  ],
  glosario: [
    { termino: "IETC", definicion: "Independent earner tax credit." },
    { termino: "Abatement", definicion: "The way a credit reduces as your income goes up." },
  ],
});
