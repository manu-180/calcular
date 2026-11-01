import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fj.vat-calculator",
  h1: "VAT calculator Fiji {{anio}}",
  title: "VAT calculator Fiji {{anio}}: add or remove VAT",
  description: "Add the current {{fj.vat}} VAT to a price, or take it out of a VAT inclusive price. Rate and registration threshold come from FRCS.",
  intro: [
    "Fiji charges VAT at {{fj.vat}} on most goods and services. The rate has applied since {{fj.vat#desde}}. Enter an amount, choose whether to add VAT or take it out, and read the VAT and the total.",
    "A business must register for VAT once its yearly turnover goes above {{fj.vat-threshold}}.",
  ],
  comoSeCalcula: [
    "To add VAT, multiply the price by {{fj.vat}} and add the result to the price. A price of FJ$100 becomes FJ$112.50.",
    "To take VAT out of a price that already includes it, divide the price by 1 plus the rate, which here is 1.125. The difference between the two amounts is the VAT.",
    "Zero rated supplies carry VAT at 0%, and exempt supplies carry no VAT at all. Use the rate on this page only for standard rated sales.",
    "FRCS expects registered businesses to reflect the current rate in their prices. Its guide warns of fines for businesses that do not.",
  ],
  ejemplo: [
    "A shop sells a good for FJ$1,000 before VAT. VAT is FJ$125 and the shelf price is FJ$1,125. If a customer pays FJ$1,125 and you need the VAT inside it, divide by 1.125 to get FJ$1,000, so FJ$125 is VAT.",
  ],
  faq: [
    {
      pregunta: "What is the VAT rate in Fiji?",
      respuesta: "The FRCS VAT Guide says VAT is charged at 0% and {{fj.vat}}. From {{fj.vat#desde}} the {{fj.vat}} rate applies to goods and services that are not exempt or zero rated.",
    },
    {
      pregunta: "When must a business register for VAT?",
      respuesta: "When annual gross turnover goes above {{fj.vat-threshold}}. The guide says you must register within 21 days of becoming liable. Produce suppliers are treated differently.",
    },
    {
      pregunta: "Was the 2026-2027 Budget a change to VAT?",
      respuesta: "The FRCS summary of revenue policies for 2026-2027 lists VAT changes on import VAT for electric vehicles, timing of supply for tourism and a drug rehabilitation concession. It does not change the standard rate.",
    },
  ],
  glosario: [
    { termino: "VAT", definicion: "Value added tax, a tax on spending collected by registered businesses." },
    { termino: "Zero rated", definicion: "A supply that is taxable at 0%, so the seller can still claim back VAT paid on costs." },
    { termino: "VAT inclusive", definicion: "A price that already contains VAT." },
  ],
});
