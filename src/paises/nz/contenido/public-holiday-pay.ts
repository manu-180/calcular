import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nz.public-holiday-pay",
  h1: "Public holiday pay calculator NZ",
  title: "Public holiday pay NZ: time and a half calculator",
  description: "Working on a public holiday in New Zealand? See your minimum pay at time and a half and whether you also get an alternative holiday.",
  intro: [
    "If you work on a public holiday, you can't be paid less than time and a half for the hours you work.",
    "If the public holiday falls on a day you would normally work, you also get an alternative holiday, a paid day off to take later.",
  ],
  comoSeCalcula: [
    "Multiply your hourly rate by the hours you work on the public holiday.",
    "Multiply that by {{nz.public-holiday-pay-factor}}. That's the least your employer can pay you for those hours.",
    "If it's a day you would otherwise have worked, add one alternative holiday.",
  ],
  ejemplo: ["You earn $30 an hour and work 8 hours on a public holiday that falls on a day you'd normally work. You get at least $360 for the day and a day off in lieu."],
  faq: [
    {
      pregunta: "How many public holidays are there in New Zealand?",
      respuesta: "You're entitled to a maximum of {{nz.public-holidays-max}} public holidays a year.",
    },
    {
      pregunta: "What if I don't work on a public holiday that's a normal workday for me?",
      respuesta: "You get the day off with pay, as long as it falls on a day you would otherwise have worked.",
    },
    {
      pregunta: "Can my employer pay more than time and a half?",
      respuesta: "Yes. Time and a half is the minimum. Your employment agreement can set a higher rate.",
    },
  ],
  glosario: [
    { termino: "Alternative holiday", definicion: "A paid day off you get for working on a public holiday that falls on a normal working day. Also called a day in lieu." },
    { termino: "Time and a half", definicion: "One and a half times your normal hourly rate." },
  ],
});
