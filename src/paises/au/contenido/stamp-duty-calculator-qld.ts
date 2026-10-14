import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "au.stamp-duty-calculator-qld",
  h1: "Stamp duty calculator QLD",
  title: "Stamp duty calculator QLD: transfer duty and concessions",
  description: "Work out Queensland transfer duty (stamp duty) with the QRO rates, including the home concession, first home concession and first home (new home) concession.",
  intro: [
    "When you buy property in Queensland you pay transfer duty, also called stamp duty, to the Queensland Revenue Office (QRO).",
    "Tell us the value and whether it will be your home or your first home. The calculator applies the general rates or the matching concession.",
  ],
  comoSeCalcula: [
    "Each band of the value has its own rate, charged for each $100 or part of $100 above the start of the band.",
    "If you will live in the property, the lower home concession rates apply.",
    "For a first home, the first home concession amount is subtracted from the home concession duty. It is worth less as the price rises and ends at $800,000.",
    "First home buyers of a new home or vacant land get a full concession for contracts from 1 May 2025.",
  ],
  ejemplo: ["An investment property worth $850,000 pays $31,275 in transfer duty."],
  faq: [
    {
      pregunta: "Do seniors or pensioners get a lower rate?",
      respuesta: "No. Queensland has no separate transfer duty rate or extra concession for seniors card or pensioner concession card holders.",
    },
    {
      pregunta: "Do foreign buyers pay more?",
      respuesta: "Yes. Additional foreign acquirer duty of 8% applies to residential land bought by foreign persons, including companies and trusts.",
    },
    {
      pregunta: "Is there a price cap on the first home (new home) concession?",
      respuesta: "No. There is no cap on the value of the new home, but the concession only covers residential land.",
    },
  ],
  glosario: [
    { termino: "Transfer duty", definicion: "The Queensland tax on buying property, commonly called stamp duty." },
    { termino: "Home concession", definicion: "Lower duty rates when you buy a home you will live in." },
    { termino: "QRO", definicion: "Queensland Revenue Office, which collects the duty." },
  ],
});
