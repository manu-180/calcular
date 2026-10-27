import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "na.notice-period-calculator",
  h1: "Notice period calculator Namibia",
  title: "Notice period Namibia: Labour Act minimum notice",
  description:
    "The Labour Act sets a minimum notice of one day, one week or one month depending on how long you have worked. See yours and the pay instead of notice.",
  intro: [
    "Whether you resign or your employer ends the contract, section 30 of the Labour Act sets the shortest notice either side can give.",
    "Pick how long you have been in the job and, if you want, enter your pay to see what notice pay would be.",
  ],
  comoSeCalcula: [
    "Four weeks or less in the job: {{na.notice-period[days-up-to-4-weeks]}} day.",
    "More than four weeks and up to a year: {{na.notice-period[weeks-up-to-1-year]}} week.",
    "More than a year: {{na.notice-period[months-over-1-year]}} month.",
    "Pay instead of notice: one day is monthly pay divided by {{na.weeks-per-month}} times your work days, one week is monthly pay divided by {{na.weeks-per-month}}, and one month is your monthly pay.",
  ],
  ejemplo: ["After six months on N$10,000 a month, the notice is one week, worth N$2,307.87 if paid instead."],
  faq: [
    {
      pregunta: "Does notice have to be in writing?",
      respuesta: "Yes. It must be written, give the date, and state the reasons if your employer gives it. An employee who cannot read or write may give notice orally.",
    },
    {
      pregunta: "Can my employer give notice while I am on leave?",
      respuesta: "No. Notice may not be given during annual, sick, compassionate or maternity leave, or run at the same time as that leave.",
    },
    {
      pregunta: "Can we agree on a longer notice period?",
      respuesta: "Yes, as long as the longer period is the same for you and your employer.",
    },
  ],
  glosario: [
    { termino: "Notice pay", definicion: "Pay for the notice period when the employer ends the contract without letting you work it." },
    { termino: "Section 30", definicion: "The part of the Labour Act that sets minimum notice periods." },
  ],
});
