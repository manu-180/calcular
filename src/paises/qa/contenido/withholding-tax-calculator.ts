import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "qa.withholding-tax-calculator",
  h1: "Withholding tax calculator for Qatar",
  title: "Withholding tax in Qatar: 5% on payments abroad",
  description:
    "Work out Qatar's {{qa.withholding-tax}} withholding tax on royalties, interest, commissions and service fees paid to non-residents, from gross or from net.",
  intro: [
    "When a business in Qatar pays a non-resident for certain services or rights, it must keep part of the payment and hand it to the General Tax Authority.",
    "Enter the invoice amount, or what the supplier must receive, to see the tax.",
  ],
  comoSeCalcula: [
    "The tax is {{qa.withholding-tax}} of the total amount, as a final tax.",
    "It applies to royalties, interest, commissions and fees for services done wholly or partly in Qatar, paid to non-residents without a permanent establishment there.",
    "If the supplier must receive a set amount after tax, the gross is that amount divided by 0.95.",
  ],
  ejemplo: ["On a QAR 100,000 invoice from a foreign consultant, the payer keeps QAR 5,000 for the GTA and pays QAR 95,000."],
  faq: [
    {
      pregunta: "When is a service done in Qatar?",
      respuesta: "When any necessary part of the work happens in Qatar, such as collecting data or site visits, even if someone else does it. Where the service is delivered doesn't decide it.",
    },
    {
      pregunta: "When do I pay the tax to the GTA?",
      respuesta: "Before the 16th of the month after the month you withheld it, and you give the supplier a certificate.",
    },
    {
      pregunta: "Is tax withheld from everyone?",
      respuesta: "No. It isn't withheld from people with a tax card or from those registered with the Qatar Financial Centre.",
    },
  ],
  glosario: [{ termino: "Permanent establishment", definicion: "A fixed place of business in Qatar through which a foreign company works." }],
});
