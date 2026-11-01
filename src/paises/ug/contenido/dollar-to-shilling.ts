import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ug.dollar-to-shilling",
  h1: "Dollar to Uganda shilling converter",
  title: "Dollar to Uganda shilling: Bank of Uganda rate today",
  description: "Convert US dollars to Uganda shillings and back with the Bank of Uganda opening middle rate: {{ug.usd}} per dollar on {{ug.usd#desde}}.",
  intro: [
    "Convert between US dollars and Uganda shillings with the official rate the Bank of Uganda publishes every morning.",
    "Choose the direction and enter the amount.",
  ],
  comoSeCalcula: [
    "Dollars to shillings: the amount times the middle rate, {{ug.usd}} on {{ug.usd#desde}}.",
    "Shillings to dollars: the amount divided by the same rate.",
    "The middle rate is the interbank average, halfway between the buying and selling rates.",
  ],
  ejemplo: ["At a rate of Ushs 4,209.76, US$100 is Ushs 420,976."],
  faq: [
    {
      pregunta: "Why does my bank give a different rate?",
      respuesta: "Banks and forex bureaus set their own buying and selling rates. The Bank of Uganda rate is a reference, not the price you pay at the counter.",
    },
    {
      pregunta: "When is the rate published?",
      respuesta: "The Bank of Uganda publishes opening rates each working day, for major currencies and for COMESA member currencies.",
    },
    {
      pregunta: "Which rate do I use for a dollar invoice?",
      respuesta: "Use the rate your contract or bank applies. This calculator gives the official reference rate for comparison.",
    },
  ],
  glosario: [
    { termino: "Middle rate", definicion: "The average of the buying and selling rates." },
    { termino: "BoU", definicion: "Bank of Uganda, the central bank." },
  ],
});
