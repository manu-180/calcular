import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sc.vat-calculator",
  h1: "Seychelles VAT calculator {{anio}}",
  title: "Seychelles VAT calculator {{anio}}: {{sc.vat-rate}} added or removed",
  description: "Add VAT to a price or take it out. The standard VAT rate in Seychelles is {{sc.vat-rate}} and registration is compulsory from {{sc.vat-threshold}} of supplies.",
  intro: [
    "Value Added Tax (VAT) in Seychelles has a standard rate of {{sc.vat-rate}}. Use the calculator to add it to a price without VAT or to find the VAT inside a price that already includes it.",
    "VAT has existed since 2010. The SRC lists exports and some items in Schedule 2 of the VAT Act as zero rated, and a list of basic goods and services as exempt.",
  ],
  comoSeCalcula: [
    "To add VAT, multiply the price by {{sc.vat-rate}} and add the result to the price.",
    "To take VAT out, divide the price with VAT by 1.15. The difference is the VAT.",
    "A business must register for VAT when its taxable supplies reach {{sc.vat-threshold}}. Voluntary registration is open from {{sc.vat-voluntary-minimum}} of supplies (rule in force since {{sc.vat-voluntary-minimum#desde}}).",
  ],
  ejemplo: [
    "A shop sells goods for SCR 1,000 before VAT. VAT at 15 % is SCR 150, so the customer pays SCR 1,150. Working backwards, SCR 1,150 divided by 1.15 returns the SCR 1,000 base.",
  ],
  faq: [
    {
      pregunta: "How is VAT charged on imports?",
      respuesta: "The SRC applies 15 % to the customs value, meaning cost, insurance and freight plus customs duties. On a customs value of SCR 2,000 with SCR 600 of duty, the VAT is SCR 390.",
    },
    {
      pregunta: "Which supplies are zero rated or exempt?",
      respuesta: "Exports and the items in Schedule 2 of the VAT Act 2010 are zero rated. Schedule 1 exempts goods such as pharmaceuticals and basic foods, and services such as education, health and financial services.",
    },
    {
      pregunta: "When must a business register?",
      respuesta: "Registration is compulsory once taxable supplies, made or expected in a period, reach SCR 2 million. A business can register voluntarily from SCR 100,000 of supplies.",
    },
  ],
  glosario: [
    { termino: "Standard rate", definicion: "The VAT rate charged on most goods and services." },
    { termino: "Zero rated", definicion: "A taxable supply charged at 0 %, so the seller can still recover input tax." },
    { termino: "Input tax", definicion: "The VAT a registered business pays on its purchases and can credit against the VAT it collects." },
  ],
});
