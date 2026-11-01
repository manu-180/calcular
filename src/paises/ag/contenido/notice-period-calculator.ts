import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ag.notice-period-calculator",
  h1: "Notice period calculator Antigua and Barbuda {{anio}}",
  title: "Notice period calculator {{anio}}: how much notice",
  description: "Find the notice an employer must give under the Labour Code: the time between paydays, up to {{ag.notice-max-days}} days, or 24 hours in probation.",
  intro: [
    "Notice is the time between your paydays, up to {{ag.notice-max-days}} days. Choose how often you are paid and whether you are on probation to see the minimum notice and the pay for that period.",
    "The Antigua and Barbuda Labour Code sets notice by how often you are paid, not by how long you have worked. Longer notice can be agreed in a contract.",
  ],
  comoSeCalcula: [
    "Under section C9(3), an employer must give notice at least as long as the interval between the employee's paydays, and never more than {{ag.notice-max-days}} days unless the contract asks for longer.",
    "During probation, which cannot last more than {{ag.probation-max-months}} months without a collective agreement, 24 hours' notice is enough for either side.",
    "An employer can end the job at once by paying a sum equal to what the employee would have earned through the notice period, under section C9(4). This calculator treats a month as 30 days.",
  ],
  ejemplo: [
    "An employee paid monthly EC$3,300 is entitled to 30 days' notice. If the employer ends the job on the spot, the pay in place of notice is EC$3,300. A weekly paid employee gets 7 days.",
  ],
  faq: [
    {
      pregunta: "How much notice does an employer have to give?",
      respuesta: "At least the interval between paydays, up to {{ag.notice-max-days}} days, under section C9(3) of the Labour Code. On probation it is 24 hours.",
    },
    {
      pregunta: "How much notice must I give if I resign?",
      respuesta: "Section C11(2) asks for 24 hours on probation and otherwise the interval between paydays, again with a limit of {{ag.notice-max-days}} days unless the contract says more.",
    },
    {
      pregunta: "Can the employer pay me instead of giving notice?",
      respuesta: "Yes. Section C9(4) lets the employer end the job early if the employee is paid the amount he would have received through the notice period.",
    },
  ],
  glosario: [
    { termino: "Notice", definicion: "Advance warning that a job will end, given in writing or by word." },
    { termino: "Probation", definicion: "A trial period at the start of a job, up to 3 months without a collective agreement." },
    { termino: "Pay in lieu of notice", definicion: "A payment that replaces the working of the notice period." },
  ],
});
