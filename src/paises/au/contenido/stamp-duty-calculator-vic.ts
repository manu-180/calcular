import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "au.stamp-duty-calculator-vic",
  h1: "Stamp duty calculator VIC",
  title: "Stamp duty calculator VIC: land transfer duty",
  description: "Work out Victorian land transfer duty (stamp duty) with the SRO rates, including the home concession up to {{au.vic-umbrales[ppr-tope]}} and first home buyer exemption.",
  intro: [
    "When you buy property in Victoria you pay land transfer duty, usually called stamp duty, to the State Revenue Office (SRO).",
    "Enter the value and tell us if it will be your home. Buyers of a home up to {{au.vic-umbrales[ppr-tope]}} get a concession, and first home buyers pay no duty up to {{au.vic-umbrales[fhb-exencion]}}.",
  ],
  comoSeCalcula: [
    "The general rates go from 1.4% on the first $25,000 to 6% on the part between $130,000 and $960,000.",
    "Between $960,000 and $2,000,000 the duty is 5.5% of the whole value. Above $2,000,000 a premium rate of 6.5% applies to the part over $2,000,000.",
    "If you will live in the property and it is worth up to {{au.vic-umbrales[ppr-tope]}}, the principal place of residence concession lowers the rate above $130,000.",
  ],
  ejemplo: ["An apartment bought for $400,000 to live in pays $16,370 instead of $19,070, a saving of $2,700."],
  faq: [
    {
      pregunta: "Who can get the principal place of residence concession?",
      respuesta: "Anyone buying a property valued up to {{au.vic-umbrales[ppr-tope]}} who moves in within 12 months of settlement and lives there for 12 straight months. It is not only for first home buyers.",
    },
    {
      pregunta: "Does the concession apply to vacant land?",
      respuesta: "It can, when you buy vacant land to build your home and the land is worth up to {{au.vic-umbrales[ppr-tope]}}. The building contract is not included in the value.",
    },
    {
      pregunta: "What if I buy with someone else?",
      respuesta: "At least one of the buyers has to live in the property as their home. It does not have to be the same buyer for the whole 12 months.",
    },
  ],
  glosario: [
    { termino: "Land transfer duty", definicion: "The Victorian tax on buying land or property, commonly called stamp duty." },
    { termino: "Principal place of residence", definicion: "The home you live in." },
    { termino: "SRO", definicion: "State Revenue Office Victoria, which collects the duty." },
  ],
});
