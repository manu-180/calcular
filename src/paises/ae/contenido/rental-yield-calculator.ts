import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ae.rental-yield-calculator",
  h1: "Dubai rental yield calculator",
  title: "Rental yield calculator Dubai: gross and net",
  description:
    "Work out the gross and net rental yield of a Dubai property, including the {{ae.dld-transfer-fee}} Dubai Land Department transfer fee and running costs.",
  intro: [
    "Rental yield shows how much a property earns each year compared with what it costs.",
    "Enter the price, rent and yearly costs to see the gross yield and the net yield after costs.",
  ],
  comoSeCalcula: [
    "Gross yield = yearly rent ÷ purchase price.",
    "Net yield = (rent for the months let − service charges − other costs) ÷ (price + buying costs).",
    "Buying costs include the {{ae.dld-transfer-fee}} transfer fee, the registration trustee fee and the title deed fee.",
  ],
  ejemplo: ["A AED 1.5 million flat let for AED 100,000 a year has a gross yield of 6.67%. After AED 20,000 of costs and the buying fees, the net yield is about 5.11%."],
  faq: [
    {
      pregunta: "What's the difference between gross and net yield?",
      respuesta: "Gross yield only compares rent with the price. Net yield takes off running costs and adds buying costs.",
    },
    {
      pregunta: "Which buying costs are included?",
      respuesta: "The Dubai Land Department transfer fee of {{ae.dld-transfer-fee}}, the registration trustee fee and the title deed fee of {{ae.dld-title-deed}}.",
    },
    {
      pregunta: "Should I count empty months?",
      respuesta: "Yes, if you expect them. Each empty month lowers the rent you actually receive.",
    },
  ],
  glosario: [
    { termino: "Service charges", definicion: "Yearly fees for the upkeep of the building's shared areas." },
    { termino: "Rental yield", definicion: "Yearly rental income as a share of the property's cost." },
  ],
});
