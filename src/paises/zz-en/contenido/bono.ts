import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-en.bono",
  h1: "Zetaland half-year bonus calculator",
  title: "Half-year bonus in Zetaland: work out what you get",
  description: "Work out your half-year bonus with the current minimum wage for your zone and the {{zz.bonificacion}} extra payment. Official figures with date and source.",
  intro: [
    "The half-year bonus is an extra month of pay that is paid twice a year.",
    "If you worked the whole half year, you get a full month of pay plus an extra payment of {{zz.bonificacion}}.",
  ],
  comoSeCalcula: [
    "Start from your gross monthly pay. If it is below the minimum for your zone, the minimum is used.",
    "That pay is multiplied by the months worked and divided by 6.",
    "In a small company the bonus is half.",
    "The extra payment of {{zz.bonificacion}} is added on top of the bonus.",
  ],
  faq: [
    {
      pregunta: "What is the minimum wage in the north zone?",
      respuesta: "It is {{zz.minimo@norte}}, in force since {{zz.minimo@norte#desde}}.",
    },
    {
      pregunta: "What if I did not work the whole half year?",
      respuesta: "You get the part that matches the months you worked.",
    },
    {
      pregunta: "Is the extra payment always paid?",
      respuesta: "Yes. It is {{zz.bonificacion}} of the bonus and the company pays it with the bonus.",
    },
  ],
  glosario: [
    { termino: "Half-year bonus", definicion: "Extra pay the law requires in July and December." },
    { termino: "Minimum wage", definicion: "The lowest pay allowed for a full working day in each zone." },
  ],
});
