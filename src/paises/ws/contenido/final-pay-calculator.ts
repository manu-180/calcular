import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ws.final-pay-calculator",
  h1: "Final pay calculator Samoa {{anio}}",
  title: "Final pay calculator Samoa {{anio}}: leave and notice pay",
  description: "Add up what you are owed when a job ends: annual leave, pay instead of notice and unpaid wages. Notice pay is due within {{ws.final-pay-deadline-days}} days of the wage period.",
  intro: [
    "When a job ends in Samoa, the money owed to you usually has three parts: any wages already earned, annual leave you have not taken, and pay instead of notice if your employer ends the job without letting you work the notice.",
    "This calculator adds the three together before PAYE and NPF. You can take the leave days and the notice weeks from the other calculators on this site.",
  ],
  comoSeCalcula: [
    "Weekly pay is monthly pay times 12, divided by 52. One working day is weekly pay divided by the days you work in a week.",
    "Annual leave owing is paid in full when employment ends under section 55 of the Labour and Employment Relations Act 2013, including leave built up in a part year.",
    "Pay instead of notice is the notice weeks times weekly pay at the full rate, which includes bonuses, allowances and overtime worked. It has to be paid before the end of the {{ws.final-pay-deadline-days}}th day after the last day of the wage period.",
  ],
  ejemplo: [
    "On WST 3,000 a month with a five day week, a week is WST 692.31 and a day is WST 138.46. Seven days of annual leave come to WST 969.23. Three weeks of pay instead of notice come to WST 2,076.92. With WST 500 of unpaid wages, the final pay is WST 3,546.15 before PAYE and NPF.",
  ],
  faq: [
    {
      pregunta: "When must my final pay arrive?",
      respuesta: "Section 55 says payment in lieu of notice is payable directly to the employee before the end of the {{ws.final-pay-deadline-days}}th day after the last day of the wage period concerned.",
    },
    {
      pregunta: "Do I get paid for unused annual leave?",
      respuesta: "Yes. Section 55 entitles an employee whose employment ends under that section to all annual leave owing, including leave accumulated in a part year of employment.",
    },
    {
      pregunta: "Is there a statutory redundancy payment?",
      respuesta: "In the sections of the Act we read, an employer making a position redundant must consult, give written reasons and give Schedule 2 notice. We found no payment formula, so check your contract.",
    },
  ],
  glosario: [
    { termino: "Payment in lieu", definicion: "Pay given instead of the notice period being worked." },
    { termino: "Wage period", definicion: "The period of work a wage payment covers, such as a fortnight." },
    { termino: "Redundancy", definicion: "An employer no longer needs the position, so the job ends." },
  ],
});
