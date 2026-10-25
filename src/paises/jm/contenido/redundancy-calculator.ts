import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jm.redundancy-calculator",
  h1: "Redundancy pay calculator Jamaica",
  title: "Redundancy pay calculator Jamaica",
  description: "Estimate your redundancy payment under the Employment (Termination and Redundancy Payments) Act from your years of service and weekly pay.",
  intro: ["Enter your full years of continuous service and your normal weekly pay to estimate your redundancy payment."],
  comoSeCalcula: [
    "For each of your first 10 years: {{jm.redundancy-weeks-first-10}} of pay.",
    "For each year after the tenth: {{jm.redundancy-weeks-after-10}} of pay.",
    "You need {{jm.redundancy-qualifying-weeks}} of continuous employment to qualify.",
  ],
  faq: [],
  glosario: [],
});
