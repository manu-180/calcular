import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bn.bnd-to-sgd",
  h1: "BND to SGD converter {{anio}}: Brunei and Singapore dollar",
  title: "BND to SGD {{anio}}: the Brunei dollar at par",
  description:
    "The Brunei dollar equals the Singapore dollar at {{bn.currency-par}} to 1 under the Currency Interchangeability Agreement. Convert BND to SGD or back.",
  intro: [
    "One Brunei dollar is worth exactly one Singapore dollar. The two countries signed the Currency Interchangeability Agreement in 1967, and the Monetary Authority of Singapore says the currencies can be exchanged at par and without charge. There is no daily rate to look up, so the answer never changes.",
    "Enter an amount and pick the direction. The calculator shows the converted amount at {{bn.currency-par}} Brunei dollars per Singapore dollar.",
  ],
  comoSeCalcula: [
    "From BND to SGD: divide the amount by {{bn.currency-par}}. From SGD to BND: multiply by {{bn.currency-par}}. Because the rate is 1, the number stays the same.",
    "The par rate is set by the agreement between Brunei Darussalam and Singapore. Banks in both countries accept the other country's notes for deposit.",
    "What can change is the fee. A bank, a card network or a money changer may charge to convert, and a shop does not have to accept the other currency.",
  ],
  ejemplo: [
    "BND 1,000 is SGD 1,000.00, and SGD 250 is BND 250.00. To turn either currency into US dollars you need the market rate for the Singapore dollar, because the Brunei dollar follows it.",
  ],
  faq: [
    {
      pregunta: "Is the Brunei dollar pegged to the Singapore dollar?",
      respuesta: "Yes. Under the Brunei Singapore Currency Interchangeability Agreement of 1967, the two currencies can be exchanged at par and without charge, according to the Monetary Authority of Singapore.",
    },
    {
      pregunta: "Can I spend Brunei notes in Singapore?",
      respuesta: "Banks in both countries accept the other's currency for deposit from the public and businesses. Whether a shop takes it is the shop's choice.",
    },
    {
      pregunta: "Is there a daily BND to SGD rate?",
      respuesta: "No. The Monetary Authority of Singapore says the two currencies can be exchanged at par and without charge, so the official rate is always 1 to 1.",
    },
  ],
  glosario: [
    { termino: "Par", definicion: "An exchange rate of exactly one unit of one currency for one unit of the other." },
    { termino: "BND", definicion: "The code of the Brunei dollar." },
    { termino: "SGD", definicion: "The code of the Singapore dollar." },
  ],
});
