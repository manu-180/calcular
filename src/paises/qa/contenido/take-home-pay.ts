import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "qa.take-home-pay",
  h1: "Qatar salary calculator: take-home pay",
  title: "Take-home pay in Qatar: salary after GRSIA",
  description:
    "Work out your monthly take-home pay in Qatar. Expatriates keep their full salary, and Qataris pay {{qa.social-insurance[employee]}} to GRSIA.",
  intro: [
    "Qatar doesn't tax salaries, so most expatriates take home exactly what their contract says.",
    "Qatari employees pay a social insurance contribution to GRSIA. Enter your salary and allowances to see what reaches your account each month.",
  ],
  comoSeCalcula: [
    "Gross pay is the basic salary plus every monthly allowance.",
    "For Qataris, the contribution salary is the basic salary plus the social allowance and the housing allowance, counting housing up to {{qa.social-insurance-caps[housing-cap]}} a month and the whole base up to {{qa.social-insurance-caps[cap]}}.",
    "You pay {{qa.social-insurance[employee]}} of that salary and your employer pays {{qa.social-insurance[employer]}}. Take-home pay is gross pay less your share.",
  ],
  ejemplo: [
    "A Qatari with a basic salary of QAR 20,000, a social allowance of QAR 2,000 and a housing allowance of QAR 8,000 contributes on QAR 28,000 and pays QAR 1,960 a month.",
  ],
  faq: [
    {
      pregunta: "Do I pay income tax on my salary in Qatar?",
      respuesta: "No. The law that issued the Income Tax Law says its rules don't apply to salaries, wages, allowances and similar pay.",
    },
    {
      pregunta: "Do expatriates pay social insurance in Qatar?",
      respuesta: "No. The Social Insurance Law applies to Qataris, so expatriates have nothing deducted under it. Citizens of other GCC states can be covered by the Gulf system that extends their home country's insurance.",
    },
    {
      pregunta: "Which allowances count for GRSIA?",
      respuesta: "The basic salary, the social allowance and the housing allowance. Housing counts up to {{qa.social-insurance-caps[housing-cap]}} a month.",
    },
    {
      pregunta: "Is there a maximum contribution?",
      respuesta: "Yes. Contributions are worked out on a salary of up to {{qa.social-insurance-caps[cap]}} a month.",
    },
  ],
  glosario: [
    { termino: "GRSIA", definicion: "General Retirement and Social Insurance Authority, which runs pensions for Qataris." },
    { termino: "Basic salary", definicion: "The fixed pay for your work, without allowances or bonuses." },
  ],
});
