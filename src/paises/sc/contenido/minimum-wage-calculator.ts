import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sc.minimum-wage-calculator",
  h1: "Seychelles minimum wage {{anio}}",
  title: "Seychelles minimum wage {{anio}}: {{sc.min-wage-hourly}} an hour",
  description: "Current national minimum wage: {{sc.min-wage-hourly}} an hour for regular workers and {{sc.min-wage-hourly-casual}} for casual workers. Check your pay.",
  intro: [
    "The national minimum wage in Seychelles is set for each hour of service. Since {{sc.min-wage-hourly#desde}} it is {{sc.min-wage-hourly}} an hour for workers on a continuous or fixed-term contract and for part-time workers.",
    "Casual workers have a higher floor of {{sc.min-wage-hourly-casual}} an hour. Enter your hours to see the weekly and monthly equivalent.",
  ],
  comoSeCalcula: [
    "Pick the type of worker. The matching hourly rate comes from the National Minimum Wage Regulations as amended by S.I. 16 of 2025.",
    "The weekly minimum is the hourly rate times the hours you work in a week.",
    "The monthly figure multiplies the weekly minimum by 52 and divides by 12. The regulations do not define a month, so treat it as an average.",
  ],
  ejemplo: [
    "A regular worker on a 40 hour week must earn at least SCR 1,638 a week, which is SCR 7,098 in an average month. A casual worker on the same hours must earn at least SCR 1,887.60 a week.",
  ],
  faq: [
    {
      pregunta: "What does the minimum wage leave out?",
      respuesta: "The regulations define wage as the payment for work done. It does not include overtime, shift allowances or benefits such as housing, transport and food.",
    },
    {
      pregunta: "When did the rate last change?",
      respuesta: "S.I. 16 of 2025 came into operation on 1 April 2025 and replaced SR38.27 with SR40.95 and SR44.10 with SR47.19.",
    },
    {
      pregunta: "Who sets the minimum wage?",
      respuesta: "The Minister responsible for employment makes the regulations under section 40(2)(a) of the Employment Act.",
    },
  ],
  glosario: [
    { termino: "Casual worker", definicion: "A person who is hired for a short period of work and not on a continuous or fixed-term contract." },
    { termino: "Part-time worker", definicion: "A worker who works fewer than 25 hours a week or fewer than 3 days a week for the same employer." },
    { termino: "S.I.", definicion: "A statutory instrument, the form in which ministers publish regulations in the Official Gazette." },
  ],
});
