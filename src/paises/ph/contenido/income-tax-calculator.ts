import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ph.income-tax-calculator",
  h1: "Income tax calculator Philippines",
  title: "Income tax calculator Philippines (TRAIN law rates)",
  description:
    "Work out your yearly income tax on compensation with the graduated TRAIN rates, the tax-free 13th month ceiling and your mandatory contributions.",
  intro: [
    "Enter what you earned in the year and see the income tax due under the graduated rates of the Tax Code.",
    "Since 1 January 2023 the first ₱250,000 of taxable income is tax-free and the rates go from 15% to 35%.",
  ],
  comoSeCalcula: [
    "Your SSS, PhilHealth and Pag-IBIG contributions come off your gross compensation.",
    "Your 13th month pay and other bonuses are tax-free up to {{ph.thirteenth-month-exemption}} in total. Anything above that is added to your taxable income.",
    "The tax is a fixed amount for your bracket plus a percentage of what you earn above the bracket's floor.",
  ],
  ejemplo: [
    "With ₱600,000 of compensation and ₱29,400 of contributions, your taxable income is ₱570,600. The tax is ₱22,500 plus 20% of ₱170,600, so ₱56,620 for the year.",
  ],
  faq: [
    {
      pregunta: "What are the income tax brackets in the Philippines?",
      respuesta:
        "Up to ₱250,000 a year, 0%. Then 15% of the excess over ₱250,000, ₱22,500 plus 20% over ₱400,000, ₱102,500 plus 25% over ₱800,000, ₱402,500 plus 30% over ₱2,000,000, and ₱2,202,500 plus 35% over ₱8,000,000.",
    },
    {
      pregunta: "Is my 13th month pay taxed?",
      respuesta: "Only the part above {{ph.thirteenth-month-exemption}}. That ceiling covers your 13th month pay and other bonuses together.",
    },
    {
      pregunta: "Do married couples file together?",
      respuesta:
        "No. Each spouse computes income tax separately on their own taxable income. Income that cannot be traced to either of you is split equally.",
    },
    {
      pregunta: "Did the tax rates change in 2023?",
      respuesta: "Yes. The TRAIN law set a second, lower table from 1 January 2023. Pick a date in 2022 or earlier and the calculator uses the old table.",
    },
  ],
  glosario: [
    { termino: "TRAIN law", definicion: "Republic Act No. 10963, the Tax Reform for Acceleration and Inclusion, which set the current income tax brackets." },
    { termino: "Taxable income", definicion: "Your compensation after non-taxable items such as mandatory contributions and tax-free bonuses." },
    { termino: "Effective tax rate", definicion: "Your income tax divided by everything you earned. It is always lower than your bracket rate." },
  ],
});
