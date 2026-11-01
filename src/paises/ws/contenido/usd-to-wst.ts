import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ws.usd-to-wst",
  h1: "USD to WST converter: US dollar to Samoan tala",
  title: "USD to WST today: US dollar to Samoan tala",
  description: "Convert US, NZ, Australian and Fijian dollars, euros and pounds to Samoan tala with the Central Bank of Samoa indicative rate of {{ws.usd#desde}}.",
  intro: [
    "Convert between the Samoan tala (WST) and six foreign currencies with the indicative rates the Central Bank of Samoa publishes each working day.",
    "The latest rate for the US dollar is {{ws.usd}} per tala, posted on {{ws.usd#desde}}. The tala is set against a trade-weighted basket of currencies, so it moves with the currencies Samoa trades in.",
  ],
  comoSeCalcula: [
    "The Central Bank quotes units of foreign currency per one tala. To turn foreign money into tala, divide the amount by the rate.",
    "To turn tala into foreign money, multiply the amount by the rate.",
    "The rate is indicative. Commercial banks quote their own buying and selling prices, and the Central Bank shows a spread around its figure.",
  ],
  ejemplo: [
    "At 0.36201 US dollars per tala, US$100 buys 276.24 tala. At 0.64306 New Zealand dollars per tala, WS$100 is NZ$64.31.",
  ],
  faq: [
    {
      pregunta: "How is the tala exchange rate set?",
      respuesta: "The Central Bank of Samoa says the exchange rate of the tala is determined against a trade-weighted basket of currencies, and the basket is reviewed from time to time to reflect trade and payment patterns.",
    },
    {
      pregunta: "Will my bank give me this rate?",
      respuesta: "Not exactly. The Central Bank warns that its rates are indicative and not for market use, and tells people to ask the commercial banks for the market rate.",
    },
    {
      pregunta: "How often does the rate change?",
      respuesta: "The Central Bank updates its daily exchange rate page each working day. This page shows the date of the rate it used.",
    },
  ],
  glosario: [
    { termino: "Tala", definicion: "The currency of Samoa, code WST, written ST or WS$." },
    { termino: "Indicative rate", definicion: "A guide rate, not a price at which you can trade." },
    { termino: "Basket", definicion: "The weighted group of currencies the tala is measured against." },
  ],
});
