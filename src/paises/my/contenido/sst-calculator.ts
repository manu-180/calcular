import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "my.sst-calculator",
  h1: "SST calculator Malaysia",
  title: "SST calculator Malaysia: sales tax and service tax",
  description: "Add or remove SST from a price: service tax at {{my.service-tax-rates[standard]}} or {{my.service-tax-rates[reduced]}} and sales tax at {{my.sales-tax-rates[5]}} or {{my.sales-tax-rates[10]}}.",
  intro: [
    "Malaysia's SST has two parts: sales tax on taxable goods and service tax on taxable services. Pick the one on your invoice and the calculator adds it or takes it out.",
    "Rates are the ones published by the Royal Malaysian Customs Department on the MySST portal.",
  ],
  comoSeCalcula: [
    "Service tax is {{my.service-tax-rates[standard]}} on most taxable services.",
    "Food and beverage, telecommunications, parking, logistics, construction work, private healthcare and education services are at {{my.service-tax-rates[reduced]}}.",
    "Sales tax is {{my.sales-tax-rates[5]}} or {{my.sales-tax-rates[10]}} depending on the goods, under the Sales Tax (Rate of Tax) Order.",
    "To add SST, the amount is multiplied by the rate. To take it out, the price is divided by one plus the rate.",
  ],
  ejemplo: ["A RM250 restaurant bill with service tax at 6% comes to RM265, of which RM15 is SST."],
  faq: [
    {
      pregunta: "When did service tax go up to 8%?",
      respuesta: "From 1 March 2024, for all taxable services except food and beverage, telecommunications, parking and logistics, which stayed at 6%.",
    },
    {
      pregunta: "Is renting a home subject to service tax?",
      respuesta: "No. Residential rental is not subject to service tax. Rental and leasing of other property can be.",
    },
    {
      pregunta: "Are credit card services taxed by percentage?",
      respuesta: "No. Credit and charge card services pay a fixed RM25 per card, not a percentage.",
    },
  ],
  glosario: [
    { termino: "SST", definicion: "Sales and Service Tax, run by the Royal Malaysian Customs Department (RMCD)." },
    { termino: "Taxable service", definicion: "A service listed as taxable under the service tax rules. Other services carry no SST." },
  ],
});
