import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.paye-penalty-calculator",
  h1: "KRA PAYE penalty calculator",
  title: "KRA PAYE penalty calculator: late filing and late payment",
  description: "See the KRA penalties for filing or paying PAYE after the 9th: {{ke.paye-late-filing-rate}} or {{ke.paye-late-filing-min}}, plus {{ke.late-payment-penalty}} and {{ke.late-payment-interest}} a month.",
  intro: [
    "Employers file the PAYE return and pay the tax by the 9th of the following month. Miss either date and KRA adds penalties.",
    "Enter the PAYE due and how late you were to see what you owe.",
  ],
  comoSeCalcula: [
    "Late filing: the higher of {{ke.paye-late-filing-rate}} of the tax due or {{ke.paye-late-filing-min}}.",
    "Late payment: a penalty of {{ke.late-payment-penalty}} of the tax due.",
    "Interest: {{ke.late-payment-interest}} of the unpaid tax for each month or part of a month until it is paid in full.",
  ],
  ejemplo: ["PAYE of KSh 50,000 paid two months late, with the return on time, costs KSh 2,500 of penalty and KSh 1,000 of interest."],
  faq: [
    {
      pregunta: "When is PAYE due?",
      respuesta: "On or before the 9th day of the month after the one in which you paid the salaries.",
    },
    {
      pregunta: "What if I file a nil return late?",
      respuesta: "You still have to file a return when there is no PAYE. KRA sets the late filing penalty at the higher of {{ke.paye-late-filing-rate}} of the tax due or {{ke.paye-late-filing-min}}.",
    },
    {
      pregunta: "What if I did not deduct PAYE at all?",
      respuesta: "KRA charges the higher of {{ke.paye-late-filing-rate}} of the tax involved or {{ke.paye-late-filing-min}} for failing to deduct and account for the tax.",
    },
  ],
  glosario: [{ termino: "Nil return", definicion: "A PAYE return that declares no tax for the month." }],
});
