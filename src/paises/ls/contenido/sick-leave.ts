import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ls.sick-leave",
  h1: "Sick leave and sick pay calculator",
  title: "Sick leave calculator Lesotho: full and half pay days",
  description:
    "See how many paid sick days you get in Lesotho, {{ls.sick-leave[full-pay-yearly]}} at full pay and {{ls.sick-leave[half-pay-yearly]}} at half pay a year, and what you are paid.",
  intro: [
    "Enter your monthly wage, how long you have worked for your employer and the days you were off sick. You get your sick leave entitlement and the minimum sick pay.",
    "The rules are in section 190 of the Labour Act, 2024.",
  ],
  comoSeCalcula: [
    "In the first six months with an employer there is no paid sick leave.",
    "From month seven to month twelve you get up to {{ls.sick-leave[full-pay-second-half]}} on full pay.",
    "After twelve months you get up to {{ls.sick-leave[full-pay-yearly]}} on full pay and then up to {{ls.sick-leave[half-pay-yearly]}} on half pay in each twelve-month period.",
    "A day's pay is your monthly wage divided by {{ls.hours-divisor[monthly]}}, times the hours of a normal working day.",
  ],
  ejemplo: ["After two years on M6 000 a month, 20 days off sick are paid as 12 days at M276.92 and 8 days at half that, M4 430.72 in total."],
  faq: [
    {
      pregunta: "Do I need a medical certificate?",
      respuesta: "Yes. Paid sick leave needs a certificate signed by a medical practitioner or by the person in charge of a dispensary or medical centre acting for one.",
    },
    {
      pregunta: "Can unused sick leave be carried over?",
      respuesta: "No. Sick leave cannot be carried forward from one year to the next.",
    },
    {
      pregunta: "Can my employer send me to another doctor?",
      respuesta: "If you are off sick for more than six working days, yes. The employer pays for that examination and your travel.",
    },
  ],
  glosario: [
    { termino: "Half pay", definicion: "Half of a normal day's wage for each sick day in that band." },
    { termino: "Certificate of incapacity", definicion: "A medical note confirming you could not work." },
  ],
});
