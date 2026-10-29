import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lr.overtime-pay",
  h1: "Overtime pay calculator Liberia",
  title: "Liberia overtime pay calculator",
  description: "Work out overtime pay in Liberia under the Decent Work Act: at least {{lr.overtime-premium}} above your normal hourly rate for every hour beyond ordinary hours.",
  intro: [
    "Enter your normal hourly pay and the overtime hours you worked to see what you should be paid.",
    "Ordinary hours are 8 a day or {{lr.ordinary-hours}} a week. Work beyond them is paid at least {{lr.overtime-premium}} above the normal rate.",
  ],
  comoSeCalcula: [
    "Overtime rate: normal hourly pay plus {{lr.overtime-premium}}.",
    "Overtime pay: overtime rate × overtime hours.",
  ],
  ejemplo: ["At L$300 an hour, the overtime rate is L$450, so 5 hours of overtime pay L$2,250."],
  faq: [
    {
      pregunta: "How much overtime can my employer ask for?",
      respuesta: "Up to five hours beyond ordinary hours in a week, except in emergencies.",
    },
    {
      pregunta: "Can I take time off instead of overtime pay?",
      respuesta: "Yes, if you and your employer agree in writing. The time off must be paid at least at your ordinary rate.",
    },
    {
      pregunta: "What are ordinary hours?",
      respuesta: "Eight hours in a day or {{lr.ordinary-hours}} in a week.",
    },
  ],
  glosario: [{ termino: "Ordinary hours", definicion: "The normal working time before overtime starts." }],
});
