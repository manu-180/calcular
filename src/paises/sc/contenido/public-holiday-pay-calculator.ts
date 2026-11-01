import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sc.public-holiday-pay-calculator",
  h1: "Seychelles public holiday pay calculator {{anio}}",
  title: "Seychelles public holiday pay {{anio}}: double pay rule",
  description: "Working on a holiday in Seychelles earns {{sc.holiday-pay-factor}} times the day's pay or an alternative day off. Check what you are owed.",
  intro: [
    "Most workers in Seychelles should not be asked to work on a holiday. If you do, the Conditions of Employment Regulations give you {{sc.holiday-pay-factor}} times the day's pay, or an alternative holiday.",
    "Enter your pay for a normal working day and the number of holidays you worked.",
  ],
  comoSeCalcula: [
    "The regulations multiply the day's pay by {{sc.holiday-pay-factor}} for a day worked on a holiday.",
    "The extra above a normal day is the total less one day's pay for each day worked.",
    "The same rule covers shift workers and watchmen who work on a public holiday.",
  ],
  ejemplo: [
    "You earn SCR 800 for a normal working day and work one public holiday. The regulations give you SCR 1,600 for that day, which is SCR 800 more than a normal day.",
  ],
  faq: [
    {
      pregunta: "Who decides between double pay and a day off?",
      respuesta: "Regulation 5(2) says the employer chooses between double pay and an alternative holiday.",
    },
    {
      pregunta: "Is a Sunday a public holiday?",
      respuesta: "No. The regulations define a holiday as a Sunday or a public holiday and add that a public holiday does not include Sunday. Both earn double pay for a standard worker.",
    },
    {
      pregunta: "Which workers can be required to work on a holiday?",
      respuesta: "Except in an essential service, an employer cannot require a worker to work on a holiday, unless the worker is a shift worker or a watchman.",
    },
  ],
  glosario: [
    { termino: "Alternative holiday", definicion: "A day off given in place of double pay for working a holiday." },
    { termino: "Watchman", definicion: "A worker whose job is to guard premises, covered by special working hour limits." },
    { termino: "Essential service", definicion: "A service the Minister lists as essential, such as health or utilities." },
  ],
});
