import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nz.take-home-pay",
  h1: "Take-home pay calculator NZ",
  title: "Take-home pay calculator NZ: your pay after PAYE",
  description:
    "Work out your take-home pay in New Zealand after PAYE, the ACC earners' levy, KiwiSaver and student loan. Yearly, monthly, fortnightly and weekly figures.",
  intro: [
    "Enter your pay before tax and see what lands in your bank account each year, month, fortnight and week.",
    "It takes off PAYE income tax, the ACC earners' levy of {{nz.acc-earners-levy-rate}}, your KiwiSaver contribution and student loan repayments, and adds the independent earner tax credit if you qualify.",
  ],
  comoSeCalcula: [
    "Your pay is turned into a yearly figure. Income tax is worked out band by band on the rates set by Inland Revenue.",
    "The ACC earners' levy is {{nz.acc-earners-levy-rate}} of your earnings, up to {{nz.acc-max-liable-earnings}} a year.",
    "If you earn between {{nz.ietc-lower-threshold}} and {{nz.ietc-upper-threshold}} and don't get Working for Families, a main benefit or NZ Super, you get the independent earner tax credit (up to {{nz.ietc-annual}} a year).",
    "KiwiSaver comes off at the rate you chose. A student loan takes {{nz.student-loan-rate}} of every dollar over {{nz.student-loan-threshold}} a year.",
  ],
  ejemplo: [
    "On $500 a week with a student loan and KiwiSaver at 3.5%, Inland Revenue's tables take $65.25 PAYE (tax code ME SL), $4.32 for the student loan and $17.50 for KiwiSaver. That leaves $412.93 a week.",
  ],
  faq: [
    {
      pregunta: "Why is my payslip slightly different?",
      respuesta:
        "PAYE is worked out pay by pay with Inland Revenue's tables, and your tax code may not be the standard M. Over a full year at the same pay the totals land very close to this calculator.",
    },
    {
      pregunta: "Is the ACC earners' levy included in PAYE?",
      respuesta:
        "Yes. Your employer takes it as part of PAYE, so your payslip usually shows one PAYE figure. We show it on its own line so you can see how much it is.",
    },
    {
      pregunta: "What is the ME tax code?",
      respuesta:
        "It's the main tax code for people who get the independent earner tax credit. Your employer then takes less PAYE, worth up to {{nz.ietc-annual}} a year.",
    },
    {
      pregunta: "How much does my employer put into KiwiSaver?",
      respuesta:
        "At least {{nz.kiwisaver-employer-rate}} of your gross pay, on top of your wages. Employer superannuation contribution tax comes off that amount before it reaches your account.",
    },
  ],
  glosario: [
    { termino: "PAYE", definicion: "Pay as you earn. Your employer takes income tax and the ACC earners' levy from your pay before you get it." },
    { termino: "Tax year", definicion: "Runs from 1 April to 31 March. The 2027 tax year is 1 April 2026 to 31 March 2027." },
    { termino: "IETC", definicion: "Independent earner tax credit, a tax credit of up to {{nz.ietc-annual}} a year for people on middle incomes." },
  ],
});
