import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ng.fixed-deposit-calculator",
  h1: "Fixed deposit calculator",
  title: "Fixed deposit calculator Nigeria: interest and maturity",
  description: "Work out the interest on a naira fixed deposit for any tenor in days, and what it grows to if you roll it over with the interest.",
  intro: [
    "Enter the amount, the rate your bank offers and the tenor in days. You get the interest and the amount at maturity.",
  ],
  comoSeCalcula: [
    "Interest for one tenor = amount × rate × days ÷ 365.",
    "If you roll over the deposit with the interest, each new tenor earns interest on the larger balance.",
    "Banks may deduct tax from the interest before paying it. Check the net amount on your advice.",
  ],
  ejemplo: ["₦1 million for 90 days at 15% earns ₦36,986.30. Rolled over three more times, it reaches about ₦1,156,357 after 360 days."],
  faq: [
    {
      pregunta: "Why is my bank's figure a little different?",
      respuesta: "Banks may count days differently, round each period or deduct tax from the interest. The difference is usually small.",
    },
    {
      pregunta: "Can I break the deposit early?",
      respuesta: "Usually, but banks often pay a lower rate or charge a fee. Ask before you book.",
    },
    {
      pregunta: "Fixed deposit or treasury bills?",
      respuesta: "Treasury bills are government debt sold at a discount. Compare the yield with the treasury bill calculator.",
    },
  ],
  glosario: [
    { termino: "Tenor", definicion: "How long the money stays deposited, in days." },
    { termino: "Rollover", definicion: "Booking the deposit again when it matures." },
  ],
});
