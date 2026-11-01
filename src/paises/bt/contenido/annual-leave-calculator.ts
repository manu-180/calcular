import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.annual-leave-calculator",
  h1: "Annual leave calculator Bhutan",
  title: "Annual leave Bhutan: {{bt.annual-leave-days}} a year, {{bt.annual-leave-per-month}} a month",
  description: "How much annual leave have you earned in Bhutan? At least {{bt.annual-leave-days}} a year after probation, plus {{bt.sick-leave-days}} of sick leave. Enter your months worked.",
  intro: [
    "An employee in Bhutan earns at least {{bt.annual-leave-per-month}} of paid annual leave a month, or {{bt.annual-leave-days}} a year, starting after probation (Regulation on Working Conditions 2022, section 181). Public holidays and weekly rest days do not count as leave.",
    "Enter your months after probation and the days you already took to see what is left, and what it is worth.",
  ],
  comoSeCalcula: [
    "Multiply the full months after probation by {{bt.annual-leave-per-month}}.",
    "Take off the days you took. If you enter your normal pay for a day, the result shows the value of the rest.",
    "Sick leave ({{bt.sick-leave-days}} a year) and casual leave ({{bt.casual-leave-days}} a year) run separately. Casual leave you do not use merges with annual leave.",
  ],
  ejemplo: ["Yeshi finished probation 12 months ago and earned 18 days. She took 5, so 13 are left. Her normal pay is Nu. 1,000 a day, so those days are worth Nu. 13,000 if paid out at the end of the year."],
  faq: [
    {
      pregunta: "How many days of annual leave do I get in Bhutan?",
      respuesta: "A minimum of {{bt.annual-leave-days}} working days a year, at {{bt.annual-leave-per-month}} a month, after you complete probation (section 181). A contract may give more.",
    },
    {
      pregunta: "What happens to unused annual leave?",
      respuesta: "Section 184 has the employer pay unused days at the normal rate at the end of each calendar year, unless you agree to use them instead. You qualify after 12 months of continuous employment (section 185), and on termination the employer pays what is unused (section 186).",
    },
    {
      pregunta: "How much notice must I give?",
      respuesta: "At least {{bt.annual-leave-notice-days}} calendar days in writing (section 183).",
    },
    {
      pregunta: "Can I get paid for unused sick leave?",
      respuesta: "No. Section 191 rules that out. Unused sick leave builds up for 5 years, or longer if you agree, and then the rest lapses (section 192).",
    },
  ],
  glosario: [
    { termino: "Probation", definicion: "A trial period at the start of a contract, of up to 180 days. Annual leave starts accruing after it." },
    { termino: "Encashment", definicion: "Being paid money for leave you did not use." },
    { termino: "Casual leave", definicion: "Short paid leave for personal matters, at least 5 working days a year." },
  ],
});
