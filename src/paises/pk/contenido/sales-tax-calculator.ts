import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pk.sales-tax-calculator",
  h1: "Sales tax calculator Pakistan (GST)",
  title: "GST calculator Pakistan: add or remove 18% sales tax",
  description: "Add the {{pk.sales-tax}} sales tax to a price or take it out of a price that includes it, at the standard rate of the Sales Tax Act, 1990.",
  intro: ["Sales tax on goods in Pakistan is charged at {{pk.sales-tax}} of the value of the supply. Enter an amount to add or remove it."],
  comoSeCalcula: [
    "To add sales tax, multiply the price by {{pk.sales-tax}} and add the result.",
    "To remove it from a price that includes it, divide by 1 plus the rate (1.18 at 18%).",
  ],
  ejemplo: ["A bill of Rs. 10,000 carries Rs. 1,800 of sales tax: Rs. 11,800 in total."],
  faq: [
    {
      pregunta: "Do all goods pay 18%?",
      respuesta: "No. The Sales Tax Act has schedules with exempt goods, zero-rated goods and goods at other rates. Check the schedule for your product.",
    },
    {
      pregunta: "What about services?",
      respuesta: "Sales tax on most services is collected by the provinces under their own laws and rates.",
    },
    {
      pregunta: "Is GST the same as sales tax?",
      respuesta: "People often call it GST. In law it is the sales tax under the Sales Tax Act, 1990.",
    },
  ],
  glosario: [{ termino: "Standard rate", definicion: "The general sales tax rate that applies unless a schedule sets another." }],
});
