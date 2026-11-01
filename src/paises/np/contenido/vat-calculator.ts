import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "np.vat-calculator",
  h1: "VAT calculator Nepal {{anio}}",
  title: "VAT calculator Nepal {{anio}}: add or remove {{np.vat}} VAT",
  description: "Add the Nepali VAT of {{np.vat}} to a price, or take it out of a VAT-inclusive total. Shows the price before VAT, the tax and the final price.",
  intro: [
    "Enter an amount in rupees and choose whether it already includes value added tax. The calculator gives the price before VAT, the tax and the total.",
    "Nepal charges a single VAT rate of {{np.vat}}, as the Inland Revenue Department states in its guide to the Economic Act, 2083. The rate in force since {{np.vat#desde}} is applied here.",
  ],
  comoSeCalcula: [
    "To add VAT, multiply the price by {{np.vat}} and add the result to the price.",
    "To remove VAT from a total that includes it, divide the total by one plus the rate, which for Nepal means dividing by 1.13. The difference is the VAT.",
    "The result is rounded to the paisa. Use the calculator only for sales that are taxable.",
  ],
  ejemplo: ["A price of NPR 10,000 plus 13% VAT is NPR 11,300. Taking VAT out of NPR 11,300 gives back NPR 10,000 and NPR 1,300 of tax."],
  faq: [
    {
      pregunta: "What is the VAT rate in Nepal?",
      respuesta: "The rate is 13%. The Inland Revenue Department applies it, for example, to commissions and to services of a craftsman above the VAT threshold in its Economic Act, 2083 handbook.",
    },
    {
      pregunta: "Who has to charge VAT?",
      respuesta: "A business that is registered for VAT, or that passes the turnover threshold, must charge it and show it on the invoice. The handbook notes that crossing the threshold makes a service liable at 13%.",
    },
    {
      pregunta: "Does this calculator cover every sale?",
      respuesta: "It applies the 13% rate to the amount you enter. It does not check whether a particular good or service is taxable, so confirm that with the Inland Revenue Department.",
    },
  ],
  glosario: [
    { termino: "VAT", definicion: "Value added tax: a tax on sales that a registered business collects and passes to the Inland Revenue Department." },
    { termino: "Taxable value", definicion: "The price before VAT, on which the tax is calculated." },
  ],
});
