import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.maternity-leave-calculator",
  h1: "Maternity leave calculator Bhutan",
  title: "Maternity leave Bhutan: {{bt.maternity-months}} paid after {{bt.maternity-service-months}}",
  description: "Work out the end date and pay for maternity leave in Bhutan's private sector: at least {{bt.maternity-months}} at your last basic pay. Enter your start date and pay.",
  intro: [
    "A pregnant employee who has worked for the same employer for {{bt.maternity-service-months}} or more is entitled to at least {{bt.maternity-months}} of paid maternity leave at her last basic pay, in one unbroken stretch (Regulation on Working Conditions 2022, section 202).",
    "Enter your start date and pay to see the last day of the minimum and what you should be paid. Your contract or company rules may give more, and civil servants have their own rules.",
  ],
  comoSeCalcula: [
    "Check your service: {{bt.maternity-service-months}} of continuous work with this employer.",
    "Count {{bt.maternity-months}} from the day you choose to start. The last day is the one before the same date two months later.",
    "Multiply your last basic pay by the months. Allowances are not part of it.",
  ],
  ejemplo: ["Choki starts leave on 1 February 2027 after two years with her employer. Her last basic pay is Nu. 25,000. The minimum runs to 31 March 2027 and she is paid Nu. 50,000. She can add unused annual or sick leave, or unpaid leave if her employer agrees."],
  faq: [
    {
      pregunta: "How long is maternity leave in Bhutan?",
      respuesta: "For employees under the Labour and Employment Act, a minimum of {{bt.maternity-months}}, paid at the last basic pay (section 202). You decide when it starts (section 203).",
    },
    {
      pregunta: "How many times can I take it?",
      respuesta: "Up to {{bt.parental-leave-periods}} periods during your service with one employer (section 204).",
    },
    {
      pregunta: "How much notice do I give?",
      respuesta: "At least 2 months in writing, with a medical certificate confirming the pregnancy and expected date of birth (section 207).",
    },
    {
      pregunta: "Is there paternity leave?",
      respuesta: "Yes. An employee with 12 or more months of continuous work whose legal spouse gives birth gets at least {{bt.paternity-working-days}} of paid leave at the last basic pay, normally within 2 weeks of the birth (sections 210 and 211).",
    },
  ],
  glosario: [
    { termino: "Last basic pay", definicion: "Basic pay in your latest pay period, without allowances." },
    { termino: "Continuous employment", definicion: "Unbroken service with the same employer." },
    { termino: "Unbroken period", definicion: "Leave taken in a single stretch, not split up." },
  ],
});
