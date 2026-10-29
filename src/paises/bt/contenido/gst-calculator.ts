import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.gst-calculator",
  h1: "GST calculator Bhutan",
  title: "GST calculator Bhutan: add or remove the tax",
  description: "Add or remove Goods and Services Tax on a price in Bhutan at the standard rate of {{bt.gst-rate}}.",
  intro: ["Enter a price to add Goods and Services Tax at {{bt.gst-rate}}, or to take it out of a price that already includes it."],
  comoSeCalcula: ["Adding: multiply the price by the rate and add the result.", "Removing: divide the price by one plus the rate."],
  ejemplo: ["A price of Nu. 1,000 before tax carries Nu. 50 of GST at 5 %, so the total is Nu. 1,050."],
  faq: [],
  glosario: [],
});
