import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us.sales-tax",
  h1: "Sales tax calculator",
  title: "Sales Tax Calculator: add or remove tax from a price",
  description: "Add sales tax to a price or take it out of a total with your combined state and local rate. Works for any state, county or city.",
  intro: [
    "There is no national sales tax in the United States. Each state sets its own rate, and counties, cities and special districts can add more on top.",
    "Enter the price and your combined rate to see the tax and the total, or work backward from a receipt.",
  ],
  comoSeCalcula: [
    "To add tax, multiply the price by the rate and add the result to the price.",
    "To remove tax from a total, divide the total by one plus the rate. The difference is the tax.",
    "The tax is rounded to the cent, the way most registers do it.",
  ],
  ejemplo: ["A $49.99 item with an 8.25% combined rate has $4.12 of sales tax, for a total of $54.11."],
  faq: [
    {
      pregunta: "Which states have no sales tax?",
      respuesta: "Alaska, Delaware, Montana, New Hampshire and Oregon have no statewide sales tax. Some local governments there, mostly in Alaska, still charge their own.",
    },
    {
      pregunta: "Where do I find my exact rate?",
      respuesta: "Your state's department of revenue publishes the state rate and usually a lookup by address for local rates. Your receipt also shows the rate charged.",
    },
    {
      pregunta: "Is sales tax charged on online purchases?",
      respuesta: "In most states, yes. Large online sellers collect sales tax based on the address where the order is delivered.",
    },
  ],
  glosario: [
    { termino: "Combined rate", definicion: "The state rate plus every local rate that applies where the sale happens." },
    { termino: "Use tax", definicion: "A tax you owe your state on purchases where no sales tax was collected." },
  ],
});
