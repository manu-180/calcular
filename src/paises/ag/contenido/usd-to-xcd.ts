import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ag.usd-to-xcd",
  h1: "USD to XCD converter {{anio}}",
  title: "USD to XCD converter {{anio}}: the EC dollar peg",
  description: "Convert US dollars to Eastern Caribbean dollars at the fixed rate of the Eastern Caribbean Central Bank.",
  intro: ["The EC dollar is pegged to the US dollar at {{ag.xcd-per-usd}} EC dollars per US dollar."],
  comoSeCalcula: ["Multiply US dollars by {{ag.xcd-per-usd}} to get EC dollars, or divide EC dollars by it."],
  ejemplo: ["US$100 is EC$270."],
  faq: [
    { pregunta: "Does the rate change?", respuesta: "The peg is fixed at {{ag.xcd-per-usd}} per US dollar." },
    { pregunta: "Who issues the EC dollar?", respuesta: "The Eastern Caribbean Central Bank." },
    { pregunta: "Do banks charge more?", respuesta: "Banks and exchange offices may add a margin." },
  ],
  glosario: [{ termino: "Peg", definicion: "A fixed exchange rate." }],
});
