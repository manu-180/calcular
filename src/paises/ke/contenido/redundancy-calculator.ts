import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.redundancy-calculator",
  h1: "Redundancy pay calculator Kenya",
  title: "Redundancy calculator Kenya: severance pay and notice",
  description: "Work out your redundancy package: severance of at least {{ke.redundancy-severance-days}} days' pay per completed year, a month in lieu of notice and leave pay.",
  intro: [
    "If your job is declared redundant, the Employment Act sets a minimum package. Enter your pay and years of service to see it.",
    "Your contract or a collective agreement can give you more, never less.",
  ],
  comoSeCalcula: [
    "Severance pay is at least {{ke.redundancy-severance-days}} days' pay for each completed year of service.",
    "Your employer must also give one month's notice or pay one month's wages instead.",
    "Any leave due to you is paid off in cash.",
  ],
  ejemplo: ["After five years on KSh 60,000 a month, severance is KSh 150,000. Without notice, add KSh 60,000 for a total of KSh 210,000."],
  faq: [
    {
      pregunta: "Who must be told about the redundancy?",
      respuesta: "If you are in a union, the union and the local labour officer, at least a month before. If not, you personally in writing and the labour officer.",
    },
    {
      pregunta: "How are people chosen for redundancy?",
      respuesta: "The employer must consider seniority, skill, ability and reliability of each employee in the group affected.",
    },
    {
      pregunta: "How is a day's pay worked out?",
      respuesta: "The Act does not say. Use the divisor in your contract or the one your employer uses. The calculator lets you choose 30 or 26.",
    },
  ],
  glosario: [
    { termino: "Redundancy", definicion: "Losing your job because it is no longer needed, not because of anything you did." },
    { termino: "Severance pay", definicion: "The payment for each completed year of service when a job is made redundant." },
  ],
});
