import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ls.maternity-leave",
  h1: "Maternity leave calculator for Lesotho",
  title: "Maternity leave calculator Lesotho: start and return dates",
  description:
    "Find when maternity leave can start and the earliest return date in Lesotho: {{ls.maternity-weeks[before]}} before and {{ls.maternity-weeks[after]}} after the birth.",
  intro: [
    "Enter the expected date of birth. You get the day leave can start, the earliest day back at work and how long paid nursing time runs.",
    "The rules are in sections 191 and 192 of the Labour Act, 2024.",
  ],
  comoSeCalcula: [
    "You give your employer a medical certificate that the birth will probably happen within {{ls.maternity-weeks[before]}}. From then you may stay off work until the birth.",
    "After the birth your employer cannot let you return until {{ls.maternity-weeks[after]}} have passed, or {{ls.maternity-weeks[after-illness]}} if a doctor certifies an illness from the birth.",
    "After you return, you may take up to one hour a day to nurse your baby, paid as working time, for {{ls.nursing-months}}.",
  ],
  ejemplo: ["With a baby due on 10 March 2027, leave can start on 20 January 2027 and the earliest return is 28 April 2027."],
  faq: [
    {
      pregunta: "Is maternity leave paid in Lesotho?",
      respuesta: "The Labour Act does not oblige the employer to pay wages during maternity leave. The employer can choose to, and your contract or a collective agreement can require it.",
    },
    {
      pregunta: "How long is paternity leave?",
      respuesta: "{{ls.paternity-days}} from the birth of your child. Adoptive parents get 14 days of bonding leave from the day the child arrives home.",
    },
    {
      pregunta: "What if the baby is stillborn?",
      respuesta: "You are entitled to {{ls.maternity-weeks[stillbirth]}} of maternity leave.",
    },
    {
      pregunta: "Does maternity leave break my continuous employment?",
      respuesta: "No. The absence does not interrupt the continuity of your employment.",
    },
  ],
  glosario: [
    { termino: "Confinement", definicion: "The birth of the baby." },
    { termino: "Nursing hours", definicion: "Paid time during the working day to feed your baby, for a set period after you return." },
  ],
});
