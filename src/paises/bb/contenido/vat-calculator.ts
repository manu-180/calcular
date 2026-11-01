import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bb.vat-calculator",
  h1: "Barbados VAT calculator {{anio}}",
  title: "VAT calculator {{anio}}: add or remove Barbados VAT",
  description:
    "Add VAT to a price or take it out of one that already includes it. Uses the BRA rates: {{bb.vat[standard]}} standard, {{bb.vat[tourism]}} for tourism and {{bb.vat[telecom]}} for telecoms.",
  intro: [
    "Most goods and services in Barbados carry Value Added Tax at {{bb.vat[standard]}}. Two groups pay a different rate: accommodation and direct tourism services at {{bb.vat[tourism]}}, and telecommunications services at {{bb.vat[telecom]}}. Pick the group that fits your purchase and the calculator does the rest.",
    "Use it when you quote a customer, check a receipt or split a VAT inclusive price into the part that goes to the Barbados Revenue Authority and the part the seller keeps.",
  ],
  comoSeCalcula: [
    "To add VAT, multiply the price by the rate and add the result. At {{bb.vat[standard]}}, a Bds$1,000 price becomes Bds$1,175.",
    "To take VAT out, divide the VAT inclusive price by one plus the rate. At {{bb.vat[standard]}} that means dividing by 1.175.",
    "Hotels and other direct tourism services use {{bb.vat[tourism]}}, so a Bds$800 bill carries Bds$60 of VAT.",
    "Telecommunications services use {{bb.vat[telecom]}}, so a Bds$200 phone bill carries Bds$44 of VAT.",
  ],
  ejemplo: [
    "A shop sells a washing machine for Bds$2,400 before VAT. At the standard rate the VAT is Bds$420.00 and the shelf price is Bds$2,820.00. If a customer holds a Bds$2,820.00 receipt, dividing by 1.175 gives back the Bds$2,400.00 net price.",
  ],
  faq: [
    {
      pregunta: "What is the VAT rate in Barbados?",
      respuesta:
        "The BRA lists {{bb.vat[standard]}} as the rate for standard supplies, {{bb.vat[tourism]}} on accommodating direct tourism services and {{bb.vat[telecom]}} on telecommunications services.",
    },
    {
      pregunta: "Which services pay the higher telecom rate?",
      respuesta: "The BRA VAT rates page shows {{bb.vat[telecom]}} on telecommunications services. Everything else you buy day to day is normally at the standard rate unless the BRA treats it as zero rated or exempt.",
    },
    {
      pregunta: "Does this calculator cover zero rated and exempt items?",
      respuesta:
        "No. Zero rated items such as many basic foods carry no VAT, and exempt supplies are outside the tax. Check the BRA list of zero rated items before you apply a rate to a particular product.",
    },
  ],
  glosario: [
    { termino: "VAT", definicion: "Value Added Tax, collected by the Barbados Revenue Authority on taxable supplies." },
    { termino: "Standard rate", definicion: "The rate on most goods and services, currently {{bb.vat[standard]}}." },
    { termino: "Zero rated", definicion: "A supply taxed at 0%, where the seller can still claim back the VAT paid on costs." },
    { termino: "VAT inclusive price", definicion: "A price that already contains the VAT, as on most shelf tags and receipts." },
  ],
});
