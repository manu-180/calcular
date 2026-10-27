import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "na.severance-pay-calculator",
  h1: "Severance pay calculator Namibia",
  title: "Severance pay calculator Namibia: Labour Act minimum",
  description:
    "Severance pay in Namibia is at least {{na.severance-weeks-per-year}} week's remuneration for each year of service. Check if you qualify and how much you are owed.",
  intro: [
    "Section 35 of the Labour Act gives severance pay to employees with at least 12 months of continuous service who are dismissed, die in service, or resign or retire at 65.",
    "Enter your monthly pay, your completed years and how the job ended to see the legal minimum.",
  ],
  comoSeCalcula: [
    "One week's remuneration is your monthly remuneration divided by {{na.weeks-per-month}}.",
    "Severance pay is {{na.severance-weeks-per-year}} week's remuneration for each completed year of continuous service.",
    "Nothing is due after a fair dismissal for misconduct or poor work performance, or if you resign before 65.",
  ],
  ejemplo: ["After 5 years on N$12,000 a month, one week is N$2,769.44, so the minimum severance pay is N$13,847.20."],
  faq: [
    {
      pregunta: "Does retrenchment count as dismissal?",
      respuesta: "Yes. A dismissal for operational reasons is a dismissal, so severance pay is due if you have 12 months of service.",
    },
    {
      pregunta: "Can I lose severance pay if I refuse a new job offer?",
      respuesta: "Yes, if you unreasonably refuse to be reinstated, or refuse employment on terms at least as good with the heir of a deceased employer or a former partner of a dissolved partnership.",
    },
    {
      pregunta: "Who gets the severance pay if the employee dies?",
      respuesta: "If there is no will, it goes to the surviving spouse, then to the children, and if there are none, to the estate.",
    },
    {
      pregunta: "Does a business sale break my service?",
      respuesta: "No. If the business is transferred and you keep working in it, your earlier service counts.",
    },
  ],
  glosario: [
    { termino: "Continuous service", definicion: "Unbroken employment with the same employer. Seasonal work in successive years can count." },
    { termino: "Remuneration", definicion: "Your total pay, including the value of payments in kind, not just the basic wage." },
  ],
});
