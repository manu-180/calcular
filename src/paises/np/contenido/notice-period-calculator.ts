import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "np.notice-period-calculator",
  h1: "Notice period calculator Nepal {{anio}}",
  title: "Notice period calculator Nepal {{anio}}: 1, 7 or 30 days",
  description: "Find the notice an employer or worker must give under the Labour Act, 2074: {{np.notice-days[under-4-weeks]}} day, {{np.notice-days[4-weeks-to-1-year]}} days or {{np.notice-days[over-1-year]}} days, depending on service.",
  intro: [
    "Enter the first and last day of the job to see how much notice the Labour Act, 2074 requires. The same rule applies to the employer and to the worker.",
    "Add your basic pay to see what the notice period is worth in money, which is what one side owes the other when notice is skipped.",
  ],
  comoSeCalcula: [
    "Section 144 sets the notice by length of service. Up to four weeks of service needs {{np.notice-days[under-4-weeks]}} day of notice. From four weeks to one year it is {{np.notice-days[4-weeks-to-1-year]}} days. More than one year of service needs {{np.notice-days[over-1-year]}} days.",
    "The calculator counts the days between your first and last day. Up to 28 days is the first band, up to 365 days the second, and anything longer the third.",
    "If the employer ends the job without notice, it owes the worker the pay for the notice period. If the worker leaves without notice, the employer may deduct the pay for that period from what it owes.",
  ],
  ejemplo: ["A worker with three years of service on NPR 30,000 a month needs 30 days of notice. Skipping it costs one month of pay, NPR 30,000, when the month is counted as 30 paid days."],
  faq: [
    {
      pregunta: "How much notice must I give before resigning in Nepal?",
      respuesta: "Thirty days if you have worked more than a year, seven days if you have worked between four weeks and a year, and one day for up to four weeks. Section 144 of the Labour Act, 2074 sets these periods.",
    },
    {
      pregunta: "What happens if my employer dismisses me without notice?",
      respuesta: "The employer has to pay you the pay for the notice period, according to section 144(2).",
    },
    {
      pregunta: "Is notice needed when the dismissal is for misconduct?",
      respuesta: "No. Section 144 exempts cases where employment ends after action for misconduct.",
    },
  ],
  glosario: [
    { termino: "Notice period", definicion: "The time between telling the other side the job will end and the last day of work." },
    { termino: "Pay in lieu of notice", definicion: "Money paid instead of working the notice period." },
  ],
});
