import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bb.salary-calculator",
  h1: "Barbados salary calculator {{anio}}",
  title: "Salary calculator {{anio}}: take-home pay after PAYE and NIS",
  description:
    "See your monthly take-home pay in Barbados after PAYE at {{bb.income-tax[0].tasa}} and {{bb.income-tax[1].tasa}}, NIS at {{bb.nis-employee-rate}} and the Resilience Fund. Enter your gross pay.",
  intro: [
    "Most people in Barbados pay {{bb.income-tax[0].tasa}} income tax on their first slice of taxable pay this year, down from 12.5% before the 2026 Budget. Put in your gross monthly salary and the calculator shows what lands in your account after your employer takes out PAYE, your NIS contribution and the Resilience and Regeneration Fund.",
    "The PAYE figure follows the worked examples in the Barbados Revenue Authority policy note on the 2026 rate cut, and the NIS figure uses the private sector rate published by the National Insurance and Social Security Service.",
  ],
  comoSeCalcula: [
    "Personal allowance: {{bb.personal-allowance}} a year, which your employer spreads as one twelfth each month.",
    "PAYE: {{bb.income-tax[0].tasa}} on taxable pay up to {{bb.income-tax[0].hasta}} a year (one twelfth of that each month) and {{bb.income-tax[1].tasa}} on anything above it.",
    "NIS: {{bb.nis-employee-rate}} of your pay, counted only up to the insurable earnings ceiling of {{bb.nis-ceiling-monthly}} a month.",
    "Resilience and Regeneration Fund: {{bb.rrf-employee-rate}} of your full gross pay, with no ceiling.",
  ],
  ejemplo: [
    "Say you earn Bds$5,000 a month. Your monthly allowance is Bds$2,083.33, which leaves Bds$2,916.67 taxable, so PAYE is Bds$335.42. NIS takes Bds$550.00 and the Resilience Fund Bds$12.50. You take home Bds$4,102.08.",
  ],
  faq: [
    {
      pregunta: "What are the income tax rates in Barbados for 2026?",
      respuesta:
        "From income year 2026 the rate is {{bb.income-tax[0].tasa}} on the first {{bb.income-tax[0].hasta}} of taxable income and {{bb.income-tax[1].tasa}} above that. The BRA set these out in policy note OGC No. 001/2026 after the March 2026 Budget.",
    },
    {
      pregunta: "How much can I earn before paying PAYE?",
      respuesta: "The personal allowance is {{bb.personal-allowance}} a year. If your monthly pay stays under one twelfth of that, no PAYE comes off.",
    },
    {
      pregunta: "Is NIS taken off before income tax?",
      respuesta:
        "No. In the BRA examples the personal allowance is the only amount taken off before PAYE is worked out, so your NIS contribution does not lower your tax.",
    },
    {
      pregunta: "Why does my NIS stop going up after a certain salary?",
      respuesta:
        "NIS is charged only on insurable earnings, which stop at {{bb.nis-ceiling-monthly}} a month this year. The Resilience and Regeneration Fund is the exception: NISSS charges it on gross earnings.",
    },
  ],
  glosario: [
    { termino: "PAYE", definicion: "Pay As You Earn. The income tax your employer deducts each payday and sends to the BRA by the 15th of the next month." },
    { termino: "NIS", definicion: "National Insurance Scheme, run by NISSS. It pays pensions, sickness, maternity and unemployment benefits." },
    { termino: "Insurable earnings ceiling", definicion: "The highest pay NIS contributions are charged on in a week or a month." },
    { termino: "Resilience and Regeneration Fund", definicion: "The fund that replaced the Catastrophe Fund in April 2025, paid by employee and employer." },
  ],
});
