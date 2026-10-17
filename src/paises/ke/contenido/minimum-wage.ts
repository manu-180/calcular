import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.minimum-wage",
  h1: "Minimum wage in Kenya 2026",
  title: "Minimum wage Kenya 2026 by occupation and town",
  description: "Find the 2026 minimum wage for your job and area. A general labourer in Nairobi earns at least {{ke.minimum-wage-monthly[general]@cities}} a month.",
  intro: [
    "Kenya sets a minimum wage for each occupation and each type of area. The latest order raised the rates from 1 May 2026.",
    "Choose where you work and your job to see the monthly and hourly minimum. You can also enter your pay to compare.",
  ],
  comoSeCalcula: [
    "The Regulation of Wages (General) Order sets three areas: the cities of Nairobi, Mombasa, Kisumu, Nakuru and Eldoret; the former municipalities of Mavoko, Ruiru and Limuru; and all other areas.",
    "Each occupation has a monthly wage and an hourly rate in each area. The monthly wage does not include housing allowance.",
    "A general labourer earns at least {{ke.minimum-wage-monthly[general]@cities}} in the cities, {{ke.minimum-wage-monthly[general]@municipalities}} in the former municipalities and {{ke.minimum-wage-monthly[general]@other}} elsewhere.",
  ],
  ejemplo: ["A night watchman in Ruiru must earn at least KSh 18,665.88 a month, or KSh 165.26 an hour."],
  faq: [
    {
      pregunta: "When did the new minimum wages start?",
      respuesta: "On 1 May 2026. The order was published later, so employers owe the difference from that date.",
    },
    {
      pregunta: "Does the minimum include housing allowance?",
      respuesta: "No. The monthly minimum is exclusive of housing allowance.",
    },
    {
      pregunta: "Do farm workers have the same minimum?",
      respuesta: "No. Agricultural workers have their own order. This calculator covers the general order.",
    },
  ],
  glosario: [{ termino: "Housing allowance", definicion: "Money for housing that an employer pays on top of the basic wage when it does not provide a home." }],
});
