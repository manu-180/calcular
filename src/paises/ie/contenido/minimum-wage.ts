import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ie.minimum-wage",
  h1: "Minimum wage calculator Ireland 2026",
  title: "Minimum wage Ireland 2026: {{ie.minimum-wage}} an hour",
  description:
    "The National Minimum Wage is {{ie.minimum-wage}} an hour from {{ie.minimum-wage#desde}}. See the rate for your age and what it means per week, month and year.",
  intro: [
    "Since {{ie.minimum-wage#desde}} the National Minimum Wage is {{ie.minimum-wage}} an hour for workers aged 20 and over.",
    "Workers under 20 get a set share of it: {{ie.minimum-wage-age-percent[under-18]}} under 18, {{ie.minimum-wage-age-percent[age-18]}} at 18 and {{ie.minimum-wage-age-percent[age-19]}} at 19. Pick your age and hours to see your minimum pay.",
  ],
  comoSeCalcula: [
    "The hourly minimum for your age is {{ie.minimum-wage}} times your share, rounded to the cent.",
    "That rate times your weekly hours gives the weekly minimum, and times 52 the yearly one. The monthly figure is the yearly one divided by 12.",
  ],
  ejemplo: ["At {{ie.minimum-wage}} an hour and 39 hours a week, you earn at least €551.85 a week, €2,391.35 a month and €28,696.20 a year."],
  faq: [
    {
      pregunta: "Who does the National Minimum Wage not cover?",
      respuesta:
        "Close relatives of an employer who is a sole trader, such as a spouse, parent, child or sibling, and craft apprentices under the Industrial Training Act 1967 or the Labour Services Act 1987.",
    },
    {
      pregunta: "Can my employer count meals or accommodation as pay?",
      respuesta: "Yes, up to set limits: €1.27 an hour worked for board, and €33.42 a week or €4.77 a day for lodgings.",
    },
    {
      pregunta: "Where can I complain if I am paid less?",
      respuesta: "Talk to your employer first, as it may be a mistake. If that does not fix it, you can make a complaint to the Workplace Relations Commission with its online complaint form.",
    },
    {
      pregunta: "Will the minimum wage go up in 2027?",
      respuesta: "The Low Pay Commission has recommended a new rate for 1 January 2027. It only becomes law once the government makes a new National Minimum Wage Order.",
    },
  ],
  glosario: [
    { termino: "National Minimum Wage", definicion: "The lowest hourly pay an employer can legally pay most employees." },
    { termino: "Low Pay Commission", definicion: "The body that recommends the minimum wage to the government each year." },
  ],
});
