import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sg.property-tax-calculator",
  h1: "Property tax calculator for Singapore",
  title: "Property tax calculator Singapore 2026 (HDB, condo)",
  description: "Work out the yearly property tax on an HDB flat, condo or landed home from its Annual Value, with the IRAS owner-occupier and non-owner-occupier rates.",
  intro: [
    "Property tax is paid every year by property owners in Singapore. It is worked out on the Annual Value, which is the yearly rent IRAS estimates your property could fetch.",
    "Homes you live in pay lower progressive rates. Homes you rent out or leave empty pay higher ones, and commercial property pays a flat rate.",
  ],
  comoSeCalcula: [
    "Owner-occupied homes: 0% on the first $12,000 of Annual Value, then 4%, 6%, 10%, 14%, 20% and 26%, up to 32% above $140,000.",
    "Homes you do not live in: 12% on the first $30,000, 20% on the next $15,000, 28% on the next $15,000 and 36% above $60,000.",
    "Commercial and industrial property: a flat {{sg.impuesto-propiedad-otros}} of the Annual Value.",
  ],
  ejemplo: [
    "An HDB flat you live in with an Annual Value of $36,000 pays $960 a year: nothing on the first $12,000 and 4% on the next $24,000.",
  ],
  faq: [
    {
      pregunta: "What is the Annual Value?",
      respuesta: "It is the estimated gross yearly rent of the property if it were rented out, excluding furniture, furnishings and maintenance fees. IRAS bases it on market rents of similar properties, not on the rent you actually receive.",
    },
    {
      pregunta: "My home is empty. Which rates apply?",
      respuesta: "Property tax applies whether a home is lived in, rented out or vacant. A vacant home is taxed at the non-owner-occupier rates, with no relief for being empty.",
    },
    {
      pregunta: "Do owner-occupier rates apply to my shop if I use it myself?",
      respuesta: "No. Commercial and industrial property is taxed at {{sg.impuesto-propiedad-otros}} of the Annual Value, even if you use it yourself.",
    },
  ],
  glosario: [
    { termino: "Annual Value (AV)", definicion: "The estimated yearly rent of a property, used to work out property tax." },
    { termino: "Owner-occupier rates", definicion: "Lower property tax rates for a home the owner lives in." },
  ],
});
