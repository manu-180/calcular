import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mt.overtime-calculator",
  h1: "Overtime calculator Malta",
  title: "Overtime pay Malta: time and a half calculator",
  description:
    "Work out your overtime pay in Malta at {{mt.overtime[multiplier]}} times the normal rate for hours above {{mt.overtime[weekly-hours]}} a week, from your weekly wage or hourly rate.",
  intro: [
    "In Malta, work above a {{mt.overtime[weekly-hours]}}-hour week is overtime. Where no Wage Regulation Order sets other rates, it is paid at {{mt.overtime[multiplier]}} times the normal rate.",
    "Enter your basic weekly wage or hourly rate and the overtime hours. You get the overtime rate and the pay for those hours.",
  ],
  comoSeCalcula: [
    "Your normal hourly rate is the basic weekly wage divided by {{mt.overtime[weekly-hours]}}.",
    "The overtime rate is {{mt.overtime[multiplier]}} times that rate, rounded to the cent.",
    "Overtime pay is the overtime rate times the overtime hours. Hours are averaged over four weeks, or over the shift cycle if your employer chooses.",
  ],
  ejemplo: ["On €500 a week your normal rate is €12.50 an hour and your overtime rate is €18.75, so 8 hours of overtime pay €150."],
  faq: [
    {
      pregunta: "Can my employer make me work overtime?",
      respuesta:
        "Only while your total hours stay within an average of 48 a week, unless you agreed in writing to work more. You can refuse to go over that average.",
    },
    {
      pregunta: "Is overtime taxed differently?",
      respuesta: "It can be. If your basic wage is low enough and you are not in a managerial post, part of your overtime pay is taxed at a flat rate. The overtime tax calculator works it out.",
    },
    {
      pregunta: "Can I be asked to work overtime while pregnant?",
      respuesta: "No. You cannot be obliged to work overtime during pregnancy or for twelve months after the birth or adoption of a child.",
    },
  ],
  glosario: [
    { termino: "Wage Regulation Order", definicion: "A legal notice that sets minimum pay, including overtime rates, for a sector." },
    { termino: "Overtime", definicion: "Hours worked above the normal working week, which in Malta is 40 hours." },
  ],
});
