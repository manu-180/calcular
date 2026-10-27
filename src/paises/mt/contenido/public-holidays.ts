import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mt.public-holidays",
  h1: "Public holidays in Malta",
  title: "Public holidays Malta 2026: all 14 dates and weekdays",
  description:
    "See the 14 national and public holidays in Malta for any year, the weekday of each and the extra leave whole-time employees get for those on a weekend.",
  intro: [
    "Malta has five national holidays and nine public holidays. Pick a year to see each date with its day of the week.",
    "When one falls on a Saturday or Sunday, whole-time employees get an extra day of annual leave, so the list also tells you how much leave you get that year.",
  ],
  comoSeCalcula: [
    "Thirteen holidays fall on the same date every year. Good Friday moves with Easter.",
    "Each holiday that falls on a Saturday or Sunday adds one working day to the annual leave of whole-time employees, on top of {{mt.annual-leave-hours}} hours on a 40-hour week.",
  ],
  ejemplo: ["In 2026 Sette Giugno and Republic Day fall on a Sunday and the Assumption on a Saturday, so whole-time employees get three extra days of leave."],
  faq: [
    {
      pregunta: "Which are the national holidays?",
      respuesta: "Freedom Day (31 March), Sette Giugno (7 June), Victory Day (8 September), Independence Day (21 September) and Republic Day (13 December).",
    },
    {
      pregunta: "Which are the public holidays?",
      respuesta:
        "New Year's Day, St Paul's Shipwreck (10 February), St Joseph (19 March), Good Friday, Workers' Day (1 May), St Peter and St Paul (29 June), the Assumption (15 August), the Immaculate Conception (8 December) and Christmas Day.",
    },
    {
      pregunta: "Are bank holidays the same?",
      respuesta: "No. Banks also close on some extra days set each year by order. For 2026 these are 6 April and 26 December.",
    },
    {
      pregunta: "Do part-time employees get public holidays?",
      respuesta: "Yes, pro rata to their hours compared with a whole-time employee.",
    },
  ],
  glosario: [
    { termino: "National holiday", definicion: "One of the five days that mark events in Malta's history." },
    { termino: "Public holiday", definicion: "One of the nine other days off with full pay set by law, most of them religious feasts." },
  ],
});
