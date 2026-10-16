import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "my.take-home-pay",
  h1: "Take-home pay calculator Malaysia",
  title: "Take-home pay calculator: salary after EPF, SOCSO and PCB",
  description: "Work out your net salary after EPF, SOCSO, LINDUNG 24 Jam, EIS and PCB, with the 2026 PERKESO tables and the HASiL PCB formula.",
  intro: [
    "Enter your gross monthly salary and your EPF contribution to see what reaches your bank account after every statutory deduction.",
    "SOCSO and EIS come from the PERKESO contribution tables, including the new LINDUNG 24 Jam share, and PCB from the HASiL computerised formula for 2026.",
  ],
  comoSeCalcula: [
    "EPF is the employee share you enter from your payslip.",
    "SOCSO is read from the PERKESO table for your wage band: the Invalidity Scheme share (first category only) plus the LINDUNG 24 Jam share if you are covered.",
    "EIS is read from the Act 800 table. Employer and employee pay the same amount.",
    "PCB uses the HASiL formula with your EPF, the individual relief of {{my.tax-reliefs[individual]}}, your spouse and child reliefs and the rebate for chargeable income up to {{my.tax-rebate-threshold}}.",
    "Take-home pay is your gross salary less all of these.",
  ],
  ejemplo: [
    "On RM5,000 a month, single, with RM550 of EPF: SOCSO RM61.90, EIS RM9.90 and PCB RM110. Your take-home pay is RM4,268.20 a month.",
  ],
  faq: [
    {
      pregunta: "What is LINDUNG 24 Jam on my payslip?",
      respuesta:
        "It is PERKESO's Non-Employment Injury Scheme (SKBBK), which started on {{my.socso-skbbk#desde}}. It covers accidents outside working hours and adds an employee share to your SOCSO deduction.",
    },
    {
      pregunta: "Why do SOCSO and EIS stop growing above a certain salary?",
      respuesta: "PERKESO contributions are capped at a wage ceiling of {{my.socso-wage-ceiling}} a month since {{my.socso-wage-ceiling#desde}}. Above that, you pay the same as at the ceiling.",
    },
    {
      pregunta: "Why is my payslip a little different?",
      respuesta:
        "Allowances, overtime, a bonus or reliefs you declared on Form TP1 change the PCB for that month. This calculator assumes a fixed salary with no extras.",
    },
  ],
  glosario: [
    { termino: "EPF / KWSP", definicion: "Employees Provident Fund. You and your employer both contribute to it every month." },
    { termino: "SOCSO / PERKESO", definicion: "Social Security Organisation. Its schemes cover work injuries, invalidity and, since {{my.socso-skbbk#desde}}, accidents outside work." },
    { termino: "EIS", definicion: "Employment Insurance System under Act 800, run by PERKESO." },
  ],
});
