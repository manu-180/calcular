import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gb.minimum-wage",
  h1: "Minimum wage calculator: National Living Wage {{anio}}",
  title: "National Living Wage {{anio}}: {{gb.minimum-wage[21-and-over]}} an hour",
  description:
    "The National Living Wage is {{gb.minimum-wage[21-and-over]}} an hour from April {{anio}}. See the minimum for your age, and what it means per week, month and year.",
  intro: [
    "Since {{gb.minimum-wage#desde}} the National Living Wage for workers aged 21 and over is {{gb.minimum-wage[21-and-over]}} an hour. Workers aged 18 to 20 get at least {{gb.minimum-wage[18-to-20]}}, and under 18s and apprentices at least {{gb.minimum-wage[under-18]}}.",
    "Pick your age group and your weekly hours to see the minimum you should earn each week, month and year.",
  ],
  comoSeCalcula: [
    "The minimum is set per hour, depending on your age and whether you are an apprentice.",
    "We multiply the hourly rate by your weekly hours, and by 52 weeks for the year. The monthly figure is the yearly one divided by 12.",
    "The rates change on 1 April every year.",
  ],
  ejemplo: ["At {{gb.minimum-wage[21-and-over]}} an hour and 37.5 hours a week, you earn at least £476.63 a week, £2,065.38 a month and £24,784.50 a year."],
  faq: [
    {
      pregunta: "What is the difference between the National Minimum Wage and the National Living Wage?",
      respuesta: "The National Living Wage is the minimum for workers aged 21 and over. The National Minimum Wage is the name for the lower rates for younger workers and apprentices.",
    },
    {
      pregunta: "Who gets the apprentice rate?",
      respuesta: "Apprentices aged under 19, and apprentices aged 19 or over who are in the first year of their apprenticeship. After that they get the rate for their age.",
    },
    {
      pregunta: "What can I do if I am paid less than the minimum?",
      respuesta:
        "Talk to your employer first, as it may be a mistake. You can also get free, confidential advice from Acas or complain to HMRC, which enforces the minimum wage and can make the employer pay back what you are owed.",
    },
    {
      pregunta: "Does the minimum wage go up every year?",
      respuesta: "Yes, the rates are reviewed each year and change on 1 April.",
    },
  ],
  glosario: [
    { termino: "National Living Wage", definicion: "The legal minimum hourly pay for workers aged 21 and over." },
    { termino: "Acas", definicion: "The Advisory, Conciliation and Arbitration Service. It gives free advice on workplace rights." },
  ],
});
