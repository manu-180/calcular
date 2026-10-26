import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lk.stamp-duty-calculator",
  h1: "Stamp duty calculator Sri Lanka",
  title: "Stamp duty calculator Sri Lanka: lease and mortgage",
  description:
    "Work out stamp duty on a lease ({{lk.stamp-duty-per-1000[lease]}} per Rs. 1,000 of rent), a mortgage, a promissory note or a hire purchase agreement.",
  intro: [
    "Stamp duty is charged on certain documents when they are signed or presented in Sri Lanka. For most of them it is a fixed sum for every Rs. 1,000 of value, or part of Rs. 1,000.",
    "Choose the instrument and enter its value. For a lease you can enter the monthly rent and the term.",
  ],
  comoSeCalcula: [
    "The value is split into blocks of Rs. 1,000, and a block that is not complete counts as a full one.",
    "Each block pays the rate for the instrument: {{lk.stamp-duty-per-1000[lease]}} for a lease, {{lk.stamp-duty-per-1000[hire-purchase]}} for a hire purchase agreement, {{lk.stamp-duty-per-1000[mortgage]}} for a mortgage or a promissory note.",
    "For a lease the value is the aggregate rent, counting at most the first {{lk.stamp-duty-lease-max-years}} years.",
  ],
  ejemplo: ["A two year lease at Rs. 100,000 a month has an aggregate rent of Rs. 2,400,000. The stamp duty is 2,400 × Rs. 20 = Rs. 48,000."],
  faq: [
    {
      pregunta: "How do I pay stamp duty on a lease of land or a house?",
      respuesta: "For a mortgage or lease of immovable property, the duty is paid into the Commissioner General's account at the Bank of Ceylon, Taprobane branch. The bank gives a certificate that is attached to the document.",
    },
    {
      pregunta: "Is there stamp duty on receipts?",
      respuesta: "Yes. A receipt for more than Rs. 25,000 carries a duty of Rs. 25.",
    },
    {
      pregunta: "Where does the money go?",
      respuesta: "The IRD collects it and, since 31 March 2011, transfers it to the Provincial Councils.",
    },
  ],
  glosario: [
    { termino: "Instrument", definicion: "A written document such as a lease, mortgage or promissory note." },
    { termino: "Aggregate rent", definicion: "The total rent payable over the whole lease term." },
  ],
});
