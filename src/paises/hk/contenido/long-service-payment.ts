import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hk.long-service-payment",
  h1: "Long service payment calculator Hong Kong",
  title: "Long service payment calculator Hong Kong (LSP)",
  description:
    "Work out your long service payment after 5 years of service, split before and after the 1 May 2025 end of MPF offsetting, up to {{hk.sp-lsp-maximum}}.",
  intro: [
    "Long service payment (LSP) is for employees with at least 5 years on a continuous contract whose job ends for a reason other than redundancy or serious misconduct.",
    "It's also payable if a fixed-term contract isn't renewed, if you resign because of ill health or at 65 or over, or if you die in service.",
  ],
  comoSeCalcula: [
    "For each year of service: two thirds of your last full month's wages, or 18 days' wages if you're paid daily, up to two thirds of {{hk.sp-lsp-wage-cap}}.",
    "Service before 1 May 2025 uses your wages just before that date; service after uses your final wages.",
    "The total is capped at {{hk.sp-lsp-maximum}}. The excess comes off the part for service from 1 May 2025.",
    "Employer MPF mandatory benefits can only offset the part before 1 May 2025.",
  ],
  ejemplo: [
    "Eight years of service, 3 before May 2025 at $15,000 and 5 after at $18,000, give $30,000 plus $60,000. With $80,000 of employer MPF, $30,000 is offset and the employer pays $60,000.",
  ],
  faq: [
    {
      pregunta: "Who gets long service payment in Hong Kong?",
      respuesta: "Employees with at least 5 years on a continuous contract who are dismissed (not for redundancy or serious misconduct), whose fixed-term contract isn't renewed, who resign on health grounds or at 65 or over, or who die in service.",
    },
    {
      pregunta: "Did the MPF offsetting change affect LSP?",
      respuesta: "Yes. Since 1 May 2025, employer MPF mandatory benefits can't offset the part of the LSP for service from that date. Service before it can still be offset.",
    },
    {
      pregunta: "When must the employer pay it?",
      respuesta: "Within 7 days after the employment ends.",
    },
  ],
  glosario: [
    { termino: "LSP", definicion: "Long service payment, a lump sum under the Employment Ordinance for long-serving employees." },
    { termino: "Transition date", definicion: "1 May 2025, when the abolition of MPF offsetting took effect." },
  ],
});
