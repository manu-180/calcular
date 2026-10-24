import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.dollar-to-shilling",
  h1: "Dollar to Kenya shilling converter",
  title: "Dollar to shilling today: CBK rate KSh {{ke.usd}}",
  description: "Convert US dollars to Kenya shillings and back with the Central Bank of Kenya indicative rate of {{ke.usd#desde}}: {{ke.usd}} per dollar.",
  intro: [
    "Convert any amount between US dollars and Kenya shillings with the indicative rate the Central Bank of Kenya publishes each working day.",
    "The latest rate is {{ke.usd}} per dollar, posted on {{ke.usd#desde}}.",
  ],
  comoSeCalcula: [
    "Dollars to shillings: multiply the amount by the CBK mean rate.",
    "Shillings to dollars: divide the amount by the same rate.",
  ],
  ejemplo: ["At KSh 129.81 per dollar, US$100 is KSh 12,981."],
  faq: [
    {
      pregunta: "What is the CBK indicative rate?",
      respuesta: "The average of the buying and selling rates of the main banks at the open of trade. CBK publishes it as a guide to the value of the shilling.",
    },
    {
      pregunta: "Will my bank give me this rate?",
      respuesta: "Not exactly. Banks, forex bureaus and money transfer services add their own margin and fees.",
    },
    {
      pregunta: "How often is the rate updated?",
      respuesta: "CBK posts a new rate every working day.",
    },
  ],
  glosario: [{ termino: "Mean rate", definicion: "The midpoint between the buying and selling rate." }],
});
