import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "om-en.annual-leave-calculator",
  h1: "Oman annual leave pay calculator",
  title: "Pay for unused annual leave under Oman Labour Law",
  description:
    "Work out pay for unused annual leave in Oman: at the total wage when the job ends, or at the basic wage during the job with written consent.",
  intro: [
    "Workers in Oman get paid annual leave of at least {{om.annual-leave}} on their total wage.",
    "If the job ends before the balance is used, the worker is owed the total wage for it. During the job, the basic wage can be paid for unused days if the worker agrees in writing.",
  ],
  comoSeCalcula: [
    "A day's pay = monthly wage ÷ the number of days per month you choose.",
    "When the job ends: pay = total daily wage × days of balance.",
    "During the job: pay = basic daily wage × days of balance.",
  ],
  ejemplo: [
    "A worker with a total wage of OMR 550 and a balance of 15 days when the job ends earns about OMR 18.333 a day, so the leave pay is OMR 275.",
  ],
  faq: [
    {
      pregunta: "How many days of annual leave does Oman Labour Law give?",
      respuesta: "At least {{om.annual-leave}} on the total wage. Leave cannot be taken until at least six months after joining the employer.",
    },
    {
      pregunta: "Do I lose leave I do not use?",
      respuesta: "A worker can keep a balance of up to 30 days, unless the leave was not taken because the work required it. Workers must take at least 30 days of leave at least once every two years.",
    },
    {
      pregunta: "Can my employer postpone my leave?",
      respuesta: "Yes, if the work requires it, for up to six months.",
    },
  ],
  glosario: [
    { termino: "Total wage", definicion: "The basic wage plus all allowances." },
    { termino: "Leave balance", definicion: "Annual leave days owed that the worker has not used." },
  ],
});
