import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gb.vat-calculator",
  h1: "VAT calculator: add or remove UK VAT",
  title: "VAT calculator UK: add or remove {{gb.vat-rates[standard]}} VAT",
  description:
    "Add VAT to a net price or take it off a gross price at the UK standard rate of {{gb.vat-rates[standard]}}, the reduced rate of {{gb.vat-rates[reduced]}} or the zero rate.",
  intro: [
    "Most goods and services in the UK carry VAT at the standard rate of {{gb.vat-rates[standard]}}. Some, such as home energy and children's car seats, use the reduced rate of {{gb.vat-rates[reduced]}}, and others, such as most food and children's clothes, are zero rated.",
    "Enter a price and choose whether you want to add VAT or find the VAT inside a price that already includes it.",
  ],
  comoSeCalcula: [
    "To add VAT, multiply the net price by the rate. At {{gb.vat-rates[standard]}}, £100 becomes £120.",
    "To remove VAT, divide the gross price by 1 plus the rate. At {{gb.vat-rates[standard]}} you divide by 1.2, so £120 becomes £100.",
    "Taking {{gb.vat-rates[standard]}} off a gross price does not work: from £120 it gives £96 instead of £100.",
  ],
  ejemplo: ["A £99.99 price including VAT at the standard rate is £83.33 before VAT, with £16.66 of VAT inside."],
  faq: [
    {
      pregunta: "What is the VAT fraction?",
      respuesta: "At the standard rate it is 1/6. Multiply a VAT-inclusive price by 1/6 to find the VAT in it. At the reduced rate the fraction is 1/21.",
    },
    {
      pregunta: "What is the difference between zero rated and exempt?",
      respuesta:
        "Zero rated items are taxable at 0%, so a business selling them can still reclaim VAT on its costs. Exempt items are outside VAT altogether, and VAT on the costs of making them usually cannot be reclaimed.",
    },
    {
      pregunta: "When does a business have to register for VAT?",
      respuesta: "When its VAT taxable turnover goes over the registration threshold in any rolling 12 months. Businesses below it can still register voluntarily.",
    },
  ],
  glosario: [
    { termino: "Net price", definicion: "The price before VAT." },
    { termino: "Gross price", definicion: "The price with VAT included. Shop prices for consumers are always gross." },
  ],
});
