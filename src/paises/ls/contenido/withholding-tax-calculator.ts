import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ls.withholding-tax-calculator",
  h1: "Withholding tax calculator for contractors",
  title: "Withholding tax calculator Lesotho: contractors and fees",
  description:
    "Work out the withholding tax to deduct when you pay a contractor in Lesotho: {{ls.withholding-rates[resident-contractor]}} for residents, {{ls.withholding-rates[non-resident-contractor]}} for non-residents.",
  intro: [
    "When you pay certain contractors, the law makes you keep part of the invoice and pay it to Revenue Services Lesotho. Enter the gross amount and who you are paying.",
    "The supplier receives the invoice amount less the tax.",
  ],
  comoSeCalcula: [
    "Take the gross amount of the invoice. If goods are supplied as part of the service, they count too.",
    "Apply the rate: {{ls.withholding-rates[resident-contractor]}} for a resident contractor, {{ls.withholding-rates[non-resident-contractor]}} for a non-resident contractor and {{ls.withholding-rates[technical-rsa]}} for technical services from South Africa.",
    "Pay the tax to RSL and the rest to the supplier.",
  ],
  ejemplo: ["A resident building contractor invoices M50 000. You withhold M2 500 and pay the contractor M47 500."],
  faq: [
    {
      pregunta: "Who counts as a resident contractor?",
      respuesta: "A business that leases vehicles, plant or equipment, or provides construction, transport, painting, plumbing, roofing, earthmoving, landscaping, demolition or installation services, among others listed in the RSL withholding tax ruling.",
    },
    {
      pregunta: "Is withholding tax worked out on the amount with materials?",
      respuesta: "Yes, when the goods are supplied in the course of providing the service. RSL says the cost of those goods is added to the service and the gross amount is taxed.",
    },
    {
      pregunta: "Do withholding tax rules cover the government?",
      respuesta: "Yes. RSL's ruling says the term taxpayer includes the government, its ministries, departments and local councils.",
    },
  ],
  glosario: [
    { termino: "Withholding tax (WHT)", definicion: "Tax the payer deducts from a payment and sends to RSL on behalf of the person paid." },
    { termino: "Gross amount", definicion: "The full amount due under the invoice before any tax is withheld." },
  ],
});
