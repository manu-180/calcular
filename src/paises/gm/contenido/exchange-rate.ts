import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gm.exchange-rate",
  h1: "Dalasi exchange rate calculator",
  title: "Dalasi exchange rate today: USD, EUR and GBP to GMD",
  description: "Convert US dollars, euros and pounds to dalasis and back with the Central Bank of The Gambia daily valuation rate. Today one dollar is {{gm.usd-gmd}}.",
  intro: [
    "Convert between the dalasi and the US dollar, the euro or the pound sterling with the daily valuation rate published by the Central Bank of The Gambia.",
    "On {{gm.usd-gmd#desde}} the rate was {{gm.usd-gmd}} per US dollar, {{gm.eur-gmd}} per euro and {{gm.gbp-gmd}} per pound.",
  ],
  comoSeCalcula: [
    "To dalasis: amount × the CBG rate for that currency.",
    "From dalasis: amount ÷ the CBG rate.",
    "The rate is updated every working day from the CBG website.",
  ],
  ejemplo: ["On 27 October 2026 the CBG rate was D72.50 per US dollar, so US$100 was D7,250."],
  faq: [
    {
      pregunta: "Is this the rate I get at a bank or bureau?",
      respuesta: "Not exactly. The CBG publishes valuation rates for official use. Banks and foreign exchange bureaus set their own buying and selling rates, which can differ.",
    },
    {
      pregunta: "Why is there no rate for today?",
      respuesta: "The CBG does not publish rates on weekends and public holidays, so the calculator uses the most recent working day.",
    },
    {
      pregunta: "Which currencies does the CBG publish?",
      respuesta: "More than thirty, including the CFA franc, the cedi and the naira. This calculator covers the three most used in The Gambia.",
    },
  ],
  glosario: [
    { termino: "Valuation rate", definicion: "The daily rate the Central Bank of The Gambia publishes to value foreign currency amounts in dalasis." },
    { termino: "GMD", definicion: "The code of the Gambian dalasi." },
  ],
});
