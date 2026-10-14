import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sg.overtime-pay",
  h1: "Overtime pay calculator for Singapore",
  title: "Overtime pay calculator Singapore (Employment Act)",
  description: "Work out your overtime pay under the Employment Act: at least {{sg.horas-extra-factor}} times your hourly basic rate, with the {{sg.horas-extra-topes[no-manual]}} and {{sg.horas-extra-topes[manual]}} salary limits.",
  intro: [
    "Overtime is any work beyond your normal hours of work, not counting breaks. Under the Employment Act it is paid at least {{sg.horas-extra-factor}} times your hourly basic rate.",
    "Enter your monthly basic salary, your type of work and your overtime hours to see what your employer owes you.",
  ],
  comoSeCalcula: [
    "Your hourly basic rate is 12 times your monthly basic salary, divided by 52 weeks of {{sg.horas-semanales}}.",
    "For non-workmen, the hourly rate used for overtime is capped at {{sg.horas-extra-tope-hora}}.",
    "Overtime pay is the hourly basic rate times {{sg.horas-extra-factor}}, times the overtime hours.",
    "The rules cover non-workmen earning up to {{sg.horas-extra-topes[no-manual]}} and workmen earning up to {{sg.horas-extra-topes[manual]}} in basic monthly salary.",
  ],
  ejemplo: ["A non-workman earning $2,600 who works 2 hours of overtime gets $40.80: $13.60 × 1.5 × 2."],
  faq: [
    {
      pregunta: "Who counts as a workman?",
      respuesta: "Generally, someone whose work is mainly manual labour. Other employees are non-workmen.",
    },
    {
      pregunta: "How many overtime hours can I work?",
      respuesta: "Up to {{sg.horas-extra-max-mes}} in a month, and no more than 12 hours of work in a day, unless your employer has an exemption or there is an emergency the law allows for.",
    },
    {
      pregunta: "When must overtime be paid?",
      respuesta: "Within 14 days after the last day of the salary period.",
    },
    {
      pregunta: "Does work on a rest day or public holiday count?",
      respuesta: "Work on those days is paid under its own rules and is not counted in the monthly overtime limit, except for hours beyond your usual daily hours.",
    },
  ],
  glosario: [
    { termino: "Hourly basic rate of pay", definicion: "For monthly-rated staff, 12 times the monthly basic salary divided by (52 × 44)." },
    { termino: "Workman", definicion: "An employee whose work mainly involves manual labour." },
  ],
});
