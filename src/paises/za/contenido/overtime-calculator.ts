import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "za.overtime-calculator",
  h1: "Overtime calculator",
  title: "Overtime calculator: BCEA overtime, Sunday and holiday pay",
  description: "Work out overtime at {{za.bcea-pay-multipliers[overtime]}} times your wage, Sunday pay and public holiday pay under the Basic Conditions of Employment Act.",
  intro: [
    "Enter your monthly salary, your ordinary hours and the extra hours you worked. You get your hourly rate and the minimum you must be paid for overtime, Sundays and public holidays.",
    "These rules cover employees who earn up to {{za.bcea-earnings-threshold}} a year. Above that, your contract sets what you get.",
  ],
  comoSeCalcula: [
    "Your hourly rate is your monthly salary divided by your ordinary hours a week times {{za.weeks-per-month}} weeks.",
    "Overtime is paid at least {{za.bcea-pay-multipliers[overtime]}} times your hourly rate.",
    "Sunday work is paid at double your rate, or {{za.bcea-pay-multipliers[sunday-usual]}} times if you normally work on Sundays.",
    "Work on a public holiday that is a normal working day for you is paid at least double.",
  ],
  ejemplo: ["On R12 000 a month and 45 hours a week, your hourly rate is R61,54. Ten hours of overtime pay at least R923,10."],
  faq: [
    {
      pregunta: "How much overtime can I be asked to work?",
      respuesta: "Only by agreement, and no more than three hours a day or ten hours a week.",
    },
    {
      pregunta: "Can I get time off instead of overtime pay?",
      respuesta:
        "Yes, if you agree. Your employer can give you at least 90 minutes of paid time off for each hour of overtime, or pay your normal rate plus at least 30 minutes of paid time off per hour.",
    },
    {
      pregunta: "Who is not covered by these overtime rules?",
      respuesta: "Employees who earn more than {{za.bcea-earnings-threshold}} a year are outside the BCEA rules on hours, overtime, Sunday work and night work.",
    },
  ],
  glosario: [
    { termino: "BCEA", definicion: "Basic Conditions of Employment Act, 1997. It sets the minimum rules on hours, overtime, leave and notice." },
    { termino: "Ordinary hours", definicion: "Your normal working hours, up to 45 a week. Time beyond them is overtime." },
  ],
});
