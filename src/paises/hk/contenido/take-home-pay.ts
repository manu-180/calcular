import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hk.take-home-pay",
  h1: "Take-home pay calculator Hong Kong",
  title: "Take-home pay calculator Hong Kong: after MPF and tax",
  description:
    "See your monthly pay in Hong Kong after the {{hk.mpf-rate}} MPF contribution, plus the salaries tax to set aside each month, with this year's allowances.",
  intro: [
    "In Hong Kong your employer takes your MPF contribution from your pay each month. Salaries tax works differently: the IRD bills you once a year.",
    "Enter your monthly salary and any bonus to see your pay after MPF and how much to put aside for tax.",
  ],
  comoSeCalcula: [
    "Your MPF contribution is {{hk.mpf-rate}} of your monthly pay, worked out on at most {{hk.mpf-max-relevant-income}}. Below {{hk.mpf-min-relevant-income}} you don't contribute.",
    "Salaries tax is estimated on 12 months of salary plus the bonus, less MPF (up to {{hk.deduction-limits[mpf]}}) and your allowances.",
    "The monthly amount to set aside is the yearly tax divided by 12.",
  ],
  ejemplo: [
    "On $30,000 a month you pay $1,500 of MPF, so $28,500 reaches your bank account. As a single person your 2026/27 salaries tax is about $15,580, or $1,298 a month.",
  ],
  faq: [
    {
      pregunta: "Is salaries tax taken from my pay in Hong Kong?",
      respuesta: "No. The IRD issues a demand note after the tax year, normally payable in two instalments around January and April.",
    },
    {
      pregunta: "How much MPF comes off my salary?",
      respuesta: "{{hk.mpf-rate}} of your relevant income, up to a cap of {{hk.mpf-rate}} of {{hk.mpf-max-relevant-income}} a month. If you earn less than {{hk.mpf-min-relevant-income}} a month, nothing comes off.",
    },
    {
      pregunta: "Does the bonus pay MPF too?",
      respuesta: "Yes, a bonus is relevant income. In the month it's paid, the contribution still stops at the monthly maximum.",
    },
  ],
  glosario: [
    { termino: "Take-home pay", definicion: "What reaches your bank account after deductions from your pay." },
    { termino: "Demand note", definicion: "The IRD's bill for salaries tax, with the due dates of each instalment." },
  ],
});
