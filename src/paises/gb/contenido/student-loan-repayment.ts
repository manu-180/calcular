import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gb.student-loan-repayment",
  h1: "Student loan repayment calculator 2026/27",
  title: "Student loan repayment calculator: Plan 1, 2, 4, 5 and PGL",
  description:
    "See how much you repay on your student loan in 2026/27. Plan 2 threshold {{gb.student-loan-thresholds[plan-2]}}, Plan 5 {{gb.student-loan-thresholds[plan-5]}}, Postgraduate Loan {{gb.student-loan-thresholds[postgraduate]}}.",
  intro: [
    "Student loan repayments depend on what you earn, not on how much you owe. You only repay a share of your income above the threshold for your plan.",
    "Choose your plan and enter your yearly income to see what comes out of your pay each year, month and week.",
  ],
  comoSeCalcula: [
    "Plans 1, 2, 4 and 5 take {{gb.student-loan-rate}} of your income above the plan threshold.",
    "The 2026/27 thresholds are {{gb.student-loan-thresholds[plan-1]}} for Plan 1, {{gb.student-loan-thresholds[plan-2]}} for Plan 2, {{gb.student-loan-thresholds[plan-4]}} for Plan 4 and {{gb.student-loan-thresholds[plan-5]}} for Plan 5.",
    "A Postgraduate Loan takes {{gb.postgraduate-loan-rate}} of income above {{gb.student-loan-thresholds[postgraduate]}}, on top of any undergraduate repayment.",
    "If you are employed, your employer takes it through PAYE each payday. If you are self-employed, it is added to your Self Assessment bill.",
  ],
  ejemplo: ["On £40,000 with a Plan 2 loan you repay £955.35 a year, about £79.61 a month."],
  faq: [
    {
      pregunta: "Which plan am I on?",
      respuesta:
        "In England: Plan 1 for courses that started before September 2012, Plan 2 from September 2012 to July 2023, and Plan 5 from August 2023. In Wales: Plan 1 before September 2012 and Plan 2 after. Scotland is Plan 4 and Northern Ireland is Plan 1. Your online account confirms it.",
    },
    {
      pregunta: "Does the amount I owe change my monthly repayment?",
      respuesta: "No. Repayments depend only on income above the threshold. The balance and interest only change how long you keep paying.",
    },
    {
      pregunta: "When is a student loan written off?",
      respuesta:
        "It depends on the plan and when you took it out. For Plan 2 it is 30 years after the April you were first due to repay, and for Plan 5 it is 40 years. Anything left is cancelled.",
    },
    {
      pregunta: "Can I have two plans at once?",
      respuesta: "Yes. If you have more than one loan you can be on different plans, and you cannot choose which. A Postgraduate Loan from England or Wales is repaid on top of any undergraduate plan.",
    },
  ],
  glosario: [
    { termino: "Threshold", definicion: "The income level above which you start repaying. Below it you repay nothing." },
    { termino: "Postgraduate Loan", definicion: "A loan for a master's or doctoral course, repaid at its own rate alongside any undergraduate loan." },
  ],
});
