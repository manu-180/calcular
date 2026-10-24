import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pk.property-transfer-tax-calculator",
  h1: "Property tax calculator: 236C and 236K",
  title: "236C and 236K calculator 2026-27: property advance tax",
  description: "Advance tax when you sell or buy property: {{pk.wht-236c}} for the seller under 236C and {{pk.wht-236k}} for the buyer under 236K, from 1 July 2026.",
  intro: [
    "When a property transfer is registered, the seller and the buyer each pay advance income tax. Enter the price to see both amounts.",
    "The Finance Act 2026 replaced the old slabs with flat rates.",
  ],
  comoSeCalcula: [
    "Seller (section 236C): {{pk.wht-236c}} of the gross amount of the consideration.",
    "Buyer (section 236K): {{pk.wht-236k}} of the fair market value of the property.",
    "These rates are for persons on the Active Taxpayers List. People not on it pay more.",
  ],
  ejemplo: ["On a Rs. 20 million house, the seller pays Rs. 550,000 and the buyer Rs. 250,000."],
  faq: [
    {
      pregunta: "Is this the only tax on a property deal?",
      respuesta: "No. Provincial stamp duty, registration fees and other local charges are extra.",
    },
    {
      pregunta: "Can I adjust the advance tax?",
      respuesta: "Advance tax paid this way is generally adjustable against your income tax for the year. Check your return.",
    },
    {
      pregunta: "Did late filers pay a higher rate?",
      respuesta: "The higher rates for people who filed after the due date were abolished by the Finance Act 2026.",
    },
  ],
  glosario: [
    { termino: "ATL", definicion: "Active Taxpayers List, the FBR list of people who filed their return." },
    { termino: "Fair market value", definicion: "The value of the property set for tax purposes." },
  ],
});
