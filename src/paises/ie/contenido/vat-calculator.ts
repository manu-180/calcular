import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ie.vat-calculator",
  h1: "VAT calculator Ireland",
  title: "VAT calculator Ireland: add or remove {{ie.vat-rates[standard]}} VAT",
  description:
    "Add VAT to a price or take it out, at the Irish rates of {{ie.vat-rates[standard]}}, {{ie.vat-rates[reduced]}}, {{ie.vat-rates[second-reduced]}}, {{ie.vat-rates[livestock]}} or zero.",
  intro: [
    "Enter a price, choose whether VAT is already included, and pick the rate. You get the price with and without VAT and the VAT itself.",
    "Ireland has a standard rate of {{ie.vat-rates[standard]}}, a reduced rate of {{ie.vat-rates[reduced]}}, a second reduced rate of {{ie.vat-rates[second-reduced]}}, a livestock rate of {{ie.vat-rates[livestock]}} and a zero rate.",
  ],
  comoSeCalcula: [
    "To add VAT, multiply the price without VAT by the rate. At {{ie.vat-rates[standard]}}, €100 becomes €123.",
    "To take VAT out, divide the price including VAT by 1 plus the rate. At {{ie.vat-rates[standard]}}, divide by 1.23.",
    "The VAT is the difference between the two prices.",
  ],
  ejemplo: ["A bill of €113.50 at the {{ie.vat-rates[reduced]}} rate is €100 before VAT plus €13.50 VAT."],
  faq: [
    {
      pregunta: "Which goods and services pay each rate?",
      respuesta:
        "Most goods and services pay the standard rate. Revenue keeps a VAT rates database where you can search for a specific item. Most food sold in shops is zero rated, with many exceptions.",
    },
    {
      pregunta: "What rate applies to restaurants?",
      respuesta:
        "From 1 July 2026 food and drink supplied in a restaurant, by a caterer or as a hot takeaway pay the second reduced rate of {{ie.vat-rates[second-reduced]}}, and so do hairdressing services. Alcohol, bottled water, soft drinks, sports drinks and vegetable juices are left out of that change.",
    },
    {
      pregunta: "Why do I get a slightly different figure when I remove VAT?",
      respuesta: "Prices are rounded to the cent, so working back from a gross price can differ by a cent from the original net price.",
    },
  ],
  glosario: [
    { termino: "VAT", definicion: "Value-Added Tax, a tax on the sale of goods and services collected by registered businesses for Revenue." },
    { termino: "Zero rate", definicion: "VAT at 0%. The sale is taxable, but no VAT is added to the price." },
  ],
});
