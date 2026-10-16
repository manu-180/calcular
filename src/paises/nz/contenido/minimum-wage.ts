import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nz.minimum-wage",
  h1: "Minimum wage NZ calculator",
  title: "NZ minimum wage: {{nz.minimum-wage[adult]}} an hour",
  description:
    "The New Zealand adult minimum wage is {{nz.minimum-wage[adult]}} an hour from {{nz.minimum-wage#desde}}. See your weekly, fortnightly and yearly minimum for your hours.",
  intro: [
    "From {{nz.minimum-wage#desde}} the adult minimum wage is {{nz.minimum-wage[adult]}} an hour before tax. The starting-out and training minimum wage is {{nz.minimum-wage[starting-out]}}.",
    "Pick the rate that applies to you and the hours you work to see the least you should be paid each week, fortnight and year.",
  ],
  comoSeCalcula: [
    "Your hourly minimum is multiplied by the hours you work in a week.",
    "A fortnight is two weeks, and a year is 52 weeks. All amounts are before tax and other deductions.",
  ],
  ejemplo: ["At the adult minimum wage, a 40-hour week pays at least $958 before tax, or $1,916 a fortnight."],
  faq: [
    {
      pregunta: "Who can be paid the starting-out wage?",
      respuesta:
        "Workers aged 16 or 17 in their first 6 months with their employer, 16 to 19 year olds whose agreement requires at least 40 industry training credits a year, and some 18 and 19 year olds coming off a benefit.",
    },
    {
      pregunta: "Who can be paid the training wage?",
      respuesta: "Employees aged 20 or over whose employment agreement requires at least 60 credits a year of an industry training programme. It usually applies to apprentices.",
    },
    {
      pregunta: "Is there a minimum wage for under 16s?",
      respuesta: "No. There's no minimum wage for employees under 16. Everyone 16 or over who isn't a starting-out worker or trainee gets at least the adult rate.",
    },
    {
      pregunta: "Can a supervisor be paid the starting-out rate?",
      respuesta: "No. If your role includes supervising or training other workers, you must get at least the adult minimum wage.",
    },
  ],
  glosario: [
    { termino: "Adult minimum wage", definicion: "The lowest hourly rate for employees aged 16 or over who aren't starting-out workers or trainees." },
    { termino: "Starting-out wage", definicion: "A lower minimum for some young workers, set at 80% of the adult rate." },
  ],
});
