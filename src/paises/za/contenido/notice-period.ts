import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "za.notice-period",
  h1: "Notice period calculator",
  title: "Notice period calculator: BCEA minimum notice",
  description: "Find your minimum notice period under the BCEA, from one to four weeks, and the pay you are owed if your employer pays you instead of notice.",
  intro: [
    "Enter how long you have worked for your employer. You get the minimum notice the law requires and, if you add your salary, the pay instead of notice.",
    "The same minimum applies whether you resign or your employer ends your contract.",
  ],
  comoSeCalcula: [
    "Six months or less: {{za.notice-weeks[up-to-6-months]}} week.",
    "More than six months and up to a year: {{za.notice-weeks[6-to-12-months]}} weeks.",
    "A year or more: {{za.notice-weeks[1-year-or-more]}} weeks. Farm and domestic workers get {{za.notice-weeks[farm-domestic-over-6-months]}} weeks once they pass six months.",
    "Pay instead of notice is your weekly pay (monthly salary divided by {{za.weeks-per-month}}) times the weeks of notice.",
  ],
  ejemplo: ["After eight months on R13 000 a month, the notice is two weeks. Paid out instead, that is R6 000,46."],
  faq: [
    {
      pregunta: "Does notice have to be in writing?",
      respuesta: "Yes, unless it is given by an employee who cannot read or write. If you do not understand the notice, your employer must explain it to you in an official language you understand.",
    },
    {
      pregunta: "Can a collective agreement shorten the notice?",
      respuesta: "Only the four weeks for employees with a year or more of service, and only down to two weeks. The other minimums cannot be shortened.",
    },
    {
      pregunta: "Can my employer give notice while I am on leave?",
      respuesta: "No. Notice from the employer cannot be given during your annual leave or other BCEA leave, and it cannot run at the same time as that leave, except sick leave.",
    },
  ],
  glosario: [
    { termino: "Pay in lieu of notice", definicion: "The pay you would have earned during the notice period, paid instead of working it." },
  ],
});
