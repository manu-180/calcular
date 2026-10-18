import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ph.13th-month-pay-tax",
  h1: "13th month pay tax calculator",
  title: "Is my 13th month pay taxable? {{ph.thirteenth-month-exemption}} ceiling",
  description:
    "Check how much of your 13th month pay and bonuses is tax-free under the {{ph.thirteenth-month-exemption}} ceiling, and the income tax on the rest.",
  intro: [
    "Your 13th month pay and other benefits are tax-free up to {{ph.thirteenth-month-exemption}} a year in total. Only the excess is taxed.",
    "Enter your bonuses for the year and your other taxable pay to see the tax on the part above the ceiling.",
  ],
  comoSeCalcula: [
    "Add your 13th month pay and your other bonuses and benefits for the year.",
    "Up to {{ph.thirteenth-month-exemption}} of that total is tax-free.",
    "The excess is added to your other taxable compensation. The extra tax it creates is the tax on your bonuses.",
  ],
  ejemplo: [
    "With ₱150,000 of bonuses and ₱600,000 of other taxable pay, ₱90,000 is tax-free and ₱60,000 is taxed at 20%. You pay ₱12,000 and keep ₱138,000.",
  ],
  faq: [
    {
      pregunta: "Is the 13th month pay tax-free?",
      respuesta: "Yes, up to {{ph.thirteenth-month-exemption}} a year. The ceiling covers the 13th month pay and other benefits together, not each one on its own.",
    },
    {
      pregunta: "What counts as other benefits?",
      respuesta:
        "The rules name productivity incentives and the Christmas bonus. De minimis benefits are a separate category of non-taxable benefits.",
    },
    {
      pregunta: "How is the taxable part taxed?",
      respuesta: "It is added to your compensation and taxed with the graduated rates, so it pays the rate of the bracket it lands in.",
    },
  ],
  glosario: [
    { termino: "13th month pay", definicion: "The yearly benefit required by Presidential Decree No. 851, as amended." },
    { termino: "De minimis benefits", definicion: "Small benefits that the BIR excludes from taxable compensation. They are listed apart from the 13th month pay and other benefits." },
  ],
});
