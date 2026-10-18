import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.withholding-tax-calculator",
  "h1": "Withholding tax calculator Tanzania",
  "title": "Withholding tax calculator Tanzania: TRA rates",
  "description": "Work out withholding tax in Tanzania on service fees ({{tz.wht-resident[service-fees]}} for residents), rent, interest, dividends, royalties and more.",
  "intro": [
    "When you make certain payments, you withhold income tax and pay it to TRA. Choose the type of payment and whether the payee is resident.",
    "The calculator shows the tax and what the payee receives."
  ],
  "comoSeCalcula": [
    "Service fees: {{tz.wht-resident[service-fees]}} for residents and {{tz.wht-non-resident[service-fees]}} for non-residents.",
    "Commercial rent and interest: {{tz.wht-resident[rent]}}. Goods supplied to Government: {{tz.wht-resident[goods-government]}} of the gross payment.",
    "The withholding agent pays the tax to TRA within seven days after the end of the month."
  ],
  "ejemplo": [
    "On a service fee of TSh 1,000,000 to a resident, you withhold TSh 50,000."
  ],
  "faq": [
    {
      "pregunta": "When must I pay the tax to TRA?",
      "respuesta": "Within seven days after the end of each calendar month."
    },
    {
      "pregunta": "Is withholding tax final?",
      "respuesta": "Some withholding taxes are final and others give the payee a tax credit. TRA lists both kinds."
    },
    {
      "pregunta": "Where do I get the certificate?",
      "respuesta": "Through Tax Payment on the Taxpayer Portal after paying."
    }
  ],
  "glosario": [
    {
      "termino": "Withholding agent",
      "definicion": "The person who makes the payment and withholds the tax."
    }
  ]
});
