import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ag.vacation-leave-calculator",
  h1: "Vacation leave calculator Antigua and Barbuda {{anio}}",
  title: "Vacation leave calculator {{anio}}: days and pay",
  description: "Count the vacation days you have earned under the Labour Code, one for every month after probation, and the pay owed for the days not taken.",
  intro: [
    "Enter your monthly pay, the months you have worked since probation ended and the vacation days you have taken. The calculator shows what is still due.",
    "Section C18 of the Antigua and Barbuda Labour Code gives an employee who has passed probation at least {{ag.vacation-days-per-month}} day of vacation for each month of employment.",
  ],
  comoSeCalcula: [
    "Multiply the months of employment after probation by {{ag.vacation-days-per-month}} day. Probation cannot last more than {{ag.probation-max-months}} months unless a collective agreement says so (section C8).",
    "Take away the days you have already taken. Vacation leave is on top of public holidays, sick leave and weekly rest days.",
    "A day's pay is your monthly pay divided by the working days in your pay month. Under section C18(7), anyone whose job ends for any reason receives pay for every vacation day still due.",
  ],
  ejemplo: [
    "An employee earning EC$3,300 a month has worked 12 months since probation and taken 5 days. She has earned 12 days, so 7 are due. A day's pay on a 22-day month is EC$150, so the days due are worth EC$1,050.",
  ],
  faq: [
    {
      pregunta: "How much vacation leave do I get?",
      respuesta: "At least {{ag.vacation-days-per-month}} day for every month of employment once you have passed probation, under section C18(1) of the Labour Code.",
    },
    {
      pregunta: "Can my employer pay me instead of letting me take leave?",
      respuesta: "No. Section C18(6) says an employer cannot compel an employee to give up earned leave, even if he pays the wage in lieu.",
    },
    {
      pregunta: "What happens to unused leave when I leave the job?",
      respuesta: "Section C18(7) says a person whose employment ends for any reason receives the wage for every vacation day due.",
    },
  ],
  glosario: [
    { termino: "Probation", definicion: "The first period of a job, up to 3 months unless a collective agreement allows longer." },
    { termino: "Vacation leave", definicion: "Paid time off earned at one day a month, separate from public holidays and sick leave." },
    { termino: "Pay in lieu", definicion: "Money paid in place of leave that was earned but not taken." },
  ],
});
