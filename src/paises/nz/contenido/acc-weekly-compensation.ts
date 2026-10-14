import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nz.acc-weekly-compensation",
  h1: "ACC weekly compensation calculator",
  title: "ACC weekly compensation calculator NZ",
  description: "Estimate your ACC weekly compensation if an injury stops you working: a share of your earnings before the injury, up to a weekly maximum.",
  intro: [
    "If an injury stops you from working, ACC can pay weekly compensation based on what you earned before the injury.",
    "Enter your weekly earnings to see an estimate before tax.",
  ],
  comoSeCalcula: [
    "Your weekly earnings before the injury are multiplied by {{nz.acc-weekly-compensation-rate}}.",
    "The result can't go over the weekly maximum of {{nz.acc-weekly-compensation-max}}.",
  ],
  ejemplo: [],
  faq: [],
  glosario: [{ termino: "ACC", definicion: "Accident Compensation Corporation." }],
});
