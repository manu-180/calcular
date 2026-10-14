import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "au.redundancy-pay-calculator",
  h1: "Redundancy pay calculator",
  title: "Redundancy pay calculator: NES weeks and tax-free limit",
  description: "Work out your minimum redundancy pay under the National Employment Standards and the tax-free limit for a genuine redundancy payment in Australia.",
  intro: [
    "If your job is made redundant, the National Employment Standards (NES) set a minimum redundancy pay based on your years of continuous service.",
    "Enter your years of service and your weekly base pay. You also see how much of a genuine redundancy payment is tax-free.",
  ],
  comoSeCalcula: [
    "The NES table gives a number of weeks for your completed years of service: {{au.redundancy-semanas[1]}} weeks after 1 year, rising to {{au.redundancy-semanas[9]}} weeks between 9 and 10 years, and {{au.redundancy-semanas[10]}} weeks from 10 years.",
    "Each week is paid at your base pay rate for your ordinary hours, without bonuses, loadings, allowances, overtime or penalty rates.",
    "For a genuine redundancy, a tax-free amount of {{au.redundancy-libre-impuesto[base]}} plus {{au.redundancy-libre-impuesto[por-anio]}} for each complete year of service applies this income year.",
  ],
  ejemplo: ["After 5 years of service on $1,500 a week, the minimum redundancy pay is 10 weeks, or $15,000. All of it is within the tax-free limit."],
  faq: [
    {
      pregunta: "Why does redundancy pay drop after 10 years?",
      respuesta: "The NES table gives {{au.redundancy-semanas[10]}} weeks for 10 years or more, fewer than the {{au.redundancy-semanas[9]}} weeks for 9 years. Fair Work has a library article on redundancy pay after 10 years of service, and your award or agreement may give more.",
    },
    {
      pregunta: "Do small businesses have to pay redundancy?",
      respuesta: "Most small business employers, with fewer than {{au.redundancy-empleados-minimo}} employees, don't have to pay redundancy pay under the NES.",
    },
    {
      pregunta: "Do I also get notice?",
      respuesta: "Yes. Your employer still has to give you notice of termination, or pay in lieu of notice, when your job is made redundant.",
    },
    {
      pregunta: "What else is paid when I leave?",
      respuesta: "Outstanding entitlements, including unused annual leave and long service leave, are paid out as well.",
    },
  ],
  glosario: [
    { termino: "Continuous service", definicion: "How long you have worked for your employer. Unpaid leave does not count towards it, but it does not break it either." },
    { termino: "Genuine redundancy", definicion: "A redundancy that meets the ATO conditions. Part of the payment is tax-free up to a limit set each income year." },
  ],
});
