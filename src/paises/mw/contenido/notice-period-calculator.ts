import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mw.notice-period-calculator",
  h1: "Notice period calculator Malawi",
  title: "Notice period calculator Malawi: Employment Act rules",
  description:
    "Find the minimum notice to end a contract in Malawi under section 29 of the Employment Act, by how you are paid and how long you have worked.",
  intro: [
    "Choose how your contract pays you, enter your months of service and the day notice is given to see the minimum notice and when it ends.",
    "The same notice applies whether you resign or your employer ends the contract.",
  ],
  comoSeCalcula: [
    "Paid by the month: one month's notice.",
    "Paid by the fortnight: one fortnight, or one month after {{mw.notice-long-service}} of service.",
    "Paid by the week: one week, one fortnight after {{mw.notice-mid-service}}, one month after {{mw.notice-long-service}}.",
    "Paid by the day or hour: one day, one week after {{mw.notice-short-service}}, one fortnight after {{mw.notice-mid-service}}, one month after {{mw.notice-long-service}}.",
    "A fixed-term contract needs at least {{mw.notice-fixed-term}} calendar days.",
  ],
  ejemplo: ["A worker paid by the week with three years of service is owed one fortnight of notice. Given on 27 October, it runs until 10 November."],
  faq: [
    {
      pregunta: "Does notice have to be in writing?",
      respuesta: "Yes. Section 29 says the minimum period of notice is given in writing.",
    },
    {
      pregunta: "Can my employer pay me instead of giving notice?",
      respuesta: "Yes. Your employer can pay what you would have earned during the notice period, plus all other benefits due to you up to its end.",
    },
    {
      pregunta: "What if I leave without giving notice?",
      respuesta: "If notice was required and your employer did not waive it, you have to pay your employer the pay you would have earned during the notice period. You still get the pay and benefits you had earned up to the day you left.",
    },
  ],
  glosario: [
    { termino: "Payment in lieu of notice", definicion: "Pay for the notice period instead of working it." },
    { termino: "Continuous service", definicion: "Time with the same employer without a break in the contract." },
  ],
});
