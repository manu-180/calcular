import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ae.sick-leave-pay",
  h1: "UAE sick leave pay calculator",
  title: "Sick leave pay UAE: full, half and unpaid days",
  description:
    "Work out your sick leave pay under the UAE Labour Law: {{ae.sick-leave[full-pay]}} at full pay, {{ae.sick-leave[half-pay]}} at half pay and the rest unpaid, up to 90 days a year.",
  intro: [
    "After probation, private sector workers in the UAE can take up to 90 days of sick leave a year, part paid and part unpaid.",
    "Enter your wage and your sick days to see what you should be paid.",
  ],
  comoSeCalcula: [
    "The first {{ae.sick-leave[full-pay]}} of sick leave in a year of service are paid in full.",
    "The next {{ae.sick-leave[half-pay]}} are paid at half your wage.",
    "The following {{ae.sick-leave[unpaid]}} are unpaid.",
  ],
  ejemplo: ["On AED 9,000 a month, 20 sick days pay 15 days in full and 5 at half pay: AED 5,250."],
  faq: [
    {
      pregunta: "Is sick leave paid during probation?",
      respuesta: "No. Your employer may give you unpaid sick leave during probation, based on a medical report.",
    },
    {
      pregunta: "When do I have to tell my employer?",
      respuesta: "Within 3 business days, with a medical report from the medical authority.",
    },
    {
      pregunta: "When isn't sick leave paid?",
      respuesta: "When the illness comes from your own misconduct, in the cases set out in the Executive Regulation.",
    },
  ],
  glosario: [
    { termino: "Probation", definicion: "The trial period at the start of a job, during which sick leave is unpaid." },
    { termino: "Medical authority", definicion: "The health body that issues the medical report for sick leave." },
  ],
});
