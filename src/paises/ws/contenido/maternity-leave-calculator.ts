import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ws.maternity-leave-calculator",
  h1: "Maternity leave calculator Samoa {{anio}}",
  title: "Maternity leave calculator Samoa {{anio}}: weeks and pay",
  description: "See the two maternity leave payment options in Samoa: {{ws.maternity-full-pay-weeks}} on full pay plus {{ws.maternity-unpaid-weeks}} unpaid, or {{ws.maternity-reduced-weeks}} on two-thirds pay.",
  intro: [
    "The Labour and Employment Relations Act 2013 does not give one fixed maternity leave package. After talking it through with the employee, the employer must offer one of two options.",
    "Option A is {{ws.maternity-full-pay-weeks}} on full pay followed by {{ws.maternity-unpaid-weeks}} without pay. Option B is {{ws.maternity-reduced-weeks}} on two-thirds of normal pay. Enter your start date and monthly pay to compare the two.",
  ],
  comoSeCalcula: [
    "Weekly pay is monthly pay times 12, divided by 52.",
    "Option A pays {{ws.maternity-full-pay-weeks}} of full weekly pay. The leave runs {{ws.maternity-full-pay-weeks}} paid weeks and {{ws.maternity-unpaid-weeks}} unpaid weeks one after the other.",
    "Option B pays {{ws.maternity-reduced-weeks}} at {{ws.maternity-reduced-pay-share}} of weekly pay, the two-thirds rate in section 44 of the Act.",
    "The last day of leave is the start date plus the total number of weeks, less one day.",
  ],
  ejemplo: [
    "On WS$3,000 a month, weekly pay is WS$692.31. Starting leave on 2 November 2026, option A pays 4 weeks, which is WS$2,769.23, and the leave ends on 13 December 2026. Option B runs the same six weeks and pays two-thirds, which is also WS$2,769.23, spread over the whole period.",
  ],
  faq: [
    {
      pregunta: "Who qualifies for maternity leave?",
      respuesta: "Section 43 requires a medical certificate of pregnancy and employment records showing at least 12 months of continuous work for the employer. A miscarriage in the third trimester or a stillbirth also gives a right to the leave.",
    },
    {
      pregunta: "Can I be dismissed because I am pregnant?",
      respuesta: "No. Section 45 makes it unlawful to end the employment of a woman during or after pregnancy on a ground linked to the pregnancy, and the burden of proof is on the employer. You return to the same or an equivalent job at the same rate.",
    },
    {
      pregunta: "Is there leave for fathers?",
      respuesta: "Section 46 gives a male employee at least {{ws.paternity-days}} days of paid paternity leave, on a medical certificate of the expected birth date, a written request from his wife or spouse and 12 months of continuous service.",
    },
  ],
  glosario: [
    { termino: "Maternity leave", definicion: "Leave taken around childbirth under section 43 of the Act." },
    { termino: "Option A and B", definicion: "The two payment patterns the employer must offer under section 44." },
    { termino: "Paternity leave", definicion: "Paid leave for the father around the birth." },
  ],
});
