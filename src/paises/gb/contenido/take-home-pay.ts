import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gb.take-home-pay",
  h1: "Take-home pay calculator 2026/27",
  title: "Take-home pay calculator 2026/27: salary after tax",
  description:
    "Work out your take-home pay after Income Tax, National Insurance, student loan and pension for 2026/27. England, Wales, Northern Ireland and Scotland.",
  intro: [
    "Enter your yearly salary and see what lands in your bank account each month, after PAYE Income Tax, National Insurance, student loan repayments and your pension.",
    "It uses the 2026/27 tax year rates published by HMRC, with the Personal Allowance of {{gb.personal-allowance}} and the Scottish bands if you live in Scotland.",
  ],
  comoSeCalcula: [
    "Your pension comes off first if it is taken before tax (net pay arrangement) or through salary sacrifice.",
    "Income Tax is charged on what is left above your Personal Allowance of {{gb.personal-allowance}}. Over {{gb.personal-allowance-taper}} the allowance shrinks by £1 for every £2 you earn.",
    "National Insurance is {{gb.ni-employee-main-rate}} on earnings between {{gb.ni-primary-threshold}} and {{gb.ni-upper-earnings-limit}}, and {{gb.ni-employee-upper-rate}} above that.",
    "Student loans take {{gb.student-loan-rate}} of your pay above your plan threshold, and a Postgraduate Loan takes {{gb.postgraduate-loan-rate}} above {{gb.student-loan-thresholds[postgraduate]}}.",
  ],
  ejemplo: [
    "On £35,000 in England you pay £4,486 Income Tax and £1,794.40 National Insurance. Your take-home pay is £28,719.60 a year, or £2,393.30 a month.",
    "The same salary in Scotland pays £4,501.07 Income Tax, so you take home £28,704.53.",
  ],
  faq: [
    {
      pregunta: "Why is my payslip slightly different?",
      respuesta:
        "PAYE works pay period by pay period and rounds some figures, and your tax code may not be the standard 1257L. Over a full year the totals should be very close to this calculator.",
    },
    {
      pregunta: "Do I pay Scottish Income Tax?",
      respuesta:
        "You pay Scottish Income Tax if you live in Scotland, wherever you work. Your tax code then starts with S. National Insurance and student loans are the same across the UK.",
    },
    {
      pregunta: "Which student loan plan am I on?",
      respuesta:
        "In England, Plan 2 is for courses that started between 2012 and July 2023, and Plan 5 for courses from August 2023. Plan 1 covers older English and Welsh loans and Northern Ireland, and Plan 4 is for Scotland. Your payslip or your Student Loans Company account shows it.",
    },
    {
      pregunta: "Is salary sacrifice better than a normal pension contribution?",
      respuesta:
        "Usually it saves you National Insurance as well as Income Tax, because the money never counts as pay. It can lower your pay for things like mortgage applications and some benefits, so check with your employer.",
    },
    {
      pregunta: "What happens when I earn over {{gb.personal-allowance-taper}}?",
      respuesta:
        "You lose £1 of Personal Allowance for every £2 over {{gb.personal-allowance-taper}}, and it is gone completely at {{gb.additional-rate-threshold}}. In that range the effective rate on each extra pound is 60%.",
    },
  ],
  glosario: [
    { termino: "PAYE", definicion: "Pay As You Earn. Your employer takes Income Tax and National Insurance from your pay before you get it." },
    { termino: "Personal Allowance", definicion: "The amount of income you can earn each tax year before paying Income Tax." },
    { termino: "Tax year", definicion: "Runs from 6 April to 5 April the next year. These figures are for 6 April 2026 to 5 April 2027." },
  ],
});
