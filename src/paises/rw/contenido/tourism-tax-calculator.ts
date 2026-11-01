import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.tourism-tax-calculator",
  h1: "Tourism tax calculator Rwanda",
  title: "Tourism tax on accommodation in Rwanda: 3% calculator",
  description: "Work out the tourism tax of {{rw.tourism-tax}} that hotels and other accommodation charge on the room price without VAT.",
  intro: [
    "Hotels, lodges and other places to stay in Rwanda charge a tourism tax on accommodation. Enter the nightly rate and the nights to see it.",
  ],
  comoSeCalcula: [
    "The tax is {{rw.tourism-tax}} of the amount paid or payable for accommodation, without value added tax.",
    "The accommodation provider charges it to the guest and pays it to the RRA.",
  ],
  ejemplo: ["Three nights at RWF 80,000 cost RWF 240,000 before VAT, so the tourism tax is RWF 7,200."],
  faq: [
    {
      pregunta: "Who pays the tourism tax?",
      respuesta: "The guest pays it in the bill. The accommodation facility registers for the tax, charges it and remits it to the RRA.",
    },
    {
      pregunta: "Is it worked out on the price with VAT?",
      respuesta: "No. The base is the accommodation price without value added tax.",
    },
    {
      pregunta: "Which law created it?",
      respuesta: "Law 015/2025 of 27 May 2025 establishing a tourism tax on accommodation.",
    },
  ],
  glosario: [
    { termino: "Accommodation facility", definicion: "A hotel, lodge, guest house or other place that rents rooms to guests." },
    { termino: "VAT", definicion: "Value added tax, charged separately on the bill." },
  ],
});
