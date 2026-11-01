import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "qa.annual-leave",
  h1: "Annual leave calculator for Qatar",
  title: "Annual leave in Qatar: weeks and pay you're owed",
  description:
    "Work out your annual leave under the Qatar Labour Law: {{qa.annual-leave[under-threshold]}} a year, or {{qa.annual-leave[from-threshold]}} after five years, with the pay for it.",
  intro: [
    "Every worker covered by the Labour Law gets paid annual leave once they've completed a year with the same employer.",
    "Enter your years of service and the months worked this year to see the leave you've earned and what it's worth.",
  ],
  comoSeCalcula: [
    "Leave is at least {{qa.annual-leave[under-threshold]}} a year with less than {{qa.annual-leave-threshold}} of service, and {{qa.annual-leave[from-threshold]}} from then on.",
    "It starts after {{qa.annual-leave-min-service}} of continuous service. After that, part of a year gives leave in proportion.",
    "Leave pay is based on your basic salary. The law doesn't say how to turn it into a weekly amount, so choose the method in your contract.",
  ],
  ejemplo: [
    "With 3 years of service and a basic salary of QAR 7,000, you're owed 3 weeks a year. With the ÷ 30 × 7 method, that's QAR 4,900.",
  ],
  faq: [
    {
      pregunta: "Who decides when I take my leave?",
      respuesta: "The employer sets the dates according to the needs of the work. With your agreement it can split the leave, but into no more than two periods.",
    },
    {
      pregunta: "Can I carry leave over to next year?",
      respuesta: "Yes, up to half of it, if you ask in writing and the employer agrees.",
    },
    {
      pregunta: "What happens to unused leave when I leave the job?",
      respuesta: "You can't give up your annual leave. If the contract ends before you take it, the employer pays you for the days still due.",
    },
    {
      pregunta: "Are public holidays part of annual leave?",
      respuesta: "No. The Labour Law gives separate paid days off: three for Eid al-Fitr, three for Eid al-Adha, one for National Day and three more set by the employer.",
    },
  ],
  glosario: [
    { termino: "Annual leave", definicion: "Paid time off you earn for each year of service." },
  ],
});
