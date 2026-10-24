import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kw.remittance-calculator",
  h1: "Remittance calculator Kuwait",
  title: "Send money from Kuwait: remittance cost calculator",
  description: "See how much your family receives when you send money from Kuwait, and what the fee and the exchange rate really cost you against the CBK rate.",
  intro: [
    "Enter the dinars you send, the fee and the rate the exchange company offers. You see what arrives and how much less it is than at the official rate.",
    "The comparison uses the Central Bank of Kuwait rate for India, Egypt, Pakistan, Bangladesh, Sri Lanka and more.",
  ],
  comoSeCalcula: [
    "The fee comes off the amount you send.",
    "The rest is converted at the rate you enter, or at the CBK rate if you leave it at zero.",
    "The cost is the difference with sending the whole amount at the CBK rate, as a share of that amount.",
  ],
  ejemplo: ["Sending KD 100 to India with a KD 1 fee at the CBK rate of {{kw.fx-inr}} per rupee gives about 30,518 rupees, around 1% less than the full amount at the official rate."],
  faq: [
    {
      pregunta: "How do I compare two exchange companies?",
      respuesta: "Enter each company's fee and rate in turn. The one with the larger amount received is cheaper, whatever the advertised fee.",
    },
    {
      pregunta: "Why is the CBK rate better than what I get?",
      respuesta: "The CBK rate is a reference with no margin. Exchange companies add their margin to the rate they give you.",
    },
    {
      pregunta: "Which date is the CBK rate from?",
      respuesta: "The latest working day the CBK has published, shown in the results.",
    },
  ],
  glosario: [
    { termino: "Remittance", definicion: "Money sent to someone in another country." },
    { termino: "Exchange margin", definicion: "The difference between the reference rate and the rate a company gives you." },
  ],
});
