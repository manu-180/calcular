import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fj.paye-penalty-calculator",
  h1: "Late PAYE penalty calculator Fiji {{anio}}",
  title: "Late PAYE penalty Fiji {{anio}}: {{fj.paye-late-lodgment-penalty}} and {{fj.paye-late-payment-penalty}}",
  description: "Late lodging of PAYE costs {{fj.paye-late-lodgment-penalty}} of the PAYE owed, and late payment costs {{fj.paye-late-payment-penalty}}. Enter the PAYE to see the penalties.",
  intro: [
    "If you file your PAYE late, FRCS charges a late lodgment penalty of {{fj.paye-late-lodgment-penalty}} of the outstanding PAYE. If you pay late, a late payment penalty of {{fj.paye-late-payment-penalty}} applies to the unpaid amount.",
    "Enter the PAYE owed and tick which deadline you missed to see the penalties and the total to pay.",
  ],
  comoSeCalcula: [
    "PAYE is a trust tax. The filing and the payment are both due by the last day of the month after the month the PAYE relates to. The January filing is due on 28 or 29 February.",
    "A late lodgment penalty is {{fj.paye-late-lodgment-penalty}} of the outstanding PAYE for each late filing. Employers on six-monthly filing face a different late lodgment penalty, which this calculator does not cover.",
    "A late payment penalty is {{fj.paye-late-payment-penalty}} of any PAYE or FBT unpaid after the due date.",
    "The two penalties can both apply. The calculator adds them to the PAYE to show the total you must pay.",
  ],
  ejemplo: [
    "An employer owes FJ$10,000 of PAYE for a month and files and pays after the due date. The late lodgment penalty is 20%, which is FJ$2,000. The late payment penalty is 25%, which is FJ$2,500. Penalties come to FJ$4,500, so the employer pays FJ$14,500 in all.",
  ],
  faq: [
    {
      pregunta: "What is the penalty for filing PAYE late in Fiji?",
      respuesta: "The Employer Guide 2026 sets a late lodgment penalty of {{fj.paye-late-lodgment-penalty}} of the outstanding PAYE for each late filing.",
    },
    {
      pregunta: "What is the penalty for paying PAYE late?",
      respuesta: "The same guide sets a late payment penalty of {{fj.paye-late-payment-penalty}} on any PAYE and FBT unpaid after the due date.",
    },
    {
      pregunta: "When is PAYE due?",
      respuesta: "By the last day of the month following the month to which it relates. Payment is due with the filing because PAYE is a trust tax.",
    },
  ],
  glosario: [
    { termino: "Payday filing", definicion: "The PAYE return, where each pay is entered and submitted on the Taxpayer Online Service." },
    { termino: "Trust tax", definicion: "Tax an employer holds for FRCS and must hand over." },
    { termino: "LLP and LPP", definicion: "Late lodgment penalty and late payment penalty." },
  ],
});
