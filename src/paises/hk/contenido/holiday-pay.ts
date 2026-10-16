import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hk.holiday-pay",
  h1: "Statutory holiday pay calculator",
  title: "Statutory holiday pay Hong Kong: how much you get",
  description:
    "Hong Kong employees get {{hk.statutory-holidays}} statutory holidays a year. Work out the holiday pay for each one from your 12-month average daily wages.",
  intro: [
    "Every employee covered by the Employment Ordinance gets the statutory holidays off, whatever their length of service. There are {{hk.statutory-holidays}} this year.",
    "After 3 months on a continuous contract, those days are also paid. Enter your wages to see how much.",
  ],
  comoSeCalcula: [
    "Holiday pay for each day equals your average daily wages over the 12 months before the holiday.",
    "Days without full pay (such as unpaid rest days) and the money paid for them are left out of the average.",
    "For holidays on consecutive days, like Lunar New Year, the 12 months are counted back from the first day.",
  ],
  ejemplo: ["A daily-rated worker on $500 with unpaid rest days earned $154,500 over 309 paid days. Holiday pay is $500 a day."],
  faq: [
    {
      pregunta: "How many statutory holidays are there in Hong Kong?",
      respuesta: "{{hk.statutory-holidays}} this year. Easter Monday was added from 2026, Good Friday is added from 2028 and the day following Good Friday from 2030.",
    },
    {
      pregunta: "Can my employer pay me instead of giving the holiday?",
      respuesta: "No. The holiday, or an alternative or substituted day, has to be granted. Paying in lieu of a holiday isn't allowed.",
    },
    {
      pregunta: "What if a statutory holiday falls on my rest day?",
      respuesta: "You get a holiday on the next day that isn't a statutory holiday, alternative or substituted holiday, or rest day.",
    },
  ],
  glosario: [
    { termino: "Statutory holiday", definicion: "One of the holidays every employee gets under the Employment Ordinance." },
    { termino: "Continuous contract", definicion: "Four weeks or more with the same employer, with at least 17 hours a week or 68 hours over four weeks." },
  ],
});
