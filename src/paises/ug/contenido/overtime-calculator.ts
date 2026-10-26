import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ug.overtime-calculator",
  h1: "Overtime calculator Uganda",
  title: "Overtime calculator Uganda: 1.5 and 2 times pay",
  description: "Work out overtime pay in Uganda: at least {{ug.overtime-normal}} times your hourly rate on normal days and {{ug.overtime-holiday}} times on gazetted public holidays.",
  intro: [
    "Hours beyond your normal working time are overtime and must be paid at a higher rate.",
    "Enter your pay and the extra hours to see what you are owed.",
  ],
  comoSeCalcula: [
    "Hours above 8 a day or {{ug.weekly-hours}} a week are overtime, unless a written agreement says otherwise.",
    "Overtime on normal working days is paid at least {{ug.overtime-normal}} times the normal hourly rate.",
    "Overtime on gazetted public holidays is paid at least {{ug.overtime-holiday}} times the hourly rate.",
    "The hourly rate here is your monthly pay times 12, divided by 52 weeks and by your weekly hours.",
  ],
  ejemplo: ["On Ushs 1,000,000 a month and a 48-hour week your hourly rate is about Ushs 4,808, so 10 hours of overtime pay Ushs 72,120."],
  faq: [
    {
      pregunta: "What is the most I can work?",
      respuesta: "No more than 10 hours a day or 56 a week. Shift work can go over that on some days if the average over three weeks stays within those limits.",
    },
    {
      pregunta: "Do I get a break?",
      respuesta: "Where the working day is at least eight hours, you get a 30-minute break each day.",
    },
    {
      pregunta: "Can my contract set a different overtime rate?",
      respuesta: "The Act sets these minimum rates for when there is no written agreement to the contrary, so check your contract first.",
    },
  ],
  glosario: [{ termino: "Gazetted public holiday", definicion: "A public holiday declared in the Uganda Gazette." }],
});
