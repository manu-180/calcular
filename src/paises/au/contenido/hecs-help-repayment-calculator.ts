import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "au.hecs-help-repayment-calculator",
  h1: "HECS-HELP repayment calculator",
  title: "HECS-HELP repayment calculator 2026-27 and 2025-26",
  description: "Work out your compulsory HECS-HELP repayment for 2026-27 or 2025-26 with the ATO marginal repayment rates. No repayment up to {{au.help-2026-27[umbral]}} in 2026-27.",
  intro: [
    "If you have a HELP debt (often still called HECS), you make a compulsory repayment through your tax return once your income passes the minimum repayment income.",
    "Since 2025-26 the repayment is only charged on the income above that threshold. Enter your repayment income and the year to see what you will repay.",
  ],
  comoSeCalcula: [
    "In 2026-27 there is no compulsory repayment up to {{au.help-2026-27[umbral]}} of repayment income.",
    "Above it you repay {{au.help-tasas[tasa-1]}} of each dollar up to {{au.help-2026-27[tramo-2]}}, then {{au.help-2026-27[cuota-2]}} plus {{au.help-tasas[tasa-2]}} of each dollar over that amount.",
    "Above {{au.help-2026-27[tope]}} you repay {{au.help-tasas[tasa-total]}} of your whole repayment income.",
  ],
  ejemplo: ["With a repayment income of $86,380 in 2026-27, the compulsory repayment is $2,527.80."],
  faq: [
    {
      pregunta: "What counts as repayment income?",
      respuesta: "Your taxable income plus reportable fringe benefits, total net investment loss, reportable super contributions and exempt foreign employment income.",
    },
    {
      pregunta: "Does this cover other study loans?",
      respuesta: "Yes. HELP, VET Student Loans, SFSS, Student Start-up Loans, ABSTUDY SSL and Australian Apprenticeship Support Loans all use the same repayment income and rates.",
    },
    {
      pregunta: "What was the threshold in 2025-26?",
      respuesta: "In 2025-26 there was no compulsory repayment up to {{au.help-2025-26[umbral]}} of repayment income.",
    },
  ],
  glosario: [
    { termino: "HELP", definicion: "Higher Education Loan Program, the government loan for higher education fees." },
    { termino: "Minimum repayment income", definicion: "The income at which compulsory repayments start." },
    { termino: "Compulsory repayment", definicion: "The amount the ATO adds to your tax assessment to pay down your study loan." },
  ],
});
