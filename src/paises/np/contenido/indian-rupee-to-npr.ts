import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "np.indian-rupee-to-npr",
  h1: "Indian rupee to NPR converter",
  title: "Indian rupee to NPR: NRB rate {{np.inr}} per 100 INR",
  description: "Convert Indian rupees to Nepali rupees and back with the Nepal Rastra Bank rate of {{np.inr#desde}}: {{np.inr}} for every 100 Indian rupees.",
  intro: [
    "Many Nepali families and traders deal in Indian rupees. Enter an amount and choose a direction to convert it with the Nepal Rastra Bank rate.",
    "On {{np.inr#desde}} the Bank buys 100 Indian rupees for {{np.inr}}.",
  ],
  comoSeCalcula: [
    "Indian rupees to Nepali rupees: the amount is multiplied by the rate for one Indian rupee, which is the Bank's quote for 100 rupees divided by 100.",
    "Nepali rupees to Indian rupees: the amount is divided by the same rate.",
    "The Bank quotes the same price every day, so the result changes only if the Bank changes the quote. A money changer or bank will add its own margin.",
  ],
  ejemplo: ["At NPR 160 per 100 Indian rupees, INR 1,000 is NPR 1,600, and NPR 8,000 is INR 5,000."],
  faq: [
    {
      pregunta: "What is the Indian rupee rate in Nepal?",
      respuesta: "The Nepal Rastra Bank publishes NPR 160 for every 100 Indian rupees, which is NPR 1.60 per rupee.",
    },
    {
      pregunta: "Does the rate change every day?",
      respuesta: "The Bank publishes a rate for each day, and its quote for the Indian rupee has stayed the same in the daily rates we use.",
    },
    {
      pregunta: "Where does the rate come from?",
      respuesta: "From the foreign exchange page of the Nepal Rastra Bank, the central bank.",
    },
  ],
  glosario: [
    { termino: "INR", definicion: "The code for the Indian rupee." },
    { termino: "Buying rate", definicion: "The price at which the bank buys a foreign currency." },
  ],
});
