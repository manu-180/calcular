import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gh.exchange-rate",
  h1: "Dollar to cedi converter",
  title: "Dollar to cedi rate today: Bank of Ghana converter",
  description: "Convert US dollars and Ghana cedis with the Bank of Ghana interbank mid rate, updated automatically from the official daily rates.",
  intro: [
    "Convert between US dollars and cedis with the interbank mid rate the Bank of Ghana publishes each working day.",
    "The latest rate used is {{gh.usd-ghs}} cedis per dollar, from {{gh.usd-ghs#desde}}.",
  ],
  comoSeCalcula: [
    "Dollars to cedis: multiply by the mid rate.",
    "Cedis to dollars: divide by the mid rate.",
    "The mid rate is halfway between the Bank of Ghana's buying and selling rates.",
  ],
  faq: [
    {
      pregunta: "Where does the rate come from?",
      respuesta: "From the Bank of Ghana's Daily Interbank FX Rates page, which lists buying, selling and mid rates for each currency.",
    },
    {
      pregunta: "Will my bank give me this rate?",
      respuesta: "Not exactly. Banks and forex bureaus add their own margin. Use this as the official reference.",
    },
    {
      pregunta: "How often is it updated?",
      respuesta: "The Bank of Ghana publishes rates every working day. The latest one used here is from {{gh.usd-ghs#desde}}.",
    },
  ],
  glosario: [{ termino: "Mid rate", definicion: "The average of the buying and selling rates." }],
});
