import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ug.sick-pay-calculator",
  h1: "Sick pay calculator Uganda",
  title: "Sick pay calculator Uganda: 2 months full, 4 half pay",
  description: "Work out sick pay in Uganda under the {{anio}} rules: full pay for {{ug.sick-full-pay-months}} and half pay for the next {{ug.sick-half-pay-months}}.",
  intro: [
    "If you cannot work because of sickness or injury, the Employment Act guarantees sick pay once you have worked {{ug.sick-min-service-months}} for your employer.",
    "Enter your monthly pay and how long you are off to see what you should be paid.",
  ],
  comoSeCalcula: [
    "The first {{ug.sick-full-pay-months}} of sickness are on full pay.",
    "If you are still sick, the next {{ug.sick-half-pay-months}} are on half pay.",
    "After the sixth month the employer may end the contract, after paying everything the contract owes up to then.",
  ],
  ejemplo: ["Three months off sick on Ushs 1,000,000 a month pays Ushs 2,000,000 for the first two months and Ushs 500,000 for the third."],
  faq: [
    {
      pregunta: "What changed in 2026?",
      respuesta: "Before {{ug.sick-full-pay-months#desde}} the Act gave one month on full pay. The Employment (Amendment) Act, 2026 raised it to two months and added four months on half pay.",
    },
    {
      pregunta: "Do I need a medical certificate?",
      respuesta: "Your employer can ask for a certificate from a qualified medical practitioner, at intervals of at least a week. If they want their own doctor's certificate, they pay the fees and transport.",
    },
    {
      pregunta: "Does sick pay apply to part-time staff?",
      respuesta: "It applies to employees who normally work at least 16 hours a week.",
    },
    {
      pregunta: "What about a work injury?",
      respuesta: "Sick pay does not reduce your rights under the Workers Compensation Act.",
    },
  ],
  glosario: [{ termino: "Sick pay", definicion: "Wages paid while an employee cannot work because of sickness or injury." }],
});
