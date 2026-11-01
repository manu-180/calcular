import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.gratuity-calculator",
  h1: "Gratuity calculator Bhutan",
  title: "Gratuity Bhutan: one month's basic pay a year after {{bt.gratuity-min-years}}",
  description: "Work out gratuity in Bhutan's private sector: last basic pay times completed years, once you have {{bt.gratuity-min-years}} of service. Enter your pay and years.",
  intro: [
    "An employee in Bhutan who completes {{bt.gratuity-min-years}} of continuous service, probation included, is entitled to gratuity when the job ends, whichever side ends it (Regulation on Working Conditions 2022, section 243). The employee pays nothing into it.",
    "The amount is simple: last basic pay times the completed years. The employer has {{bt.gratuity-payment-working-days}} after you leave to pay it.",
  ],
  comoSeCalcula: [
    "Take your last basic pay for a month. Allowances do not count.",
    "Multiply it by your completed years of continuous service (section 249).",
    "Service counts from 20 February 2007 onwards, the date of the Act (section 250). The employer may count earlier years if it wants.",
  ],
  ejemplo: ["Ugyen leaves after 12 completed years with a last basic pay of Nu. 30,000. Gratuity is 12 times Nu. 30,000, or Nu. 360,000, due within 15 working days. Had he left at 9 years, the law would require nothing, though his contract might."],
  faq: [
    {
      pregunta: "Who gets gratuity in Bhutan?",
      respuesta: "An employee with at least {{bt.gratuity-min-years}} of continuous employment including probation, when the contract ends for any reason, except a dismissal for serious misconduct (sections 243 and 248).",
    },
    {
      pregunta: "Can I get gratuity before 10 years?",
      respuesta: "Yes, if your employer decides so or if the written contract or service rules say so (sections 243 and 244).",
    },
    {
      pregunta: "What happens if the company changes hands?",
      respuesta: "A change of owner or manager does not affect your right (section 245).",
    },
    {
      pregunta: "Can I take an advance?",
      respuesta: "No. Section 251 rules out advances against gratuity.",
    },
  ],
  glosario: [
    { termino: "Gratuity", definicion: "A lump sum an employer pays when the job ends, based on years of service." },
    { termino: "Defined benefit", definicion: "A payment fixed by a formula, with no contribution from the employee." },
    { termino: "Nominee", definicion: "The person who receives the payment if the employee dies." },
  ],
});
