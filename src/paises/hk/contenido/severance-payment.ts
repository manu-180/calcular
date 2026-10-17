import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hk.severance-payment",
  h1: "Severance payment calculator Hong Kong",
  title: "Severance payment Hong Kong: after the MPF offset change",
  description:
    "Work out your severance payment under the Employment Ordinance, split before and after 1 May 2025 when MPF offsetting was abolished, up to {{hk.sp-lsp-maximum}}.",
  intro: [
    "If you're dismissed because of redundancy, or laid off, after at least 24 months on a continuous contract, you're entitled to a severance payment.",
    "Since 1 May 2025 your employer can't use its MPF mandatory contributions to reduce the part of the payment for service from that date.",
  ],
  comoSeCalcula: [
    "For each year of service: two thirds of your last full month's wages, or 18 days' wages if you're paid daily. It can't be more than two thirds of {{hk.sp-lsp-wage-cap}} a year.",
    "If you started before 1 May 2025, the years before that date use your wages just before it, and the years after use your final wages.",
    "The total can't be more than {{hk.sp-lsp-maximum}}. Any excess comes off the part for service from 1 May 2025.",
    "Your employer's MPF mandatory benefits can only offset the part before 1 May 2025. Voluntary MPF contributions and length-of-service gratuities can offset both parts.",
  ],
  ejemplo: [
    "You started on 1 May 2022 and leave on 30 April 2030. With $15,000 a month before May 2025 and $18,000 at the end: $30,000 for the first 3 years plus $60,000 for the last 5. Your MPF of $80,000 offsets $30,000, so the employer pays $60,000 and you keep $50,000 in MPF.",
  ],
  faq: [
    {
      pregunta: "What is the maximum severance payment in Hong Kong?",
      respuesta: "{{hk.sp-lsp-maximum}} in total, with at most two thirds of {{hk.sp-lsp-wage-cap}} for each year of service.",
    },
    {
      pregunta: "Can I get both severance and long service payment?",
      respuesta: "No. You're entitled to one or the other, never both.",
    },
    {
      pregunta: "When does my employer have to pay?",
      respuesta: "You claim it in writing within 3 months of the dismissal or lay-off. The employer has to pay within 2 months of receiving your notice.",
    },
    {
      pregunta: "How do part years count?",
      respuesta: "An incomplete year of service counts pro rata, so a year and a half counts as 1.5.",
    },
  ],
  glosario: [
    { termino: "Redundancy", definicion: "When the business closes, moves, or needs fewer people to do your kind of work." },
    { termino: "Offsetting", definicion: "Using employer-funded retirement benefits to reduce a severance or long service payment." },
  ],
});
