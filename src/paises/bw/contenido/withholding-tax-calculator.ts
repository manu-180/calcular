import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bw.withholding-tax-calculator",
  h1: "Withholding tax calculator Botswana",
  title: "Withholding tax calculator Botswana: {{anio}} rates",
  description: "Work out the withholding tax on dividends, interest, rent, commission, construction payments and payments to non-residents in Botswana under the current Act.",
  intro: [
    "When you pay certain kinds of income, the law makes you withhold part of it and pay it to BURS. Choose who receives the payment and what it is for to see how much to keep back.",
  ],
  comoSeCalcula: [
    "Residents: dividends {{bw.wht-resident[dividends]}}, interest {{bw.wht-resident[interest]}}, director's fees {{bw.wht-resident[directors-fees]}}, construction contracts {{bw.wht-resident[construction]}}, rent {{bw.wht-resident[rent]}} and commission {{bw.wht-resident[commission]}}.",
    "Non-residents: dividends {{bw.wht-non-resident[dividends]}}, interest, royalties, technical fees and director's fees {{bw.wht-non-resident[interest]}}, entertainers {{bw.wht-non-resident[entertainer]}} and insurance premiums {{bw.wht-non-resident[insurance-premium]}}.",
    "The rate applies to the gross amount. The recipient gets the rest.",
  ],
  ejemplo: [
    "A company paying P50 000 of technical fees to a consultant abroad withholds P7 500 and pays the consultant P42 500.",
  ],
  faq: [
    {
      pregunta: "When is rent subject to withholding tax?",
      respuesta: "When a business pays it for property in Botswana. It does not apply to rent an individual pays privately, to hotels, motels, guesthouses or lodges, or when the yearly rent is below {{bw.wht-domestic-threshold}}.",
    },
    {
      pregunta: "Can a tax treaty lower the rate?",
      respuesta: "Botswana has tax treaties that can reduce the rates for non-residents of the other country. This calculator uses the rates in the Income Tax Act, 2026.",
    },
    {
      pregunta: "Is interest from a bank taxed?",
      respuesta: "Interest paid to a resident carries {{bw.wht-resident[interest]}} withholding. Interest paid to a bank or financial institution in its ordinary business is not subject to it.",
    },
  ],
  glosario: [
    { termino: "Withholding agent", definicion: "The person who makes the payment and must withhold and pay over the tax." },
    { termino: "Technical fee", definicion: "A payment for administrative, managerial, technical or consulting services, or for developing or customising software, other than salary." },
  ],
});
