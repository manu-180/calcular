import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sg.buyer-stamp-duty",
  h1: "Buyer's Stamp Duty calculator",
  title: "Buyer's Stamp Duty (BSD) calculator Singapore 2026",
  description: "Work out the Buyer's Stamp Duty on a home, HDB flat or commercial property in Singapore, with the IRAS rates from 15 February 2023.",
  intro: [
    "Buyer's Stamp Duty (BSD) is paid on the documents you sign when you buy property in Singapore, including HDB flats.",
    "It is charged in slices of the price, so each rate only applies to the part of the price inside its band.",
  ],
  comoSeCalcula: [
    "BSD is worked out on the purchase price or the market value, whichever is higher.",
    "For homes: 1% on the first $180,000, 2% on the next $180,000, 3% on the next $640,000, 4% on the next $500,000, 5% on the next $1.5 million and 6% on the rest.",
    "For non-residential property the top rate is 5%, on everything above $1.5 million.",
    "The duty is rounded down to the dollar, with a minimum of $1.",
  ],
  ejemplo: [
    "A $550,000 HDB resale flat pays $11,100 of BSD: $1,800 on the first $180,000, $3,600 on the next $180,000 and $5,700 on the last $190,000.",
  ],
  faq: [
    {
      pregunta: "Do I pay BSD on an HDB flat?",
      respuesta: "Yes. BSD is payable on any property or land bought in Singapore, whether it is a private property or an HDB flat.",
    },
    {
      pregunta: "When did the current BSD rates start?",
      respuesta: "On 15 February 2023. From that date the top rate for residential property is 6% and for non-residential property 5%.",
    },
    {
      pregunta: "Is BSD the only stamp duty when buying a home?",
      respuesta: "Not always. Depending on your profile and how many homes you own, you may also pay Additional Buyer's Stamp Duty (ABSD) on top.",
    },
  ],
  glosario: [
    { termino: "BSD", definicion: "Buyer's Stamp Duty, the tax on documents for buying property in Singapore." },
    { termino: "Market value", definicion: "What the property would sell for on the open market. BSD uses it if it is higher than the price paid." },
  ],
});
