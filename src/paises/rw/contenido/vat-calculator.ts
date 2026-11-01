import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.vat-calculator",
  h1: "VAT calculator Rwanda",
  title: "VAT calculator Rwanda: add or remove VAT at 18%",
  description: "Add VAT to a price or take it out at the standard rate of {{rw.vat-rate}}. Includes the turnover that makes VAT registration compulsory.",
  intro: [
    "Value added tax in Rwanda is charged at {{rw.vat-rate}} on most goods and services, imports included. Enter a price to add VAT or to see how much VAT it contains.",
  ],
  comoSeCalcula: [
    "Adding VAT: price × {{rw.vat-rate}}, then added to the price.",
    "Taking VAT out: price with VAT ÷ (1 + {{rw.vat-rate}}). The difference is the VAT.",
    "Zero-rated goods and services carry VAT at 0%, and exempt items carry none.",
  ],
  ejemplo: ["A price of RWF 100,000 before VAT becomes RWF 118,000. A receipt of RWF 59,000 contains RWF 9,000 of VAT."],
  faq: [
    {
      pregunta: "When must a business register for VAT?",
      respuesta: "When its turnover goes above {{rw.vat-threshold-year}} over 12 months or {{rw.vat-threshold-quarter}} over three consecutive months. It must register within seven days. Any business can also register voluntarily.",
    },
    {
      pregunta: "How often is VAT declared?",
      respuesta: "Quarterly for a turnover of up to RWF 200 million a year, within 15 days after the quarter. Monthly above that, or by choice.",
    },
    {
      pregunta: "Can I get money back for asking for an EBM receipt?",
      respuesta: "Yes. Under the VAT reward scheme, a buyer who asks for an EBM invoice gets part of the VAT back. You can sign up by dialling *800#.",
    },
  ],
  glosario: [
    { termino: "VAT", definicion: "Value added tax, charged on goods and services and collected by the RRA." },
    { termino: "EBM", definicion: "Electronic Billing Machine, which VAT-registered sellers use to issue invoices." },
  ],
});
