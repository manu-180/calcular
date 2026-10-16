import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "in.epf-calculator",
  h1: "EPF calculator",
  title: "EPF calculator: your PF balance at retirement",
  description:
    "See how your EPF grows to retirement with {{in.epf-rate}} from you and your employer, the EPS share of {{in.eps-share}} and a wage ceiling of {{in.epf-wage-ceiling}}.",
  intro: [
    "Your Employees' Provident Fund grows every month with your contribution, your employer's and the interest EPFO credits each year.",
    "Enter your basic salary, your age and the age you plan to retire, and see an estimate of your EPF balance on the day you stop working.",
  ],
  comoSeCalcula: [
    "You pay {{in.epf-rate}} of your basic salary plus DA into EPF every month. Your employer pays the same percentage.",
    "Part of the employer's share goes to the Employees' Pension Scheme (EPS): {{in.eps-share}} of wages up to {{in.epf-wage-ceiling}} a month. The rest goes to your EPF account.",
    "This calculator works out interest on the balance month by month and adds it once a year. Your salary rises by the percentage you enter each year.",
    "The pension built up in EPS is paid as a monthly pension and is not part of this balance.",
  ],
  ejemplo: [
    "On a basic of ₹20,000, you put in ₹2,400 a month. Your employer also puts in ₹2,400: ₹1,666 goes to EPS and ₹734 to your EPF.",
    "That adds ₹3,134 to your EPF every month before interest.",
  ],
  faq: [
    {
      pregunta: "What interest rate should I use?",
      respuesta:
        "EPFO declares a rate for each financial year. For 2025-26 its Central Board of Trustees recommended 8.25%. Future rates are not known, so try a lower one too.",
    },
    {
      pregunta: "What is the wage ceiling?",
      respuesta:
        "PF is compulsory on wages up to {{in.epf-wage-ceiling}} a month, the ceiling set from 17 September 2026. Many employers work out PF on the full basic instead.",
    },
    {
      pregunta: "Why does part of my employer's share not show in my EPF?",
      respuesta: "That part goes to EPS, the pension scheme. It builds a monthly pension, not a lump sum in your account.",
    },
    {
      pregunta: "Can I pay more than 12%?",
      respuesta: "Yes, you can choose to contribute more. Your employer does not have to match the extra.",
    },
  ],
  glosario: [
    { termino: "EPF", definicion: "Employees' Provident Fund, a savings account for retirement run by EPFO." },
    { termino: "EPS", definicion: "Employees' Pension Scheme, funded by part of the employer's contribution." },
    { termino: "EPFO", definicion: "Employees' Provident Fund Organisation, which manages EPF and EPS." },
  ],
});
