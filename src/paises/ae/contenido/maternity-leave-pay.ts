import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ae.maternity-leave-pay",
  h1: "UAE maternity leave pay calculator",
  title: "Maternity leave UAE: 60 days and your pay",
  description:
    "Work out your maternity leave pay under the UAE Labour Law: {{ae.maternity-leave[full-pay]}} at full pay and {{ae.maternity-leave[half-pay]}} at half pay.",
  intro: [
    "A female worker in the UAE private sector is entitled to 60 days of maternity leave, part on full pay and part on half pay.",
    "Enter your wage to see what the leave pays.",
  ],
  comoSeCalcula: [
    "The first {{ae.maternity-leave[full-pay]}} are paid in full.",
    "The next {{ae.maternity-leave[half-pay]}} are paid at half your wage.",
    "If the baby is sick or disabled and needs constant care, you get 30 more days on full pay, which you can extend by 30 days without pay.",
  ],
  ejemplo: ["On AED 10,000 a month, maternity leave pays AED 15,000 for the full-pay days and AED 2,500 for the half-pay days."],
  faq: [
    {
      pregunta: "When can I start maternity leave?",
      respuesta: "From the last day of the month before the month you're expected to give birth, with a certificate from the medical authority.",
    },
    {
      pregunta: "Do I get nursing breaks when I return?",
      respuesta: "Yes. For up to 6 months after the birth, one or two breaks a day of no more than one hour in total.",
    },
    {
      pregunta: "Is there parental leave too?",
      respuesta: "Yes. Either parent gets 5 working days of paid parental leave, to take within 6 months of the birth.",
    },
  ],
  glosario: [
    { termino: "Maternity leave", definicion: "Leave around childbirth under Article 30 of the Labour Law." },
    { termino: "Parental leave", definicion: "Five working days of paid leave for the father or mother within six months of the birth." },
  ],
});
