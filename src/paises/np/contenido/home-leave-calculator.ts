import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "np.home-leave-calculator",
  h1: "Home leave calculator Nepal {{anio}}",
  title: "Home leave calculator Nepal {{anio}}: 1 paid day per 20 worked",
  description: "Count your paid home leave under the Labour Act, 2074: one day for every {{np.home-leave-days-worked}} days worked, kept up to {{np.home-leave-cap}} days. See the cash value of unused leave.",
  intro: [
    "Home leave is the paid annual leave of a Nepali worker. Enter the days you have worked and the days you have already taken. You earn one day for every {{np.home-leave-days-worked}} days worked, so the calculator shows how many you have left.",
    "Add your basic pay to see what the unused days are worth in cash.",
  ],
  comoSeCalcula: [
    "Section 43 of the Labour Act, 2074 gives one day of paid home leave for every {{np.home-leave-days-worked}} days worked. The calculator divides your days worked by that number.",
    "Section 49 lets you accumulate home leave up to {{np.home-leave-cap}} days. Anything above that limit is paid to you in cash at the end of each year at your basic pay rate.",
    "When you leave a job, the unused home leave is paid out at your last basic pay. The calculator values a day as your monthly basic pay divided by the paid days in a month, which you can set to match your contract.",
  ],
  ejemplo: ["After 300 days of work you have earned 15 days. If you took 5, you have 10 left. On basic pay of NPR 30,000 over 30 days, each day is NPR 1,000, so the balance is worth NPR 10,000."],
  faq: [
    {
      pregunta: "How many days of home leave do I get a year?",
      respuesta: "One day for every 20 days worked, so about 12 to 18 days a year depending on how many days you work. This comes from section 43 of the Labour Act, 2074.",
    },
    {
      pregunta: "How much home leave can I keep?",
      respuesta: "Up to 90 days. Above that, the worker is paid for the extra at the end of the year, according to section 49.",
    },
    {
      pregunta: "Do teachers get home leave?",
      respuesta: "Not usually. Workers in educational institutions, or those who get summer or winter holidays, do not receive home leave, but they get the difference if the holiday is shorter than their home leave.",
    },
  ],
  glosario: [
    { termino: "Home leave", definicion: "Paid leave earned at one day for every 20 days worked." },
    { termino: "Accumulation limit", definicion: "The most home leave a worker can carry forward, 90 days." },
  ],
});
