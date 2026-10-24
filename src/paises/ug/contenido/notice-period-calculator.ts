import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ug.notice-period-calculator",
  h1: "Notice period calculator Uganda",
  title: "Notice period calculator Uganda: Employment Act",
  description: "Find the minimum notice to end a job in Uganda: from {{ug.notice-weeks-under-1y}} to {{ug.notice-months-10y}} depending on your years of service, and the pay in lieu.",
  intro: [
    "Under the Employment Act, both employer and employee must give written notice to end a contract. The minimum grows with your length of service.",
    "Enter how long you have worked to see your notice and the pay in lieu of it.",
  ],
  comoSeCalcula: [
    "More than six months but less than a year: {{ug.notice-weeks-under-1y}}.",
    "More than twelve months but less than five years: {{ug.notice-months-1-5y}}.",
    "Five years but less than ten: {{ug.notice-months-5-10y}}. Ten years or more: {{ug.notice-months-10y}}.",
    "If you are paid for a period longer than your notice, you are entitled to notice equal to that pay period.",
  ],
  ejemplo: ["After three years on Ushs 1,000,000 a month your notice is {{ug.notice-months-1-5y}}, or Ushs 1,000,000 in lieu."],
  faq: [
    {
      pregunta: "Can my contract give less notice than the Act?",
      respuesta: "No. An agreement to exclude these notice rules has no effect. You can still accept pay in lieu of notice.",
    },
    {
      pregunta: "Do I get time off to look for a job during notice?",
      respuesta: "Yes. You get at least half a day off each week of the notice period to look for new work.",
    },
    {
      pregunta: "When is no notice needed?",
      respuesta: "When the contract ends by summary dismissal under section 68 of the Act, or because the employee reaches retirement age.",
    },
    {
      pregunta: "Can unused leave count as notice?",
      respuesta: "No. Outstanding annual leave is not part of the notice period.",
    },
  ],
  glosario: [{ termino: "Pay in lieu of notice", definicion: "Money paid instead of working out the notice period." }],
});
