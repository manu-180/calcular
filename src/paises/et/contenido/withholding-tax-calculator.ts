import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "et.withholding-tax-calculator",
  h1: "Withholding tax calculator Ethiopia",
  title: "Withholding tax calculator Ethiopia: 3% on supplies",
  description:
    "Work out the {{et.withholding-rate}} withholding tax on goods above {{et.withholding-goods-threshold}} and services from {{et.withholding-services-threshold}}, or {{et.withholding-no-tin-rate}} without a TIN.",
  intro: [
    "Businesses and bodies named as withholding agents have to keep back part of what they pay suppliers and pass it to the tax authority. Enter the amount and the kind of supply to see how much to withhold.",
    "The rules are those of the renumbered Article 97 of the Income Tax Proclamation, in force since 7 August 2025.",
  ],
  comoSeCalcula: [
    "Goods: withholding applies when one transaction or supply contract is worth more than {{et.withholding-goods-threshold}}.",
    "Services: withholding applies to a supply contract involving {{et.withholding-services-threshold}}. The calculator applies it from that amount up.",
    "The rate is {{et.withholding-rate}} of the gross payment. If the supplier does not give a TIN and business licence, it is {{et.withholding-no-tin-rate}}.",
  ],
  ejemplo: [
    "A purchase of goods for ETB 50,000 has ETB 1,500 withheld, and the supplier receives ETB 48,500.",
  ],
  faq: [
    {
      pregunta: "Since when do these rules apply?",
      respuesta: "Proclamation 1395/2025 made the new withholding rules apply to tax withheld from 7 August 2025.",
    },
    {
      pregunta: "Why is the rate so high without a TIN?",
      respuesta: "Article 97(4) sets {{et.withholding-no-tin-rate}} when the supplier fails to give the withholding agent a TIN and business licence.",
    },
    {
      pregunta: "Is the amount with or without VAT?",
      respuesta: "Enter the amount the law looks at for the transaction. Ask the tax authority if you are not sure how VAT is treated in your case.",
    },
  ],
  glosario: [
    { termino: "Withholding agent", definicion: "A body or person required to keep back tax from payments to suppliers." },
    { termino: "TIN", definicion: "Taxpayer identification number." },
  ],
});
