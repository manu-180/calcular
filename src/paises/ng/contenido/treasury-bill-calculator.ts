import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ng.treasury-bill-calculator",
  h1: "Treasury bill calculator",
  title: "Treasury bill calculator Nigeria: price and true yield",
  description: "Work out what you pay for a Nigerian treasury bill, what you earn at maturity and the true yield, from the discount rate and tenor.",
  intro: [
    "Treasury bills are sold at a discount: you pay less today and receive the face value at maturity. Enter the face value, the discount rate and the tenor.",
  ],
  comoSeCalcula: [
    "Price today = face value × (1 − discount rate × days ÷ 365).",
    "What you earn is the face value minus the price.",
    "The true yield is higher than the discount rate, because you earn it on the price you paid, not on the face value: yield = discount rate ÷ (1 − discount rate × days ÷ 365).",
  ],
  ejemplo: ["For ₦1 million at 18% for 364 days, you pay ₦820,493.15 and earn ₦179,506.85, a true yield of about 21.94%."],
  faq: [
    {
      pregunta: "Where do I find the discount rate?",
      respuesta: "It is set at the auction (the stop rate). Your bank or broker quotes it when you buy.",
    },
    {
      pregunta: "Why is the yield higher than the rate?",
      respuesta: "The discount is worked out on the face value but you only invest the lower price, so your return on the money you put in is higher.",
    },
    {
      pregunta: "Are treasury bills safe?",
      respuesta: "They are short-term debt of the Federal Government. Inflation can still reduce what the money is worth.",
    },
  ],
  glosario: [
    { termino: "Face value", definicion: "The amount paid back at maturity." },
    { termino: "Discount rate", definicion: "The yearly rate used to work out the price below face value." },
    { termino: "Stop rate", definicion: "The rate at which an auction clears." },
  ],
});
