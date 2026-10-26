import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jm.maternity-leave-calculator",
  h1: "Maternity leave pay calculator Jamaica",
  title: "Maternity leave pay Jamaica: how much you get",
  description:
    "Check your maternity leave pay in Jamaica. The Act gives {{jm.maternity-leave-weeks}} of leave, and your employer pays {{jm.maternity-paid-weeks}} after {{jm.maternity-qualifying-weeks}} of continuous work.",
  intro: [
    "The Maternity Leave Act gives you {{jm.maternity-leave-weeks}} of maternity leave. Your employer pays {{jm.maternity-paid-weeks}} of them if you qualify.",
    "Enter your weekly pay and how long you have worked for your employer to see what you should receive.",
  ],
  comoSeCalcula: [
    "You qualify for paid leave after {{jm.maternity-qualifying-weeks}} of continuous employment with the same employer.",
    "Paid leave: {{jm.maternity-paid-weeks}}. This page values them at your normal weekly pay. The rest of the {{jm.maternity-leave-weeks}} is unpaid.",
    "Paid maternity leave can be taken up to {{jm.maternity-paid-times}} times with the same employer.",
    "With a medical certificate the leave can be extended by up to {{jm.maternity-extension-weeks}} without pay.",
  ],
  ejemplo: ["On J$40,000 a week, 8 paid weeks come to J$320,000. The other 4 weeks of leave are unpaid."],
  faq: [
    {
      pregunta: "How long is maternity leave in Jamaica?",
      respuesta: "{{jm.maternity-leave-weeks}}. Your employer pays {{jm.maternity-paid-weeks}} of them if you have worked there for {{jm.maternity-qualifying-weeks}} without a break.",
    },
    {
      pregunta: "I work in a private home. Who pays my maternity leave?",
      respuesta: "Household workers are not paid by the employer under the Act. They can claim maternity benefit from the National Insurance Scheme.",
    },
    {
      pregunta: "What if I work in seasonal jobs?",
      respuesta: "For seasonal work you qualify if you worked for the employer for {{jm.maternity-qualifying-weeks}} in total during the previous five years.",
    },
  ],
  glosario: [{ termino: "Continuous employment", definicion: "Working for the same employer without a break in your contract." }],
});
