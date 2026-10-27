import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "na.usd-to-nad",
  h1: "US dollar to Namibia dollar converter",
  title: "USD to NAD today: Bank of Namibia exchange rate",
  description:
    "Convert US dollars to Namibia dollars and back with the Bank of Namibia rate of the day: {{na.usd}} per US dollar on {{na.usd#desde}}.",
  intro: [
    "Enter an amount in US dollars or Namibia dollars and convert it at the exchange rate the Bank of Namibia publishes every working day.",
    "The rate updates automatically, so the result always shows the date of the rate used.",
  ],
  comoSeCalcula: [
    "US dollars to Namibia dollars: amount times the Bank of Namibia rate.",
    "Namibia dollars to US dollars: amount divided by the same rate.",
  ],
  ejemplo: ["At N$16.6406 per US dollar, US$100 is N$1,664.06."],
  faq: [
    {
      pregunta: "Why is the Namibia dollar worth the same as the rand?",
      respuesta: "The Namibia dollar is pegged one to one to the South African rand, and the rand is legal tender in Namibia too. The US dollar rate therefore moves with the rand.",
    },
    {
      pregunta: "Will my bank give me this rate?",
      respuesta: "Not exactly. Banks and bureaux de change set their own buying and selling rates and may charge commission. Use this rate as a reference.",
    },
    {
      pregunta: "How often does the rate change?",
      respuesta: "The Bank of Namibia publishes a new rate each working day. On weekends and public holidays the last published rate applies.",
    },
  ],
  glosario: [
    { termino: "NAD", definicion: "The ISO code of the Namibia dollar, written N$." },
    { termino: "Peg", definicion: "A fixed exchange rate between two currencies, here one Namibia dollar to one rand." },
  ],
});
