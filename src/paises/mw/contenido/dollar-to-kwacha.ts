import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mw.dollar-to-kwacha",
  h1: "Dollar to kwacha converter",
  title: "Dollar to kwacha today: Reserve Bank of Malawi rate",
  description:
    "Convert US dollars to Malawi kwacha and back with the Reserve Bank of Malawi middle rate of {{mw.usd}} per dollar, published on {{mw.usd#desde}}.",
  intro: [
    "Enter an amount and choose the direction to convert between US dollars and kwacha.",
    "The rate is the middle rate the Reserve Bank of Malawi publishes each working day.",
  ],
  comoSeCalcula: [
    "Dollars to kwacha: multiply the dollars by the RBM middle rate.",
    "Kwacha to dollars: divide the kwacha by the same rate.",
    "The rate in use is {{mw.usd}} per US dollar, from {{mw.usd#desde}}.",
  ],
  ejemplo: ["At a middle rate of K1,734.0118, US$100 is K173,401.18."],
  faq: [
    {
      pregunta: "Why is my bank's rate different?",
      respuesta: "The RBM publishes buying, middle and selling rates. Banks and forex bureaux set their own buying and selling rates, so what you get at the counter is not the middle rate.",
    },
    {
      pregunta: "How often does the rate change?",
      respuesta: "The RBM publishes rates every working day. The converter uses the latest one, so check the date under the result.",
    },
    {
      pregunta: "Which rate does the MRA use for customs?",
      respuesta: "The MRA publishes its own exchange rates for customs purposes on mra.mw. This converter uses the RBM rate.",
    },
  ],
  glosario: [
    { termino: "Middle rate", definicion: "The rate halfway between the RBM buying and selling rates." },
    { termino: "MWK", definicion: "The ISO code of the Malawi kwacha." },
  ],
});
