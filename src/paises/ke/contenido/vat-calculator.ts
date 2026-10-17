import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.vat-calculator",
  h1: "VAT calculator Kenya",
  title: "VAT calculator Kenya: add or remove {{ke.vat}} VAT",
  description: "Add {{ke.vat}} VAT to a price or take it out of a price that already includes it. Uses the general rate published by KRA.",
  intro: [
    "Kenya charges VAT at {{ke.vat}} on most goods and services. Enter an amount and choose whether to add VAT or take it out.",
    "Businesses with taxable supplies of {{ke.vat-threshold}} or more a year must register for VAT.",
  ],
  comoSeCalcula: [
    "To add VAT, multiply the price by {{ke.vat}} and add the result.",
    "To take VAT out of a price that includes it, divide the price by 1 plus the rate. The difference is the VAT.",
  ],
  ejemplo: ["KSh 10,000 plus VAT is KSh 11,600. KSh 11,600 including VAT is KSh 10,000 plus KSh 1,600 of VAT."],
  faq: [
    {
      pregunta: "Are there other VAT rates?",
      respuesta: "Yes. Supplies listed in the Second Schedule to the VAT Act are zero rated. Some others are exempt. The 8% rate on petroleum products was removed by the Finance Act, 2023.",
    },
    {
      pregunta: "When do I have to register for VAT?",
      respuesta: "When your taxable supplies reach {{ke.vat-threshold}} in a year, or you expect them to. You can register voluntarily below that.",
    },
    {
      pregunta: "Do foreign digital services pay VAT in Kenya?",
      respuesta: "Yes. Non-residents selling over the internet or through a digital marketplace must register whatever their turnover.",
    },
  ],
  glosario: [
    { termino: "Zero rated", definicion: "Taxable at 0%, so the seller can still claim input VAT." },
    { termino: "Exempt", definicion: "Outside VAT, with no VAT charged and no input VAT to claim." },
  ],
});
