import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ae.overtime-calculator",
  h1: "UAE overtime calculator",
  title: "Overtime calculator UAE: 25% and 50% rates",
  description:
    "Work out overtime pay under the UAE Labour Law: basic hourly wage plus {{ae.overtime[normal]}}, or plus {{ae.overtime[night]}} between 10 pm and 4 am and on rest days.",
  intro: [
    "In the UAE private sector, work beyond the normal hours is overtime and is paid with a premium on your basic wage.",
    "Enter your basic wage and the extra hours or rest days you worked to see the minimum you should be paid.",
  ],
  comoSeCalcula: [
    "Each overtime hour pays your basic hourly wage plus at least {{ae.overtime[normal]}}.",
    "Overtime between 10 pm and 4 am pays the basic hourly wage plus at least {{ae.overtime[night]}}. This doesn't apply to shift workers.",
    "A rest day worked is compensated with another rest day, or paid as a normal day plus at least {{ae.overtime[rest-day]}} of the basic day wage.",
  ],
  ejemplo: ["On a basic wage of AED 6,000 and 8-hour days, the basic hourly wage is AED 25. Ten overtime hours pay at least AED 312.50."],
  faq: [
    {
      pregunta: "How many overtime hours can I work in the UAE?",
      respuesta: "Up to two extra hours a day, and no more than 144 hours in total every three weeks, unless the Executive Regulation allows more.",
    },
    {
      pregunta: "Is overtime paid on basic or total salary?",
      respuesta: "The law calculates it on the basic wage. Your contract may pay on a higher base.",
    },
    {
      pregunta: "What are the normal working hours?",
      respuesta: "8 hours a day or 48 hours a week for the private sector.",
    },
  ],
  glosario: [
    { termino: "Overtime", definicion: "Work beyond the normal working hours." },
    { termino: "Rest day", definicion: "The paid weekly day off in your contract or work rules." },
  ],
});
