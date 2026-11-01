import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "np.dollar-rate-in-nepal",
  h1: "Dollar rate in Nepal today",
  title: "Dollar rate in Nepal today: NRB rate {{np.usd}}",
  description: "Convert US dollars to Nepali rupees with the Nepal Rastra Bank rate of {{np.usd#desde}}: buying {{np.usd}}, selling {{np.usd-sell}} per dollar.",
  intro: [
    "Convert any amount between US dollars and Nepali rupees with the rates the Nepal Rastra Bank publishes every day.",
    "The buying rate on {{np.usd#desde}} is {{np.usd}} per dollar and the selling rate is {{np.usd-sell}}.",
  ],
  comoSeCalcula: [
    "Dollars to rupees: the calculator multiplies the amount by the NRB buying rate, which is what a bank pays you for your dollars.",
    "Rupees to dollars: it divides the amount by the NRB selling rate, which is what a bank charges you for dollars.",
    "The two rates differ by a small spread. The Bank updates them every day, weekends included.",
  ],
  ejemplo: ["At a buying rate of NPR 152.06, US$100 is NPR 15,206. At a selling rate of NPR 152.66, NPR 50,000 buys US$327.53."],
  faq: [
    {
      pregunta: "Where does the rate come from?",
      respuesta: "From the foreign exchange rates page of the Nepal Rastra Bank, the central bank, which posts buying and selling rates for the US dollar and other currencies.",
    },
    {
      pregunta: "Will my bank give me exactly this rate?",
      respuesta: "Not necessarily. Banks, remittance companies and money changers set their own rates and fees around the central bank reference.",
    },
    {
      pregunta: "How often is the rate updated?",
      respuesta: "The Bank publishes a rate for each day, and the calculator uses the latest available.",
    },
  ],
  glosario: [
    { termino: "Buying rate", definicion: "The rate at which a bank buys foreign currency from you." },
    { termino: "Selling rate", definicion: "The rate at which a bank sells foreign currency to you." },
  ],
});
