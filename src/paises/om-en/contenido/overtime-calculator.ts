import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "om-en.overtime-calculator",
  h1: "Oman overtime pay calculator",
  title: "Overtime pay under Oman Labour Law",
  description:
    "Work out overtime pay in Oman: the basic hourly wage plus {{om.overtime[day]}} by day and {{om.overtime[night]}} at night, and pay for working a rest day or public holiday.",
  intro: [
    "Overtime is work done outside the set working hours, which are {{om.working-hours[daily]}} a day and {{om.working-hours[weekly]}} a week.",
    "Enter your basic wage, the type of overtime and the hours or days worked to see what it is worth.",
  ],
  comoSeCalcula: [
    "Basic hourly wage = monthly basic wage ÷ days per month ÷ normal hours per day.",
    "A daytime overtime hour = hourly wage + {{om.overtime[day]}}, and a night hour = hourly wage + {{om.overtime[night]}}.",
    "Work on a rest day or public holiday: an amount equal to {{om.overtime[rest]}} of the basic daily wage, on top of that day's pay.",
    "Where the law allows overtime without the worker's consent, the premium rises to {{om.overtime-urgent[day]}} by day, {{om.overtime-urgent[night]}} at night and {{om.overtime-urgent[rest]}} on rest days and holidays.",
  ],
  ejemplo: [
    "A worker on a basic wage of OMR 480 working 8 hours a day earns OMR 2 an hour, so ten daytime overtime hours are worth OMR 25 and ten night hours OMR 30.",
  ],
  faq: [
    {
      pregunta: "What is the most I can work in a day with overtime?",
      respuesta: "Normal and overtime hours together cannot go above {{om.working-hours[max-daily]}} a day.",
    },
    {
      pregunta: "What counts as night hours?",
      respuesta: "The period between 9 pm and 5 am during which the worker is under the employer's direction and supervision.",
    },
    {
      pregunta: "Can I take time off instead of overtime pay?",
      respuesta: "Yes. The employer can give time off instead of the overtime hours, or a day off for each day worked on a weekly rest day or public holiday.",
    },
  ],
  glosario: [
    { termino: "Overtime", definicion: "Work done outside the working hours set in the law." },
    { termino: "Basic wage", definicion: "The cash pay agreed in the contract plus the periodic increment." },
  ],
});
