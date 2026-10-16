import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ph.estate-tax",
  h1: "Estate tax calculator Philippines",
  title: "Estate tax calculator Philippines ({{ph.estate-tax-rate}} TRAIN rate)",
  description:
    "Estimate the {{ph.estate-tax-rate}} estate tax on an inheritance, with the {{ph.estate-standard-deduction}} standard deduction and the family home deduction of up to {{ph.estate-family-home-cap}}.",
  intro: [
    "Since the TRAIN law, the estate of a person who dies is taxed at a flat {{ph.estate-tax-rate}} of the net estate.",
    "Enter the value of everything the person left and the deductions to see the estate tax the heirs have to pay before transferring the property.",
  ],
  comoSeCalcula: [
    "Start from the gross estate: the value of all the property the person left.",
    "Take off the standard deduction of {{ph.estate-standard-deduction}}, the family home up to {{ph.estate-family-home-cap}}, and other allowed deductions such as claims against the estate.",
    "The estate tax is {{ph.estate-tax-rate}} of what is left, the net estate.",
  ],
  ejemplo: ["An estate of ₱12,000,000 that includes a ₱4,000,000 family home has a net estate of ₱3,000,000. The estate tax is ₱180,000."],
  faq: [
    {
      pregunta: "What is the estate tax rate in the Philippines?",
      respuesta: "A flat {{ph.estate-tax-rate}} of the net estate, for decedents who are residents or nonresidents, under Section 84 of the Tax Code as amended by the TRAIN law.",
    },
    {
      pregunta: "How much is the standard deduction?",
      respuesta: "{{ph.estate-standard-deduction}} for the estate of a citizen or resident of the Philippines.",
    },
    {
      pregunta: "Is the family home fully deductible?",
      respuesta: "Up to {{ph.estate-family-home-cap}} of its current fair market value. If it is worth more, the excess is subject to estate tax.",
    },
  ],
  glosario: [
    { termino: "Gross estate", definicion: "The total value of everything the person owned at death." },
    { termino: "Net estate", definicion: "The gross estate minus the deductions allowed by the Tax Code." },
  ],
});
