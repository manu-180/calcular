import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sc.maternity-leave-calculator",
  h1: "Seychelles maternity and paternity leave calculator {{anio}}",
  title: "Seychelles maternity leave {{anio}}: {{sc.maternity-paid-weeks}} paid weeks",
  description: "Maternity leave in Seychelles is {{sc.maternity-paid-weeks}} paid weeks and paternity leave is {{sc.paternity-working-days}} working days. Find the last day of your leave.",
  intro: [
    "A woman on a continuous or fixed-term contract, or a part-time female worker, is entitled to {{sc.maternity-paid-weeks}} weeks of paid maternity leave. A father is entitled to {{sc.paternity-working-days}} paid working days.",
    "Enter the first day of your leave to see the last day and the day you return.",
  ],
  comoSeCalcula: [
    "Maternity leave lasts {{sc.maternity-paid-weeks}} weeks from the first day, and at least {{sc.maternity-weeks-after-birth}} of those weeks must come after the birth.",
    "Paternity leave counts {{sc.paternity-working-days}} consecutive working days from the first day. The calculator skips Saturdays and Sundays.",
    "Paternity leave must be taken within {{sc.paternity-window-months}} months of the birth, so add the date of birth to see the latest end date.",
  ],
  ejemplo: [
    "Leave that starts on Monday 2 November 2026 runs for 16 weeks and ends on 21 February 2027. A father starting paternity leave the same day finishes on Friday 13 November 2026.",
  ],
  faq: [
    {
      pregunta: "How much notice must I give?",
      respuesta: "A pregnant worker must tell her employer at least 3 months before the expected date of confinement. A father must notify the employer in writing at least 8 weeks before the expected birth and apply for the dates at least 2 weeks ahead.",
    },
    {
      pregunta: "Who qualifies for paternity leave?",
      respuesta: "A male worker resident in Seychelles who acknowledges paternity of the child, has completed probation and has worked for the employer for at least 12 months. He can take it once in a calendar year.",
    },
    {
      pregunta: "Can I return to work early?",
      respuesta: "No. A female worker entitled to paid maternity leave must not return before the end of her entitlement, and an employer who lets her commits an offence.",
    },
  ],
  glosario: [
    { termino: "Confinement", definicion: "The birth of a child, the date from which the weeks after the birth are counted." },
    { termino: "Working day", definicion: "A day on which the worker would normally work, which excludes Sundays and public holidays." },
    { termino: "Paid leave", definicion: "Leave during which the employer pays the wage and can recover the matching social security benefit." },
  ],
});
