import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "bz.usd-to-bzd",
  "h1": "US dollar to Belize dollar {{anio}}",
  "title": "USD to BZD {{anio}}: the fixed rate of {{bz.usd-peg}}",
  "description": "Convert US dollars to Belize dollars and back at the fixed rate of {{bz.usd-peg}} per US dollar. The Central Bank of Belize has held it since 1976.",
  "intro": [
    "The Belize dollar is pegged to the US dollar at a fixed rate of {{bz.usd-peg}} for each US$1. The rate does not move from day to day, so a conversion gives the same result today as it did last year.",
    "Enter an amount, choose the direction and read the result. Use it for prices quoted in US dollars, for rent, for tour fares and for money sent from abroad."
  ],
  "comoSeCalcula": [
    "To go from US dollars to Belize dollars, multiply by {{bz.usd-peg}}. To go back, divide by {{bz.usd-peg}}.",
    "The Central Bank of Belize fixed the rate on 11 May 1976, after sterling devaluations had hurt the Belize dollar. The peg is a legislated aim of the Central Bank of Belize Act, in force since 1 January 1982.",
    "The fixed rate is the official parity. A bank or exchange house may add a margin or a fee when it buys or sells US dollars for you, so the amount you receive at the counter can differ slightly."
  ],
  "ejemplo": [
    "A guesthouse quotes US$150 a night. At the fixed rate that is BZ$300.00 a night.",
    "A shop tag reads BZ$500. In US dollars that is US$250.00."
  ],
  "faq": [
    {
      "pregunta": "Is the Belize dollar really fixed to the US dollar?",
      "respuesta": "Yes. The Central Bank of Belize states that the exchange rate has been fixed at BZ$2 to US$1 since 1976."
    },
    {
      "pregunta": "Does the rate change from day to day?",
      "respuesta": "No. The parity stays at {{bz.usd-peg}} per US dollar. Only the margin a bank or exchange house charges can vary."
    },
    {
      "pregunta": "Why was the peg set in 1976?",
      "respuesta": "The Central Bank explains that the 1976 decision returned the Belize dollar to the US dollar after a period tied to sterling, which had lost value."
    }
  ],
  "glosario": [
    {
      "termino": "Peg",
      "definicion": "A fixed exchange rate that the central bank defends by holding enough foreign reserves."
    },
    {
      "termino": "Parity",
      "definicion": "The official rate between two currencies, here BZ$2 for each US$1."
    }
  ]
});
