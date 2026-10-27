import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "na.overtime-calculator",
  h1: "Overtime calculator Namibia",
  title: "Overtime calculator Namibia: Labour Act overtime pay",
  description:
    "Work out overtime at {{na.overtime-factor}} times your hourly wage, {{na.overtime-sunday-holiday-factor}} times on Sundays and public holidays, plus the {{na.night-work-rate}} night work allowance.",
  intro: [
    "Enter your monthly basic wage and the extra hours you worked to see what the Labour Act says your employer owes you.",
    "The calculator turns your monthly wage into an hourly rate the way the Act does and adds overtime and night work pay.",
  ],
  comoSeCalcula: [
    "Hourly basic wage: monthly wage divided by {{na.weeks-per-month}} times your ordinary hours a week, counting at most {{na.max-weekly-hours}} hours.",
    "Overtime on normal days: {{na.overtime-factor}} times the hourly wage for each hour.",
    "Overtime on a Sunday or public holiday that you normally work: {{na.overtime-sunday-holiday-factor}} times the hourly wage.",
    "Night work between 20h00 and 07h00: an extra {{na.night-work-rate}} of the hourly wage for each hour, not counting overtime hours.",
  ],
  ejemplo: [
    "On N$12,000 a month and 45 hours a week, the hourly wage is N$61.54. Ten hours of overtime pay N$923.10.",
  ],
  faq: [
    {
      pregunta: "How much overtime can I be asked to work?",
      respuesta: "Only what you agree to, and no more than 10 hours a week and 3 hours a day. Your employer can ask the Permanent Secretary to raise the limit if the employees agree.",
    },
    {
      pregunta: "What are the maximum ordinary hours?",
      respuesta: "{{na.max-weekly-hours}} hours a week for most employees, and no more than 9 hours a day on a five-day week or 8 hours a day on a longer week. Security officers and emergency health workers can work up to 60 hours.",
    },
    {
      pregunta: "Can a pregnant employee be asked to work at night?",
      respuesta: "No, not in the eight weeks before the expected birth and the eight weeks after it, and longer if a doctor says it is needed.",
    },
  ],
  glosario: [
    { termino: "Hourly basic wage", definicion: "Your pay for one ordinary hour, without allowances or overtime." },
    { termino: "Night work", definicion: "Work between 20h00 and 07h00, which earns an extra allowance." },
  ],
});
