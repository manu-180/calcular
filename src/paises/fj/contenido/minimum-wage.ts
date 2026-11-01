import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fj.minimum-wage",
  h1: "Minimum wage Fiji {{anio}}",
  title: "Minimum wage Fiji {{anio}}: {{fj.minimum-wage-hourly}} an hour",
  description: "The national minimum wage is {{fj.minimum-wage-hourly}} an hour. Enter your weekly hours to see the least you must earn and compare your own rate.",
  intro: [
    "The national minimum wage in Fiji is {{fj.minimum-wage-hourly}} an hour, in force since {{fj.minimum-wage-hourly#desde}}. Enter the hours you work in a week to see the least you can be paid for them.",
    "You can also enter your own hourly rate to see whether it is above or below the minimum.",
  ],
  comoSeCalcula: [
    "The weekly minimum is the hourly rate of {{fj.minimum-wage-hourly}} multiplied by your weekly hours.",
    "An average month has 52 weeks divided by 12, which is 4.33 weeks. The monthly figure is the weekly minimum times 52 divided by 12.",
    "The national minimum rose in two steps. The 2024-2025 Budget Address raised it to FJ$4.50 from 1 August 2024 and to FJ$5.00 from 1 April 2025.",
    "Ten sectoral wage orders also exist. The same address raised each of them by 50 cents at both steps. Check with the Ministry of Employment whether an order covers your industry, because it may set a higher rate than the national one.",
  ],
  ejemplo: [
    "A worker on a 40 hour week must earn at least FJ$5.00 × 40 = FJ$200 a week. Over an average month that is FJ$866.67. A cashier paid FJ$4.20 an hour is FJ$0.80 an hour below the national minimum.",
  ],
  faq: [
    {
      pregunta: "What is the minimum wage in Fiji?",
      respuesta: "The 2024-2025 National Budget Address sets the national minimum wage at {{fj.minimum-wage-hourly}} an hour from {{fj.minimum-wage-hourly#desde}}, after FJ$4.50 from 1 August 2024.",
    },
    {
      pregunta: "Do industry minimums differ from the national rate?",
      respuesta: "Yes. The budget address refers to ten sectoral wages that rose by 50 cents at each step. A cashier on FJ$4.44 would move to FJ$4.94, then FJ$5.44, in the example it gives.",
    },
    {
      pregunta: "Does the minimum include FNPF or overtime?",
      respuesta: "No. It is the basic hourly rate before FNPF and PAYE. Overtime and allowances are extra, and the leave and overtime rules sit in the Employment Relations Act 2007.",
    },
  ],
  glosario: [
    { termino: "National minimum wage", definicion: "The lowest hourly rate an employer may pay under the national rate." },
    { termino: "Sectoral wage", definicion: "A higher minimum fixed for a particular industry." },
    { termino: "Basic pay", definicion: "Pay for normal hours, before allowances, overtime and deductions." },
  ],
});
