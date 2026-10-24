import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ph.holiday-pay",
  h1: "Holiday pay calculator Philippines",
  title: "Holiday pay calculator: regular holiday and special day",
  description:
    "See your pay for working a regular holiday ({{ph.day-rates[regular-holiday]}}), a special day ({{ph.day-rates[special]}}) or a rest day, and for an unworked regular holiday.",
  intro: [
    "Philippine law pays more for work on holidays and rest days. The rate depends on the type of day and on whether it is also your rest day.",
    "Pick the day and enter your daily wage to see your pay for the first 8 hours.",
  ],
  comoSeCalcula: [
    "Regular holiday worked: {{ph.day-rates[regular-holiday]}} of your daily wage. If it is also your rest day: {{ph.day-rates[regular-holiday-rest-day]}}.",
    "Special day worked: {{ph.day-rates[special]}}. If it is also your rest day: {{ph.day-rates[special-rest-day]}}.",
    "Rest day worked: {{ph.day-rates[rest-day]}}.",
    "Regular holiday not worked: your regular daily wage.",
  ],
  ejemplo: ["With a daily wage of ₱755, working on a regular holiday pays ₱1,510 and working on a special day pays ₱981.50."],
  faq: [
    {
      pregunta: "How much is holiday pay for a regular holiday?",
      respuesta: "If you work, at least {{ph.day-rates[regular-holiday]}} of your regular daily wage for the first 8 hours. If you do not work, your regular daily wage.",
    },
    {
      pregunta: "Who is not covered by holiday pay?",
      respuesta:
        "Government employees, retail and service establishments regularly employing less than ten workers, domestic workers, managerial employees and field personnel whose time is not supervised.",
    },
    {
      pregunta: "What if I was absent the day before the holiday?",
      respuesta:
        "If you were on leave without pay the day before a regular holiday and did not work on the holiday, your employer may not pay it. If you were on paid leave, you still get it.",
    },
    {
      pregunta: "How is overtime on a holiday paid?",
      respuesta: "Hours beyond 8 on a holiday get the hourly rate of the holiday plus at least 30%. Use the overtime calculator for that.",
    },
  ],
  glosario: [
    { termino: "Regular holiday", definicion: "A holiday paid even when not worked, such as New Year's Day, Maundy Thursday, Good Friday or Christmas Day." },
    { termino: "Special day", definicion: "A nationwide special day, such as 1 November or 31 December, where work is paid with a premium." },
  ],
});
