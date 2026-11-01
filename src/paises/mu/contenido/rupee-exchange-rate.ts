import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mu.rupee-exchange-rate",
  h1: "Rupee exchange rate calculator",
  title: "Dollar to rupee Mauritius: today's BOM rate",
  description:
    "Convert US dollars, euros or pounds to Mauritian rupees and back with the Bank of Mauritius indicative rate. US$ 1 = {{mu.usd}} on {{mu.usd#desde}}.",
  intro: [
    "Convert between the Mauritian rupee and the US dollar, the euro or the pound sterling.",
    "The rate is the consolidated indicative selling rate published every working day by the Bank of Mauritius.",
  ],
  comoSeCalcula: [
    "To get rupees, the amount is multiplied by the rate. To go from rupees to the other currency, it is divided by the rate.",
    "On {{mu.usd#desde}}, US$ 1 was {{mu.usd}}, EUR 1 was {{mu.eur}} and GBP 1 was {{mu.gbp}}.",
  ],
  ejemplo: ["At 47.86 rupees to the dollar, US$ 100 is Rs 4,786."],
  faq: [
    {
      pregunta: "What is the consolidated indicative rate?",
      respuesta: "A simple average of the indicative rates that all banks send to the Bank of Mauritius. It shows the average retail rate in the market when it is published.",
    },
    {
      pregunta: "Why is my bank's rate different?",
      respuesta: "Each bank sets its own rate and margin. The buying rate for notes, used when you sell foreign cash, is lower than the selling rate shown here.",
    },
    {
      pregunta: "How often is it updated?",
      respuesta: "The Bank of Mauritius publishes it on working days. The calculator uses the latest rate available.",
    },
  ],
  glosario: [{ termino: "Selling rate", definicion: "The rate at which banks sell foreign currency to you in exchange for rupees." }],
});
