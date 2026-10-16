import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "my.maternity-leave",
  h1: "Maternity leave calculator Malaysia",
  title: "Maternity leave pay: 98 days under the Employment Act",
  description: "Work out your maternity allowance for {{my.maternity-leave-days}} days of maternity leave at your ordinary rate of pay, and check if your employer has to pay it.",
  intro: [
    "Enter your monthly wages to see the maternity allowance your employer pays for your maternity leave.",
    "Every female employee gets at least {{my.maternity-leave-days}} consecutive days of maternity leave for each confinement. The allowance depends on how long you have worked for the employer.",
  ],
  comoSeCalcula: [
    "Your daily allowance is your ordinary rate of pay: monthly wages divided by {{my.ordinary-rate-divisor}}.",
    "It is paid for each of the {{my.maternity-leave-days}} days of the eligible period.",
    "You qualify if you worked for the employer at least 90 days in the 9 months before the birth and at some time in the 4 months before it.",
  ],
  ejemplo: ["On RM2,600 a month the daily rate is RM100, so the maternity allowance is RM9,800."],
  faq: [
    {
      pregunta: "When can my maternity leave start?",
      respuesta: "Not earlier than 30 days before the expected confinement, and not later than the day after the birth.",
    },
    {
      pregunta: "Can I go back to work before the 98 days end?",
      respuesta: "Yes, with your employer's consent, if a registered medical practitioner certifies that you are fit to resume work.",
    },
    {
      pregunta: "What if I do not meet the 90-day condition?",
      respuesta: "You still get the maternity leave, but your employer does not have to pay the maternity allowance for it.",
    },
  ],
  glosario: [
    { termino: "Confinement", definicion: "The birth of a child, the term the Employment Act uses for maternity rights." },
    { termino: "Eligible period", definicion: "The maternity leave of at least {{my.maternity-leave-days}} consecutive days." },
  ],
});
