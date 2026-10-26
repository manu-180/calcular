import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ug.withholding-tax-calculator",
  h1: "Withholding tax calculator Uganda",
  title: "Withholding tax calculator Uganda: 6%, 10% and 15%",
  description: "Work out withholding tax in Uganda: {{ug.wht-rates[professional-fees]}} on professional fees and on goods and services above {{ug.wht-goods-threshold}}, {{ug.wht-rates[interest-dividends]}} on interest and dividends.",
  intro: [
    "Withholding tax (WHT) is income tax the payer deducts at source and pays to URA on behalf of the person being paid.",
    "Choose the type of payment and enter the gross amount to see the tax to withhold and what the payee receives.",
  ],
  comoSeCalcula: [
    "A resident paying professional or management fees to another resident withholds {{ug.wht-rates[professional-fees]}} of the gross amount, with no minimum.",
    "The Government, public bodies and designated agents withhold {{ug.wht-rates[goods-services]}} on goods and services when payments for a supply exceed {{ug.wht-goods-threshold}}.",
    "Interest and dividends paid to a resident: {{ug.wht-rates[interest-dividends]}}. Dividends from a listed company to an individual: {{ug.wht-rates[listed-dividends]}}.",
    "Dividends, interest, royalties, rent and management charges paid to a non-resident: {{ug.wht-rates[non-resident]}}.",
  ],
  ejemplo: ["On a consultancy invoice of Ushs 5,000,000, the client withholds Ushs 300,000 and pays you Ushs 4,700,000."],
  faq: [
    {
      pregunta: "Is withholding tax a final tax?",
      respuesta: "Sometimes. Interest from a bank to a resident individual and dividends to a resident individual are taxed in full by the withholding. Most other withholding is a credit against the tax on your return.",
    },
    {
      pregunta: "Who has to withhold on goods and services?",
      respuesta: "The Government, government institutions, local authorities, companies controlled by the Government and persons the Minister of Finance designates in a notice.",
    },
    {
      pregunta: "Is there withholding tax on rent?",
      respuesta: "URA says a designated withholding agent deducts 6% on rent payments above Ushs 1,000,000. The tax withheld reduces the tax payable in the landlord's final return.",
    },
  ],
  glosario: [
    { termino: "WHT", definicion: "Withholding tax, income tax deducted at source by the payer." },
    { termino: "Withholding agent", definicion: "The person legally required to deduct the tax and pay it to URA." },
  ],
});
