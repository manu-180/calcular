import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ag.public-holiday-pay-calculator",
  h1: "Public holiday pay calculator Antigua and Barbuda {{anio}}",
  title: "Public holiday pay calculator {{anio}}: work on a holiday",
  description: "Find your pay for a public holiday: your normal day's wage plus {{ag.public-holiday-factor}} times your hourly wage for each hour you work.",
  intro: [
    "Enter your hourly wage, the hours in your normal day and the hours you worked on the holiday. The calculator adds the holiday wage and the extra pay.",
    "Sections C14 and C15 of the Antigua and Barbuda Labour Code cover public holidays. An employee cannot be made to work on one except in an emergency, unless the Minister has exempted the industry by Order.",
  ],
  comoSeCalcula: [
    "If you do not work on a public holiday you lose no pay: you receive the basic wage you would have earned that day. Section C15(1) adds that you must have worked the scheduled day before and the scheduled day after.",
    "If you do work, section C15(2) pays you the holiday wage and, on top of it, at least {{ag.public-holiday-factor}} times your basic hourly rate for each hour worked.",
    "Add the two amounts for the total pay for the holiday.",
  ],
  ejemplo: [
    "A worker on EC$20 an hour with an 8-hour day works the whole of a public holiday. The holiday wage is EC$160 and the extra pay is 8 x EC$20 x 1.5, which is EC$240. The total is EC$400.",
  ],
  faq: [
    {
      pregunta: "Do I get paid if I do not work on a public holiday?",
      respuesta: "Yes, if you worked your scheduled day before and your scheduled day after the holiday. Section C15(1) says you suffer no loss of pay.",
    },
    {
      pregunta: "How much extra do I get for working a public holiday?",
      respuesta: "At least {{ag.public-holiday-factor}} times the basic hourly rate for each hour worked, on top of the holiday wage, under section C15(2).",
    },
    {
      pregunta: "Can my employer require me to work on a holiday?",
      respuesta: "Only in an emergency, under section C14(1), unless a Ministerial Order exempts the industry. Such an Order sets the pay under section C15(3).",
    },
  ],
  glosario: [
    { termino: "Holiday wage", definicion: "The basic wage for the day you would have worked if it had not been a public holiday." },
    { termino: "Basic rate", definicion: "Your wage per hour for normal hours." },
    { termino: "Ministerial Order", definicion: "A rule published in the Gazette that can exempt an industry from the Labour Code's holiday rule." },
  ],
});
