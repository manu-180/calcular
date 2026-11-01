import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "na.final-pay-calculator",
  h1: "Final pay calculator Namibia",
  title: "Final pay calculator Namibia: what you are owed",
  description:
    "Add up your final pay when a job ends in Namibia: unpaid days, annual leave, severance pay and notice pay, as section 37 of the Labour Act requires.",
  intro: [
    "When your employment ends, section 37 of the Labour Act lists everything your employer has to pay you.",
    "Enter your pay, the days still owed and how the job ended to see each item and the total before tax.",
  ],
  comoSeCalcula: [
    "Daily pay is your monthly remuneration divided by {{na.weeks-per-month}} times your work days a week. Unpaid days and leave days are paid at that rate.",
    "Severance pay is {{na.severance-weeks-per-year}} week's remuneration for each completed year, when the law gives it.",
    "Pay instead of notice is one day, one week or one month of pay, depending on how long you worked.",
  ],
  ejemplo: [
    "Dismissed after 3 years on N$12,000 a month, with 8 unpaid days, 10 leave days and notice paid out: N$4,431.12 + N$5,538.90 + N$8,308.32 + N$12,000 = N$30,278.34.",
  ],
  faq: [
    {
      pregunta: "Is leave for the current cycle paid out?",
      respuesta: "Yes. You get leave pay for completed cycles and a pro rata amount for the cycle you are in. You can lose the pro rata part if, without good cause, you leave without working your notice or paying your employer instead.",
    },
    {
      pregunta: "Do I get a certificate of service?",
      respuesta: "Yes. It must show your name, the employer, your start and end dates, your job and your pay, and the reason for leaving if you ask for it.",
    },
    {
      pregunta: "When must my employer pay?",
      respuesta: "On or before the next pay day after the employment ends.",
    },
  ],
  glosario: [
    { termino: "Final pay", definicion: "Everything an employer owes when the employment ends." },
    { termino: "Severance pay", definicion: "Pay for years of service owed on dismissal, death or retirement at 65." },
  ],
});
