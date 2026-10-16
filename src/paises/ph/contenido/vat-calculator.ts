import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ph.vat-calculator",
  h1: "VAT calculator Philippines",
  title: "VAT calculator Philippines: add or remove {{ph.vat-rate}} VAT",
  description: "Add {{ph.vat-rate}} VAT to a price or take it out of a VAT-inclusive amount, and compare it with your input VAT.",
  intro: [
    "The value-added tax in the Philippines is {{ph.vat-rate}} of the gross selling price. Use this to split a price into its VAT and its net amount.",
    "You can also enter the input VAT on your purchases to compare it with the VAT on your sales.",
  ],
  comoSeCalcula: [
    "To add VAT, multiply the net amount by {{ph.vat-rate}}.",
    "To remove VAT from an inclusive amount, divide it by 1.12. The difference is the VAT.",
    "If you enter input VAT, the calculator subtracts it from the output VAT to show the difference.",
  ],
  ejemplo: ["A VAT-inclusive price of ₱1,120 is ₱1,000 plus ₱120 of VAT."],
  faq: [
    {
      pregunta: "What is the VAT rate in the Philippines?",
      respuesta: "{{ph.vat-rate}} of the gross selling price of goods and of the value of imports, as set in Sections 106 and 107 of the Tax Code as amended by the TRAIN law.",
    },
    {
      pregunta: "How do I remove VAT from a price?",
      respuesta: "Divide the VAT-inclusive price by 1.12. On ₱1,120 that gives ₱1,000, so the VAT is ₱120.",
    },
    {
      pregunta: "Are some sales taxed at 0%?",
      respuesta: "Yes. Export sales and some other sales by VAT-registered persons are zero-rated under Section 106(A)(2) of the Tax Code.",
    },
  ],
  glosario: [
    { termino: "Output VAT", definicion: "The VAT you charge on your sales." },
    { termino: "Input VAT", definicion: "The VAT you paid on your purchases." },
  ],
});
