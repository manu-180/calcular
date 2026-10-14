import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.tfsa-contribution-room",
  h1: "TFSA contribution room calculator 2026",
  title: "TFSA contribution room calculator 2026",
  description: "Add up the TFSA dollar limits since you turned 18 (from 2009), add back past withdrawals and subtract contributions. The 2026 limit is {{ca.tfsa-annual-limits[2026]}}.",
  intro: [
    "Enter the year you became eligible, what you have contributed and what you withdrew before this year to estimate your TFSA room today.",
    "It uses the TFSA dollar limit for each year since 2009, as published by the Canada Revenue Agency.",
  ],
  comoSeCalcula: [
    "Room builds up every year from the year you turn 18 and are a resident of Canada, starting no earlier than 2009.",
    "Each year adds that year's dollar limit: {{ca.tfsa-annual-limits[2009]}} from 2009 to 2012, {{ca.tfsa-annual-limits[2015]}} in 2015, {{ca.tfsa-annual-limits[2023]}} in 2023 and {{ca.tfsa-annual-limits[2026]}} in 2026, among others.",
    "Withdrawals made in earlier years are added back. Contributions are taken off.",
  ],
  ejemplo: [
    "Someone who was 18 or older and a resident in 2009 and never contributed has $109,000 of room in 2026.",
  ],
  faq: [
    {
      pregunta: "What is the TFSA limit for 2026?",
      respuesta: "The dollar limit for 2026 is {{ca.tfsa-annual-limits[2026]}}.",
    },
    {
      pregunta: "When does a withdrawal give me room back?",
      respuesta: "A withdrawal is added back to your room at the start of the next year, which is why the calculator only counts withdrawals made before this year.",
    },
    {
      pregunta: "How do I know my exact room?",
      respuesta: "CRA My Account shows your TFSA room once the year's records are processed. Check it against your financial institution's records before you contribute.",
    },
  ],
  glosario: [
    { termino: "TFSA", definicion: "Tax-Free Savings Account. Investment growth and withdrawals are not taxed." },
    { termino: "Contribution room", definicion: "The amount you can put into your TFSAs without going over the limit." },
  ],
});
