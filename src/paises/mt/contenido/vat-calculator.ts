import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mt.vat-calculator",
  h1: "VAT calculator Malta",
  title: "VAT calculator Malta: add or remove {{mt.vat-rates[standard]}} VAT",
  description:
    "Add VAT to a price or take it out at the Maltese rates of {{mt.vat-rates[standard]}}, {{mt.vat-rates[intermediate]}}, {{mt.vat-rates[accommodation]}} or {{mt.vat-rates[reduced]}}.",
  intro: [
    "Enter a price, say whether it already includes VAT and pick the rate. You get the price with and without VAT and the VAT itself.",
    "Malta has a standard rate of {{mt.vat-rates[standard]}}. The Eighth Schedule to the VAT Act lists the supplies taxed at {{mt.vat-rates[intermediate]}}, {{mt.vat-rates[accommodation]}} and {{mt.vat-rates[reduced]}}.",
  ],
  comoSeCalcula: [
    "To add VAT, multiply the price without VAT by the rate. At {{mt.vat-rates[standard]}}, €100 becomes €118.",
    "To take VAT out, divide the price including VAT by 1 plus the rate. At {{mt.vat-rates[standard]}}, divide by 1.18.",
    "The VAT is the difference between the two prices.",
  ],
  ejemplo: ["A hotel bill of €214 at the {{mt.vat-rates[accommodation]}} rate is €200 before VAT plus €14 VAT."],
  faq: [
    {
      pregunta: "What pays the {{mt.vat-rates[accommodation]}} rate?",
      respuesta: "Accommodation in licensed premises, such as hotels and guesthouses, and the use of sporting facilities.",
    },
    {
      pregunta: "What pays the {{mt.vat-rates[reduced]}} rate?",
      respuesta:
        "Among others: minor repairs of bicycles, shoes, leather goods and clothing, domestic care such as home help and care of children, the elderly or the sick, admission to museums, concerts and theatres, and imported works of art and antiques.",
    },
    {
      pregunta: "What pays the {{mt.vat-rates[intermediate]}} rate?",
      respuesta:
        "Custody and management of securities, management of credit by someone other than the lender, short pleasure boat hire, and body care services given by regulated health care professionals.",
    },
    {
      pregunta: "Why can the VAT differ by a cent when I remove it?",
      respuesta: "Prices are rounded to the cent, so working back from a gross price can differ by a cent from the original net price.",
    },
  ],
  glosario: [
    { termino: "VAT", definicion: "Value Added Tax, the tax on the sale of goods and services that registered businesses collect and pay over." },
    { termino: "Eighth Schedule", definicion: "The part of the VAT Act that lists the supplies taxed at reduced rates." },
  ],
});
