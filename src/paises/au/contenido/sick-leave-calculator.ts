import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "au.sick-leave-calculator",
  h1: "Sick leave calculator",
  title: "Sick and carer's leave calculator (personal leave)",
  description: "Work out the paid sick and carer's leave you have accrued: 10 days a year for full-time employees and pro rata for part-time, under the NES.",
  intro: [
    "Paid sick and carer's leave, also called personal leave, is 10 days a year for full-time employees and pro rata for part-time employees.",
    "Enter your ordinary hours and the weeks you have worked to see how many hours you have built up.",
  ],
  comoSeCalcula: [
    "Leave accrues at 1/{{au.personal-leave-divisor}} of the ordinary hours you work.",
    "Your hours a week times the weeks you worked, divided by {{au.personal-leave-divisor}}, is the leave you have accrued.",
    "For a full-time employee on 38 hours a week, that is 76 hours a year, the same as 10 working days.",
  ],
  ejemplo: ["A part-time employee working 19 hours a week accrues 38 hours of paid sick and carer's leave a year."],
  faq: [
    {
      pregunta: "Does it matter how my hours are spread over the week?",
      respuesta: "No. Someone working 38 hours over four days accrues the same leave as someone working 38 hours over five days.",
    },
    {
      pregunta: "Are sick leave and carer's leave separate?",
      respuesta: "No. They are part of the same yearly entitlement, known as personal or carer's leave.",
    },
    {
      pregunta: "Do I need to give my employer evidence?",
      respuesta: "Your employer can ask for evidence when you take sick or carer's leave, and you have to provide it if requested.",
    },
  ],
  glosario: [
    { termino: "Personal/carer's leave", definicion: "The paid leave entitlement that covers both sick leave and carer's leave." },
    { termino: "Pro rata", definicion: "In proportion to the hours you work." },
  ],
});
