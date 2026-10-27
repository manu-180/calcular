import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "qa.sick-leave-pay",
  h1: "Sick leave pay calculator for Qatar",
  title: "Sick leave pay in Qatar: full, half and unpaid weeks",
  description:
    "Work out sick leave pay under the Qatar Labour Law: {{qa.sick-leave[full-pay]}} on full pay, then {{qa.sick-leave[half-pay]}} on half pay, after three months of service.",
  intro: [
    "Workers covered by the Labour Law get paid sick leave each year once they've been with the employer for three months.",
    "Enter your basic salary and the weeks you were off sick to see how much of the time is paid.",
  ],
  comoSeCalcula: [
    "The first {{qa.sick-leave[full-pay]}} are on full pay and the next {{qa.sick-leave[half-pay]}} on half pay. Any time after that is unpaid until you return, resign or the contract ends for health reasons.",
    "Sick leave starts after {{qa.sick-leave-qualifying}} with the employer and needs a certificate from a doctor the employer approves.",
    "Pay is based on your basic salary. Choose the weekly conversion used in your contract.",
  ],
  ejemplo: ["With a basic salary of QAR 6,000 and three weeks off sick, you get two weeks on full pay and one on half pay: QAR 3,500."],
  faq: [
    {
      pregunta: "Can my employer end my contract while I'm on sick leave?",
      respuesta: "Only at the end of the twelfth week, and only if a specialist's report says you can't return to work.",
    },
    {
      pregunta: "Does long sick leave break my service?",
      respuesta: "No. Twelve weeks of sick leave don't interrupt your continuous service, and they don't affect your gratuity.",
    },
    {
      pregunta: "What if I resign because of illness?",
      respuesta: "If you resign with a specialist's approval before the six paid weeks run out, the employer pays you the rest of what was due for them.",
    },
  ],
  glosario: [{ termino: "Sick leave", definicion: "Time off work because of illness, certified by a doctor." }],
});
