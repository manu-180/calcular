import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.dollar-to-ngultrum",
  h1: "Dollar to ngultrum calculator",
  title: "Dollar to ngultrum: {{bt.usd}} per US$, RMA rate",
  description: "Convert US dollars to Bhutanese ngultrum and back with the Royal Monetary Authority's rate, {{bt.usd}} per dollar at {{bt.usd#desde}}. Enter an amount.",
  intro: [
    "The Royal Monetary Authority's holding rate was {{bt.usd}} per US dollar at {{bt.usd#desde}}, in its Monthly Statistical Bulletin. Enter an amount to convert it either way.",
    "The ngultrum has no rate of its own against the dollar: it is pegged to the Indian rupee at par, so it rises and falls with the rupee.",
  ],
  comoSeCalcula: [
    "Dollars to ngultrum: multiply by the rate. Ngultrum to dollars: divide by it.",
    "We use the rate at the end of the latest month in the bulletin, not a live quote. It helps with a budget or a contract, less with a transfer you make today.",
    "Banks and licensed money changers add their margin and fees, so what you get at the counter will differ.",
  ],
  ejemplo: ["At Nu. 95.38 per dollar, the rate of 31 August 2026, US$100 is Nu. 9,538. A budget of Nu. 10,000 is US$104.84. A year earlier the rate was Nu. 88.21, so the same US$100 bought Nu. 717 less."],
  faq: [
    {
      pregunta: "Where does this rate come from?",
      respuesta: "From the table Exchange Rates in the Monthly Statistical Bulletin of the Royal Monetary Authority of Bhutan, in the holding rates at the end of each period.",
    },
    {
      pregunta: "Why has the ngultrum fallen against the dollar?",
      respuesta: "The RMA's Monetary Policy Statement 2026 says it tracks moves of the Indian rupee against the dollar under the peg, with an average of Nu. 91.4 in the first quarter of 2026 against Nu. 86.7 a year before.",
    },
    {
      pregunta: "How do I change it for rupees?",
      respuesta: "One ngultrum equals one Indian rupee. Use the ngultrum to rupee converter if you need to see it in an amount.",
    },
  ],
  glosario: [
    { termino: "Holding rate", definicion: "The rate the RMA uses to value foreign currency it holds, here at the end of a month." },
    { termino: "RMA", definicion: "The Royal Monetary Authority of Bhutan, the central bank." },
    { termino: "Peg", definicion: "A fixed rate between two currencies: here, ngultrum and Indian rupee." },
  ],
});
