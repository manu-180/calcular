import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ag.overtime-calculator",
  h1: "Overtime calculator Antigua and Barbuda {{anio}}",
  title: "Overtime pay calculator {{anio}}: time and a half",
  description: "Work out overtime under the Labour Code: premium pay of {{ag.overtime-factor}} times your hourly wage after {{ag.normal-day-hours}} hours a day or {{ag.normal-week-hours}} a week.",
  intro: [
    "Enter your basic hourly wage and the hours you worked in a day or a week. The calculator shows how many hours earn premium pay and what they pay.",
    "The Antigua and Barbuda Labour Code sets the standard work day at {{ag.normal-day-hours}} hours and the standard work week at {{ag.normal-week-hours}} hours.",
  ],
  comoSeCalcula: [
    "Section C27 requires premium pay for any hour above {{ag.normal-day-hours}} in a 24-hour period or above {{ag.normal-week-hours}} in a week.",
    "Section C26 says premium pay is at least {{ag.overtime-factor}} times the employee's basic wage per hour. Multiply each overtime hour by your hourly wage and by that factor.",
    "The Minister can change these standards for an industry by Order, and a collective agreement can be better than the Code, so check your contract.",
  ],
  ejemplo: [
    "A worker on EC$20 an hour works 10 hours in one day. Two hours are above 8, and each pays EC$30, so the overtime pay is EC$60. The first 8 hours pay EC$160, so the day pays EC$220.",
  ],
  faq: [
    {
      pregunta: "How much is overtime pay in Antigua and Barbuda?",
      respuesta: "At least one and a half times the basic hourly wage, under section C26 of the Labour Code.",
    },
    {
      pregunta: "When does overtime start?",
      respuesta: "After {{ag.normal-day-hours}} hours in a 24-hour period or {{ag.normal-week-hours}} hours in a week, under section C27. Section C24(1) also requires one rest period of at least 24 hours in every seven days.",
    },
    {
      pregunta: "Is there a limit on hours?",
      respuesta: "Section C24(3) bars employers from using anyone for more than 12 hours in 24 or 72 hours in a 168-hour period, except where the Minister allows more.",
    },
  ],
  glosario: [
    { termino: "Premium pay", definicion: "The higher rate paid for overtime hours, at least one and a half times the basic wage." },
    { termino: "Basic wage", definicion: "Your wage for normal hours, without premiums or allowances." },
    { termino: "Standard work week", definicion: "Up to 48 hours before premium pay starts." },
  ],
});
