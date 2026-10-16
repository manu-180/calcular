import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sg.notice-period",
  h1: "Notice period calculator for Singapore",
  title: "Notice period calculator Singapore: last day of work",
  description: "Find your notice period when resigning or being terminated in Singapore and your last day of work, using the Employment Act notice when your contract is silent.",
  intro: [
    "When you resign or your employer ends your contract, you must give notice or pay salary in lieu of notice.",
    "If your contract sets a notice period, that one applies. If it does not, the notice depends on how long you have worked there. Enter your start date and the date notice is given.",
  ],
  comoSeCalcula: [
    "Less than 26 weeks of service: {{sg.preaviso-dias[menos-26-semanas]}}.",
    "26 weeks to less than 2 years: {{sg.preaviso-dias[26-semanas-2-anios]}}. 2 years to less than 5 years: {{sg.preaviso-dias[2-5-anios]}}. 5 years or more: {{sg.preaviso-dias[5-anios-o-mas]}}.",
    "The notice period counts the day notice is given, plus rest days, public holidays and non-working days.",
  ],
  ejemplo: ["After 3 years, notice given on 14 October needs 2 weeks, so your last day of work is 27 October."],
  faq: [
    {
      pregunta: "Can the notice period be different for me and my employer?",
      respuesta: "No. The notice period must be the same for the employer and the employee.",
    },
    {
      pregunta: "Can we agree to skip the notice period?",
      respuesta: "Yes. Both sides can agree in writing to waive the notice period.",
    },
    {
      pregunta: "Is CPF paid on salary in lieu of notice?",
      respuesta: "No. CPF is paid on salary earned while you serve your notice, but not on salary in lieu of notice.",
    },
  ],
  glosario: [
    { termino: "Salary in lieu of notice", definicion: "Money equal to the salary for the notice period, paid instead of serving the notice." },
    { termino: "Notice period", definicion: "The time between giving notice and your last day of work." },
  ],
});
