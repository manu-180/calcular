import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lk.dollar-rate",
  h1: "Dollar rate in Sri Lanka today",
  title: "Dollar rate today Sri Lanka: USD to LKR, CBSL",
  description:
    "Convert US dollars and Sri Lankan rupees with the Central Bank indicative spot rate: {{lk.usd}} per dollar on {{lk.usd#desde}}.",
  intro: [
    "The Central Bank of Sri Lanka publishes an indicative rate for the US dollar against the rupee every working day. This converter uses the latest one.",
    "Choose the direction and enter the amount.",
  ],
  comoSeCalcula: [
    "Dollars to rupees: the amount times the CBSL indicative rate.",
    "Rupees to dollars: the amount divided by the same rate.",
    "The rate is updated every working day from the Central Bank's own page.",
  ],
  ejemplo: ["At a rate of Rs. 332.23, US$ 100 is about Rs. 33,223."],
  faq: [
    {
      pregunta: "Is this the rate my bank will give me?",
      respuesta: "No. It is an indicative rate. Banks buy and sell at their own rates, with a margin on each side.",
    },
    {
      pregunta: "Where does the rate come from?",
      respuesta: "From the Central Bank of Sri Lanka, which publishes the indicative rate of the USD/LKR spot exchange rate in rupees per dollar.",
    },
    {
      pregunta: "Why is there no rate for today?",
      respuesta: "The Central Bank publishes it on working days only. On other days the converter uses the last rate published.",
    },
  ],
  glosario: [
    { termino: "Spot rate", definicion: "The rate for buying or selling a currency for immediate delivery." },
    { termino: "LKR", definicion: "The Sri Lankan rupee, written Rs. in Sri Lanka." },
  ],
});
