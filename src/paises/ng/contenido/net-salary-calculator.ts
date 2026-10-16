import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ng.net-salary-calculator",
  h1: "Net salary calculator Nigeria 2026",
  title: "Net salary calculator Nigeria 2026: take-home pay",
  description:
    "See your monthly take-home pay after pension ({{ng.pension-employee}}), National Housing Fund ({{ng.nhf-rate}}) and PAYE under the Nigeria Tax Act 2025.",
  intro: [
    "Enter your monthly basic salary and allowances to see how much reaches your account after pension, NHF and PAYE.",
  ],
  comoSeCalcula: [
    "Your pension contribution is {{ng.pension-employee}} of basic salary, housing and transport allowances.",
    "If you contribute to the National Housing Fund, it is {{ng.nhf-rate}} of your basic salary.",
    "PAYE is worked out on the year: gross pay minus pension, NHF and rent relief, taxed with the bands of the Nigeria Tax Act, then divided by 12.",
    "Net salary is gross pay minus pension, NHF and PAYE.",
  ],
  ejemplo: [
    "On ₦500,000 a month (₦250,000 basic, ₦125,000 housing, ₦75,000 transport and ₦50,000 other), paying ₦1.2 million rent a year, you take home about ₦396,455 a month.",
  ],
  faq: [
    {
      pregunta: "Why is pension worked out on only part of my pay?",
      respuesta: "The pension base is your monthly emoluments, which can be no less than basic salary plus housing and transport allowances. Other allowances are left out here.",
    },
    {
      pregunta: "Do I pay tax on the minimum wage?",
      respuesta: "No. If you earn the national minimum wage of {{ng.minimum-wage}} a month or less, that job is exempt from income tax.",
    },
    {
      pregunta: "Where does rent relief come in?",
      respuesta: "It lowers your chargeable income by {{ng.rent-relief-rate}} of the rent you pay, up to {{ng.rent-relief-cap}} a year, so your PAYE falls.",
    },
  ],
  glosario: [
    { termino: "Net salary", definicion: "What you take home after deductions." },
    { termino: "NHF", definicion: "National Housing Fund, a savings scheme run by the Federal Mortgage Bank of Nigeria." },
    { termino: "Emoluments", definicion: "Pay and allowances used as the base for pension contributions." },
  ],
});
