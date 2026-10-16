import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hk.sick-leave-pay",
  h1: "Sick leave pay calculator Hong Kong",
  title: "Sick leave pay Hong Kong: sickness allowance",
  description:
    "Work out your sickness allowance under the Employment Ordinance: {{hk.leave-pay-fraction}} of your average daily wages for each paid sickness day you've built up.",
  intro: [
    "In Hong Kong, sick leave is paid through the sickness allowance in the Employment Ordinance. You build up paid sickness days as you work.",
    "Enter how long you were off, your service and your wages to see what you should be paid.",
  ],
  comoSeCalcula: [
    "You earn {{hk.sick-days-accrual[first-12-months]}} paid sickness days for each completed month in the first 12 months and {{hk.sick-days-accrual[after-12-months]}} for each month after that, up to {{hk.sick-days-accrual[maximum]}} at any time.",
    "Sickness allowance is paid when the sick leave is at least 4 consecutive days and backed by a medical certificate. Days off for a pregnancy check-up, post-confinement treatment or miscarriage count even if fewer.",
    "Each paid day is worth {{hk.leave-pay-fraction}} of your average daily wages over the last 12 months.",
  ],
  ejemplo: ["With $180,000 earned over 12 months, the average daily wage is about $493. Four sickness days pay about $1,578."],
  faq: [
    {
      pregunta: "Is a one-day sick leave paid in Hong Kong?",
      respuesta: "Not by law, unless it's for a pregnancy check-up, post-confinement treatment or miscarriage. The statutory allowance needs at least 4 consecutive days. Your contract may give you more.",
    },
    {
      pregunta: "How many paid sickness days can I build up?",
      respuesta: "Up to {{hk.sick-days-accrual[maximum]}} at any one time: {{hk.sick-days-accrual[first-12-months]}} a month in the first year and {{hk.sick-days-accrual[after-12-months]}} a month after.",
    },
    {
      pregunta: "Can I be dismissed while on paid sick leave?",
      respuesta: "No, except for summary dismissal for serious misconduct. An employer who does it has to pay notice, seven days' wages as compensation and the sickness allowance due.",
    },
  ],
  glosario: [
    { termino: "Sickness allowance", definicion: "The pay for paid sickness days under the Employment Ordinance." },
    { termino: "Paid sickness day", definicion: "A day of sick leave you've built up through service, which can be paid as sickness allowance." },
  ],
});
