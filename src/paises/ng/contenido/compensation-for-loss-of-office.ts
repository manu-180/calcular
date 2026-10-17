import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ng.compensation-for-loss-of-office",
  h1: "Tax on compensation for loss of employment",
  title: "Severance pay tax Nigeria: the {{ng.compensation-exemption}} exemption",
  description: "Compensation for loss of office or employment up to {{ng.compensation-exemption}} is not a chargeable gain. See how much of your payment is covered.",
  intro: [
    "If you receive compensation for losing your job or office, the Nigeria Tax Act, 2025 leaves the first {{ng.compensation-exemption}} untaxed. Enter the amount to split it.",
  ],
  comoSeCalcula: [
    "Compensation up to {{ng.compensation-exemption}} is not a chargeable gain.",
    "If it is more, only the amount above {{ng.compensation-exemption}} counts as a chargeable gain.",
  ],
  ejemplo: ["On ₦60 million of compensation, ₦50 million is free and ₦10 million is a chargeable gain."],
  faq: [
    {
      pregunta: "What payments does this cover?",
      respuesta: "Compensation or damages for a wrong or injury to you, in your person or profession, including compensation for loss of office or employment.",
    },
    {
      pregunta: "Does it cover my final salary and leave pay?",
      respuesta: "No. Salary, leave allowance and other pay you earned are employment income and go through PAYE.",
    },
    {
      pregunta: "Who has to report the payment?",
      respuesta: "The person who pays compensation for loss of office or employment has duties under the Act. Ask your employer how it will be reported.",
    },
  ],
  glosario: [
    { termino: "Chargeable gain", definicion: "A gain that the Nigeria Tax Act brings into tax." },
    { termino: "Compensation for loss of office", definicion: "A payment made because a job or position ended." },
  ],
});
