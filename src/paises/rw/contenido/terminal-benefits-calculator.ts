import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.terminal-benefits-calculator",
  h1: "Terminal benefits calculator Rwanda",
  title: "Terminal benefits in Rwanda: redundancy pay calculator",
  description: "Minimum terminal benefits under Article 31 of the labour law: from {{rw.terminal-benefits[under-5]}} to {{rw.terminal-benefits[over-25]}} of average salary by years of service.",
  intro: [
    "When a contract ends for economic reasons, a technological change or long sickness, the labour law sets a minimum payment called terminal benefits.",
    "Enter your years of service and what you earned in the last 12 months to see the amount.",
  ],
  comoSeCalcula: [
    "Average monthly salary: total salary of the last 12 months divided by 12, leaving out allowances given to do the job.",
    "Less than 5 years: {{rw.terminal-benefits[under-5]}} of average salary. 5 to 10 years: {{rw.terminal-benefits[5-to-10]}}. 10 to 15 years: {{rw.terminal-benefits[10-to-15]}}.",
    "15 to 20 years: {{rw.terminal-benefits[15-to-20]}}. 20 to 25 years: {{rw.terminal-benefits[20-to-25]}}. Over 25 years: {{rw.terminal-benefits[over-25]}}.",
    "You need at least {{rw.terminal-min-months}} of continuous service. Retirement benefits use the same scale.",
  ],
  ejemplo: ["Six years of service and RWF 3,600,000 earned in the last year give an average of RWF 300,000. The minimum is three times that: RWF 900,000."],
  faq: [
    {
      pregunta: "When must terminal benefits be paid?",
      respuesta: "Within seven working days of the dismissal.",
    },
    {
      pregunta: "Do I get them if I resign?",
      respuesta: "No. They apply when the contract ends for economic reasons, a technological change or sickness. Retirement benefits follow the same scale.",
    },
    {
      pregunta: "Can I get terminal and retirement benefits together?",
      respuesta: "No. The law says retirement benefits are not paid cumulatively with terminal benefits.",
    },
    {
      pregunta: "And if I am dismissed unfairly?",
      respuesta: "Unfair dismissal gives a right to damages instead. Use the unfair dismissal calculator to see the range.",
    },
  ],
  glosario: [
    { termino: "Terminal benefits", definicion: "The payment the law sets when a contract ends for economic, technological or health reasons." },
    { termino: "Average monthly salary", definicion: "Salary of the last 12 months divided by 12, without allowances for doing the job." },
  ],
});
