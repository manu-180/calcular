import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.maternity-leave-calculator",
  h1: "Maternity leave calculator Rwanda",
  title: "Maternity leave in Rwanda: 14 weeks on full pay",
  description: "Find the end date of your {{rw.maternity-weeks}} of maternity leave, and which weeks your employer bears and which RSSB reimburses.",
  intro: [
    "Working mothers in Rwanda get {{rw.maternity-weeks}} of maternity leave on full salary. Enter the day your leave starts to see when it ends and when you go back.",
  ],
  comoSeCalcula: [
    "Maternity leave lasts {{rw.maternity-weeks}}. Your employer pays your full salary throughout.",
    "The employer can claim the final {{rw.maternity-rssb-weeks}} back from the RSSB Maternity Leave Benefit Scheme.",
    "If there are complications from the delivery, an extra month of fully paid leave may be granted.",
  ],
  ejemplo: ["Leave that starts on 2 November 2026 ends on 7 February 2027, and you are back at work on 8 February."],
  faq: [
    {
      pregunta: "Who pays my salary during maternity leave?",
      respuesta: "Your employer pays all of it. For the last {{rw.maternity-rssb-weeks}} the employer is reimbursed by RSSB, which is funded by the maternity contribution of employees and employers.",
    },
    {
      pregunta: "Can I be dismissed during maternity leave?",
      respuesta: "No. The employer cannot give notice of dismissal that falls within maternity leave.",
    },
    {
      pregunta: "Do I get breastfeeding breaks after I return?",
      respuesta: "Yes. For 12 months after you return you are entitled to a paid breastfeeding break of one hour a day.",
    },
  ],
  glosario: [
    { termino: "RSSB", definicion: "Rwanda Social Security Board, which runs the Maternity Leave Benefit Scheme." },
    { termino: "Reimbursement", definicion: "RSSB paying back to the employer the salary of the final weeks of leave." },
  ],
});
