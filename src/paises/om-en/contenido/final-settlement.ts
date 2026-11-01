import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "om-en.final-settlement",
  h1: "Oman final settlement calculator",
  title: "Full end-of-service settlement in Oman",
  description:
    "Work out everything you are owed when your job in Oman ends: the gratuity for expats, pay for unused leave, unpaid wages and notice compensation.",
  intro: [
    "When a job ends the worker is owed several amounts, each worked out on its own basis in the Labour Law.",
    "Enter your basic and total wage, your service and your leave balance to see each amount owed.",
  ],
  comoSeCalcula: [
    "End-of-service gratuity for non-Omanis: {{om.gratuity}} of the last basic wage for each year, with part years in proportion.",
    "The annual leave balance is paid at the total wage when the job ends.",
    "Days worked and not yet paid, and notice days the employer did not give, are paid at the total daily wage.",
  ],
  ejemplo: [
    "An expat with a basic wage of OMR 400 and a total wage of OMR 550 who served five years and has 10 days of leave gets a gratuity of about OMR 2,001 and leave pay of about OMR 183.",
  ],
  faq: [
    {
      pregunta: "Is leave balance paid at basic or total wage?",
      respuesta: "When the job ends the worker is owed the total wage for their annual leave balance, under article 81 of the Labour Law.",
    },
    {
      pregunta: "What goes into notice compensation?",
      respuesta: "If the employer ends the contract without the notice period, it owes the worker compensation equal to the notice period or what is left of it, based on the last total wage.",
    },
    {
      pregunta: "Am I entitled to an end-of-service certificate?",
      respuesta: "Yes. On request and free of charge, the employer must give the worker a certificate showing the start and end dates, the type of work and the wage.",
    },
  ],
  glosario: [
    { termino: "Final settlement", definicion: "Everything owed to the worker when the working relationship ends." },
  ],
});
