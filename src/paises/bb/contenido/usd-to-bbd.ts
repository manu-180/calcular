import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bb.usd-to-bbd",
  h1: "US dollar to Barbados dollar converter {{anio}}",
  title: "USD to BBD converter {{anio}}: the {{bb.usd-parity}} to 1 peg and the {{bb.foreign-exchange-fee}} fee",
  description:
    "Convert US dollars to Barbados dollars at the fixed rate of {{bb.usd-parity}} to 1, and add the {{bb.foreign-exchange-fee}} foreign exchange fee that applies when you buy or pay in foreign currency.",
  intro: [
    "The Barbados dollar has been pegged to the US dollar at {{bb.usd-parity}} to 1 since {{bb.usd-parity#desde}}. The Central Bank of Barbados describes the rate as fixed, so US$1 is always Bds$2 at the official parity.",
    "What changes the final amount is the Foreign Exchange Fee. The Central Bank sets it at {{bb.foreign-exchange-fee}}, charged on the Barbados dollar value of purchases of foreign currency and payments related to foreign currency.",
  ],
  comoSeCalcula: [
    "Value at the peg: the US dollar amount multiplied by {{bb.usd-parity}}.",
    "Foreign exchange fee: {{bb.foreign-exchange-fee}} of that Barbados dollar value when you buy foreign cash, send a wire, buy a bank draft or pay for a foreign transaction by card.",
    "No fee when you convert foreign cash into Barbados dollars, deposit a foreign bank draft or receive a wire transfer.",
    "Banks and dealers set their own buying and selling rates close to the peg, so the counter rate can differ a little from the parity.",
  ],
  ejemplo: [
    "To buy US$500 in cash, the value at the peg is Bds$1,000.00. The 2% fee adds Bds$20.00, so you pay Bds$1,020.00. If you receive US$500 from abroad and convert it, there is no fee and you get Bds$1,000.00 at parity.",
  ],
  faq: [
    {
      pregunta: "What is the exchange rate between the US dollar and the Barbados dollar?",
      respuesta: "The Central Bank of Barbados keeps the Barbados dollar pegged at {{bb.usd-parity}} to 1 US dollar, a rate it has held since 1975.",
    },
    {
      pregunta: "What is the Foreign Exchange Fee?",
      respuesta: "The Central Bank FAQ describes it as a {{bb.foreign-exchange-fee}} fee on purchases of foreign currency and payments related to foreign currency, calculated on the Barbados dollar value.",
    },
    {
      pregunta: "When is the fee not charged?",
      respuesta: "The Central Bank says it applies to purchases and payments only. Converting foreign cash to local money, depositing a foreign bank draft or receiving a wire transfer do not carry it.",
    },
  ],
  glosario: [
    { termino: "Peg", definicion: "A fixed exchange rate that the central bank commits to defend." },
    { termino: "Foreign Exchange Fee", definicion: "A {{bb.foreign-exchange-fee}} charge on purchases of and payments in foreign currency." },
    { termino: "Parity", definicion: "The official rate of {{bb.usd-parity}} Barbados dollars for one US dollar." },
  ],
});
