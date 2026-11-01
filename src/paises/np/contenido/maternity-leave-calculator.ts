import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "np.maternity-leave-calculator",
  h1: "Maternity leave calculator Nepal {{anio}}",
  title: "Maternity leave Nepal {{anio}}: 14 weeks, 60 days paid",
  description: "Plan your leave under the Labour Act, 2074: {{np.maternity-leave-weeks}} of maternity leave, {{np.maternity-paid-days}} on full pay, and {{np.paternity-days}} of paternity care leave for the father.",
  intro: [
    "Choose whether the leave is for the mother or the father, enter the first day, and the calculator gives the last day of leave and the day you return.",
    "For the mother it also shows how long the {{np.maternity-leave-weeks}} of leave stay on full pay: {{np.maternity-paid-days}} from the employer.",
  ],
  comoSeCalcula: [
    "Section 45 of the Labour Act, 2074 gives a pregnant worker {{np.maternity-leave-weeks}} of leave around the birth. The calculator counts 98 days from the first day you enter.",
    "The worker receives full pay for {{np.maternity-paid-days}} of those days, and no pay from the employer for the rest. If the worker gets maternity pay from the Social Security Fund, the employer does not owe that pay.",
    "If a recognised doctor advises more rest for the mother or the baby, the employer approves up to {{np.maternity-extra-month}} more of paid leave straight after maternity leave. A father whose wife gives birth receives {{np.paternity-days}} of paid care leave.",
  ],
  ejemplo: ["Leave that starts on 1 December 2026 lasts 98 days and ends on 8 March 2027. Full pay covers the first 60 days, up to 29 January 2027, and the worker returns on 9 March 2027."],
  faq: [
    {
      pregunta: "How long is maternity leave in Nepal?",
      respuesta: "Fourteen weeks, before or after the birth, according to section 45 of the Labour Act, 2074.",
    },
    {
      pregunta: "How much of maternity leave is paid?",
      respuesta: "Sixty days on full pay. The Act says the worker does not receive pay from the employer for the remaining period.",
    },
    {
      pregunta: "When must maternity leave start?",
      respuesta: "The leave must start at least two weeks before the expected date of birth and run for at least six weeks after the birth.",
    },
    {
      pregunta: "Do fathers get leave?",
      respuesta: "Yes. A male worker whose wife gives birth is entitled to 15 days of paid care leave.",
    },
  ],
  glosario: [
    { termino: "Maternity leave", definicion: "Leave a pregnant worker takes around the birth of a child." },
    { termino: "Paternity care leave", definicion: "Paid leave for a father to look after the mother and the newborn." },
  ],
});
