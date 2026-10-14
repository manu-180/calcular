import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ie.redundancy-pay",
  h1: "Statutory redundancy calculator Ireland",
  title: "Statutory redundancy calculator Ireland 2026",
  description:
    "Work out your statutory redundancy: 2 weeks' pay for every year of service plus a bonus week, with weekly pay capped at {{ie.redundancy-weekly-ceiling}}.",
  intro: [
    "If your job no longer exists and you have at least 2 years of continuous service, your employer has to pay you a statutory redundancy lump sum.",
    "Enter your start date, your redundancy date and your gross weekly pay. The calculator follows the method in the Department of Social Protection's own examples.",
  ],
  comoSeCalcula: [
    "Count your days of service from your start date (or your 16th birthday, if later) to your redundancy date, and take out any absence that does not count, such as lay-off.",
    "Divide the days by 365 to get your years of service, to two decimals.",
    "Multiply the years by 2 and add 1 bonus week.",
    "Multiply those weeks by your gross weekly pay, up to a maximum of {{ie.redundancy-weekly-ceiling}} a week.",
  ],
  ejemplo: ["Joe worked from 27 January 1998 to 1 March 2021 on €600 a week. That is 23.11 years, or 47.22 weeks, so he gets 47.22 × €600 = €28,332."],
  faq: [
    {
      pregunta: "Who qualifies for statutory redundancy?",
      respuesta:
        "You need two years of continuous employment with the same employer, employment that is fully insurable under the Social Welfare Acts, to be over 16, and the job must no longer exist.",
    },
    {
      pregunta: "Who pays it?",
      respuesta: "Your employer. If the employer cannot pay, the Department of Social Protection can pay you from the Redundancy Payment Scheme and recover the money from the employer.",
    },
    {
      pregunta: "Is maternity leave counted as service?",
      respuesta: "Yes. In the Department's examples maternity leave counts in full, while time on lay-off is left out.",
    },
    {
      pregunta: "Do I pay tax on it?",
      respuesta: "Statutory redundancy paid under the Redundancy Payments Act 1967 is exempt from USC. Extra payments above the statutory amount follow other rules.",
    },
  ],
  glosario: [
    { termino: "Reckonable service", definicion: "The time that counts towards your redundancy payment." },
    { termino: "Bonus week", definicion: "The extra week of pay added to the 2 weeks per year of service." },
  ],
});
