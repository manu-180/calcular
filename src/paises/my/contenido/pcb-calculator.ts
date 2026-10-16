import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "my.pcb-calculator",
  h1: "PCB calculator 2026",
  title: "PCB calculator 2026: monthly tax deduction (MTD)",
  description: "Work out your PCB (MTD) with the HASiL computerised formula for 2026: EPF, reliefs, rebate, zakat and the 5 sen rounding your payroll uses.",
  intro: [
    "PCB, or MTD, is the income tax your employer takes from your salary every month and pays to HASiL. Enter your salary and EPF to see the amount for any month of the year.",
    "It follows the HASiL specification for computerised MTD calculations for 2026, the same formula payroll software has to use.",
  ],
  comoSeCalcula: [
    "Your chargeable income for the year (P) is estimated from this month's salary, the months already paid and the months left, less EPF up to {{my.tax-reliefs[epf]}} a year.",
    "Your reliefs come off: {{my.tax-reliefs[individual]}} for you, {{my.tax-reliefs[spouse]}} if your husband or wife has no income, {{my.tax-reliefs[child-under-18]}} for each child under 18 and {{my.tax-reliefs[child-higher-education]}} for each child in higher education.",
    "Tax for the year is worked out on P with the resident rates. If P is {{my.tax-rebate-threshold}} or less, the rebate of {{my.tax-rebate-individual}} comes off (plus {{my.tax-rebate-spouse}} for a husband or wife with no income).",
    "Tax already deducted this year and zakat are taken off, and the rest is spread over the months left, this one included.",
    "The result is rounded up to the next 5 sen. If it is under {{my.mtd-minimum}}, your employer does not deduct it.",
  ],
  ejemplo: [
    "HASiL's own example: RM5,500 a month, EPF RM605, married with a working wife and three children. In January P is RM47,000.07 and the PCB is RM110.00. February also gives RM110.",
  ],
  faq: [
    {
      pregunta: "Why is my PCB zero?",
      respuesta:
        "Either your chargeable income is low enough for the rebate to cover the tax, or the PCB works out under {{my.mtd-minimum}}. In that case the HASiL rules say your employer does not have to deduct it.",
    },
    {
      pregunta: "Why does my PCB change when I get a bonus?",
      respuesta:
        "A bonus is additional remuneration. HASiL has a separate step for it: the tax for the whole year is worked out with the bonus included, and the extra tax is deducted in the month you receive it.",
    },
    {
      pregunta: "Can I claim more reliefs through my employer?",
      respuesta:
        "Yes. Form TP1 lets you tell your employer about reliefs such as lifestyle purchases or medical insurance, so they are taken into account in your PCB during the year.",
    },
    {
      pregunta: "Does zakat reduce my PCB?",
      respuesta: "Yes. Zakat paid through payroll comes off the PCB for that month and is also counted in the months that follow.",
    },
  ],
  glosario: [
    { termino: "PCB / MTD", definicion: "Potongan Cukai Bulanan, or Monthly Tax Deduction. Income tax your employer deducts from your salary each month." },
    { termino: "TP1", definicion: "The form you give your employer to claim extra reliefs and rebates in your PCB." },
    { termino: "Chargeable income", definicion: "Your income after reliefs. The tax rates apply to this amount." },
  ],
});
