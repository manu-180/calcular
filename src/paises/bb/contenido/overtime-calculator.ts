import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bb.overtime-calculator",
  h1: "Barbados overtime calculator {{anio}}",
  title: "Overtime calculator {{anio}}: time and a half after {{bb.shop-weekly-hours}}",
  description:
    "Work out your weekly pay with overtime at {{bb.overtime-multiplier}} times your hourly rate after {{bb.shop-weekly-hours}} hours, and public holiday work at {{bb.public-holiday-multiplier}} times. Based on the Shops Act.",
  intro: [
    "Under the Shops Act, a shop assistant in Barbados works a standard day of {{bb.shop-daily-hours}} hours and a standard week of {{bb.shop-weekly-hours}} hours. Time beyond that is overtime and is paid at {{bb.overtime-multiplier}} times the ordinary hourly rate, so one hour at Bds$12 earns Bds$18.",
    "Hours worked on a public holiday are paid at {{bb.public-holiday-multiplier}} times the ordinary rate. Enter your hourly pay, your weekly hours and any holiday hours to see the week in full.",
  ],
  comoSeCalcula: [
    "Ordinary pay: hours up to {{bb.shop-weekly-hours}} in the week multiplied by your hourly rate.",
    "Overtime pay: hours above {{bb.shop-weekly-hours}} multiplied by your hourly rate and by {{bb.overtime-multiplier}}.",
    "Public holiday pay: holiday hours multiplied by your hourly rate and by {{bb.public-holiday-multiplier}}. These hours are entered separately and are not counted toward the weekly total.",
    "The daily limit of {{bb.shop-daily-hours}} hours is shown for reference. The calculator works from the weekly total.",
  ],
  ejemplo: [
    "A cashier on Bds$12 an hour works 48 hours in a normal week. The first 40 hours pay Bds$480.00. The 8 overtime hours pay Bds$18 each, which is Bds$144.00. The week comes to Bds$624.00. If she also works a 10 hour shift on a public holiday, that adds Bds$240.00 at double time.",
  ],
  faq: [
    {
      pregunta: "How much is overtime in Barbados?",
      respuesta: "The Labour Department brochure on the Shops Act 2015-30 sets overtime for shop assistants at {{bb.overtime-multiplier}} times the ordinary rate.",
    },
    {
      pregunta: "How many hours is a normal week for a shop worker?",
      respuesta: "The same brochure gives {{bb.shop-daily-hours}} hours a day and {{bb.shop-weekly-hours}} hours a week before overtime starts.",
    },
    {
      pregunta: "What do I earn for working on a public holiday?",
      respuesta: "The Shops Act brochure shows {{bb.public-holiday-multiplier}} times the ordinary rate for hours worked on a public holiday.",
    },
    {
      pregunta: "Does this apply outside shops?",
      respuesta: "The rates come from the Shops Act, which covers shop assistants. For other jobs the contract, a collective agreement or a sector order may set a different rate, so check it before you rely on this result.",
    },
  ],
  glosario: [
    { termino: "Overtime", definicion: "Time worked beyond the standard {{bb.shop-weekly-hours}} hour week, paid at a higher rate." },
    { termino: "Time and a half", definicion: "Pay at {{bb.overtime-multiplier}} times the ordinary hourly rate." },
    { termino: "Double time", definicion: "Pay at {{bb.public-holiday-multiplier}} times the ordinary hourly rate." },
    { termino: "Shops Act", definicion: "The law that sets hours of work, overtime and holiday pay for shop assistants in Barbados." },
  ],
});
