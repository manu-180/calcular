import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jm.notice-period-calculator",
  h1: "Notice period calculator Jamaica",
  title: "Notice period Jamaica: how many weeks you are owed",
  description:
    "Find the minimum notice your employer must give you in Jamaica, from {{jm.notice-weeks[under-5]}} to {{jm.notice-weeks[20-plus]}} by years of service, and what pay in lieu of notice is worth.",
  intro: [
    "The Employment (Termination and Redundancy Payments) Act sets the least notice an employer must give before ending your job. It grows with your years of continuous service.",
    "Enter your years of service and weekly pay to see your notice period and its value if your employer pays you instead of letting you work it.",
  ],
  comoSeCalcula: [
    "Less than 5 years of service: {{jm.notice-weeks[under-5]}}.",
    "5 years to less than 10: {{jm.notice-weeks[5-10]}}. 10 to less than 15: {{jm.notice-weeks[10-15]}}.",
    "15 to less than 20: {{jm.notice-weeks[15-20]}}. 20 years or more: {{jm.notice-weeks[20-plus]}}.",
    "If your contract gives more notice, the longer period applies. Pay in lieu is the notice in weeks times your normal weekly pay.",
  ],
  ejemplo: ["After 6 years with the same employer you are owed 4 weeks of notice. On J$40,000 a week, pay in lieu is J$160,000."],
  faq: [
    {
      pregunta: "How much notice do I have to give if I resign?",
      respuesta: "At least {{jm.employee-notice-weeks}}, once you have worked for the employer continuously for four weeks.",
    },
    {
      pregunta: "Do I get notice at the end of a fixed-term contract?",
      respuesta: "No, if the contract simply ends on its date. If you keep working for up to four weeks after it expires, the notice periods apply.",
    },
    {
      pregunta: "Is notice the same as redundancy pay?",
      respuesta: "No. Notice is the warning before your job ends. Redundancy pay is a separate payment when your job ends because the post is no longer needed.",
    },
  ],
  glosario: [
    { termino: "Pay in lieu of notice", definicion: "Your normal pay for the notice period, paid instead of working it." },
    { termino: "Continuous service", definicion: "The time you have worked for the same employer without a break." },
  ],
});
