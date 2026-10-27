import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mt.overtime-tax",
  h1: "Overtime tax calculator Malta",
  title: "Tax on overtime Malta: {{mt.overtime-tax-rate}} flat rate calculator",
  description:
    "Check if your overtime in Malta is taxed at the flat {{mt.overtime-tax-rate}} rate and how much: basic wage up to {{mt.overtime-tax-limits[max-weekly-wage]}} a week, up to {{mt.overtime-tax-limits[max-income]}} a year.",
  intro: [
    "Full-time employees on a lower basic wage can have their overtime pay taxed at a flat {{mt.overtime-tax-rate}} instead of their normal rates.",
    "Enter your basic weekly wage, your overtime rate and hours. You get the flat-rate tax and the part taxed normally.",
  ],
  comoSeCalcula: [
    "Your overtime qualifies if your basic weekly wage is {{mt.overtime-tax-limits[max-weekly-wage]}} or less, your job is full-time and you are not in a managerial post.",
    "Each qualifying hour counts at your overtime rate, but at most twice your basic hourly rate, which is the basic weekly wage divided by 40.",
    "Qualifying overtime income is capped at {{mt.overtime-tax-limits[max-income]}} a year and taxed at {{mt.overtime-tax-rate}}. Anything above is taxed with your other income.",
  ],
  ejemplo: ["On a basic wage of €350 a week, 200 hours of overtime at €13.13 come to €2,626, taxed at {{mt.overtime-tax-rate}}: €393.90."],
  faq: [
    {
      pregunta: "Is the flat-rate tax final?",
      respuesta: "Yes, unless you choose otherwise. It is not credited against your other tax or refunded.",
    },
    {
      pregunta: "Can I opt out?",
      respuesta: "Yes. You can choose to have your overtime taxed at your normal rates through the FSS, which can be lower if your income is small.",
    },
    {
      pregunta: "What about married couples?",
      respuesta: "The rules apply separately to the overtime of each spouse.",
    },
  ],
  glosario: [
    { termino: "Qualifying overtime", definicion: "Overtime in a full-time, non-managerial job with a basic weekly wage within the limit." },
    { termino: "Basic weekly wage", definicion: "The wage used for social security, without overtime, bonuses or allowances." },
  ],
});
