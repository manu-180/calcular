import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bn.withholding-tax-calculator",
  h1: "Withholding tax calculator Brunei {{anio}}",
  title: "Brunei withholding tax {{anio}}: payments abroad",
  description:
    "Find the tax to withhold on a payment to a non-resident in Brunei: {{bn.wht-rates[interest]}} on interest, {{bn.wht-rates[technical-services]}} on services and royalties.",
  intro: [
    "A Brunei company or permanent establishment that pays a non-resident for certain things has to hold back part of the payment and send it to the Collector of Income Tax. The rate depends on what the payment is for. Interest on a loan carries {{bn.wht-rates[interest]}}. Royalties, know-how, technical services, management fees, rent of movable property and directors' pay carry {{bn.wht-rates[management]}}.",
    "Choose the nature of the payment and enter the amount. You can start from the gross payment or from the net amount the other party should receive.",
  ],
  comoSeCalcula: [
    "Withholding tax is the payment multiplied by the rate for its type: {{bn.wht-rates[interest]}} for interest, commission or fees on a loan, and {{bn.wht-rates[royalty]}}, {{bn.wht-rates[know-how]}}, {{bn.wht-rates[technical-services]}}, {{bn.wht-rates[management]}} or {{bn.wht-rates[directors]}} for the other listed types.",
    "These rates have applied since {{bn.wht-rates#desde}}. Before then the Revenue Division's table shows 15 percent on both interest and management fees.",
    "If you enter the net amount, the calculator grosses it up: net divided by one minus the rate. Check your contract for who bears the tax.",
  ],
  ejemplo: [
    "A payment of BND 20,000 to a non-resident adviser for technical services carries withholding tax of BND 2,000.00, leaving BND 18,000.00 to pay across. Interest of BND 100,000 on a loan carries BND 2,500.00.",
  ],
  faq: [
    {
      pregunta: "Who has to withhold the tax?",
      respuesta: "Any resident company or permanent establishment that makes a payment of a specified nature to a non-resident company, including non-resident directors. The Revenue Division publishes the rates and a Public Ruling on withholding of tax.",
    },
    {
      pregunta: "Can a double tax treaty lower the rate?",
      respuesta: "The Revenue Division has a page on claiming relief from withholding tax and lists Brunei's double tax agreements. Read the treaty and the relief rules before you apply a lower rate. This calculator uses the standard rates.",
    },
    {
      pregunta: "Where does the money go?",
      respuesta: "To the Collector of Income Tax at the Revenue Division of the Ministry of Finance and Economy.",
    },
  ],
  glosario: [
    { termino: "Non-resident", definicion: "A person or company that is not resident in Brunei Darussalam for tax purposes." },
    { termino: "Permanent establishment", definicion: "A fixed place of business through which a foreign company operates in Brunei." },
    { termino: "Collector of Income Tax", definicion: "The Revenue Division officer who receives income tax and withholding tax." },
  ],
});
