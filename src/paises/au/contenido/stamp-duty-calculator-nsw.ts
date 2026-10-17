import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "au.stamp-duty-calculator-nsw",
  h1: "Stamp duty calculator NSW",
  title: "Stamp duty calculator NSW 2026/27: transfer duty",
  description: "Work out NSW transfer duty (stamp duty) with the 2026/2027 rates from Revenue NSW, including premium duty and the first home buyer exemption.",
  intro: [
    "When you buy property in NSW you generally pay transfer duty, better known as stamp duty.",
    "Enter the price and whether it is residential. The calculator uses the sliding scale of rates Revenue NSW publishes for the 2026/2027 financial year.",
  ],
  comoSeCalcula: [
    "Duty is charged on the dutiable value: the higher of the price you agreed to pay and the property's market value.",
    "Each band of the value has its own rate. For example, between $387,001 and $1,290,000 the duty is $11,602 plus $4.50 for every $100 over $387,000.",
    "Residential property worth more than the premium threshold pays premium duty on the part above it. The minimum duty is {{au.nsw-duty-minimo}}.",
    "First home buyers who qualify pay no duty on a home up to {{au.nsw-fhb[exencion]}} and reduced duty below {{au.nsw-fhb[tope]}}.",
  ],
  ejemplo: ["A home bought at auction for $1,350,000 pays $55,537 in transfer duty."],
  faq: [
    {
      pregunta: "Which year's rates apply to me?",
      respuesta: "The rates are adjusted each year in line with the CPI. Use the contract date, or the date of transfer if there is no contract, to know which year's rates apply.",
    },
    {
      pregunta: "Do foreign buyers pay more?",
      respuesta: "Yes. Foreign persons buying residential-related property in NSW may also pay surcharge purchaser duty, a flat rate on the dutiable value, unless an exemption applies.",
    },
    {
      pregunta: "Is vacant land treated the same for first home buyers?",
      respuesta: "No. For vacant land the first home buyer exemption applies up to $350,000 and reduced duty below $450,000.",
    },
  ],
  glosario: [
    { termino: "Transfer duty", definicion: "The NSW tax on buying property, commonly called stamp duty." },
    { termino: "Dutiable value", definicion: "The higher of the purchase price and the market value of the property." },
    { termino: "Premium property duty", definicion: "A higher rate on residential property above the premium threshold." },
  ],
});
