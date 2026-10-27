import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jm.transfer-tax-calculator",
  h1: "Transfer tax and stamp duty calculator Jamaica",
  title: "Transfer tax and stamp duty calculator Jamaica {{anio}}",
  description:
    "Work out the transfer tax at {{jm.transfer-tax-rate}} of market value and the stamp duty on a property sale and mortgage in Jamaica, with the TAJ rates.",
  intro: [
    "When land or a house changes hands in Jamaica, TAJ charges transfer tax on the market value and stamp duty on the documents.",
    "Enter the price and the mortgage, if there is one, to see both taxes before you sign.",
  ],
  comoSeCalcula: [
    "Transfer tax: {{jm.transfer-tax-rate}} of the market value of the property.",
    "Stamp duty on the agreement for sale and transfer: {{jm.stamp-duty-high}} when the price is {{jm.stamp-duty-band}} or more, and {{jm.stamp-duty-low}} below that.",
    "Stamp duty on a mortgage of land: the same {{jm.stamp-duty-high}} or {{jm.stamp-duty-low}}, plus a surcharge of one quarter of the duty.",
    "Both are due within 30 days of the date of the document. Late payment carries a penalty of 100% of the duty.",
  ],
  ejemplo: [
    "For a J$25,000,000 house bought with a J$20,000,000 mortgage, transfer tax is J$500,000, stamp duty on the sale is J$5,000 and stamp duty on the mortgage is J$6,250.",
  ],
  faq: [
    {
      pregunta: "How much is transfer tax in Jamaica?",
      respuesta: "{{jm.transfer-tax-rate}} of the market value of the property, paid together with the stamp duty.",
    },
    {
      pregunta: "Is stamp duty a percentage of the price?",
      respuesta: "No. On an agreement for sale or a transfer it is a flat {{jm.stamp-duty-high}} when the price is {{jm.stamp-duty-band}} or more.",
    },
    {
      pregunta: "Are there other closing costs?",
      respuesta: "Yes. Attorney's fees, registration of the title and the lender's own fees are extra. This page only covers the taxes TAJ collects.",
    },
  ],
  glosario: [
    { termino: "Transfer tax", definicion: "A tax on the transfer of land, worked out on its market value." },
    { termino: "Stamp duty", definicion: "A tax on legal documents such as agreements for sale, transfers and mortgages." },
  ],
});
