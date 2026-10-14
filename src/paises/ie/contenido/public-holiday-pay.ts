import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ie.public-holiday-pay",
  h1: "Public holiday pay calculator Ireland",
  title: "Public holiday pay Ireland: what you are owed",
  description: "Work out your public holiday entitlement in Ireland: a paid day off, an extra day's pay, or one-fifth of your weekly pay if you are not rostered.",
  intro: [
    "Ireland has ten public holidays a year. For each one, you are entitled to a benefit, whether you work that day or not.",
    "Tell us your weekly pay, your working days and what happens on the day, and see what you are owed.",
  ],
  comoSeCalcula: [
    "If you work on the public holiday, you are paid as normal. Your employer also gives you one of these: a paid day off on the day, a paid day off within a month, an extra day of annual leave or an extra day's pay.",
    "If the business is closed and you would normally work that day, you get your normal day's pay.",
    "If you are not normally rostered on that day, you get {{ie.public-holiday-weekly-share}} of your normal weekly pay (one-fifth) extra.",
    "Part-time workers qualify once they have worked {{ie.public-holiday-part-time-hours}} hours in total in the previous 5 weeks. Full-time workers qualify straight away.",
  ],
  ejemplo: ["You work 3 days a week for €400 and a public holiday falls on a day you are off. You get one-fifth of €400, which is €80."],
  faq: [
    {
      pregunta: "Which days are public holidays?",
      respuesta:
        "New Year's Day, the first Monday in February (or 1 February when it is a Friday), St. Patrick's Day, Easter Monday, the first Mondays in May, June and August, the last Monday in October, Christmas Day and St. Stephen's Day.",
    },
    {
      pregunta: "Is Good Friday a public holiday?",
      respuesta: "No. Good Friday is a normal working day.",
    },
    {
      pregunta: "What if I leave my job just before a public holiday?",
      respuesta: "If your job ends in the week before a public holiday and you worked in the 4 weeks before that week, you are still paid for the public holiday.",
    },
    {
      pregunta: "Who chooses the type of benefit?",
      respuesta: "Your employer decides which of the options you get.",
    },
  ],
  glosario: [
    { termino: "Rostered", definicion: "Scheduled to work. A day you are not rostered is a day you would not normally work." },
    { termino: "Public holiday benefit", definicion: "What the law gives you for each public holiday: time off or extra pay." },
  ],
});
