import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bw.vat-calculator",
  h1: "VAT calculator Botswana",
  title: "VAT calculator Botswana: add or remove 14% VAT",
  description: "Add VAT to a price or take it out of a VAT-inclusive price at the Botswana standard rate of {{bw.vat}}, under the current Value Added Tax Act.",
  intro: [
    "Add VAT to a price before you quote it, or find out how much VAT is inside a price you paid.",
    "The standard rate is {{bw.vat}}. Zero-rated supplies, such as exports and some basic foodstuffs, carry 0%, and exempt supplies carry no VAT at all.",
  ],
  comoSeCalcula: [
    "To add VAT: multiply the price by {{bw.vat}} and add the result.",
    "To take VAT out: divide the VAT-inclusive price by 1.14. What is left is the price before VAT.",
  ],
  ejemplo: ["A price of P1 000 before VAT is P1 140 with VAT. Going the other way, P1 140 includes P140 of VAT."],
  faq: [
    {
      pregunta: "What is the VAT rate in Botswana?",
      respuesta: "{{bw.vat}} on standard-rated goods and services. It is set in section 7 of the Value Added Tax Act, 2026, which came into force on 1 July 2026.",
    },
    {
      pregunta: "When must a business register for VAT?",
      respuesta: "When its taxable supplies over 12 months pass {{bw.vat-registration-threshold}}.",
    },
    {
      pregunta: "Why does dividing by 1.14 work?",
      respuesta: "A VAT-inclusive price is the net price plus 14%, that is 114% of the net price. Dividing by 1.14 takes you back to 100%.",
    },
  ],
  glosario: [
    { termino: "Zero-rated", definicion: "A taxable supply charged at 0%. The seller can still claim back the VAT on its own purchases." },
    { termino: "Exempt", definicion: "A supply outside VAT. The seller charges no VAT and cannot claim back the VAT it paid." },
  ],
});
