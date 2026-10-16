import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "in.in-hand-salary-calculator",
  h1: "In-hand salary calculator from CTC",
  title: "In-hand salary calculator 2026-27: CTC to take-home",
  description:
    "Turn your CTC into monthly in-hand salary after PF, gratuity, professional tax and income tax for 2026-27, under the new or the old regime.",
  intro: [
    "Your CTC is what you cost the company, not what reaches your bank. Enter it here and see your take-home pay a month, line by line.",
    "The calculator takes out the employer's PF and gratuity, which sit inside CTC, then your own PF, professional tax and income tax.",
  ],
  comoSeCalcula: [
    "Basic salary is the share of CTC you enter. PF is {{in.epf-rate}} of basic, paid by you and again by your employer. Many employers stop at the wage ceiling of {{in.epf-wage-ceiling}} a month.",
    "If gratuity is part of your CTC, the yearly provision is {{in.gratuity-days}} days of basic for each year, with a month counted as {{in.gratuity-divisor}} days.",
    "Gross salary is CTC minus employer PF and gratuity. Income tax is worked out on gross salary with the regime you pick, cess included.",
    "In-hand salary is gross salary minus your PF, professional tax and income tax.",
  ],
  ejemplo: [
    "On a ₹12 lakh CTC with half of it as basic, PF on the ceiling and gratuity included, your gross salary is ₹11,35,153.85.",
    "In the new regime the tax is zero, so you take home about ₹91,396 a month. In the old regime, with only PF as a deduction, it drops to about ₹80,431.",
  ],
  faq: [
    {
      pregunta: "Why is my in-hand salary so much lower than my CTC?",
      respuesta:
        "CTC counts money you never see each month: your employer's PF, the gratuity provision and sometimes insurance or a variable bonus. Your own PF and tax come off after that.",
    },
    {
      pregunta: "What is the PF wage ceiling?",
      respuesta:
        "It is the monthly wage up to which provident fund is compulsory. Since 17 September 2026 it is {{in.epf-wage-ceiling}}. Your employer can still work out PF on your full basic.",
    },
    {
      pregunta: "Is professional tax charged everywhere in India?",
      respuesta: "No. Each state decides it and some do not charge it. Your payslip shows the amount. In the old regime it is deducted from taxable salary.",
    },
    {
      pregunta: "Does variable pay count?",
      respuesta: "Only if you include it in the CTC you enter. If your bonus depends on performance, leave it out to see your fixed monthly pay.",
    },
  ],
  glosario: [
    { termino: "CTC", definicion: "Cost to company: everything the employer spends on you in a year." },
    { termino: "In-hand salary", definicion: "What reaches your bank account each month." },
    { termino: "EPF", definicion: "Employees' Provident Fund, a retirement fund both you and your employer pay into." },
    { termino: "TDS", definicion: "Tax deducted at source: income tax your employer takes from your salary every month." },
  ],
});
