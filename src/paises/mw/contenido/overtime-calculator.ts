import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mw.overtime-calculator",
  h1: "Overtime calculator Malawi",
  title: "Overtime calculator Malawi: time and a half and double time",
  description:
    "Work out overtime pay under the Employment Act: {{mw.overtime-ordinary}} times your hourly wage on working days, {{mw.overtime-day-off}} times on days off and public holidays.",
  intro: [
    "Enter your hourly wage and the extra hours you worked to see the overtime your employer owes you.",
    "The rates come from section 39 of the Employment Act, 2000.",
  ],
  comoSeCalcula: [
    "Ordinary overtime, worked on a working day beyond your normal hours, is paid at no less than {{mw.overtime-ordinary}} times your wage for one hour.",
    "Day-off overtime, worked on a day you would otherwise be off, is paid at no less than {{mw.overtime-day-off}} times.",
    "Holiday overtime, worked on a public holiday, is paid at no less than {{mw.overtime-holiday}} times the normal hourly rate.",
  ],
  ejemplo: ["At K1,000 an hour, ten hours of ordinary overtime earn K15,000. Eight hours on a public holiday earn another K16,000."],
  faq: [
    {
      pregunta: "How many hours can my employer make me work?",
      respuesta: "No more than {{mw.weekly-hours-limit}} hours a week, not counting overtime. Guards and other exempted groups can have different rules.",
    },
    {
      pregunta: "Do I get paid for a public holiday I do not work?",
      respuesta: "Yes. If you are not required to work on a public holiday you get the day off on full pay, unless you were absent without good reason on the working day before it.",
    },
    {
      pregunta: "Are these rates a minimum?",
      respuesta: "Yes. The Act sets the lowest rates. Your contract or a collective agreement can pay more.",
    },
  ],
  glosario: [
    { termino: "Ordinary overtime", definicion: "Time worked on a working day beyond the hours normally worked in the business." },
    { termino: "Day-off overtime", definicion: "Time worked on a day you would otherwise be off duty." },
  ],
});
