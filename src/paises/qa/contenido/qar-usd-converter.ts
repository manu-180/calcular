import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "qa.qar-usd-converter",
  h1: "QAR to USD converter",
  title: "Qatari riyal to US dollar at the official rate",
  description:
    "Convert Qatari riyals to US dollars and back at the official parity of {{qa.usd-peg}} per dollar, fixed by decree since {{qa.usd-peg#desde}}.",
  intro: [
    "The Qatari riyal is pegged to the US dollar, so the official rate doesn't move.",
    "Enter an amount to convert it at the parity set by law.",
  ],
  comoSeCalcula: [
    "One US dollar equals {{qa.usd-peg}}.",
    "Dollars to riyals: multiply by the rate. Riyals to dollars: divide by it.",
    "Banks and exchange houses add a margin, so what you get at the counter can be a little different.",
  ],
  ejemplo: ["USD 1,000 is QAR 3,640, and QAR 10,000 is about USD 2,747.25."],
  faq: [
    {
      pregunta: "Who sets the riyal exchange rate?",
      respuesta: "Decree No. 34 of 2001 fixes the riyal against the dollar. Qatar Central Bank buys and sells dollars to the banks within a narrow band around that rate.",
    },
    {
      pregunta: "At what rate does the central bank sell dollars to banks?",
      respuesta: "At no more than QAR 3.6415 per dollar, under the same decree.",
    },
    {
      pregunta: "Does the rate change during the day?",
      respuesta: "The official parity doesn't. The rates shown by banks can vary slightly because of their margins.",
    },
  ],
  glosario: [{ termino: "Peg", definicion: "A fixed exchange rate between two currencies, set by law or by the central bank." }],
});
