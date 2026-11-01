import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tt.maternity-leave-calculator",
  h1: "Maternity leave calculator Trinidad and Tobago",
  title: "Maternity leave in Trinidad and Tobago: dates and pay",
  description: "Maternity leave is {{tt.maternity-leave-weeks}}. Work out when it can start, when you go back, and the pay your employer owes you.",
  intro: [
    "The Maternity Protection Act gives every eligible employee {{tt.maternity-leave-weeks}} of maternity leave.",
    "Enter your pay and your expected date of birth to see your leave dates and the minimum your employer must pay.",
  ],
  comoSeCalcula: [
    "Your leave can start {{tt.maternity-leave-before-birth-weeks}} before the expected date of birth on your medical certificate, or later if you choose.",
    "You must return no later than {{tt.maternity-leave-weeks}} after the day you went on leave.",
    "Your employer pays {{tt.maternity-full-pay-months}} at full pay and {{tt.maternity-half-pay-months}} at half pay.",
    "If that pay plus the NIS maternity benefit is less than your full pay for the leave, your employer pays the difference.",
  ],
  ejemplo: ["With pay of TT$8,000 a month and a baby due on March 1, 2027, your employer pays at least TT$16,000. Your leave can run from January 18 to April 26, 2027."],
  faq: [
    {
      pregunta: "How long is maternity leave in Trinidad and Tobago?",
      respuesta: "{{tt.maternity-leave-weeks}}. You can start up to {{tt.maternity-leave-before-birth-weeks}} before the expected date of birth.",
    },
    {
      pregunta: "Do I get full pay on maternity leave?",
      respuesta:
        "Between your employer and the NIS maternity benefit, yes. Your employer pays one month in full and two months at half pay, and tops it up if the total with the NIS benefit falls short of your full pay.",
    },
    {
      pregunta: "What if my employer did not pay my NIS contributions?",
      respuesta: "If no NIS maternity benefit is payable because your employer failed to pay your contributions, the employer must pay you the full amount you would have received.",
    },
    {
      pregunta: "Can I stay off longer for medical reasons?",
      respuesta: "Yes, with a doctor's certificate, for up to 12 weeks after your return date. The first six of those weeks are at half pay and the next six unpaid, unless you have sick or vacation leave.",
    },
  ],
  glosario: [
    { termino: "Maternity Protection Act", definicion: "The law, Chap. 45:57, that sets maternity leave, pay and the right to return to work." },
    { termino: "Maternity benefit", definicion: "The weekly payment from the NIBTT during maternity leave, based on your NIS contributions." },
  ],
});
