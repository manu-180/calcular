import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ag.sick-leave-pay-calculator",
  h1: "Sick leave pay calculator Antigua and Barbuda {{anio}}",
  title: "Sick leave pay calculator {{anio}}: your {{ag.sick-full-pay-days}} paid days",
  description: "Check how many sick days your employer must pay in full under the Labour Code and what they come to in money.",
  intro: [
    "Enter your monthly pay, the sick days you have already used and the days you are taking now. The calculator shows how many are paid in full.",
    "Section C17 of the Antigua and Barbuda Labour Code pays an employee the basic wage for at least the first {{ag.sick-full-pay-days}} days of sick leave in any 12 consecutive months.",
  ],
  comoSeCalcula: [
    "The 12 months are counted from the date you started work and each anniversary of it, not from the calendar year.",
    "Subtract the days already used from {{ag.sick-full-pay-days}} to find the full-pay days left. Days you take now are paid up to that number.",
    "A day's pay is your monthly pay divided by the working days in your pay month. Section C16 lets an employer ask for a doctor's certificate on or after the third consecutive day.",
  ],
  ejemplo: [
    "An employee on EC$3,300 a month has used 8 sick days this year and is off for 10 more. Four full-pay days remain, each worth EC$150, so the Labour Code covers EC$600. The other 6 days are outside it, and Social Security sickness benefit may apply.",
  ],
  faq: [
    {
      pregunta: "How many sick days are paid in full?",
      respuesta: "At least the first {{ag.sick-full-pay-days}} days in each 12 consecutive months, under section C17 of the Labour Code.",
    },
    {
      pregunta: "Do I need a doctor's note?",
      respuesta: "Your employer may ask for a doctor's certificate or other satisfactory evidence on or after the third consecutive day of leave, under section C16.",
    },
    {
      pregunta: "What if I am ill for longer?",
      respuesta: "The Social Security Board pays a sickness benefit of 60% of average weekly insurable earnings to eligible employees. Use the sickness benefit calculator to estimate it.",
    },
  ],
  glosario: [
    { termino: "Basic wage", definicion: "The wage you would have received had you worked on those days." },
    { termino: "Anniversary date", definicion: "Each yearly date of your start of employment, from which the 12 months run." },
    { termino: "Certificate", definicion: "A doctor's note that proves the illness." },
  ],
});
