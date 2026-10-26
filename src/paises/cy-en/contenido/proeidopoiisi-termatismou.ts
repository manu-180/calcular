import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cy-en.proeidopoiisi-termatismou",
  h1: "Notice period calculator for Cyprus",
  title: "Cyprus notice period for dismissal or resignation",
  description: "See the minimum legal notice in Cyprus, from your employer or from you, based on your weeks of service.",
  intro: [
    "An employer ending your job must give written notice. If you resign, you give notice too, but shorter.",
    "Enter your start date and the date notice is given.",
  ],
  comoSeCalcula: [
    "The law counts continuous employment in weeks. The obligation starts at 26 weeks.",
    "The employer gives {{cy.proeidopoiisi-ergodoti[26]}} from 26 weeks, {{cy.proeidopoiisi-ergodoti[52]}} from 52, {{cy.proeidopoiisi-ergodoti[104]}} from 104, {{cy.proeidopoiisi-ergodoti[156]}} from 156, {{cy.proeidopoiisi-ergodoti[208]}} from 208, {{cy.proeidopoiisi-ergodoti[260]}} from 260 and {{cy.proeidopoiisi-ergodoti[312]}} from 312 weeks.",
    "The employee gives {{cy.proeidopoiisi-ergazomenou[26]}} from 26 weeks, {{cy.proeidopoiisi-ergazomenou[52]}} from 52 and {{cy.proeidopoiisi-ergazomenou[260]}} from 260 weeks.",
    "Pay for the notice period is a guide: monthly salary × 12 / 52 for each week of notice.",
  ],
  ejemplo: [
    "After two years (104 weeks) with the same employer, your employer owes you 4 weeks' notice. If you leave, you give 2 weeks.",
  ],
  faq: [
    { pregunta: "Can my employer pay me instead of giving notice?", respuesta: "Yes. Instead of asking you to work the notice, the employer can pay your wages for the notice you're entitled to." },
    { pregunta: "Does notice apply during probation?", respuesta: "No, if the job was on probation for no more than 104 weeks. Probation longer than 26 weeks needs a written agreement made when you were hired." },
    { pregunta: "Can I look for work during my notice?", respuesta: "Yes, if your employer agrees. You can be away up to eight hours a week, with a maximum of 40 hours, without losing pay." },
  ],
  glosario: [
    { termino: "Continuous employment", definicion: "Time with the same employer without a break, counted in weeks." },
  ],
});
