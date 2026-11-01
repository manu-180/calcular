import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mu.overtime-calculator",
  h1: "Overtime calculator Mauritius",
  title: "Overtime calculator Mauritius: 1.5x and public holidays",
  description:
    "Work out overtime pay under the Workers' Rights Act: {{mu.overtime-weekday}} times the hourly rate on week days, {{mu.overtime-holiday-normal}} and {{mu.overtime-holiday-extra}} times on public holidays.",
  intro: [
    "Overtime is any work beyond your normal hours. The law sets the lowest rates your employer can pay for it.",
    "Enter your monthly basic wage and the hours you worked to see what you are owed.",
  ],
  comoSeCalcula: [
    "Your basic hourly rate is your monthly basic wage divided by {{mu.hours-per-month}} hours.",
    "Each extra hour on a week day is paid at least {{mu.overtime-weekday}} times that rate.",
    "On a public holiday, work in normal hours is paid at least {{mu.overtime-holiday-normal}} times the rate, and work after normal hours at least {{mu.overtime-holiday-extra}} times.",
  ],
  ejemplo: ["On Rs 25,000 a month the hourly rate is Rs 128.21, so 10 extra hours on week days pay Rs 1,923.08."],
  faq: [
    {
      pregunta: "What are normal working hours in Mauritius?",
      respuesta: "{{mu.normal-week-hours}} a week, not counting meal and tea breaks. That is 9 hours a day over 5 days, or 8 hours on 5 days and 5 hours on a sixth day.",
    },
    {
      pregunta: "Can I take time off instead of overtime pay?",
      respuesta: "Yes. You can choose paid time off in the pay period, worked out at the same rates as the pay.",
    },
    {
      pregunta: "How much notice must my employer give for overtime?",
      respuesta: "At least 24 hours where practicable. If you do not want to work extra hours on a given day, you tell your employer at least 24 hours before.",
    },
  ],
  glosario: [{ termino: "Basic hourly rate", definicion: "Your monthly basic wage divided by the hours the law counts in a month." }],
});
