import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.final-pay-deadline-calculator",
  h1: "Final pay deadline calculator Bhutan",
  title: "Final pay deadline in Bhutan: when wages are due",
  description: "Find the date by which your employer must pay what is owed when a job ends in Bhutan. The Act allows {{bt.final-pay-days}}. Enter your last day.",
  intro: [
    "When a contract of employment ends in Bhutan, the employer must pay all wages owing within {{bt.final-pay-days}}. The rule is section 127 of the Labour and Employment Act of Bhutan 2007.",
    "Enter the date the contract ends and you get the last day for the payment. If you also enter the date notice was given, you see the earliest end of a minimum notice period of {{bt.notice-days-min}}.",
  ],
  comoSeCalcula: [
    "Take the date the contract ends, whether by resignation, dismissal, redundancy or the end of a fixed term.",
    "Add {{bt.final-pay-days}}. Section 127 counts calendar days, so weekends and holidays are included.",
    "For the notice date, add {{bt.notice-days-min}} to the day notice was given. A longer period in your contract moves that date later.",
    "A mistaken overpayment can be deducted only if it was made in the {{bt.overpayment-recovery-months}} before (section 131).",
  ],
  ejemplo: [
    "Your contract ends on 31 December 2026. Seven calendar days later is 7 January 2027, so your employer must have paid everything owed by that day. If the employer is late, section 128 sets a fine at the Daily Minimum National Wage Rate, up to 90 days of it.",
  ],
  faq: [
    {
      pregunta: "How long does my employer have to pay my last wages in Bhutan?",
      respuesta: "{{bt.final-pay-days}} after the contract ends. Section 127 of the Labour and Employment Act of Bhutan 2007 counts calendar days.",
    },
    {
      pregunta: "What happens if the employer pays late?",
      respuesta: "Section 128 makes the employer liable to a fine at the rate of the Daily Minimum National Wage Rate, up to a maximum of 90 days of that rate.",
    },
    {
      pregunta: "Can my employer take back money paid by mistake?",
      respuesta: "Section 131(g) allows a deduction for an overpayment made by mistake in the immediately preceding {{bt.overpayment-recovery-months}}.",
    },
  ],
  glosario: [
    { termino: "Wages owing", definicion: "Pay due to the employee up to the end of the contract and not yet paid." },
    { termino: "Calendar days", definicion: "Every day on the calendar, including weekends and public holidays." },
  ],
});
