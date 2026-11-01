import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.unfair-dismissal-calculator",
  h1: "Unfair dismissal compensation calculator Rwanda",
  title: "Unfair dismissal damages in Rwanda: the legal range",
  description: "Damages for unfair dismissal under Article 30 of the labour law: between {{rw.unfair-min-months}} and {{rw.unfair-max-months}} of salary, up to {{rw.unfair-max-months-long}} after 10 years.",
  intro: [
    "If a court finds your dismissal unfair, the labour law sets a floor and a ceiling for the damages. Enter your salary and years of service to see both.",
  ],
  comoSeCalcula: [
    "The damages cannot be lower than {{rw.unfair-min-months}} of salary or higher than {{rw.unfair-max-months}} of salary.",
    "With more than 10 years at the same employer, the ceiling is {{rw.unfair-max-months-long}} of net salary.",
  ],
  ejemplo: ["After four years on RWF 300,000 a month, the damages fall between RWF 900,000 and RWF 1,800,000."],
  faq: [
    {
      pregunta: "Who decides the exact amount?",
      respuesta: "The court or the body hearing the dispute, within the range the law sets.",
    },
    {
      pregunta: "Are union and safety committee representatives covered?",
      respuesta: "Yes. The same damages are paid to employee representatives, health and safety committee members and union representatives dismissed for doing that role.",
    },
    {
      pregunta: "Does it work the other way round?",
      respuesta: "Yes. An employee who ends the contract unlawfully owes the employer damages within the same range.",
    },
  ],
  glosario: [
    { termino: "Unfair dismissal", definicion: "Ending a contract without a legitimate reason or without following the law." },
    { termino: "Net salary", definicion: "Salary after tax and the employee's contributions." },
  ],
});
