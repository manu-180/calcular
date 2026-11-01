import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "qa.maternity-leave-pay",
  h1: "Maternity leave pay calculator for Qatar",
  title: "Maternity leave pay in Qatar under the Labour Law",
  description:
    "Work out your maternity leave pay under the Qatar Labour Law: {{qa.maternity[days]}} on full pay once you've worked a full year for your employer.",
  intro: [
    "Women covered by the Labour Law who have completed a year with their employer get paid maternity leave.",
    "Enter your monthly wage to see what you'll be paid during the leave.",
  ],
  comoSeCalcula: [
    "Maternity leave is {{qa.maternity[days]}} on full pay, covering time before and after the birth, with at least {{qa.maternity[after-birth]}} after it.",
    "You need {{qa.maternity-qualifying}} of service with the employer and a medical certificate with the expected date of birth.",
    "The law doesn't say how to turn a monthly wage into a daily one, so choose the method your employer uses.",
  ],
  ejemplo: ["With a monthly wage of QAR 9,000 and the ÷ 30 method, the daily wage is QAR 300 and the leave pays QAR 15,000."],
  faq: [
    {
      pregunta: "What if less than 30 days of leave are left after the birth?",
      respuesta: "The employer can add days from your annual leave. If not, the extra time is unpaid leave.",
    },
    {
      pregunta: "What if I can't return after the leave for health reasons?",
      respuesta: "You're treated as on unpaid leave, for up to 60 days in total, as long as a licensed doctor certifies your condition.",
    },
    {
      pregunta: "Does maternity leave reduce my other leave?",
      respuesta: "No. Taking maternity leave doesn't take away any of your other leave rights.",
    },
  ],
  glosario: [{ termino: "Full pay", definicion: "Your wage including regular allowances, not only the basic salary." }],
});
