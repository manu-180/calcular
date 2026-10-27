import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gm.vat-registration",
  h1: "VAT registration threshold checker for The Gambia",
  title: "VAT registration threshold Gambia: must you register?",
  description: "Check if your business must register for VAT in The Gambia. Registration is compulsory from {{gm.vat-registration-threshold}} of taxable sales a year and voluntary from {{gm.vat-voluntary-threshold}}.",
  intro: [
    "Enter your taxable sales for the tax year to see whether you must register for VAT, may register or cannot register yet.",
    "From {{gm.vat-registration-threshold}} registration is compulsory. From {{gm.vat-voluntary-threshold}} you can choose to register. Below that, the GRA does not let a business register or charge VAT.",
  ],
  comoSeCalcula: [
    "Taxable sales of {{gm.vat-registration-threshold}} or more in a tax year: compulsory registration.",
    "From {{gm.vat-voluntary-threshold}} up to that amount: voluntary registration.",
    "Below {{gm.vat-voluntary-threshold}}: no registration.",
  ],
  ejemplo: ["A business with D1.5 million of taxable sales may register voluntarily and would have to register once its sales reach D2 million."],
  faq: [
    {
      pregunta: "Why register voluntarily?",
      respuesta: "A VAT-registered business can claim back the input VAT it pays on its own purchases from the GRA.",
    },
    {
      pregunta: "What must a registered business do?",
      respuesta: "Keep proper records, display its VAT certificate, issue VAT-inclusive invoices and receipts, quote prices with VAT and file a return every month.",
    },
    {
      pregunta: "Can I cancel my registration later?",
      respuesta: "Yes, after two years of registration if your taxable turnover was below {{gm.vat-voluntary-threshold}} over the previous 12 months and you filed regularly.",
    },
  ],
  glosario: [
    { termino: "Taxable sales", definicion: "Sales of goods and services that are not exempt from VAT, including zero-rated exports." },
    { termino: "Input VAT", definicion: "The VAT a business pays on what it buys, which a registered business can recover." },
  ],
});
