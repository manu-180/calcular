import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "np.overtime-calculator",
  h1: "Overtime calculator Nepal {{anio}}",
  title: "Overtime calculator Nepal {{anio}}: pay at 1.5 times basic pay",
  description: "Work out overtime pay under the Labour Act, 2074: {{np.overtime-factor}} times basic pay for each extra hour, with limits of {{np.overtime-day-cap}} hours a day and {{np.overtime-week-cap}} hours a week.",
  intro: [
    "Enter your basic pay and the extra hours you worked to see the overtime pay the Labour Act, 2074 gives you.",
    "If you are paid monthly, the calculator turns your basic pay into an hourly rate first. If you are paid by the hour, you enter the hourly rate directly.",
  ],
  comoSeCalcula: [
    "A worker can be made to work {{np.normal-day-hours}} hours a day and {{np.normal-week-hours}} hours a week. Hours beyond that count as overtime.",
    "Section 31 of the Act says overtime is paid at {{np.overtime-factor}} times the basic pay the worker earns for regular work. Allowances are not included.",
    "Section 30 caps overtime at {{np.overtime-day-cap}} hours a day and {{np.overtime-week-cap}} hours a week. The Act does not set how many days to divide a monthly wage by, so the calculator lets you enter the paid days in your contract. Thirty is the default.",
  ],
  ejemplo: ["Basic pay of NPR 30,000 a month over 30 days of 8 hours is NPR 125 an hour. Ten overtime hours at 1.5 times pay NPR 1,875."],
  faq: [
    {
      pregunta: "How much is overtime paid in Nepal?",
      respuesta: "One and a half times the basic pay for each hour, under section 31 of the Labour Act, 2074.",
    },
    {
      pregunta: "How much overtime can my employer ask for?",
      respuesta: "Section 30 allows up to 4 hours in a day and 24 hours in a week. Work on a weekly rest day without a substitute day off also counts as overtime.",
    },
    {
      pregunta: "Do managers get overtime?",
      respuesta: "Section 31 lets a collective agreement replace overtime pay with other benefits, and for managerial staff the employment contract can do so.",
    },
  ],
  glosario: [
    { termino: "Basic pay", definicion: "The fixed hourly, daily or monthly pay for regular work, without allowances." },
    { termino: "Overtime", definicion: "Work beyond eight hours a day or forty-eight hours a week." },
  ],
});
