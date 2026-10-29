import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ws.vagst-calculator",
  h1: "VAGST calculator Samoa {{anio}}",
  title: "VAGST calculator Samoa {{anio}}: add or remove 15%",
  description: "Add VAGST at the current rate of {{ws.vagst-rate}} to a price, or take it out of a VAGST-inclusive price. Includes the {{ws.vagst-threshold}} registration threshold.",
  intro: [
    "VAGST, the value added goods and services tax, is {{ws.vagst-rate}} in Samoa. A registered business adds it to the price of most goods and services, and it also applies to most imports and some imported services.",
    "Use the calculator to add VAGST to a price, or to find how much VAGST sits inside a price that already includes it. You can also check your turnover against the registration threshold.",
  ],
  comoSeCalcula: [
    "To add VAGST, multiply the price by {{ws.vagst-rate}} and add the result to the price.",
    "To take it out, divide the VAGST-inclusive price by 1.15. The difference is the VAGST.",
    "A business must register for VAGST when its licensed turnover is more than {{ws.vagst-threshold}} in a year, or is expected to be in the next twelve months. Foreign businesses register only if they carry on a continuous and regular activity in Samoa.",
  ],
  ejemplo: [
    "A price of WST 1,000 plus VAGST of WST 150 gives WST 1,150. In reverse, WST 1,150 divided by 1.15 returns WST 1,000, so WST 150 of the price is VAGST.",
  ],
  faq: [
    {
      pregunta: "What is the VAGST rate?",
      respuesta: "The Ministry for Revenue states that VAGST of {{ws.vagst-rate}} is added to the price of goods and services supplied by registered businesses.",
    },
    {
      pregunta: "When must I register for VAGST?",
      respuesta: "When your annual turnover from a licensed business is above {{ws.vagst-threshold}}, or you expect it to be above that over the next twelve months, according to the Inland Revenue Services guidance.",
    },
    {
      pregunta: "When do I file the VAGST return?",
      respuesta: "The Ministry's due date table shows VAGST returns filed by the 21st of the month, with payment due on the same date. The return decides whether any VAGST is payable.",
    },
  ],
  glosario: [
    { termino: "VAGST", definicion: "Value added goods and services tax, Samoa's tax on consumption." },
    { termino: "Turnover", definicion: "Total sales of the business before costs." },
    { termino: "Tax invoice", definicion: "The invoice a registered business issues showing the VAGST charged." },
  ],
});
