import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ph.withholding-tax-calculator",
  h1: "Withholding tax calculator",
  title: "Withholding tax calculator: monthly, semi-monthly, daily",
  description:
    "Check the withholding tax on your salary for a monthly, semi-monthly, weekly or daily pay period, with the BIR graduated rates in force since 2023.",
  intro: [
    "Your employer deducts income tax from every payslip. Enter your taxable pay for one period and see how much should be withheld.",
    "The BIR withholding tables are the yearly tax brackets split into pay periods, so a monthly employee pays nothing up to about ₱20,833 of taxable pay.",
  ],
  comoSeCalcula: [
    "Start from your regular pay for the period and take off your SSS, PhilHealth and Pag-IBIG contributions.",
    "That amount is turned into a yearly figure (12 months, 24 semi-monthly periods, 52 weeks or 365 days).",
    "The yearly tax is worked out with the graduated rates and divided back into the pay period.",
  ],
  ejemplo: ["A monthly taxable pay of ₱25,000 is ₱300,000 a year. The tax is 15% of the ₱50,000 above ₱250,000, which is ₱7,500 a year or ₱625 a month."],
  faq: [
    {
      pregunta: "What is taxable compensation?",
      respuesta:
        "Your pay minus non-taxable items. Your share of SSS, PhilHealth and Pag-IBIG contributions and union dues are not taxable, and neither is your 13th month pay up to {{ph.thirteenth-month-exemption}} a year.",
    },
    {
      pregunta: "How do employers withhold tax on overtime or commissions?",
      respuesta:
        "Supplementary pay such as overtime, commissions and taxable bonuses is added to the excess over the bracket floor and taxed at your bracket rate, as shown in the BIR examples of Revenue Regulations No. 11-2018.",
    },
    {
      pregunta: "What if I am paid every quarter or every six months?",
      respuesta:
        "The rules say to divide the pay by 3 or 6 to get a monthly average, use the monthly table, and multiply the tax back by 3 or 6.",
    },
  ],
  glosario: [
    { termino: "Withholding tax on compensation", definicion: "Income tax that your employer deducts from your pay and remits to the BIR." },
    { termino: "Supplementary compensation", definicion: "Pay on top of your regular salary, such as overtime, commissions or taxable bonuses." },
  ],
});
