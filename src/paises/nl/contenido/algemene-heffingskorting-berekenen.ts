import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nl.algemene-heffingskorting-berekenen",
  h1: "Algemene heffingskorting berekenen {{anio}}",
  title: "Algemene heffingskorting {{anio}}: maximaal {{nl.ahk[max]}}",
  description:
    "Bereken je algemene heffingskorting over {{anio}}. Maximaal {{nl.ahk[max]}}, en boven {{nl.ahk[afbouwgrens]}} verzamelinkomen gaat er {{nl.ahk-afbouw}} per euro af.",
  intro: [
    "De algemene heffingskorting is een korting op je inkomstenbelasting waar iedereen recht op heeft, ook als je niet werkt. Hoe hoger je inkomen, hoe lager de korting.",
    "Vul je verzamelinkomen in en je ziet hoeveel algemene heffingskorting je in 2026 krijgt.",
  ],
  comoSeCalcula: [
    "Tot een verzamelinkomen van {{nl.ahk[afbouwgrens]}} krijg je de volledige korting van {{nl.ahk[max]}}.",
    "Daarboven gaat er {{nl.ahk-afbouw}} af van elk euro dat je meer verdient.",
    "Bij een verzamelinkomen vanaf € 78.426 is de korting nul.",
  ],
  ejemplo: ["Met een verzamelinkomen van € 50.000 is je korting € 3.115 − 6,398% × (€ 50.000 − € 29.736) = € 1.818,51."],
  faq: [
    {
      pregunta: "Wat is het verzamelinkomen?",
      respuesta: "Je inkomen uit box 1, box 2 en box 3 bij elkaar. Heb je alleen loon en geen aanmerkelijk belang of vermogen boven het heffingsvrij vermogen, dan is het je belastbaar inkomen uit werk en woning.",
    },
    {
      pregunta: "Wat is het verschil met de arbeidskorting?",
      respuesta: "De algemene heffingskorting krijgt iedereen, ook zonder werk. De arbeidskorting krijg je alleen over inkomen uit werk. De algemene heffingskorting hangt af van je verzamelinkomen, de arbeidskorting van je arbeidsinkomen.",
    },
    {
      pregunta: "Geldt dit bedrag ook na je AOW-leeftijd?",
      respuesta: "Nee. Deze bedragen gelden als je in 2026 de AOW-leeftijd nog niet hebt. Na je AOW-leeftijd gelden andere bedragen.",
    },
  ],
  glosario: [
    { termino: "Verzamelinkomen", definicion: "Het totaal van je inkomen uit box 1, 2 en 3." },
    { termino: "Afbouw", definicion: "Het deel van de korting dat je verliest doordat je inkomen boven de grens ligt." },
  ],
});
