import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "et.overtime-calculator",
  h1: "Overtime calculator Ethiopia",
  title: "Overtime pay calculator Ethiopia: 1.5x to 2.5x",
  description:
    "Work out overtime pay under the Labour Proclamation: {{et.overtime-rates[day]}} for daytime, {{et.overtime-rates[night]}} at night and up to {{et.overtime-rates[holiday]}} on a public holiday.",
  intro: [
    "Overtime is any work beyond your normal daily hours. Enter your monthly salary and the overtime you worked to see what your employer owes on top of your salary.",
    "The multipliers come from Article 68 of the Labour Proclamation No. 1156/2019.",
  ],
  comoSeCalcula: [
    "Your ordinary hourly rate is your monthly salary divided by the normal hours you work in a month.",
    "Overtime between 6 a.m. and 10 p.m. pays {{et.overtime-rates[day]}} times that rate. Between 10 p.m. and 6 a.m. it pays {{et.overtime-rates[night]}} times.",
    "Work on your weekly rest day pays {{et.overtime-rates[rest-day]}} times and overtime on a public holiday {{et.overtime-rates[holiday]}} times the hourly rate.",
  ],
  ejemplo: [
    "With a salary of ETB 10,400 and 208 hours a month the hourly rate is ETB 50. Four hours of daytime overtime pay ETB 300.",
  ],
  faq: [
    {
      pregunta: "How many hours count as normal?",
      respuesta: "Normal hours may not exceed {{et.daily-hours}} a day or {{et.weekly-hours}} a week. Work beyond your normal daily hours is overtime.",
    },
    {
      pregunta: "Is there a limit on overtime?",
      respuesta: "Yes. Overtime may not exceed {{et.overtime-daily-cap}} a day or {{et.overtime-weekly-cap}} a week, and it can only be worked in the cases the Proclamation lists, such as accidents or urgent work.",
    },
    {
      pregunta: "Can my employer force me to work overtime?",
      respuesta: "No. The Proclamation says a worker may not be compelled to work overtime, and the employer has to record the instruction and the hours worked.",
    },
    {
      pregunta: "When is overtime paid?",
      respuesta: "On the day your wage is paid, together with the wage.",
    },
  ],
  glosario: [
    { termino: "Overtime", definicion: "Work done beyond the normal daily hours of work." },
    { termino: "Ordinary hourly rate", definicion: "Your wage for one normal hour of work." },
  ],
});
