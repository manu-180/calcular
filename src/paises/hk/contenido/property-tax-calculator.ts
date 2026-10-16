import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hk.property-tax-calculator",
  h1: "Property tax calculator Hong Kong",
  title: "Property tax calculator Hong Kong: rental income",
  description:
    "Work out Hong Kong property tax on rental income: {{hk.property-tax-rate}} of the net assessable value after the {{hk.property-repairs-allowance}} allowance, plus next year's provisional tax.",
  intro: [
    "If you let out a property in Hong Kong, you pay property tax on the rent. It is worked out for each year of assessment, from 1 April to 31 March.",
    "Enter the rent, the months it was let and the rates you paid to see the tax and the provisional tax for next year.",
  ],
  comoSeCalcula: [
    "Assessable value is the rent less any rent you couldn't recover.",
    "Take off the rates you paid as owner, then a statutory allowance of {{hk.property-repairs-allowance}} for repairs and outgoings. What's left is the net assessable value.",
    "Property tax is {{hk.property-tax-rate}} of the net assessable value.",
    "Provisional tax for next year is worked out the same way. If the letting started during the year, it is grossed up to 12 months.",
  ],
  ejemplo: ["Rent of $10,000 a month with the tenant paying rates gives a net assessable value of $96,000. The tax is $14,400, and the same again as provisional tax."],
  faq: [
    {
      pregunta: "What is the property tax rate in Hong Kong?",
      respuesta: "The standard rate is {{hk.property-tax-rate}} of the net assessable value. It has been the same since 2008/09.",
    },
    {
      pregunta: "How are repairs and outgoings taken into account?",
      respuesta: "Through a statutory allowance of {{hk.property-repairs-allowance}}, worked out after taking off the rates you paid as owner.",
    },
    {
      pregunta: "When is provisional property tax paid?",
      respuesta: "Normally in two instalments: the first around November and the second around April of the next year.",
    },
    {
      pregunta: "Does the one-off tax reduction apply to property tax?",
      respuesta: "No. The IRD says the reduction doesn't apply to property tax, though you may benefit if you're eligible for personal assessment.",
    },
  ],
  glosario: [
    { termino: "Net assessable value (NAV)", definicion: "Rent less irrecoverable rent, rates paid by the owner and the statutory allowance. The tax is charged on it." },
    { termino: "Rates", definicion: "A government charge on property, separate from property tax." },
  ],
});
