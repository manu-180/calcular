import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gb.notice-period",
  h1: "Statutory notice period calculator",
  title: "Notice period calculator UK: statutory minimum notice",
  description:
    "Find the minimum notice your employer must give you, from one week up to {{gb.notice-max-weeks}} weeks, and what pay in lieu of notice is worth.",
  intro: [
    "When an employer ends your job, the law sets a minimum notice period based on how long you have worked there. Your contract can give you more, but not less.",
    "Enter your length of service to see your statutory notice, and your weekly pay if you want to know what pay in lieu of notice would be.",
  ],
  comoSeCalcula: [
    "Between one month and 2 years of work: at least one week's notice.",
    "Between 2 and 12 years: one week for each full year.",
    "12 years or more: {{gb.notice-max-weeks}} weeks, which is the maximum.",
    "If you resign, you must give at least one week's notice once you have worked there for more than a month, unless your contract says otherwise.",
  ],
  ejemplo: ["After 7 years you are owed at least 7 weeks' notice. On £550 a week, pay in lieu of that notice is £3,850."],
  faq: [
    {
      pregunta: "What is pay in lieu of notice?",
      respuesta:
        "Instead of asking you to work your notice, your employer can end your job straight away and pay you for the notice period. Your contract may allow this, and an employer can offer it even if the contract does not mention it.",
    },
    {
      pregunta: "Does my contract notice period replace the legal minimum?",
      respuesta: "Only if it is longer. If your contract says one month but the law gives you 6 weeks, you get 6 weeks.",
    },
    {
      pregunta: "Do I get notice if I am dismissed for gross misconduct?",
      respuesta: "No. Gross misconduct, such as theft or violence, can lead to dismissal without notice. Your employer still has to follow a fair process.",
    },
  ],
  glosario: [
    { termino: "Statutory notice", definicion: "The minimum notice set by law, based on your length of service." },
    { termino: "Garden leave", definicion: "Being told to stay away from work during your notice period while still being paid." },
  ],
});
