import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "au.notice-period-calculator",
  h1: "Notice period calculator",
  title: "Notice period calculator: minimum notice in Australia",
  description: "Work out the minimum notice of termination your employer must give you under the National Employment Standards, and your pay in lieu of notice.",
  intro: [
    "Before ending your employment, your employer has to give you a minimum period of notice or pay you instead. The length depends on your years of service and your age.",
    "Enter your service and age to see the minimum notice, and your weekly pay to see the payment in lieu of notice.",
  ],
  comoSeCalcula: [
    "1 year or less of service: {{au.preaviso-semanas[hasta-1]}} week. More than 1 year up to 3 years: {{au.preaviso-semanas[hasta-3]}} weeks. More than 3 years up to 5 years: {{au.preaviso-semanas[hasta-5]}} weeks. More than 5 years: {{au.preaviso-semanas[mas-de-5]}} weeks.",
    "If you are over 45 and have at least 2 years of service when you receive notice, you get one extra week.",
    "Pay in lieu of notice is worked out at your full pay rate, as if you had worked the notice period.",
  ],
  ejemplo: ["An employee aged 50 with 2 years of service gets 3 weeks of notice. At $1,200 a week, pay in lieu is $3,600."],
  faq: [
    {
      pregunta: "What does full pay rate include?",
      respuesta: "Incentive-based payments and bonuses, loadings, monetary allowances, overtime or penalty rates and any other separately identifiable amounts.",
    },
    {
      pregunta: "Who doesn't get notice under the NES?",
      respuesta: "Casual employees, employees hired for a set period or season, and people dismissed for serious misconduct, among others.",
    },
    {
      pregunta: "How does my employer have to give notice?",
      respuesta: "In writing, stating the last day of employment. It can be handed to you, posted to your last known address or, if you agree, sent by email or text.",
    },
  ],
  glosario: [
    { termino: "Notice of termination", definicion: "Written notice from your employer of the day your employment ends." },
    { termino: "Pay in lieu of notice", definicion: "Payment instead of working the notice period." },
  ],
});
